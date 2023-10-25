import { NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";

function SecondNav() {
  const x = {
   margin: '0px',
  };
  const black = {
    fontColor: 'Black',
    margin: '0px 20px',
    fontWeight: '700',
    fontSize: '25px',
    textDecoration: 'none',
  }
 
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" style={x}>
        <Navbar.Brand className="text-dark" style={black} href="/">
          
          ICE
        
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">
            
            Home
          
          </Nav.Link>
          <Nav.Link href="/home">
            Contact
            </Nav.Link>
          <NavDropdown title="Services" id="basic-nav-dropdown">
            <NavDropdown.Item href="/routine">
             
              Routine
             
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/renummeration">
              
              Renummeration
             
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/examcontrol">
             
              Exam Control
           
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
}

export default SecondNav;
