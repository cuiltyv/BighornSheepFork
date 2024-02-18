import Conatiner from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <Navbar bg="light" expand="lg">
            <Conatiner>
                <Navbar.Brand as={Link} to="/">Pagina de Superheroes</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/superhero-name">Generador de nombres</Nav.Link>
                        <Nav.Link as={Link} to="/store">Tienda</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Conatiner>
        </Navbar>
    )
}

export default Navigation;