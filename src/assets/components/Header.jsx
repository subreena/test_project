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
    <>
      <div
        style={{
          marginTop: "-50px",
          maxHeight: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item interval={3000} style={{ position: "relative" }}>
            <img
              className="img-fluid"
              src={ExampleCarouselImage}
              alt=""
              style={{ maxHeight: "100vh", width: "100%" }}
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
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => handleNav("routine")}
          >
            <img
              className="img-fluid"
              src={ExampleCarouselImage}
              alt=""
              style={{ maxHeight: "100vh", width: "100%" }}
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
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => handleNav("remuneration")}
          >
            <img
              className="img-fluid"
              src={ExampleCarouselImage}
              alt=""
              style={{ maxHeight: "100vh", width: "100%" }}
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
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => handleNav("examcontrol")}
          >
            <img
              className="img-fluid"
              src={ExampleCarouselImage}
              alt=""
              style={{ maxHeight: "100vh", width: "100%" }}
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
        </Carousel>
      </div>
    </>
  );
};

export default Header;
