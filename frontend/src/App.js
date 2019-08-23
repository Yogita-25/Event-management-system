import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';

import CreateEvent from "./components/create-event";
import EventsList from "./components/display-events";
import EditEvent from "./components/edit-event";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";


class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {

    return (
      <Router>
        <div className="container">

          <Navbar color="light" light expand="md">
            <NavbarBrand target="_blank">
              <b>Event Management System</b></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/"><b>Home</b></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login"><b>Login</b></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/events"><b>Events</b></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/create"><b>Add Event</b></NavLink>
                </NavItem>

              </Nav>
            </Collapse>
          </Navbar>

          <Route path="/" exact component={Home} />
          <Route path="/events" exact component={EventsList} />
          <Route path="/edit/:id" exact component={EditEvent} />
          <Route path="/login" exact component={Login} />
          <Route path="/create" exact component={CreateEvent} />
          <Route path="/signup" exact exact component={Signup} />
        </div>
      </Router>
    );
  }
}

export default App;