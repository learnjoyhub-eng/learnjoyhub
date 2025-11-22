import React from 'react';
import './LegalPages.css';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="legal-page-container">
      <button className="back-button-legal" onClick={onBack}>
        ← Back to Home
      </button>

      <div className="legal-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: November 22, 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to LearnJoyHub ("we," "our," or "us"). We are committed to protecting your 
            privacy and ensuring you have a positive experience on our website. This Privacy 
            Policy explains how we collect, use, disclose, and safeguard your information when 
            you visit our website learnjoyhub.in (the "Service").
          </p>
          <p>
            Please read this Privacy Policy carefully. By using our Service, you agree to the 
            collection and use of information in accordance with this policy.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Information You Provide</h3>
          <p>
            We collect information that you voluntarily provide when using our Service:
          </p>
          <ul>
            <li><strong>Custom Word Lists:</strong> Words and difficulty levels you add through Parent Mode</li>
            <li><strong>Learning Progress:</strong> Your child's progress in spelling and math activities</li>
            <li><strong>Numerology Inputs:</strong> Names and birth dates entered for numerology calculations</li>
          </ul>
          <p>
            <strong>Important:</strong> All this information is stored locally in your browser's 
            local storage and is NOT transmitted to or stored on our servers.
          </p>

          <h3>2.2 Automatically Collected Information</h3>
          <p>
            When you visit our Service, we automatically collect certain information:
          </p>
          <ul>
            <li><strong>Analytics Data:</strong> We use Mixpanel to collect anonymous usage data including page views and feature interactions</li>
            <li><strong>Device Information:</strong> Browser type, device type, operating system</li>
            <li><strong>Usage Information:</strong> Which features you use and how you interact with our Service</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul>
            <li>Providing and maintaining our Service</li>
            <li>Improving user experience and Service functionality</li>
            <li>Understanding how users interact with our Service</li>
            <li>Analyzing usage patterns to improve our educational content</li>
            <li>Detecting and preventing technical issues</li>
          </ul>
          <p>
            We do NOT use your information for marketing purposes, and we do NOT sell your 
            information to third parties.
          </p>
        </section>

        <section>
          <h2>4. Local Storage</h2>
          <p>
            Our Service uses browser local storage to save:
          </p>
          <ul>
            <li>Custom word lists created in Parent Mode</li>
            <li>Learning progress and scores</li>
            <li>User preferences and settings</li>
          </ul>
          <p>
            This data remains on your device and is not accessible to us or any third parties. 
            You can clear this data at any time by clearing your browser's local storage or 
            cache.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Services</h2>
          
          <h3>5.1 Mixpanel Analytics</h3>
          <p>
            We use Mixpanel to collect anonymous analytics data. Mixpanel helps us understand 
            how users interact with our Service. The data collected by Mixpanel does not 
            include personally identifiable information.
          </p>
          <p>
            Learn more about Mixpanel's privacy practices: 
            <a href="https://mixpanel.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
              Mixpanel Privacy Policy
            </a>
          </p>

          <h3>5.2 Google AdSense</h3>
          <p>
            We use Google AdSense to display advertisements on our Service. Google AdSense may 
            use cookies and web beacons to collect information about your visits to this and 
            other websites to provide advertisements about goods and services of interest to you.
          </p>
          <p>
            Google's use of advertising cookies enables it and its partners to serve ads based 
            on your visit to our Service and/or other sites on the Internet.
          </p>
          <p>
            You may opt out of personalized advertising by visiting 
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a> or 
            <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              www.aboutads.info
            </a>.
          </p>
          <p>
            Learn more about Google's privacy practices: 
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
          </p>
        </section>

        <section>
          <h2>6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Service. 
            Cookies are files with a small amount of data which may include an anonymous unique 
            identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is 
            being sent. However, if you do not accept cookies, you may not be able to use some 
            portions of our Service.
          </p>
        </section>

        <section>
          <h2>7. Children's Privacy</h2>
          <p>
            Our Service includes educational content designed for children. We are committed to 
            protecting children's privacy and comply with applicable laws regarding children's 
            online privacy.
          </p>
          <p>
            We do NOT knowingly collect personally identifiable information from children. The 
            Kids Learning Module stores progress data only in local browser storage and does not 
            transmit any information to our servers.
          </p>
          <p>
            Parents and guardians are encouraged to:
          </p>
          <ul>
            <li>Supervise their children's online activities</li>
            <li>Review the content their children access</li>
            <li>Use Parent Mode to customize learning content</li>
          </ul>
          <p>
            If you are a parent or guardian and believe your child has provided personal 
            information to us, please contact us immediately at learnjoyhub@gmail.com.
          </p>
        </section>

        <section>
          <h2>8. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the 
            information we collect. However, please note that:
          </p>
          <ul>
            <li>Most user data is stored locally on your device, not on our servers</li>
            <li>No method of transmission over the Internet is 100% secure</li>
            <li>While we strive to protect your information, we cannot guarantee absolute security</li>
          </ul>
        </section>

        <section>
          <h2>9. Data Retention</h2>
          <p>
            Since most data is stored locally in your browser:
          </p>
          <ul>
            <li>Local data persists until you clear your browser's local storage</li>
            <li>Analytics data is retained according to Mixpanel's retention policies</li>
            <li>We do not maintain long-term storage of user-specific information on our servers</li>
          </ul>
        </section>

        <section>
          <h2>10. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request information about data we collect</li>
            <li><strong>Delete:</strong> Clear your local data at any time through browser settings</li>
            <li><strong>Opt-Out:</strong> Disable analytics by using browser privacy settings or ad blockers</li>
            <li><strong>Opt-Out of Ads:</strong> Use Google Ads Settings to control personalized advertising</li>
          </ul>
        </section>

        <section>
          <h2>11. International Users</h2>
          <p>
            Our Service is operated from India. If you are accessing our Service from outside 
            India, please be aware that your information may be transferred to, stored, and 
            processed in India where our servers are located and we operate.
          </p>
        </section>

        <section>
          <h2>12. Changes to Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any 
            changes by posting the new Privacy Policy on this page and updating the "Last 
            Updated" date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes 
            to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section>
          <h2>13. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="contact-info">
            Email: <a href="mailto:learnjoyhub@gmail.com">learnjoyhub@gmail.com</a><br />
            Website: <a href="https://learnjoyhub.in">learnjoyhub.in</a>
          </p>
        </section>

        <section>
          <h2>14. Consent</h2>
          <p>
            By using our Service, you consent to our Privacy Policy and agree to its terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
