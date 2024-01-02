import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/style.css";
import { Container } from "react-bootstrap";
import ServiceContent from "./ServiceContent";

const Service = () => {
  const go = useNavigate();

  const handleClick = (link) => {
    go(`${link}`);
  }

  return (
    <div className="service-sec">
      <h2 className="text-white text-center mb-3 mt-3">Our Services</h2>
      <p className="text-white"> We provide Routine Generation, Renumeration form making and building Exam Committee features in our website. </p>
      <Container fluid>
          <div className="service-sec-row">
          {
            ServiceContent.map((ServiceContent) => (
              <div key = {ServiceContent.id} className="service-sec-box" onClick={() => handleClick(`${ServiceContent.link}`)}>
              <div className="ser-icon">
                <svg
                  xmlns={ServiceContent.xmlns}
                  width={ServiceContent.width}
                  height={ServiceContent.width}
                  fill={ServiceContent.fill}
                  className={ServiceContent.className}
                  viewBox={ServiceContent.viewBox}
                >
                  <path d={ServiceContent.d1} />
                  <path d={ServiceContent.d2} />
                </svg>
              </div>
              <h4>{ServiceContent.n}</h4>
              <p className="card-text">
              {ServiceContent.des}
                <br />
                <br />
                <div className="service-box-btn">
                <Link to={ServiceContent.link}>
                  <button className="btn btn-primary">
                     Go to Page
                  </button>
                </Link>
                </div>
              </p>
            </div>
            ))
       }     
          </div>
      </Container>
    </div>
  );
};

export default Service;
