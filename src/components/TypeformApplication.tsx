import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import WobblyLines from "./WobblyLines";
import LoopingVideo from "./LoopingVideo";

interface Question {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "select" | "multi-select" | "group";
  placeholder: string;
  options?: string[];
  required?: boolean;
  fields?: Question[];
}

interface TypeformApplicationProps {
  title: string;
  subtitle: string;
  questions: Question[];
  defaultType?: string;
  roleSelection?: {
    label: string;
    options: { value: string; label: string; questions: Question[] }[];
  };
}

const TRUST_SIGNALS = [
  "Reviewed personally by our team",
  "Response within 48 hours",
  "No commitment required",
];

const LETTER_KEYS = ["A", "B", "C", "D", "E", "F"];

const TypeformApplication = ({ title, subtitle, questions, defaultType, roleSelection }: TypeformApplicationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const activeQuestions = roleSelection && selectedRole
    ? roleSelection.options.find((o) => o.value === selectedRole)?.questions || questions
    : questions;

  const hasRoleStep = !!roleSelection;
  const isRoleStep = hasRoleStep && currentStep === 0 && !selectedRole;
  const questionIndex = hasRoleStep ? currentStep - 1 : currentStep;
  const totalSteps = activeQuestions.length + (hasRoleStep ? 1 : 0);
  const currentQuestion = !isRoleStep ? activeQuestions[questionIndex] : undefined;
  const isComplete = submitted;
  const progress = (currentStep / totalSteps) * 100;

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canProceed = () => {
    if (!currentQuestion) return false;
    if (currentQuestion.type === "group" && currentQuestion.fields) {
      return currentQuestion.fields.every((field) => {
        if (!field.required) return true;
        const val = answers[field.id]?.trim();
        if (!val) return false;
        if (field.type === "email") return validateEmail(val);
        return true;
      });
    }
    if (currentQuestion.type === "multi-select" && currentQuestion.options) {
      const selected = currentQuestion.options.filter((opt) => answers[`platform-${opt}`] === "true");
      if (currentQuestion.required && selected.length === 0) return false;
      return selected.every((opt) => (answers[`handle-${opt}`]?.trim() || "").length > 0);
    }
    if (!currentQuestion.required) return true;
    const val = answers[currentQuestion.id]?.trim();
    if (!val) return false;
    if (currentQuestion.type === "email") return validateEmail(val);
    return true;
  };

  const submitApplication = async (formAnswers: Record<string, string>) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const platforms = ["TikTok", "Instagram", "X", "YouTube", "Twitch", "Kick"];
      const selectedPlatforms = platforms.filter((p) => formAnswers[`platform-${p}`] === "true");
      const platformHandles = selectedPlatforms.map((p) => `${p}: ${formAnswers[`handle-${p}`] || ""}`).join(", ");

      const brandMessage = [
        formAnswers.company ? `Company: ${formAnswers.company}` : null,
        formAnswers.budget ? `Budget: ${formAnswers.budget}` : null,
        formAnswers.goals ? `Goals: ${formAnswers.goals}` : null,
        formAnswers.timeline ? `Timeline: ${formAnswers.timeline}${formAnswers["timeline-specific"] ? ` (${formAnswers["timeline-specific"]})` : ""}` : null,
      ].filter(Boolean).join("\n") || null;

      const { error } = await (supabase as any).from("applications").insert({
        type: formAnswers.role || defaultType || null,
        name: formAnswers.name || null,
        email: formAnswers.email || null,
        phone: formAnswers.phone || null,
        platform: selectedPlatforms.length > 0 ? selectedPlatforms.join(", ") : formAnswers.platform || null,
        handle: platformHandles || formAnswers.handle || null,
        audience_size: formAnswers.audience || null,
        content_niche: formAnswers.about || null,
        message: brandMessage,
      });
      if (error) throw error;

      // Notify team via edge function (best-effort, don't block success)
      const record = {
        type: formAnswers.role || defaultType || null,
        name: formAnswers.name || null,
        email: formAnswers.email || null,
        phone: formAnswers.phone || null,
        platform: selectedPlatforms.length > 0 ? selectedPlatforms.join(", ") : formAnswers.platform || null,
        handle: platformHandles || formAnswers.handle || null,
        audience_size: formAnswers.audience || null,
        content_niche: formAnswers.about || null,
        message: brandMessage,
        created_at: new Date().toISOString(),
      };
      fetch("https://vmqzhkktdvnxjiomhecv.supabase.co/functions/v1/notify-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ record }),
      }).catch(() => {});

      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us at harry@recast.gg");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion?.type === "email") {
      const val = answers[currentQuestion.id]?.trim();
      if (val && !validateEmail(val)) { setEmailError("Please enter a valid email address"); return; }
    }
    if (currentQuestion?.type === "group" && currentQuestion.fields) {
      const emailField = currentQuestion.fields.find((f) => f.type === "email");
      if (emailField) {
        const val = answers[emailField.id]?.trim();
        if (val && !validateEmail(val)) { setEmailError("Please enter a valid email address"); return; }
      }
    }
    setEmailError(null);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitApplication(answers);
    }
  };

  const handleNextRef = useRef(handleNext);
  handleNextRef.current = handleNext;

  const handleBack = () => {
    setEmailError(null);
    if (hasRoleStep && currentStep === 1) {
      setSelectedRole(null);
      setCurrentStep(0);
    } else if (currentStep > (hasRoleStep ? 1 : 0)) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!canProceed()) return;
      handleNext();
    }
  };

  // Keyboard shortcuts for select options (A, B, C...)
  useEffect(() => {
    if (!currentQuestion || currentQuestion.type !== "select" || !currentQuestion.options) return;
    const options = currentQuestion.options;
    const qId = currentQuestion.id;

    const handleKey = (e: KeyboardEvent) => {
      const index = e.key.toLowerCase().charCodeAt(0) - 97;
      if (index >= 0 && index < options.length) {
        setAnswers((prev) => ({ ...prev, [qId]: options[index] }));
        setTimeout(() => handleNextRef.current(), 300);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentQuestion]);

  const renderField = (field: Question, autoFocusField?: boolean) => {
    if (field.type === "textarea") {
      return (
        <textarea
          id={`field-${field.id}`}
          aria-label={field.label}
          aria-required={field.required}
          className="w-full bg-transparent border-b-2 border-border focus:border-blue-accent outline-none text-lg md:text-xl text-foreground py-4 resize-none min-h-[120px] placeholder:text-muted-foreground/50 transition-colors"
          placeholder={field.placeholder}
          value={answers[field.id] || ""}
          onChange={(e) => setAnswers({ ...answers, [field.id]: e.target.value })}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocusField}
        />
      );
    }

    if (field.type === "select") {
      const hasSpecificOption = answers[field.id] === "Specific date or timeframe";
      return (
        <div className="flex flex-col gap-3">
          {field.options?.map((option, i) => (
            <button
              key={option}
              className={`text-left px-5 py-4 border transition-all text-base flex items-center gap-4 group ${
                answers[field.id] === option
                  ? "border-blue-accent bg-blue-accent/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-blue-accent/50 hover:text-foreground"
              }`}
              onClick={() => {
                setAnswers({ ...answers, [field.id]: option });
                if (option !== "Specific date or timeframe") {
                  setTimeout(handleNext, 300);
                }
              }}
            >
              <span className={`shrink-0 w-7 h-7 flex items-center justify-center text-[11px] font-bold tracking-wider border transition-colors ${
                answers[field.id] === option ? "border-blue-accent text-blue-accent" : "border-border/60 text-muted-foreground/60 group-hover:border-blue-accent/40 group-hover:text-blue-accent/60"
              }`}>
                {LETTER_KEYS[i]}
              </span>
              {option}
            </button>
          ))}
          {hasSpecificOption && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <input
                type="text"
                placeholder="e.g. June 2025, Q3, specific date..."
                className="w-full bg-transparent border-b-2 border-border focus:border-blue-accent outline-none text-lg md:text-xl text-foreground py-4 placeholder:text-muted-foreground/50 transition-colors"
                value={answers[`${field.id}-specific`] || ""}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [`${field.id}-specific`]: e.target.value }))}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </motion.div>
          )}
        </div>
      );
    }

    if (field.type === "multi-select") {
      return (
        <div className="flex flex-col gap-3">
          {field.options?.map((option, i) => {
            const isSelected = answers[`platform-${option}`] === "true";
            return (
              <div key={option}>
                <button
                  className={`w-full text-left px-5 py-4 border transition-all text-base flex items-center gap-4 group ${
                    isSelected
                      ? "border-blue-accent bg-blue-accent/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-blue-accent/50 hover:text-foreground"
                  }`}
                  onClick={() => {
                    setAnswers((prev) => ({
                      ...prev,
                      [`platform-${option}`]: isSelected ? "" : "true",
                      ...(isSelected ? { [`handle-${option}`]: "" } : {}),
                    }));
                  }}
                >
                  <span className={`shrink-0 w-7 h-7 flex items-center justify-center text-[11px] font-bold tracking-wider border transition-colors ${
                    isSelected ? "border-blue-accent text-blue-accent" : "border-border/60 text-muted-foreground/60 group-hover:border-blue-accent/40 group-hover:text-blue-accent/60"
                  }`}>
                    {LETTER_KEYS[i]}
                  </span>
                  {option}
                </button>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder={`Your ${option} handle`}
                      className="w-full bg-transparent border-b-2 border-border focus:border-blue-accent outline-none text-base text-foreground py-3 px-5 placeholder:text-muted-foreground/50 transition-colors"
                      value={answers[`handle-${option}`] || ""}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [`handle-${option}`]: e.target.value }))}
                      autoFocus
                    />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <input
        id={`field-${field.id}`}
        type={field.type}
        aria-label={field.label}
        aria-required={field.required}
        autoComplete={field.type === "email" ? "email" : field.id === "name" ? "name" : field.id === "company" ? "organization" : undefined}
        className="w-full bg-transparent border-b-2 border-border focus:border-blue-accent outline-none text-lg md:text-xl text-foreground py-4 placeholder:text-muted-foreground/50 transition-colors"
        placeholder={field.placeholder}
        value={answers[field.id] || ""}
        onChange={(e) => {
          setAnswers({ ...answers, [field.id]: e.target.value });
          if (emailError && field.type === "email") setEmailError(null);
        }}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocusField}
      />
    );
  };

  return (
    <section
      aria-label="Application form"
      className="relative overflow-hidden border-t border-border py-16 md:py-24 px-5 md:px-12"
    >
      {/* Background */}
      <WobblyLines />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-blue-accent/8 blur-3xl" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto">
        {isComplete ? (
          /* ── Success screen ── */
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Spinning holographic logo */}
            <motion.div
              className="shrink-0 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <video
                src="/success-card.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-[400px] h-[400px] md:w-[550px] md:h-[550px] object-contain relative z-10"
                style={{ mixBlendMode: "screen" }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Text panel */}
            <motion.div
              className="border border-border p-8 md:p-10 bg-card/10 max-w-md w-full text-center md:text-left"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-3xl font-display font-extrabold tracking-[-0.03em] uppercase mb-4">
                Application<br />Received.
              </h3>
              <p className="text-muted-foreground text-base font-light leading-relaxed mb-6">
                We've received your application. A member of our team will reach out within 48 hours.
              </p>

              {/* Stats row */}
              <div className="flex gap-6 mb-6 border-t border-border pt-6">
                <div>
                  <p className="text-2xl font-display font-extrabold text-blue-accent tracking-tight">48h</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.1em] mt-1">Response Time</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-extrabold text-blue-accent tracking-tight">100%</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.1em] mt-1">Reviewed Personally</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ── Two-column layout ── */
          <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-start">

            {/* Left panel */}
            <div className="hidden md:block md:sticky md:top-32">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                . Get In Touch
              </p>
              <h2 className="text-3xl lg:text-5xl font-display font-extrabold tracking-[-0.03em] leading-[0.9] uppercase mb-6">
                {title}
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-10 text-sm md:text-base">
                {subtitle}
              </p>
              <ul className="flex flex-col gap-4">
                {TRUST_SIGNALS.map((signal) => (
                  <li key={signal} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="text-blue-accent text-base shrink-0">✓</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right panel — form card */}
            <div className="border border-border p-6 md:p-10 relative bg-card/10">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-border">
                <motion.div
                  className="h-full bg-blue-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              <AnimatePresence mode="wait">
                {/* Role selection step */}
                {isRoleStep && roleSelection && (
                  <motion.div
                    key="role-select"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-muted-foreground text-[11px] font-medium tracking-[0.15em] uppercase mb-5">
                      Takes under 2 minutes
                    </p>
                    <h3 className="text-xl md:text-3xl font-display font-bold tracking-[-0.02em] mb-8">
                      {roleSelection.label}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {roleSelection.options.map((option, i) => (
                        <button
                          key={option.value}
                          className="text-left px-5 py-4 border border-border text-muted-foreground hover:border-blue-accent/50 hover:text-foreground transition-all text-base flex items-center gap-4 group"
                          onClick={() => {
                            setSelectedRole(option.value);
                            setAnswers({ ...answers, role: option.value });
                            setTimeout(() => setCurrentStep(1), 300);
                          }}
                        >
                          <span className="shrink-0 w-7 h-7 flex items-center justify-center text-[11px] font-bold tracking-wider border border-border/60 text-muted-foreground/60 group-hover:border-blue-accent/40 group-hover:text-blue-accent/60 transition-colors">
                            {LETTER_KEYS[i]}
                          </span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Question screens */}
                {!isRoleStep && currentQuestion && (
                  <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-muted-foreground text-[11px] font-medium tracking-[0.15em] uppercase mb-5">
                      {currentStep + 1} / {totalSteps}
                    </p>

                    {currentQuestion.type === "group" && currentQuestion.fields ? (
                      <>
                        <h3 className="text-xl md:text-3xl font-display font-bold tracking-[-0.02em] mb-8">
                          {currentQuestion.label}
                        </h3>
                        <div className="flex flex-col gap-6">
                          {currentQuestion.fields.map((field, i) => (
                            <div key={field.id}>
                              <label htmlFor={`field-${field.id}`} className="text-[11px] text-muted-foreground font-medium tracking-[0.12em] uppercase mb-2 block">
                                {field.label}
                                {field.required && <span className="text-blue-accent ml-1" aria-label="required">*</span>}
                              </label>
                              {renderField(field, i === 0)}
                              {field.type === "email" && emailError && (
                                <p className="text-red-400 text-sm mt-2" role="alert">{emailError}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl md:text-3xl font-display font-bold tracking-[-0.02em] mb-8">
                          {currentQuestion.label}
                          {currentQuestion.required && <span className="text-blue-accent ml-1" aria-label="required">*</span>}
                        </h3>
                        {renderField(currentQuestion, true)}
                        {currentQuestion.type === "email" && emailError && (
                          <p className="text-red-400 text-sm mt-2" role="alert">{emailError}</p>
                        )}
                      </>
                    )}

                    {submitError && (
                      <p className="text-red-400 text-sm mt-4" role="alert">{submitError}</p>
                    )}

                    {(currentQuestion.type !== "select" || answers[currentQuestion.id] === "Specific date or timeframe") && (
                      <div className="flex items-center gap-4 mt-10">
                        <button
                          onClick={handleBack}
                          className="border border-border text-muted-foreground font-medium text-sm px-6 py-3 hover:border-blue-accent/40 hover:text-foreground transition-all"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={!canProceed() || submitting}
                          className="bg-blue-accent text-white font-semibold text-sm px-8 py-3 hover:bg-blue-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {submitting ? "Submitting..." : questionIndex === activeQuestions.length - 1 ? "Submit" : "Next →"}
                        </button>
                        <span className="text-muted-foreground/40 text-xs hidden md:inline">
                          press Enter ↵
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TypeformApplication;
