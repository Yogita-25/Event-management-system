
import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import dateFormat from 'dateformat';
var moment = require('moment');

export default class EditEvent extends Component {
  
  constructor(props){
        super(props);

        this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeDescript = this.onChangeDescript.bind(this);
    this.onChangeEventCompleted = this.onChangeEventCompleted.bind(this);
    this.onChangeVenue = this.onChangeVenue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        name: '',
        address: '',
        cost: '',
        capacity: '',
        category: '',
        start_date: '',
        end_date: '',
        website: '',
        descript: '',
        venue: '',
        event_status: 'expired'
      }
    }
    calcStatus() {
      var eStatus = '';
      var curr = moment(new Date());
      var d = moment(this.state.end_date);
      console.log('----------->', curr, d);
      var end = d.diff(curr, 'hours');
      console.log('----->', end);
  
      eStatus = (end >= 0) ? 'active' : 'expired';
      this.setState({ event_status: eStatus }, () => console.log('----->', this.state.event_status));
    }
  
    
    componentDidMount(){
        axios.get('http://localhost:4000/events/edit/'+this.props.match.params.id)
        .then(res=>{
            //console.log(res);
            this.setState({
                name: res.data.name,
                address: res.data.address,
                cost: res.data.cost,
                capacity: res.data.capacity,
                website: res.data.website,
                start_date: new Date(res.data.start_date),
                end_date: new Date(res.data.end_date),
                category: res.data.category,
                descript: res.data.descript,
                venue: res.data.venue,
                event_status: res.data.event_status
            })
        })
        .catch(function(err){
            console.log(err);
        })
    }

    onChangeName(e){
        this.setState({
            name :e.target.value
        })
    }

    onChangeDescript(e){
        this.setState({
            descript :e.target.value
        })
    }
    onChangeVenue(e){
        this.setState({
            venue :e.target.value
        })
    }
    onChangeAddress(e){
        this.setState({
            address:e.target.value
        })
    }
    onChangeCapacity(e){
        this.setState({
            capacity :e.target.value
        })

    }
    onChangeWebsite(e){
        this.setState({
            website :e.target.value
        })
    }

    onChangeStartDate(start_date) {
      this.setState({
        start_date
      })
    }
  
    onChangeEndDate(end_date) {
      this.setState({
        end_date,
  
      }, () => {
        console.log(this.state);
        this.calcStatus();
      });
    }
  

    onChangeStartTime(e){
        this.setState({
            
            start_time : e.target.value
        })
    }
    
    onChangeEndTime(e){
        this.setState({
            end_time :e.target.value
        })
    }

    onChangeCategory(e){
        this.setState({
            category :e.target.value
        })
    }
    onChangeCost(e){
        this.setState({
            cost :e.target.value
        })
    }

    onChangeEventCompleted(e){
        this.setState({
            completed:!this.state.event_completed
        })
    }
    onSubmit(e) {
        e.preventDefault();
       // console.log('onSubmit ===>', this.state);
        const obj = {
          name: this.state.name,
          address: this.state.address,
          cost: this.state.cost,
          capacity: this.state.capacity,
          descript: this.state.descript,
          venue: this.state.venue,
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          website: this.state.website,
          category: this.state.category,
          event_status: this.state.event_status      
        }

        console.log("before update:",obj);
        axios.post("http://localhost:4000/events/update/"+this.props.match.params.id,obj)
        .then(res=>console.log(res.data));
        
        this.props.history.push('/events');
    }
    render() {
        return (
            <div>
        <h3>Update the event</h3>

        <form onSubmit={this.onSubmit}>
          <div className="form-group" >
            <label> Event Name </label>
            <input type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>

          <div className="form-group" >
            <label> Description </label>
            <input type="text"
              className="form-control"
              value={this.state.descript}
              onChange={this.onChangeDescript}
            />
          </div>

          <div className="form-group" >
            <label> Venue </label>
            <input type="text"
              className="form-control"
              value={this.state.venue}
              onChange={this.onChangeVenue}
            />
          </div>

          <div className="form-group" >
            <label> Address </label>
            <input type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>

          <div className="form-group" >
            <label> Start Date </label>
            <DateTimePicker
              locale="sv-sv"
              value={this.state.start_date}
              onChange={this.onChangeStartDate}
              minDate = {new Date()}
            />
          </div>

          <div className="form-group" >

            <label> End Date </label>
            <DateTimePicker
              locale="sv-sv"
              value={this.state.end_date}
              onChange={this.onChangeEndDate}
              minDate = {new Date()}
            />
          </div>


          <div className="form-group" >
            <label> Website </label>
            <input type="text"
              className="form-control"
              value={this.state.website}
              onChange={this.onChangeWebsite}
            />
          </div>

          <div className="form-group" >
            <label> Capacity </label>
            <input type="number"
              maxLength="3"
              className="form-control"
              value={this.state.capacity}
              onChange={this.onChangeCapacity}
            />
          </div>

          <div className="form-group" >
            <label> Cost/Person </label>
            <input type="number"

              className="form-control"
              value={this.state.cost}
              onChange={this.onChangeCost}
            />
          </div>


          <FormGroup row>
            <Label sm={2}>Category</Label>
            <Col sm={10}>
              <Input type="select" name="Options" value={this.state.category} onChange={this.onChangeCategory}>
                <option>General Event</option>
                <option>Personal Event</option>
                <option>Political Event</option>
                <option>Religious Event</option>
              </Input>
            </Col>
          </FormGroup>

          <div className="form-group">
            <input type="submit"
              value="Update Event"
              className="btn btn-primary"
            />
          </div>
        </form>

      </div>
       )
    }
}

