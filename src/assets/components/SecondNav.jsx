import { Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../../assets/images/copilot_logo.webp";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { signOut } from "firebase/auth";
import { auth } from "../../pages/login/firebase";

function SecondNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [teacher, setTeacher] = useState(null);
  const [userState, setUserState] = useContext(UserContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const black = {
    fontColor: "Black",
    margin: "0px 20px",
    fontWeight: "700",
    fontSize: "25px",
    textDecoration: "none",
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
        setUserState(false);
        localStorage.removeItem("user");
        localStorage.removeItem("teacher");
      })
      .catch((error) => {
        console.error("Error in sign out", error);
      });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teacher"));
    setTeacher(data);
    console.log(data);
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        <Navbar
          expand="lg"
          data-bs-theme="light"
          className={`second-nav ${isScrolled ? "scrolled" : ""}`}
        >
          <Container fluid>
            <div className="second-nav-logo">
              <Navbar.Brand
                className="second-nav-item text-dark"
                style={black}
                href="/home"
              >
                <img
                  src={logo}
                  alt="logo"
                  className="image-fluid"
                  style={{ width: "40px", height: "40px", marginRight: "5px" }}
                />
                Teacher CoPilot
              </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="">
                <Nav.Link href="/" className="second-nav-item text-sm-center">
                  Home
                </Nav.Link>

                <Nav.Link
                  href="/routine"
                  className="second-nav-item text-sm-center"
                >
                  Routine
                </Nav.Link>

                <NavDropdown
                  title="Exam Related Services"
                  id="basic-nav-dropdown"
                  className="second-nav-dropdown text-sm-center"
                >
                  <NavDropdown
                    title="Exam Routine"
                    id="basic-nav-dropdown"
                    className=""
                  >
                    <NavDropdown.Item href="/theory-exam-routine">
                      {" "}
                      Theory
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/lab-exam-routine">
                      {" "}
                      Lab{" "}
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown.Divider />
                  <NavDropdown
                    title="Exam Duty Roaster"
                    id="basic-nav-dropdown"
                    className=""
                  >
                    <NavDropdown.Item href="/theory-duty-roaster">
                      {" "}
                      Theory
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/lab-duty-roaster">
                      {" "}
                      Lab{" "}
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/examcontrol"
                    >
                      {" "}
                    Exam Committee
                    </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Remuneration"
                  id="basic-nav-dropdown"
                  className="second-nav-dropdown text-sm-center"
                >
                  <NavDropdown.Item href="/travelbilling">
                    {" "}
                    Travel Billing{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/exambillingfront">
                    {" "}
                    Exam Billing{" "}
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/alldocuments" className="second-nav-item text-sm-center">
                 All Documents
                </Nav.Link>
              </Nav>
              {userState ? (
                <NavDropdown
                  title={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="29"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                      />
                    </svg>
                  }
                  id="basic-nav-dropdown"
                  className="second-nav-item second-nav-dropdown text-sm-center"
                  align={{ lg: "end" }}
                  style={{ marginLeft: "auto", marginRight: "10px" }}
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown
                  title="Login"
                  id="basic-nav-dropdown"
                  className="second-nav-item second-nav-dropdown text-sm-center"
                  align={{ lg: "end" }}
                  style={{ marginLeft: "auto", marginRight: "10px" }}
                >
                  <NavDropdown.Item href="/login">
                    Log in as Teacher
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/signup">
                    Sign up as Teacher
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default SecondNav;
