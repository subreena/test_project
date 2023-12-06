import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  let f = {

    backgroundColor: "#0d6efd",
    marginTop: "20px",
    padding: "20px 10px 0 10px",
    width: "100%",
   
  };
  return (
    <footer id="footer" style={f}>
      <Container  style={{ display: "block" }}>
        <div className="row footer-lists-part">
          <div className="col-lg-4 col-sm-12">
            <h5 className="text-white">Our Services</h5>
            <ul className="footer-list">
              <li>
                <Link className="footer-list-li" to="/routine">
                  Routine Generator
                </Link>
              </li>
              <li>
                <Link className="footer-list-li" to="/renummeration">
                  Renummeration
                </Link>
              </li>
              <li>
                <Link className="footer-list-li" to="examcontrol">
                  Exam Control
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-sm-12">
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
          <div className="col-lg-4 col-sm-12">
            <h5 className="text-white">Other Details</h5>
            <ul className="footer-list">
              <li>
                <Link className="footer-list-li">Teacher Details</Link>
              </li>
              <li>
                <Link className="footer-list-li" to="/coursedetails">
                  Course Details
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row footer-copyright">
          <div className="col-lg-6 col-sm-12">
            <p className="text-white  mt-3 ">
              {" "}
              <span> Copyright © 2023 | ICE, NSTU | All Rights Reserved</span>
            </p>
          </div>
          <div className="col-lg-6 col-sm-12">
            <p className="text-white text-center mt-3 ">
              {" "}
              Developed By: &nbsp; <span className="text-bold"> Md. Sabbir Ejaz, Sajib Barua and Subreena</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
