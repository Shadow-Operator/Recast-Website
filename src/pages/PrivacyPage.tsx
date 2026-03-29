import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Who We Are",
    body: `Recast is a talent and influencer agency specialising in gaming, entertainment, and lifestyle. We connect content creators with brands for sponsorship and affiliate partnerships.\n\nFor the purposes of data protection law, the data controller is Recast Ltd, registered in England and Wales (Company No. [COMPANY NUMBER]), with registered address at [REGISTERED ADDRESS].`,
  },
  {
    title: "What Data We Collect",
    body: `When you submit an enquiry or application through our website, we collect:\n\n• Your name and email address\n• Your company name (for brand enquiries)\n• Your social media handle and platform details (for creator applications)\n• Your audience size, campaign budget, and other information you choose to provide\n\nWe also collect standard technical data via our hosting provider, including IP addresses and browser information, for security and performance purposes.`,
  },
  {
    title: "How We Use Your Data",
    body: `We use the information you provide to:\n\n• Respond to your enquiry or application\n• Match creators with relevant brand campaigns\n• Send you information about Recast's services where you have consented\n• Comply with our legal obligations\n\nWe will not use your data for any purpose incompatible with the reason you provided it.`,
  },
  {
    title: "Legal Basis for Processing",
    body: `We process your data on the following legal bases:\n\n• Legitimate interests - to respond to enquiries and operate our business\n• Contract - where processing is necessary to provide the services you have requested\n• Legal obligation - where we are required to process your data by law\n• Consent - where you have explicitly opted in to marketing communications`,
  },
  {
    title: "Data Sharing",
    body: `We do not sell your personal data. We may share your information with:\n\n• Brand partners, where you have applied as a creator and consented to being put forward\n• Service providers who process data on our behalf (e.g. form handling, email delivery)\n• Regulatory authorities where required by law\n\nAll third parties are required to handle your data securely and in accordance with applicable data protection law.`,
  },
  {
    title: "Data Retention",
    body: `We retain your data for as long as necessary to fulfil the purpose for which it was collected. Enquiry data is typically retained for 12 months. Creator and brand onboarding data is retained for the duration of any active relationship and for a reasonable period thereafter for legal and business purposes.`,
  },
  {
    title: "Your Rights",
    body: `Under UK GDPR, you have the right to:\n\n• Access the personal data we hold about you\n• Request correction of inaccurate data\n• Request deletion of your data (subject to legal obligations)\n• Object to or restrict certain types of processing\n• Data portability\n• Withdraw consent at any time, where processing is based on consent\n\nTo exercise any of these rights, please contact us at privacy@recast.gg. We will respond within 30 days.`,
  },
  {
    title: "Cookies",
    body: `Our website uses essential cookies only. We do not use tracking or advertising cookies. No consent banner is required for essential cookies under current UK guidance.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this policy from time to time. The date of the most recent update is shown below. Continued use of our website after any changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "Contact & Complaints",
    body: `For any data protection queries, contact us at privacy@recast.gg.\n\nIf you believe we have not handled your data correctly, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at ico.org.uk.`,
  },
];

const PrivacyPage = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Helmet>
        <title>Privacy Policy - Recast</title>
        <meta name="description" content="How Recast collects, uses, and protects your personal data." />
        <link rel="canonical" href="https://recast.gg/privacy" />
      </Helmet>
      <Navbar />

      <section id="main-content" className="px-5 md:px-12 pt-28 md:pt-40 pb-16 md:pb-24 max-w-[860px]">
        <motion.p
          className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          . Legal
        </motion.p>
        <motion.h1
          className="text-[clamp(30px,5vw,72px)] font-display font-extrabold tracking-[-0.03em] leading-[0.9] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Last updated: March 2025
        </motion.p>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <h2 className="text-lg md:text-xl font-display font-bold uppercase tracking-tight mb-4 text-foreground">
                {section.title}
              </h2>
              <div className="text-muted-foreground font-light leading-relaxed text-[15px] whitespace-pre-line">
                {section.body}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPage;
