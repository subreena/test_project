import { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img6.jpg";

import { CarouselItem, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TypedText from "./TypedText";
import MiniNav from './MiniNav';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const nav1 = useNavigate();

  const handleNav = (l) => {
    nav1(`/${l}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const divStyle ={
    marginTop: "-50px",
   height: "90vh",
    width: "100%",
    overflow: "hidden",
  }
  const CarouselItemStyle = {
    position: "relative", 
    cursor: "pointer"
  }

  const carouseSlideStyle = {
    height: "90vh",
    width: "100%",
    objectFit: "cover",
  }
  return (
    <>
      <div
        style={divStyle}
      >
    <MiniNav></MiniNav>
        <Carousel activeIndex={index} onSelect={handleSelect} className="vh-100">
      
          <Carousel.Item interval={3000} style={CarouselItemStyle}>
            <img
              className="img-fluid"
              src={img1}
              alt=""
              style={carouseSlideStyle}
            />
            <Carousel.Caption
              style={{ left: "0" }}
              className={`carousel-caption ${isScrolled ? "scrolled" : ""}`}
            >
              <h1 className="fs-1 text-bold">
                <TypedText strings={["Teacher CoPilot"]} />
              </h1>
              <p className="text-capitalize lead fs-5">
                An initiative to Simplify and Digitize Hectic Manual Tasks for
                the Architects of our Nation
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item
            interval={2000}
            style={CarouselItemStyle}
            onClick={() => handleNav("routine")}
          >
            <img
              className="img-fluid"
              src={img2}
              alt=""
              style={carouseSlideStyle}
            />
            <Carousel.Caption
              style={{ left: "0" }}
              className={`carousel-caption ${isScrolled ? "scrolled" : ""}`}
            >
              <p className="lead fs-6">The services we provide: </p>
              <h2 className="fs-1">
                <TypedText strings={["^10 Routine Generator"]} />
              </h2>
              <p className="lead fs-5">
                We have tried to make the hectic process of routine making
                digital. You can click to check out.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item
            interval={2000}
            style={CarouselItemStyle}
            onClick={() => handleNav("remuneration")}
          >
            <img
              className="img-fluid"
              src={img3}
              alt=""
              style={carouseSlideStyle}
            />
            <Carousel.Caption
              style={{ left: "0" }}
              className={`carousel-caption ${isScrolled ? "scrolled" : ""}`}
            >
              <p className="lead fs-6">The services we provide: </p>
              <h2 className="fs-1">
                <TypedText strings={["^10 Remuneration"]} />
              </h2>
              <p className="lead fs-5 ">
                We have tried to make the process of Remuneration application
                digital. You can click to check out.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item
            interval={2000}
            style={CarouselItemStyle}
            onClick={() => handleNav("examcontrol")}
          >
            <img
              className="img-fluid"
              src={img4}
              alt=""
              style={carouseSlideStyle}
            />
            <Carousel.Caption
              style={{ left: "0" }}
              className={`carousel-caption ${isScrolled ? "scrolled" : ""}`}
            >
              <p className="lead fs-6">The services we provide: </p>
              <h2 className="fs-1">
                <TypedText strings={[" ^10 Exam Committee"]} />
              </h2>
              <p className="lead fs-5">
                We have tried to make the process of exam committee making
                digital. You can click to check out.{" "}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000} 
            onClick={() => handleNav("team")}
          style={CarouselItemStyle}>
            <img
              className="img-fluid"
              src={img5}
              alt=""
              style={carouseSlideStyle}

            />
            <Carousel.Caption
              style={{ left: "0" }}
            
              className={`carousel-caption ${isScrolled ? "scrolled" : ""}`}
            >
              <h3 className="fs-1 text-bold">
              Information and Communication Engineering, <br /> </h3>
              <h4>
              Noakhali Science and Technology University
              </h4>
              
              <p className="text-capitalize lead fs-5">
                A project by Md. Sabbir Ejaz, Sajib Barua and Subreena
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Header;
