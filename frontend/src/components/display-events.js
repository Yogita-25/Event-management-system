import React, {Component} from 'react';
import { runInThisContext } from 'vm';
import axios from 'axios';
import {Link}  from 'react-router-dom';
import { UncontrolledDropdown,Button , DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Table } from 'reactstrap';
var moment = require('moment');

const Event = props=> (
    <tr>
        <td className={props.event.event_completed ? 'completed' : ''}>{props.event.name}</td>
          <td className={props.event.event_completed ? 'completed' : ''}>{moment.utc(props.event.start_date).format("DD/MM/YYYY")}</td>
        <td className={props.event.event_completed ? 'completed' : ''}>{moment.utc(props.event.end_date).format("DD/MM/YYYY")}</td>
       <td className={props.event.event_completed ? 'completed' : ''}>{moment(props.event.start_date).local().format('HH:mm')}</td>
        <td className={props.event.event_completed ? 'completed' : ''}>{moment(props.event.end_date).local().format('HH:mm')}</td> 
        <td className={props.event.event_completed ? 'completed' : ''}>{props.event.category}</td>
        <td className={props.event.event_completed ? 'completed' : ''}>{props.event.venue}</td>
        <td className = {props.event.event_completed ? 'completed':''}>{props.event.address}</td>
        <td className={props.event.event_completed ? 'completed' : ''}>{props.event.event_status}</td>
        <td className = {props.event.event_completed ? 'completed':''}>{props.event.capacity}</td>
        <td className = {props.event.event_completed ? 'completed':''}>{props.event.cost}</td>
        <td>
            <Link to={"/edit/"+props.event._id}>Edit</Link>
            <button onClick={() => props.onDelete(props.event._id)}>delete</button>

        </td>

    </tr>
)

class EventsList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            events: []
        }
        // this.handleDelete=this.handleDelete.bind(this)
    }

    
    handleDelete = (id) => {
        console.log('ID---------', id);
        axios.delete('http://localhost:4000/events/del/'+id)
        .then(res => {
            console.log(res.data);
         })
         .then(this.props.history.push('/events'))

    }

       componentDidMount(){
        if(!localStorage.getItem('token')){
            alert("User Not Logged In!!!")
            this.props.history.push('/login')
        }

        else{
        axios({
            method: 'get',
            url: 'http://localhost:4000/events/geti',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
            .then(response => {
                this.setState({events:response.data});
            })
            .catch(error => {
              console.log(error);
            });
        }
    }

    eventList = () => {
        return this.state.events.map((curretEvent,i) => {
            return <Event event = {curretEvent} key = {i} onDelete={this.handleDelete}/>;
        })
    }

    render()
    {
        return(
            <div>

                <Button onClick={()=>{
                    localStorage.removeItem('token');
                    this.props.history.push('/');

                }}>Log Out</Button>

                <Table striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>StartDate</th>
                            <th>EndDate</th>
                            <th>StartTime</th>
                            <th>EndTime</th>
                            <th>Category</th>
                            <th>Venue</th>
                            <th>Address </th>
                            <th>Status</th>
                            <th>Capacity</th>
                            <th>Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.length !== 0 && this.eventList()}
                    </tbody>
                </Table>
            </div>
        )
    }
} 

export default EventsList;
