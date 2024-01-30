import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/style.css";
import nstusmall from "../../assets/images/nstu-logo-small.png";
import { Nav, Navbar } from "react-bootstrap";

const MiniNav = () => {
  return (
    <>
      <Navbar expand="lg" data-bs-theme="light" className="p-2">
        <div className="container-fluid d-flex justify-content-center">
          <Nav>
            <img
              src={nstusmall}
              alt=""
              className="image-fluid"
              style={{
                margin: "0 20px 0 20px",
                maxWidth: "100%",
                height: "50px",
                maxHeight: "auto",
              }}
            />
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default MiniNav;
