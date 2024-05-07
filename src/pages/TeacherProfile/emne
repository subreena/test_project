import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/style.css";
import { Container } from "react-bootstrap";
import ServiceContent from "./ServiceContent";

const Service = () => {
  const go = useNavigate();

  const handleClick = (link) => {
    go(`${link}`);
  };
  return (
    <>
      <div className="service-sec">
        <h2 className="text-white text-center mb-3 mt-3">Our Services</h2>
        <p className="text-white">
          {" "}
          We provide Routine Generation, Renumeration form making and building
          Exam Committee features in our website.{" "}
        </p>
        <Container fluid>
          <div className="service-sec-row">
            {ServiceContent.map((ServiceContent) => (
              <div className="service-sec-box-total" key={ServiceContent.id}>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <div
                        className="service-sec-box"
                        onClick={() => handleClick(`${ServiceContent.link}`)}
                      >
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
                        <div style={{ height: "110px" }}>
                          <h4 className="card-title">{ServiceContent.n}</h4>
                          <br />
                          <p className="card-text">{ServiceContent.des}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <div>
                        <Link to={ServiceContent.link}>
                          <button className="flip-btn">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="50"
                              height="50"
                              fill="currentColor"
                              className="bi bi-arrow-right-circle"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                              />
                            </svg>{" "}
                            <br /> <br />
                            <span>Go to Page</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
          <Link to="/alldocuments">
         <button className="btn btn-success w-50 cursor-pointer">
          All Documents
         </button>
         </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Service;
