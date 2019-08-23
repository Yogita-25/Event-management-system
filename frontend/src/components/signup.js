import React,{Component} from 'react';
import { Col,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default class Register extends Component{
constructor() {
  super();
  this.state = {
    fields: {},
    errors: {}
  };
};

handleChange = e => {
  let fields = this.state.fields;
  fields[e.target.name] = e.target.value;
  this.setState({
    fields
  });
}

submituserRegistrationForm = e => {
  e.preventDefault();
  let output =this.validateRegistration();

  if (output["formIsValid"]) {
      
      const newUser = {
        u_name :output.fields.username,
        u_email : output.fields.emailid,
        u_password : output.fields.password
        
    }
    alert("Registration successful");
      console.log(newUser);
      axios.post("http://localhost:4000/users/add",newUser)
      .then(res=>{
        if(res.data.user){
          this.props.history.push('/login')
      }
    
        else{
          alert("email already exists!!!");
        }
    })
            
  }
}

validateRegistration = _ =>{

let fields = this.state.fields;
let errors = {};
let result = {
  fields : fields,
  formIsValid : true
}

  if (!result.fields["username"]) {
    result["formIsValid"] = false;
    errors["username"] = "*Please enter your name";
  }

  if (typeof result.fields["username"] !== "undefined") {
    if (!result.fields["username"].match(/^[a-zA-Z ]*$/)) {
      result["formIsValid"] = false;
      errors["username"] = "*Please enter alphabet characters only";
    }
  }

  if (!result.fields["emailid"]) {
    result["formIsValid"] = false;
    errors["emailid"] = "*Please enter your email-ID";
  }

  if (typeof result.fields["emailid"] !== "undefined") {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(result.fields["emailid"])) {
      result["formIsValid"] = false;
      errors["emailid"] = "*Please enter valid email-ID";
    }
  }

  if (!result.fields["mobileno"]) {
    result["formIsValid"] = false;
    errors["mobileno"] = "*Please enter your mobile no";
  }

  if (typeof result.fields["mobileno"] !== "undefined") {
    if (!result.fields["mobileno"].match(/^[0-9]{10}$/)) {
      result["formIsValid"] = false;
      errors["mobileno"] = "*Please enter valid mobile no";
    }
  }

  if (!result.fields["password"]) {
    result["formIsValid"] = false;
    errors["password"] = "*Please enter your password";
  }

  if (typeof result.fields["password"] !== "undefined") {
    if (!result.fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
      result["formIsValid"] = false;
      errors["password"] = "*Please enter secure and strong password";
    }
  }

  if (!result.fields["organisation"]) {
    result["formIsValid"] = false;
    errors["organisation"] = "*Please enter organisation name";
  }

  if (!result.fields["confirmpass"]) {
    result["formIsValid"] = false;
    errors["confirmpass"] = "*Please enter your password";
  }else if(result.fields["confirmpass"]!== result.fields["password"]){
    result["formIsValid"] = false;
    errors["confirmpass"] = "*Password does not match";
  }

  this.setState({
    errors: errors
  });
  return result;
}

render(){
return (
<Form className="text-center" name="userRegistrationForm" onSubmit= {this.submituserRegistrationForm}>
  <FormGroup row>
    <Label sm={2}>Name</Label>
    <Col sm={10}>
      <Input  type="text" name="username" onChange={this.handleChange}/> 
      <span className="errorMsg">{this.state.errors.username}</span>
    </Col>
  </FormGroup>

  <FormGroup row>
    <Label sm={2}>Organisation</Label>
    <Col sm={10}>
      <Input name="organisation" onChange={this.handleChange}/>
      <span className="errorMsg">{this.state.errors.organisation}</span>
    </Col>
  </FormGroup>

  <FormGroup row>
    <Label sm={2} >Email</Label>
    <Col sm={10}>
      <Input type="text" name="emailid" onChange={this.handleChange}/>
      <span className="errorMsg">{this.state.errors.emailid}</span>
    </Col>
  </FormGroup>

  <FormGroup row>
    <Label sm={2}>Phone</Label>
    <Col sm={10}>
      <Input type="text" name="mobileno" onChange={this.handleChange}/>
      <span className="errorMsg">{this.state.errors.mobileno}</span>
    </Col>
  </FormGroup>

  <FormGroup row>
    <Label sm={2}>Password</Label>
    <Col sm={10}>
      <Input type="password" name="password" onChange={this.handleChange}/>
      <span className="errorMsg">{this.state.errors.password}</span>
    </Col>
  </FormGroup>

  <FormGroup row>
    <Label sm={2}>Confirm Password</Label>
    <Col sm={10}>
     <Input type="password" name="confirmpass" onChange={this.handleChange}/>
     <span className="errorMsg">{this.state.errors.confirmpass}</span>
    </Col>
  </FormGroup>
  
  <Button>Register</Button>
</Form>
); 
}
}