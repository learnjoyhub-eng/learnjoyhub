import React from 'react';
import './LegalPages.css';

interface TermsAndConditionsProps {
  onBack: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
  return (
    <div className="legal-page-container">
      <button className="back-button-legal" onClick={onBack}>
        ← Back to Home
      </button>

      <div className="legal-content">
        <h1>Terms and Conditions</h1>
        <p className="last-updated">Last Updated: November 22, 2025</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            Welcome to LearnJoyHub ("we," "our," or "us"). By accessing or using our website 
            at learnjoyhub.in (the "Service"), you agree to be bound by these Terms and Conditions 
            ("Terms"). If you do not agree to these Terms, please do not use our Service.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            LearnJoyHub provides educational content and interactive learning tools including:
          </p>
          <ul>
            <li>Kids Learning Module - Educational games for 2nd Standard ICSE curriculum (Spelling and Mathematics)</li>
            <li>Numerology Calculator - Tools for calculating numerology numbers and understanding their meanings</li>
            <li>Parent Mode - Tools for parents to manage and customize learning content</li>
          </ul>
        </section>

        <section>
          <h2>3. User Eligibility</h2>
          <p>
            Our Service is designed for:
          </p>
          <ul>
            <li>Children using the Kids Learning Module should be supervised by parents or guardians</li>
            <li>Parents and educators managing content through Parent Mode</li>
            <li>Adults interested in numerology and personal development</li>
          </ul>
          <p>
            By using our Service, you represent that you have the legal capacity to enter into 
            these Terms. If you are using the Service on behalf of a child, you must be their 
            parent or legal guardian.
          </p>
        </section>

        <section>
          <h2>4. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate information when using our Service</li>
            <li>Use the Service only for lawful purposes</li>
            <li>Not attempt to gain unauthorized access to any portion of the Service</li>
            <li>Not interfere with or disrupt the Service or servers</li>
            <li>Supervise children when they use the Kids Learning Module</li>
          </ul>
        </section>

        <section>
          <h2>5. Intellectual Property</h2>
          <p>
            All content on LearnJoyHub, including but not limited to text, graphics, logos, 
            educational materials, and software, is the property of LearnJoyHub and is protected 
            by copyright and other intellectual property laws. You may not reproduce, distribute, 
            modify, or create derivative works without our express written permission.
          </p>
        </section>

        <section>
          <h2>6. Educational Content Disclaimer</h2>
          <p>
            The educational content provided in our Kids Learning Module is designed to supplement 
            formal education. While we strive for accuracy, we do not guarantee that our content 
            will meet specific curriculum requirements or educational standards. Parents and 
            educators should verify the appropriateness of content for their specific needs.
          </p>
        </section>

        <section>
          <h2>7. Numerology Disclaimer</h2>
          <p>
            The numerology tools and information provided on our Service are for entertainment 
            and educational purposes only. Numerology is not a science, and any interpretations 
            or readings should not be considered as professional advice. We do not make any 
            guarantees about the accuracy or applicability of numerology readings.
          </p>
          <p>
            You should not rely on numerology readings for making important life decisions. 
            For professional guidance, please consult with qualified professionals in the 
            relevant fields.
          </p>
        </section>

        <section>
          <h2>8. Third-Party Advertisements</h2>
          <p>
            Our Service may display advertisements from third-party advertisers, including 
            Google AdSense. We do not control the content of these advertisements and are not 
            responsible for the products or services advertised. Your interactions with 
            advertisers are solely between you and the advertiser.
          </p>
        </section>

        <section>
          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, LearnJoyHub shall not be liable for any 
            indirect, incidental, special, consequential, or punitive damages, or any loss of 
            profits or revenues, whether incurred directly or indirectly, or any loss of data, 
            use, goodwill, or other intangible losses resulting from:
          </p>
          <ul>
            <li>Your use or inability to use the Service</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
            <li>Any interruption or cessation of transmission to or from the Service</li>
            <li>Any bugs, viruses, or other harmful code that may be transmitted through the Service</li>
            <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content</li>
          </ul>
        </section>

        <section>
          <h2>10. Data Storage and Privacy</h2>
          <p>
            User progress and custom word lists in Parent Mode are stored locally in your 
            browser's local storage. We do not collect or store this information on our 
            servers. Please refer to our Privacy Policy for more information about how we 
            handle data.
          </p>
        </section>

        <section>
          <h2>11. Changes to Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the Service (or any part 
            thereof) at any time, with or without notice. We shall not be liable to you or 
            any third party for any modification, suspension, or discontinuation of the Service.
          </p>
        </section>

        <section>
          <h2>12. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of any changes by 
            posting the new Terms on this page and updating the "Last Updated" date. You are 
            advised to review these Terms periodically for any changes. Your continued use of 
            the Service after any changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, 
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2>14. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <p className="contact-info">
            Email: <a href="mailto:learnjoyhub@gmail.com">learnjoyhub@gmail.com</a><br />
            Website: <a href="https://learnjoyhub.in">learnjoyhub.in</a>
          </p>
        </section>

        <section>
          <h2>15. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that 
            provision will be limited or eliminated to the minimum extent necessary so that 
            these Terms will otherwise remain in full force and effect.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
