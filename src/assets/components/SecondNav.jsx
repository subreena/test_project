import { Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../../assets/images/copilot_logo.webp";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../pages/login/firebase";

function SecondNav() {
  const [isScrolled, setIsScrolled] = useState(false);

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
      })
      .catch((error) => {
        console.error("Error in sign out", error);
      });
  };

  const [userVerified, setUserVerified] = useState(null);
  const [userState, setUserState] = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUserVerified(user);
        setUserState(user);
      } else {
        setUserVerified(null);
        setUserState(null);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once

  return (
    <>
      <div style={{ position: "relative" }}>
        <Navbar
          data-bs-theme="light"
          className={`second-nav ${isScrolled ? "scrolled" : ""}`}
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

                <NavDropdown
                  title="Services"
                  id="basic-nav-dropdown"
                  className="second-nav-item second-nav-dropdown"
                >
                  <NavDropdown.Item href="/routine">Routine</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/renummeration">
                    Renummeration
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/examcontrol">
                    Exam Control
                  </NavDropdown.Item>
                </NavDropdown>

                {userVerified ? (
                  <Nav.Link onClick={handleLogout} className="second-nav-item ">
                    Log Out
                  </Nav.Link>
                ) : (
                  <div>
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
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default SecondNav;
