import { Container } from 'react-bootstrap';
import './PrivacyPolicy.scss';
import { useState } from 'react';
import Menu from '../../Components/Menu/Menu';
import TopBar from '../../Components/Topbar/Topbar';
import Footer from '../../Components/Footer/Footer';

const PrivacyPolicy = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='privacy-policy'>
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Container className='container'>
        <h1>Privacy Policy</h1>

        <section>
          <p className='effective-date'>
            <strong>Effective Date:</strong> (27th March 2025)
          </p>

          <p className='effective-date'>
            NollywoodCV.com is committed to protecting intellectual property
            rights and maintaining the integrity of content shared on our
            platform. We do not tolerate any form of piracy or unauthorized use
            of copyrighted materials. This policy outlines our approach to
            preventing and addressing piracy on NollywoodCV.com.
          </p>
        </section>

        <section>
          <h4>1. Definition of Privacy</h4>
          <p>Privacy includes, but is not limited to:</p>
          <ul>
            <li>
              - Uploading, sharing, or distributing copyrighted content without
              proper authorization or ownership.
            </li>
            <li>
              - Using or displaying content from NollywoodCV.com without the
              permission of its rightful owner or the platform.
            </li>
            <li>
              - Downloading, copying, or redistributing materials found on the
              platform for personal or commercial use without consent.
            </li>
          </ul>
        </section>

        <section>
          <h4>2. User Responsibilities</h4>
          <ul>
            <li>
              - Users are solely responsible for ensuring that any content they
              upload or share on NollywoodCV.com does not violate copyright laws
              or infringe on the rights of others.
            </li>
            <li>
              - By uploading content, users confirm that they either own the
              content or have obtained all necessary permissions to share it.
            </li>
          </ul>
        </section>

        <section>
          <h4>3. Prohibited Activities</h4>
          <p>
            The following activities are strictly prohibited on NollywoodCV.com:
          </p>
          <ul>
            <li>
              - Uploading films, scripts, videos, or other works that you do not
              own or have explicit rights to use.
            </li>
            <li>
              - Downloading, copying, or redistributing materials from other
              users without their consent.
            </li>
            <li>
              Circumventing digital rights management (DRM) measures or security
              features to access or use content unlawfully.
            </li>
          </ul>
        </section>

        <section>
          <h4>4. Reporting Privacy</h4>
          <p>
            If you believe that content on NollywoodCV.com infringes your
            copyright or the rights of another party, you may submit a report by
            following these steps:
          </p>
          <ul>
            <li>
              1. Contact us at [Insert Contact Email] with the subject line
              "Privacy Report."
            </li>
            <li>2. Provide the following details:</li>
            <li>Description of the copyrighted work allegedly infringed.</li>
            <li>
              The URL or specific location of the infringing content on the
              platform.
            </li>
            <li>Evidence of ownership or authorization to use the work.</li>
            <li>Your contact information.</li>
          </ul>
          <p>
            NollywoodCV.com will investigate all piracy claims promptly and take
            appropriate action, including removing the infringing content if
            verified.
          </p>
        </section>

        <section>
          <h4>5. Consequences of Violating the Privacy Policy</h4>
          <p>
            Users found to be violating this policy may face the following
            actions:
          </p>
          <ul>
            <li>- Immediate removal of infringing content.</li>
            <li>- Suspension or termination of the user’s account.</li>
            <li>
              - Legal action if necessary, including reporting to appropriate
              authorities.
            </li>
          </ul>
        </section>

        <section>
          <h4>6. Protection of Content on NollywoodCV.com</h4>
          <ul>
            <li>
              - NollywoodCV.com uses technical measures to protect content
              uploaded to the platform from unauthorized access or distribution.
            </li>
            <li>
              - Users are encouraged to watermark sensitive materials and take
              additional precautions to protect their intellectual property
            </li>
          </ul>
        </section>

        <section>
          <h4>7. No Tolerance Policy</h4>
          <p>
            NollywoodCV.com has a zero-tolerance policy toward piracy. Repeat
            offenders will be permanently banned from the platform
          </p>
        </section>

        <section>
          <h4>8. Disclaimer</h4>
          <p>
            NollywoodCV.com has a zero-tolerance policy toward Privacy. Repeat
            offenders will be permanently banned from the platform
          </p>
        </section>

        <section>
          <p>
            By using NollywoodCV.com, you agree to comply with this Privacy
            policy. If you have any concerns or need assistance, please contact
            us at (hello@nollywoodcv.com).
          </p>
        </section>
      </Container>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
