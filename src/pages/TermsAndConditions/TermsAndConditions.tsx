import { useState } from 'react';
import Menu from '../../Components/Menu/Menu';
import TopBar from '../../Components/Topbar/Topbar';
import Footer from '../../Components/Footer/Footer';
import { Container } from 'react-bootstrap';
import './TermsAndConditions.scss';

const TermsAndConditions = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='terms-and-condition'>
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Container className='container'>
        <h1>Terms and Conditions</h1>
        <p className='latest-update'>
          <strong>Latest update:</strong> (27th March 2025)
        </p>

        <section>
          <h4>1. Acceptance of Terms</h4>
          <p>
            By creating an account or using NollywoodCV.com, you agree to these
            Terms and Conditions. If you do not agree, you may not use the
            platform. NollywoodCV.com reserves the right to update these terms
            at any time. Users will be notified of significant changes.
          </p>
        </section>

        <section>
          <h4>2. User Eligibility</h4>
          <ul>
            <li>
              - You must be at least 13 years old or have parental/guardian
              consent to use this platform.
            </li>
            <li>
              - By signing up, you confirm that all information provided is
              accurate, complete, and up to date.
            </li>
          </ul>
        </section>

        <section>
          <h4>3. Use of Submitted Content</h4>
          <p>
            When you upload content (such as images, CV details, or any other
            materials), you grant NollywoodCV.com the following rights:
          </p>
          <ul>
            <strong>1. Promotional Use:</strong>
            <li>
              -NollywoodCV.com has the right to use, edit, and display submitted
              content in promotional materials, advertisements, or other
              marketing efforts without requiring additional permissions or
              compensation.
            </li>
            <li>
              -This includes, but is not limited to, social media ads,
              newsletters, and other online/offline promotions
            </li>
            <strong>2. Public Display:</strong>
            <li>
              - Submitted profile details and images may be displayed on public
              profiles to help users connect with opportunities in Nollywood.
            </li>
            <strong>3. Ownership:</strong>
            <li>
              - Users retain ownership of their uploaded content but grant
              NollywoodCV.com a worldwide, royalty-free, non-exclusive license
              to use the content as outlined.
            </li>
          </ul>
        </section>

        <section>
          <h4>4. Prohibited Activities</h4>
          <p>You agree not to:</p>
          <ul>
            <li>
              Upload content that violates any laws or infringes on the rights
              of others.
            </li>
            <li>Share false or misleading information.</li>
            <li>
              Use the platform for unlawful purposes, including harassment,
              spam, or fraud.
            </li>
          </ul>
        </section>

        <section>
          <h4>5. Account Responsibilities</h4>
          <p>
            Users are responsible for maintaining the confidentiality of their
            account credentials. NollywoodCV.com must be notified immediately if
            unauthorized account use is suspected.
          </p>
        </section>

        <section>
          <h4>6. Privacy</h4>
          <ul>
            <li>
              - NollywoodCV.com collects and processes user data in line with
              its Privacy Policy.
            </li>
            <li>
              - Contact details will never be shared without consent, except as
              required by law.
            </li>
          </ul>
        </section>

        <section>
          <h4>7. Termination</h4>
          <p>
            NollywoodCV.com reserves the right to suspend or terminate user
            accounts for breaches of these terms or engagement in prohibited
            activities.
          </p>
        </section>

        <section>
          <h4>8. Liability</h4>
          <ul>
            <li>
              - NollywoodCV.com does not guarantee job placements or
              opportunities.
            </li>
            <li>
              - The platform is not responsible for third-party misuse of
              publicly visible information.
            </li>
          </ul>
        </section>

        <section>
          <h4>9. Changes to Terms</h4>
          <p>
            NollywoodCV.com may update these Terms and Conditions at any time.
            You are responsible for reviewing the latest version periodically.
            Continued platform use constitutes acceptance of changes.
          </p>
        </section>

        <section>
          <h4>10. Governing Law</h4>
          <p>
            These Terms and Conditions are governed by the laws of the Federal
            Republic of Nigeria.
          </p>
        </section>

        <section>
          <h4>Agreement</h4>
          <p>
            By signing up for NollywoodCV.com, you confirm that you have read,
            understood, and agree to these Terms and Conditions.
          </p>
          <p>For questions, contact us at (hello@nollywoodcv.com).</p>
        </section>
      </Container>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
