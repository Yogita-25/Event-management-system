import React, {Component} from 'react';
import {Input } from 'reactstrap';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

export default class CreateEvent extends Component{
      constructor(props){
        super(props);
        this.state = {
            name:'',
            descript:'',
            category:'',
            start_date:new Date(),
            end_date:new Date(),
            capacity:'',
            cost:'',
            website:'',
            address:'' ,
            check:true,
            event_status:'expired'  
        }

        this.onchangeEventName = this.onchangeEventName.bind(this);
        this.onchangeEventDescript = this.onchangeEventDescript.bind(this);
        this.onchangeEventVenue= this.onchangeEventVenue.bind(this);
        this.onchangeEventAddress = this.onchangeEventAddress.bind(this);
        this.onchangeEventStart =this.onchangeEventStart.bind(this);
        this.onchangeEventEnd = this.onchangeEventEnd.bind(this);
        this.onchangeEventWebsite = this.onchangeEventWebsite.bind(this);
        this.onchangeEventCapacity = this.onchangeEventCapacity.bind(this);   
        this.onchangeEventCost = this.onchangeEventCost.bind(this);
        this.onchangeEventCategory = this.onchangeEventCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }

    componentDidMount(){
        if(!localStorage.getItem('token')){
          alert("User Not Logged In!!!")
          this.props.history.push('/login')
        }
      }

    calcStatus() {
        var eStatus;
        var curr=moment(new Date());
        var d = moment(this.state.end_date);
        console.log('----------->', curr, d);
        var end=d.diff(curr,'hours');
        console.log('----->', end);

        eStatus = (end >= 0) ? 'active' : 'expired';
        this.setState({
            event_status:eStatus
     });
    } 

    onchangeEventName(e){
        this.setState({
               name:e.target.value
        });
    }

    onchangeEventDescript(e){
        this.setState({
               descript:e.target.value
        });
    }

    onchangeEventVenue(e){
      this.setState({
        venue:e.target.value
      });    
    }

    onchangeEventAddress(e){
      this.setState({
             address:e.target.value
      });
   } 

    onchangeEventStart (e){
        this.setState({
            start_date:e
        }, () => {
            console.log(this.state);            
        });
    } 
    
    onchangeEventEnd(e){
     this.setState({
               end_date:e,
        }, () => {
            console.log(this.state); 
           this.calcStatus();           
        });
    } 

    onchangeEventWebsite(e){
      this.setState({
             website:e.target.value
      });
  } 
  
    onchangeEventCapacity(e){
            this.setState({
                   capacity:e.target.value
            });
        } 
        
    onchangeEventCost(e){
            this.setState({
                   cost:e.target.value
            });
        } 

        onchangeEventCategory(e){
          this.setState({
                     category:e.target.value 
              });
          } 
        
    onSubmit(e){
            e.preventDefault();

            const event = {
                name :this.state.name,
                start_date:this.state.start_date,
                end_date:this.state.end_date,
                venue:this.state.venue,
                descript :this.state.descript,
                address : this.state.address,
                website:this.state.website,
                category:this.state.category,
                capacity : this.state.capacity,
                event_status:this.state.event_status,
                cost : this.state.cost
            }

                      console.log(event);
                      if(!localStorage.getItem('token')){
                        alert("user not Logged In!!!")
                        this.props.history.push('/login')
            
                    }
                      else{
                        axios({
                          method: 'post',
                          url: 'http://localhost:4000/events/reg',
                          headers: {       
                             'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                          },
                          data:{
                            name :this.state.name,
                            start_date:this.state.start_date,
                            end_date:this.state.end_date,
                            venue:this.state.venue,
                            descript :this.state.descript,
                            address : this.state.address,
                            website:this.state.website,
                            category:this.state.category,
                            capacity : this.state.capacity,
                            event_status:this.state.event_status,
                            cost : this.state.cost
                                      }
                        })
                          .then(res=>console.log(res.data));
                      this.props.history.push('/events');           
                      }
            
        }   
     
    render(){
        return (
            <div >
                <h5> Create an event </h5>

                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group" >
                        <label> Event Name </label>
                        <input type = "text"
                            className = "form-control"
                            value = {this.state.name}
                            onChange = {this.onchangeEventName}
                            required
                        />
                    </div>

                    <div className = "form-group" >
                        <label> Description </label>
                        <input type = "text"
                            className = "form-control"
                            value = {this.state.descript}
                            onChange = {this.onchangeEventDescript}
                        />
                    </div> 

                    <div className = "form-group" >
                        <label> Venue </label>
                        <input type = "text"
                            className = "form-control"
                            value = {this.state.venue}
                            onChange = {this.onchangeEventVenue}
                            required
                        />
                    </div>

                    <div className = "form-group" >
                        <label> Address </label>
                        <input type = "text"
                            className = "form-control"
                            value = {this.state.address}
                            onChange = {this.onchangeEventAddress}
                            required
                        />
                    </div> 

                    <div className = "form-group" >
                    
                    <label> Start Date</label>
                  
                    <DateTimePicker
                    locale="sv-sv"
                   onChange = {this.onchangeEventStart}
                   value = {this.state.start_date}
                   minDate = {new Date()}
                />
                </div>

                <div className = "form-group" >
                
                    <label> End Date and  </label>
                  
                     <DateTimePicker
                     locale="sv-sv"
                       onChange = {this.onchangeEventEnd}
                      value = {this.state.end_date}
                      minDate = {new Date()}
                      
                />
                <span>For one day event enter end date as start date</span>
                </div>

                <div className = "form-group" >
                        <label> Website </label>
                        <input type = "text"
                            className = "form-control"
                            value = {this.state.website}
                            onChange = {this.onchangeEventWebsite}
                            required
                        />
                    </div> 
                
              
                    <div className = "form-group" >
                        <label> Capacity </label>
                            <input type = "number"
                            maxlength = "3"
                            className = "form-control"
                            value = {this.state.capacity}
                            onChange = {this.onchangeEventCapacity}
                            required
                        />
                    </div> 

                    <div className = "form-group" >
                        <label> Cost </label>
                        <input type = "number"
 
                            className = "form-control"
                            value = {this.state.cost}
                            onChange = {this.onchangeEventCost}
                            required
                        />
                    </div>
             
                    <div className = "form-group" >
                        <label> Category </label>
            

                    <Input type="select" name = "Options" value = {this.state.category} onChange = {this.onchangeEventCategory}  required>
                         <option>General Event</option>
                         <option>Personal Event</option>
                         <option>Political Event</option>
                         <option>Religious Event</option>
                       </Input>
                      </div>
                    
                    <div className = "form-group">
                        <input type = "submit" 
                        value = "Create Event"
                        className = "btn btn-primary"
                        /> 

                    </div>
                </form>
                
            </div>        
            )
    }

    } 