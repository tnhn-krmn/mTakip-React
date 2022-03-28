import React from "react";
import { Navbar, Container, Nav, NavLink } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Layout = (props) => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">mTakip</Navbar.Brand>
                    <Nav className="me-auto">

                        <Nav.Link>
                            <NavLink as={Link} to="/" activeStyle={{ color: '#3f51b5', fontWeight: '600' }} >
                                <faHome />
                                <span>Anasayfa</span></NavLink>
                        </Nav.Link>

                        <Nav.Link>
                            <NavLink activeStyle={{ color: '#3f51b5', fontWeight: '600' }} as={Link} to={"/profile"}>
                                <faHome />
                                <span>Profil</span></NavLink>
                        </Nav.Link>

                        <Nav.Link>
                            <NavLink activeStyle={{ color: '#3f51b5', fontWeight: '600' }} as={Link} to={"/"}>
                                <faHome />
                                <span>Çıkış</span>
                            </NavLink>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <main style={{ marginBottom: 10 }}>
                {props.children}
            </main>
        </>
    )
}

export default Layout;