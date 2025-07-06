import './Footer.scss';

const Footer = () => {
  const footerLinks = [
    {
      id: 1,
      title: 'News',
      link: '/#',
      // link: '/news',
      target: '_self',
    },
    {
      id: 2,
      title: 'How it Works',
      link: '/How-it-Works',
      // link: '/how it works',
      target: '_self',
    },
    {
      id: 3,
      title: 'Pricing',
      link: '/#',
      // link: '/pricing',
      target: '_self',
    },
    {
      id: 4,
      title: 'About Us',
      link: '/about-us',
      target: '_self',
    },
    {
      id: 5,
      title: 'WhatsApp',
      link: 'https://wa.me/+2348050533253',
      target: '_blank',
    },
    {
      id: 6,
      title: 'Instagram',
      link: 'https://www.instagram.com/nollywoodcv?igsh=dGQyZXR6Z2NmZG9o',
      target: '_blank',
    },
    {
      id: 7,
      title: 'Facebook',
      link: 'https://www.facebook.com/share/15xThfFkou/',
      target: '_blank',
    },
    {
      id: 8,
      title: 'X',
      link: 'https://X.com/Nollywoodcv.com',
      target: '_blank',
    },
    {
      id: 9,
      title: 'Terms and Conditions',
      link: '/terms-and-conditions',
      target: '_self',
    },
    {
      id: 10,
      title: 'Privacy Policy',
      link: '/privacy-policy',
      target: '_self',
    },
  ];
  return (
    <div className='footer'>
      <a href='/' className='logo-box'>
        <p className='title'>Nollywoodcv.</p>
        <p className='title highlight'>com</p>
      </a>
      <div className='footer-options-box'>
        {footerLinks.map((link) => (
          <a key={link.id} target={link.target} href={link.link}>
            {link.title}
          </a>
        ))}
        {/* {footerLinks.map((link) => (
          <a key={link.id} target={link.target} href={link.link}>
            {link.title}
          </a>
        ))} */}
        <a></a>
        <a></a>
      </div>
      <div className='link-box'>
        <p>
          &copy; 2025{' '}
          <a className='link' href='https://NollywoodCV.com'>
            NollywoodCV.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
