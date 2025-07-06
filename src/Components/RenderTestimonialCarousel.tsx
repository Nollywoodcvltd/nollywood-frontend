import { Carousel } from 'react-bootstrap';
import { useState } from 'react';

const RenderTestimonialCarousel = () => {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      name: 'Jay Goshioha',
      text: 'Nollywood CV has completely transformed my journey in the film industry. The platform’s user-friendly interface and professional presentation made it easy for casting directors to notice my profile, leading to my first major role!',
      img: '/assets/Peter_Chika.png',
    },
    {
      name: 'Henry Chukz',
      text: 'This platform is amazing! It helped me connect with industry professionals in no time.',
      img: '/assets/John_Doe.png',
    },
    {
      name: 'Chinaza Ojri',
      text: 'Highly recommended for anyone looking to make an impact in the film industry!',
      img: '/assets/Mabel_Okoro.png',
    },
  ];

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div
      className='text-center p-4'
      style={{ position: 'relative', minHeight: '350px' }}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        controls={false}
        interval={null}
      >
        {testimonials.map((testimonial, idx) => (
          <Carousel.Item key={idx}>
            <div>
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className='rounded-circle mb-3'
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <p className='text-muted testimonial-text'>{testimonial.text}</p>
              <strong className='testimonial-owner'>{testimonial.name}</strong>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div
        className='d-flex justify-content-center mt-3'
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'fit-content',
        }}
      >
        {testimonials.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setIndex(idx)}
            className={`mx-1 ${
              index === idx ? 'bg-warning' : 'rounded-circle'
            }`}
            style={{
              width: index === idx ? 24 : 12,
              borderRadius: index === idx ? 20 : undefined,
              height: 12,
              cursor: 'pointer',
              display: 'inline-block',
              backgroundColor: 'grey',
              borderWidth: '1px',
              borderColor: 'black',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RenderTestimonialCarousel;
