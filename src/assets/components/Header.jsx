
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../images/img1.jpg';

import { Container } from 'react-bootstrap';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
    return (
       <Container>
        <div style={{maxHeight: '90vh', margin: '10px', width: '100%',}}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item style={{position: 'relative', marginTop: '10px'}}>
       <img src={ExampleCarouselImage} alt="" style={{maxHeight: '90vh', width: '100%'}}/>
        <Carousel.Caption style={{left: "0"}} className={`carousel-caption ${isScrolled ? 'scrolled' : ''}`}>
          <h2><strong>Teacher CoPilot</strong></h2>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{position: 'relative'}}>
        <img src={ExampleCarouselImage} alt="" style={{maxHeight: '90vh', width: '100%'}}/>
        <Carousel.Caption style={{left: "0"}} className={`carousel-caption ${isScrolled ? 'scrolled' : ''}`}>
            <h5>The services we provide: </h5>
          <h3>Routine Generator</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{position: 'relative'}}>
       <img src={ExampleCarouselImage} alt="" style={{maxHeight: '90vh', width: '100%'}} />
        <Carousel.Caption style={{left: "0"}} className={`carousel-caption ${isScrolled ? 'scrolled' : ''}`}>
        <h5>The services we provide: </h5>
          <h3>Remuneration</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{position: 'relative'}}>
       <img src={ExampleCarouselImage} alt="" style={{maxHeight: '90vh', width: '100%'}}/>
        <Carousel.Caption style={{left: "0"}} className={`carousel-caption ${isScrolled ? 'scrolled' : ''}`}>
        <h5>The services we provide: </h5>
          <h3>Exam Comittee</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
       </div>
       </Container>
    );
};

export default Header;