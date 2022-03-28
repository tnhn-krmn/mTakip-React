import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { observer, inject } from "mobx-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../app/config/app";
import { toJS } from "mobx";



const Layout = (props) => {

    const history = useHistory();
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect( () => {
        // console.log(toJS(props.AuthStore.appState.user));
        axios.post(`${API_URL}/api/authenticate`,{},{
            headers:{
                Authorization:'Bearer '+props.AuthStore.appState?.user?.access_token
            }
        }).then((res) => {
            // console.log(res.data.user.name)
            if (!res.data.isLoggedIn) 
            {
                history.push('/login')    
            }
            setUser(res.data.user);
            setIsLoggedIn(res.data.isLoggedIn);
        })
    },[]);

    const logout = async () => {
        await props.AuthStore.remove();
        history.push('/login');
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="#home">mTakip</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Yönetim Paneli</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/talep-olustur">
                                <Nav.Link>Talep Oluştur</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            <NavDropdown title={user.name} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Profilim</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>Çıkış</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {props.children}
        </>
    )

}



export default inject("AuthStore")(observer(Layout));
