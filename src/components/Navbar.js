import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavbarHeader({search, setSearch, searchRecipes}) {
    const navigate = useNavigate();
    const handleSearch = () => {
        searchRecipes(search);
        navigate('/');
    }
      return (
        <div className="navbar-header-custom">
          {['sm'].map((expand) => (
            <Navbar key={expand} bg="light" expand={expand} className="mb-3">
              <Container fluid>
                <Navbar.Brand>{<Link to="/">NutriMate</Link>}</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      NutriMate
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link href="/">Meal Planning</Nav.Link>
                      <Nav.Link>{<Link to="/savedrecipes">Saved Recipes</Link>}</Nav.Link>
                      <NavDropdown
                        title="Recipes"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item href="#action3">Browse</NavDropdown.Item>
                        <NavDropdown.Item>
                          {<Link to="/myfeed">My Feed</Link>}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action5">
                          Popular Recipes
                        </NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link>{<Link to="/about">About Us</Link>}</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <Button variant="outline-success" onClick={handleSearch}>Search</Button>
                    </Form>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </div>
      );
    }
    

export default NavbarHeader;