import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  let f = {
    background: "linear-gradient(to right,#0d6efd ,  #0d6efd, #4d8cff )",
    padding: "20px 10px 0 10px",
    width: "100%",
  };
  return (
    <footer id="footer" style={f}>
      <Container style={{ display: "block" }}>
        <div className="row footer-lists-part">
          <div className="col-lg-3 col-sm-6">
            <h5 className="text-white">Our Services</h5>
            <ul className="footer-list">
              <li>
                <Link className="footer-list-li" to="/routine">
                  Routine Generator
                </Link>
              </li>
              <li>
                <Link className="footer-list-li" to="/remuneration">
                  Remuneration
                </Link>
              </li>
              <li>
                <Link className="footer-list-li" to="/examcontrol">
                  Exam Committee
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6">
            <h5 className="text-white">Login</h5>
            <ul className="footer-list">
              <li>
                <Link className="footer-list-li" to="/teacher">
                  Login as Teacher
                </Link>
              </li>
              <li>
                <Link className="footer-list-li" to="/student">
                  Login as Student
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6">
            <h5 className="text-white">Other Details</h5>
            <ul className="footer-list">
              <li>
                <Link to="/teacherdetails" className="footer-list-li">Teacher Details</Link>
              </li>
              <li>
                <Link className="footer-list-li" to="/coursedetails">
                  Course Details
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-sm-6 pt-3">
            
            <h5 className="text-white">Contact Information</h5>
            <ul className="footer-list">
              <li className="footer-list-li ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-telephone"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg>{" "}  &nbsp;
                PHONE: +88-0321-72720
              </li>
              <li className="footer-list-li">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>{" "} &nbsp;
                EMAIL: <span style={{textTransform:"lowercase"}}>info@nstu.edu.bd</span>
              </li>
            <li>
            <li className="footer-list-li">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-house-door"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                </svg>{" "}  &nbsp;
                POSTAL CODE: 3814
              </li>
            </li>
            </ul>
          </div>
        </div>

        <div className="row footer-copyright">
          <div className="col-lg-6 col-sm-12">
            <p className="text-white  mt-3 text-center ">
              {" "}
              <span> Copyright © 2023 | ICE, NSTU | All Rights Reserved</span>
            </p>
          </div>
          <div className="col-lg-6 col-sm-12">
            <p className="text-white text-center mt-3 ">
              {" "}
              Developed By: &nbsp;{" "}
              <Link to="/team" className="link-underline link-underline-opacity-0 ">
              <span className="text-bold text-light ">
                {" "}
                Md. Sabbir Ejaz, Sajib Barua and Subreena
              </span>
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
