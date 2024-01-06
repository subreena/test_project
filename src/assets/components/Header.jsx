import { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../images/img1.jpg";

import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TypedText from "./TypedText";

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
  return (
    <Container>
      <div style={{ maxHeight: "90vh", margin: "10px", width: "100%" }}>
        <Carousel activeIndex={index} onSelect={handleSelect} >
          <Carousel.Item interval={3000} 
          style={{ position: "relative", marginTop: "10px" }} >
            <img
              src={ExampleCarouselImage}
              alt=""
              style={{ maxHeight: "90vh", width: "100%" }}
            />
            <Carousel.Caption
              style={{ left: "0" }}
              className={`carousel-caption ${isScrolled ? "scrolled" : ""}`}
            >
              <h3>
                <TypedText strings={["Teacher CoPilot"]} />
              </h3>
              <p className="text-capitalize">
                An initiative to Simplify and Digitize Hectic Manual Tasks for the Architects of our Nation
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={2000}
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => handleNav("routine")}
          >
            <img
              src={ExampleCarouselImage}
              alt=""
              style={{ maxHeight: "90vh", width: "100%" }}
            />
            <Carousel.Caption
              style={{ left: "0" }}
              className={`carousel-caption ${isScrolled ? "scrolled" : ""}`}
            >
              <h5>The services we provide: </h5>
              <h3>
                <TypedText strings={["^100 Routine Generator"]} />
              </h3>
              <p>
                We have tried to make the hectic process of routine making
                digital. You can click to check out.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => handleNav("remuneration")}
          >
            <img
              src={ExampleCarouselImage}
              alt=""
              style={{ maxHeight: "90vh", width: "100%" }}
            />
            <Carousel.Caption
              style={{ left: "0" }}
              className={`carousel-caption ${isScrolled ? "scrolled" : ""}`}
            >
              <h5>The services we provide: </h5>
              <h3>
                <TypedText strings={["^100 Remuneration"]} />
              </h3>
              <p>
                We have tried to make the process of Remuneration application
                digital. You can click to check out.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => handleNav("examcontrol")}
          >
            <img
              src={ExampleCarouselImage}
              alt=""
              style={{ maxHeight: "90vh", width: "100%" }}
            />
            <Carousel.Caption
              style={{ left: "0" }}
              className={`carousel-caption ${isScrolled ? "scrolled" : ""}`}
            > 
              <h5>The services we provide: </h5>
              <h3>
                <TypedText strings={[" ^100 Exam Committee"]} />
              </h3>
              <p>
                We have tried to make the process of exam committee making
                digital. You can click to check out.{" "}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </Container>
  );
};

export default Header;
