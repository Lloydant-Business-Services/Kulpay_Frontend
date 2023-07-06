import React from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "../redux/actions";
import Logo from "../assets/images/home/logo.png";
import {userLoggedIn} from "../utils/auth";
import {
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
} from "reactstrap";
import * as Unicons from "@iconscout/react-unicons/index";


const FrontHeader = (props) => {
    
    return (
        <Navbar className="navbar-top navbar-horizontal navbar-light bg-lighter" expand="md" >
            <Container className="px-4">
                <NavbarBrand to="/" tag={Link}>
                    <img src={Logo} alt="" style={{height:50}}/>
                    <span> e-Learn NG</span>
                </NavbarBrand>
            
                <button className="navbar-toggler" id="navbar-collapse-main">
                    <span className="navbar-toggler-icon" />
                </button>
            
                <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
                
                    <div className="navbar-collapse-header">
                        <Row>
                            <Col className="collapse-brand" xs="8">
                                <Link to="/">
                                    <img src={Logo} alt="" style={{height:50}}/>
                                    <span> e-Learn NG</span>
                                </Link>
                            </Col>
                        
                            <Col className="collapse-close" xs="4">
                                <button className="navbar-toggler" id="navbar-collapse-main" >
                                    <span />
                                    <span />
                                </button>
                            </Col>
                        </Row>
                    </div>
                
                    <Nav className="ml-auto" navbar>
                        <NavItem className='ml-3'>
                            {
                                userLoggedIn() ?
                                    <NavLink className="nav-link-icon" to="/login" tag={Link} >
                                        <Unicons.UilApps size="20"/>
                                        <span className="nav-link-inner--text">Dashboard</span>
                                    </NavLink>
                                    :
                                    <NavLink className="nav-link-icon" to="/login" tag={Link} >
                                        <Unicons.UilKeySkeleton size="20"/>
                                        <span className="nav-link-inner--text">Login</span>
                                    </NavLink>
                            }
                        </NavItem>
                    </Nav>
                </UncontrolledCollapse>
            </Container>
        </Navbar>

    )
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontHeader);
