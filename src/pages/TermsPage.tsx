import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Agreement to Terms",
    body: `By accessing or using the Recast website (recast.gg), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.\n\nThese terms apply to all visitors, users, and applicants who access or use the website.`,
  },
  {
    title: "Use of the Website",
    body: `You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this website by any third party.\n\nYou must not:\n\n\u2022 Submit false, misleading, or fraudulent information through any form\n\u2022 Attempt to gain unauthorized access to any part of the website or its systems\n\u2022 Use the website to transmit any malicious code, spam, or unsolicited communications\n\u2022 Scrape, crawl, or use automated tools to extract data from the website without our written consent\n\u2022 Impersonate any person or entity, or misrepresent your affiliation with any person or entity`,
  },
  {
    title: "Applications and Submissions",
    body: `When you submit an application through our website (as a creator or brand), you represent that:\n\n\u2022 All information provided is accurate and complete to the best of your knowledge\n\u2022 You are authorized to provide the information submitted\n\u2022 You consent to us contacting you regarding your application\n\nSubmitting an application does not guarantee acceptance into any program or partnership. We reserve the right to accept or decline any application at our sole discretion.`,
  },
  {
    title: "Intellectual Property",
    body: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Recast LLC or its licensors and is protected by applicable intellectual property laws.\n\nYou may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent.`,
  },
  {
    title: "Third-Party Links",
    body: `Our website may contain links to third-party websites or services. We are not responsible for the content, privacy practices, or terms of any third-party sites. Accessing third-party links is at your own risk.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by law, Recast LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the website.\n\nThe website is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied.`,
  },
  {
    title: "Indemnification",
    body: `You agree to indemnify and hold harmless Recast LLC, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, or expenses arising out of your use of the website or violation of these Terms of Use.`,
  },
  {
    title: "Governing Law",
    body: `These Terms of Use are governed by and construed in accordance with the laws of the State of Nevada, United States, without regard to its conflict of law provisions.\n\nAny disputes arising from these terms shall be resolved in the courts of Clark County, Nevada.`,
  },
  {
    title: "Changes to These Terms",
    body: `We reserve the right to update or modify these Terms of Use at any time. The date of the most recent update is shown below. Continued use of the website after any changes constitutes acceptance of the updated terms.`,
  },
  {
    title: "Contact",
    body: `If you have any questions about these Terms of Use, please contact us at sign@recast.gg.`,
  },
];

const TermsPage = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Helmet>
        <title>Terms of Use - Recast</title>
        <meta name="description" content="Terms of Use for the Recast website." />
        <link rel="canonical" href="https://recast.gg/terms" />
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
          Terms of Use
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Last updated: April 2026
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

export default TermsPage;
