import React,{Component} from 'react';
import {Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../index.css';


class Login extends Component{
  
    constructor(props) {
      super(props);
      this.state = {
        fields: {},
        errors: {}
      }
    };

    handleChange = e => {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });
    }
      
    submituserLoginForm = e => {
      e.preventDefault();
      let output =this.validateLogin();

      if (output["formIsValid"]) {
        var tmpObject={
          u_email:output.fields.emailid,
          u_password:output.fields.password,
        }

        
        axios.post("http://localhost:4000/users/check",tmpObject)
        
        .then(res => {
          if(res.data.success== true){
            localStorage.setItem('token', res.data.token)

            console.log(localStorage.getItem('token'))

            if(localStorage.getItem('token'))
            {
              this.props.history.push('/events')
            }}

        else{
          alert("Invalid Credentials");
          
        }
      })
     }
    }

    validateLogin = _ =>{
    
     let fields = this.state.fields;
     let errors = {};
     let result = {
       fields : fields,
      formIsValid : true
     };
    

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

     if (!result.fields["password"]) {
      result["formIsValid"] = false;
      errors["password"] = "*Please enter your password";
     }
    
     this.setState({
      errors: errors
     });

     return result;
    }

   render(){
    return (
        <Form className="text-center"> 
            <FormGroup row>
              <Label sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" name="emailid" onChange={this.handleChange} required/>
                <span className="errorMsg">{this.state.errors.emailid}</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}>Password</Label>
              <Col sm={10}>
                <Input type="password" name="password" onChange={this.handleChange} required/>
                <span className="errorMsg">{this.state.errors.password}</span>
              </Col>
            </FormGroup>
            <Col sm={7}>
     
            <Button onClick={this.submituserLoginForm}>Login</Button>
            </Col>
          
            <span><br></br><br></br>
                Not a member ?
                
            </span>
            <Col sm={7}>
            <Button onClick={()=>{this.props.history.push('/signup');}}>SignUp</Button> 
            </Col>    
        </Form>
      );
   }
}

export default Login;