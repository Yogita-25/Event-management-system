import React, { Component } from 'react';
import homeImage from './event-image.jpg';
import './style.css';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <img src={homeImage} alt="EventManagement" />
            </div>
        );
    }
}

export default Home;