import { Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../../assets/images/copilot_logo.webp";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { signOut } from "firebase/auth";
import { auth } from "../../pages/login/firebase";
import { Link } from "react-router-dom";

function SecondNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [teacher, setTeacher] = useState(null);
  const [userState, setUserState] = useContext(UserContext);

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
        localStorage.removeItem('user');
        localStorage.removeItem('teacher');
      })
      .catch((error) => {
        console.error("Error in sign out", error);
      });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleDropdownClick = (flag) => {
    if(flag === 1) setIsOpen(!isOpen);
    if(flag === 2) setIsProfileOpen(!isProfileOpen);

    console.log(flag);
  };

  const handleLinkClick = (flag) => {
    if(flag === 1) setIsOpen(false); // Close the dropdown after a link is clicked
    if(flag === 2) setIsProfileOpen(!isProfileOpen);

    console.log(flag);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('teacher'));
    console.log(data);
    setTeacher(data);
  }, []);

  return (
    <>
      <div style={{ position: "relative", marginTop: "100px"}}>
        <Navbar
          data-bs-theme="light"
          className={`fixed-top second-nav ${isScrolled ? "scrolled" : ""}`}
        >
          <Container fluid>
            <Navbar.Brand
              className="second-nav-item text-dark "
              style={black}
              href="/"
            >
              <img
                src={logo}
                alt="logo"
                style={{ width: "40px", height: "40px", marginRight: "5px" }}
              />
              Teacher CoPilot
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="">
                <Nav.Link href="/" className="second-nav-item ">
                  Home
                </Nav.Link>
                <Nav.Link href="/home" className="second-nav-item ">
                  Contact
                </Nav.Link>
                <Nav.Link href="/team" className="second-nav-item">
                  Our Team
                </Nav.Link>

                <NavDropdown 
                title="Services" 
                id="basic-nav-dropdown" 
                className="second-nav-item second-nav-dropdown" 
                show={isOpen} onClick={() => handleDropdownClick(1)}
                >
                  <Link to="/routine" className="dropdown-item" onClick={() => handleLinkClick(1)}>
                    Routine
                  </Link>

                  <NavDropdown.Divider />

                  <Link to="/remuneration" className="dropdown-item" onClick={() => handleLinkClick(1)}>
                    Remuneration
                  </Link>

                  <NavDropdown.Divider />

                  <Link to="/examcontrol" className="dropdown-item" onClick={() => handleLinkClick(1)}>
                    Exam Committee
                  </Link>
                </NavDropdown>
                { userState ? (
                  <></>
                ) : (
                  <div className="d-flex">
                    <NavDropdown
                      title="Login"
                      id="basic-nav-dropdown"
                      className=" second-nav-item"
                    >
                      <NavDropdown.Item href="/teacher">
                        Login as Teacher
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/student">
                        Login as Student
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}
              </Nav>
              {
                userState ? (
                  <NavDropdown 
                    title={`${teacher?.firstName} ${teacher?.lastName}`} 
                    id="basic-nav-dropdown" 
                    className="second-nav-item" 
                    style={{ marginLeft: "auto", marginRight: "0px" }}
                    show={isProfileOpen} onClick={() => handleDropdownClick(2)}
                  >
                    <Link to="/profile" className="dropdown-item" onClick={() => handleLinkClick(2)}>
                      Profile
                    </Link>
                    
                    <NavDropdown.Divider />

                    <NavDropdown.Item onClick={handleLogout} className="dropdown-item">
                      Log Out
                    </NavDropdown.Item>
                </NavDropdown>
                ) : (
                  <></>
                )
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default SecondNav;
