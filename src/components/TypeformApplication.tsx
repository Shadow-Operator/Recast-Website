import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder: string;
  options?: string[];
  required?: boolean;
}

interface TypeformApplicationProps {
  title: string;
  subtitle: string;
  questions: Question[];
  roleSelection?: {
    label: string;
    options: { value: string; label: string; questions: Question[] }[];
  };
}

const TypeformApplication = ({ title, subtitle, questions, roleSelection }: TypeformApplicationProps) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // If roleSelection is provided, step 0 is the role picker; otherwise use provided questions directly
  const activeQuestions = roleSelection && selectedRole
    ? roleSelection.options.find((o) => o.value === selectedRole)?.questions || questions
    : questions;

  const hasRoleStep = !!roleSelection;
  const isIntro = currentStep === -1;
  const isRoleStep = hasRoleStep && currentStep === 0 && !selectedRole;
  const questionIndex = hasRoleStep ? currentStep - 1 : currentStep;
  const totalSteps = activeQuestions.length + (hasRoleStep ? 1 : 0);
  const currentQuestion = !isIntro && !isRoleStep ? activeQuestions[questionIndex] : undefined;
  const isComplete = submitted;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (hasRoleStep && currentStep === 1) {
      // Going back to role selection
      setSelectedRole(null);
      setCurrentStep(0);
    } else if (currentStep > (hasRoleStep ? 1 : 0)) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (currentQuestion?.required && !answers[currentQuestion.id]?.trim()) return;
      handleNext();
    }
  };

  const progress = isIntro ? 0 : (currentStep / totalSteps) * 100;

  return (
    <section className="min-h-[35vh] md:min-h-[40vh] flex flex-col justify-center items-center relative bg-background px-5 py-4 md:py-0">
      {/* Progress bar */}
      {!isIntro && !isComplete && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
          <motion.div
            className="h-full bg-blue-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      <div className="w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Intro screen */}
          {isIntro && !isComplete && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-6xl font-display font-extrabold tracking-[-0.03em] uppercase mb-4 md:mb-6">
                {title}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg font-light max-w-lg mx-auto mb-12">
                {subtitle}
              </p>
              <button
                onClick={() => setCurrentStep(0)}
                className="bg-blue-accent text-white font-semibold text-sm md:text-[15px] px-10 py-4 hover:bg-blue-glow transition-colors"
              >
                Start Application →
              </button>
            </motion.div>
          )}

          {/* Role selection step */}
          {isRoleStep && !isComplete && roleSelection && (
            <motion.div
              key="role-select"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-muted-foreground text-xs font-medium tracking-[0.15em] uppercase mb-4">
                1 / {totalSteps}
              </p>
              <h3 className="text-xl md:text-4xl font-display font-bold tracking-[-0.02em] mb-6 md:mb-8">
                {roleSelection.label}
              </h3>
              <div className="flex flex-col gap-3">
                {roleSelection.options.map((option) => (
                  <button
                    key={option.value}
                    className="text-left px-6 py-4 border transition-all text-base md:text-lg border-border text-muted-foreground hover:border-blue-accent/40 hover:text-foreground"
                    onClick={() => {
                      setSelectedRole(option.value);
                      setAnswers({ ...answers, role: option.value });
                      setTimeout(() => setCurrentStep(1), 300);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-10">
                <button
                  onClick={() => setCurrentStep(-1)}
                  className="border border-border text-muted-foreground font-medium text-sm px-6 py-3 hover:border-blue-accent/40 hover:text-foreground transition-all"
                >
                  ← Back
                </button>
              </div>
            </motion.div>
          )}

          {/* Question screens */}
          {!isIntro && !isRoleStep && !isComplete && currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-muted-foreground text-xs font-medium tracking-[0.15em] uppercase mb-4">
                {currentStep + 1} / {totalSteps}
              </p>
              <h3 className="text-xl md:text-4xl font-display font-bold tracking-[-0.02em] mb-6 md:mb-8">
                {currentQuestion.label}
              </h3>

              {currentQuestion.type === "textarea" ? (
                <textarea
                  className="w-full bg-transparent border-b-2 border-border focus:border-blue-accent outline-none text-lg md:text-xl text-foreground py-4 resize-none min-h-[120px] placeholder:text-muted-foreground/50 transition-colors"
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              ) : currentQuestion.type === "select" ? (
                <div className="flex flex-col gap-3">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option}
                      className={`text-left px-6 py-4 border transition-all text-base md:text-lg ${
                        answers[currentQuestion.id] === option
                          ? "border-blue-accent bg-blue-accent/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-blue-accent/40 hover:text-foreground"
                      }`}
                      onClick={() => {
                        setAnswers({ ...answers, [currentQuestion.id]: option });
                        setTimeout(handleNext, 300);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type={currentQuestion.type}
                  className="w-full bg-transparent border-b-2 border-border focus:border-blue-accent outline-none text-lg md:text-xl text-foreground py-4 placeholder:text-muted-foreground/50 transition-colors"
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              )}

              <div className="flex items-center gap-4 mt-10">
                <button
                  onClick={handleBack}
                  className="border border-border text-muted-foreground font-medium text-sm px-6 py-3 hover:border-blue-accent/40 hover:text-foreground transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestion.required && !answers[currentQuestion.id]?.trim()}
                  className="bg-blue-accent text-white font-semibold text-sm px-8 py-3 hover:bg-blue-glow transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {questionIndex === activeQuestions.length - 1 ? "Submit" : "Next →"}
                </button>
                <span className="text-muted-foreground/50 text-xs hidden md:inline">
                  press Enter ↵
                </span>
              </div>
            </motion.div>
          )}

          {/* Success screen */}
          {isComplete && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <motion.span
                className="text-6xl md:text-8xl block mb-8 text-blue-accent"
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                ♠
              </motion.span>
              <h3 className="text-3xl md:text-5xl font-display font-extrabold tracking-[-0.03em] uppercase mb-4">
                Application Sent
              </h3>
              <p className="text-muted-foreground text-base md:text-lg font-light max-w-md mx-auto">
                Thank you for your interest. Our team will review your application and get back to you shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TypeformApplication;
