import { useState } from 'react';
import Menu from '../../Components/Menu/Menu';
import TopBar from '../../Components/Topbar/Topbar';
import Footer from '../../Components/Footer/Footer';
import { Container } from 'react-bootstrap';
import './FAQ.scss';

const FAQ = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='terms-and-condition'>
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Container className='container'>
        <h1>F.A.Q</h1>

        <h4>General Questions</h4>

        <section>
          <h4>1. Q: What is Nollywoodcv?</h4>
          <p>
          A: Nollywoodcv is a platform for Nollywood professionals to showcase their skills, 
          experience, and filmography, making it easier for potential employers, collaborators, 
          and industry professionals to find and assess their qualifications.
          </p>
        </section>

        <section>
          <h4>2. Q: How do I create an account?</h4>
          <p>
          A: To create an account, click on "Sign Up" and follow the registration process, 
          providing the required information.
          </p>
        </section>

        <section>
          <h4>3.  Q: Is Nollywoodcv free to use?</h4>
          <p>
          A: Nollywoodcv offers both free and paid plans, with varying features and benefits.
          </p>
        </section>

        <h4>Profile and Visibility</h4>

        <section>
          <h4>1. Q: What information can I include in my profile?</h4>
          <p>A: You can include details such as:</p>
          <ul>
            <li>- Full name</li>
            <li>- Professional summary</li>
            <li>- Age</li>
            <li>- Location</li>
            <li>- Headshot</li>
            <li>- State of origin</li>
            <li>- Languages</li>
            <li>- Complexion</li>
            <li>- Height</li>
            <li>- Skills</li>
            <li>- Filmography (including list of films, roles, production companies, dates, and links)</li>
            <li>- Links to social media profiles</li>
            <li>- Email address</li>
            <li>- Phone number</li>
            <li>- Education</li>
            <li>- Awards</li>
          </ul>
        </section>

        <section>
          <h4>2. Q: Will my profile be visible to others?</h4>
          <p>
          A: With an active subscription, your profile will be visible to potential employers, 
          collaborators, and industry professionals. However, even without an active subscription, 
          your profile will still be visible to others, albeit with limited information restricted 
          to what's available on your bio.
          </p>
        </section>

        <h4>Subscription and Payment</h4>

        <section>
          <h4>1. Q: What are the benefits of a paid subscription?</h4>
          <p>A: A paid subscription unlocks premium features, including:</p>
          <ul>
            <li>- Detailed filmography</li>
            <li>- Social media links</li>
            <li>- Professional summary</li>
            <li>- Skills and education</li>
            <li>- Awards and recognition</li>
          </ul>
        </section>

        <section>
          <h4>2. Q: How do I upgrade to a paid subscription?</h4>
          <p>
          A: To upgrade your CV, click on "User CV" and follow the prompts to 
          choose your subscription plan and complete the payment process.
          </p>
        </section>

        <section>
          <h4>3. Q: What happens if I don't renew my subscription?</h4>
          <p>
            A: Your profile will revert to the free plan features, 
            and only basic information such as your full name, age, location, 
            and job description will be visible.
          </p>
        </section>

        <h4>Paid Plan Features</h4>

        <section>
          <h4>1. Q: What features are available on the paid plan?</h4>
          <p>
          A: The paid plan includes premium features such as:
          </p>
          <ul>
            <li>- Full name</li>
            <li>- Professional summary</li>
            <li>- Age</li>
            <li>- Location</li>
            <li>- Headshot</li>
            <li>- State of origin</li>
            <li>- Languages</li>
            <li>- Complexion</li>
            <li>- Height</li>
            <li>- Skills</li>
            <li>- Filmography (including list of films, roles, production companies, dates, and links)</li>
            <li>- Links to social media profiles</li>
            <li>- Email address</li>
            <li>- Phone number</li>
            <li>- Education</li>
            <li>- Awards</li>
          </ul>
        </section>

        <h4>Technical Issues</h4>

        <section>
          <h4>1. Q: How do I reset my password?</h4>
          <p>A: Click on "Forgot Password" and follow the instructions to reset your password.</p>
        </section>

        <section>
          <h4>2. Q: Who do I contact for technical support?</h4>
          <p>
          A: Reach out to our support team through the "Customer Support" page, 
          and we'll be happy to assist you.
          </p>
        </section>

        <h4>Other Questions</h4>

        <section>
          <h4>1. Q: How do I update my profile information?</h4>
          <p>
          A: Log in to your account, click on "Edit Profile," and make the necessary changes.
          </p>
        </section>

        <section>
          <h4>2. Q: Can I showcase my work on Nollywoodcv.com?</h4>
          <p>
          A: Yes, you can showcase your filmography and other projects on your profile, 
          making it easier for potential employers and collaborators to find and assess your qualifications.
          </p>
          <p>
            For more questions not listed here, contact Customer support
          </p>
        </section>
      </Container>
      <Footer />
    </div>
  );
};

export default FAQ;
