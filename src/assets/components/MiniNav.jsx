import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/style.css";
import { Link } from "react-router-dom";

const MiniNav = () => {
  const x = {
    margin: "0px",
  };
  return (
    <>
      <div className="mini-nav white-text" style={x}>
        <ul className="d-flex flex-row-reverse" style={x}>
          <li className="mini-nav-item">
            <Link to="/teacher" className="white-text">
              Login as Teacher
            </Link>
          </li>
          <li className="mini-nav-item">
            <Link to="/student" className="white-text">
              Login as Student
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MiniNav;
