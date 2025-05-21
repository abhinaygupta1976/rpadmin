import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const RootHeader = () => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login", {
      state: {
        previousUrl:
          location.pathname == "/" || location.pathname == "/home"
            ? "/admin/dashboard"
            : location.pathname,
      },
    });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-dark">
      <Container fluid>
        <Navbar.Brand href="#">RealProperties</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {loggedIn ? (
              <>
                <Nav.Link href="/admin/dashboard">Home</Nav.Link>
                <NavDropdown title="Directory" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/admin/directory/country">
                    Country
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/directory/state">
                    State
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/directory/city">
                    City
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                {/* <Logout /> */}
              </>
            ) : (
              <>
                <Nav.Link to="/">Home</Nav.Link>
                <Nav.Link to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
