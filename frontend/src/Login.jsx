import React from 'react'; 
import { Card, Button, Form,InputGroup } from 'react-bootstrap';
import Mailicon from '../Assets/Mailicon.png'
import passwordlock from '../Assets/passwordlock.png'
import orange from '../Assets/orange.png'
import blue from '../Assets/blue.png'
import green from '../Assets/green.png'
import hrlogo from '../Assets/hrlogo.png'
import 'bootstrap/dist/css/bootstrap.min.css'


function Login() {
    
    const handleSubmitButton = (event)=> {
        console.log(event);
    }


    return (
         <div className='d-flex col-10 align-text-bottom justify-content-end myauto' alt="main" style={{paddingTop:"10rem", position:"absolute"}}>
         <Card style={{border:"none"}}>
            <Card.Body>
                <Card.Text>Welcome Back</Card.Text>
                <Card.Title>Login to your Account!!</Card.Title>
                 <Form style={{width:"20rem"}}>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label><InputGroup>
                    <Form.Control type="email" placeholder="Enter email" style={{zIndex:1,position:"relative"}} />
                    <InputGroup.Text> <img src={Mailicon} alt="Mailicon"/>  </InputGroup.Text>
                    </InputGroup>  </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
            <Form.Control type="password" placeholder="Password" style={{zIndex:1,position:"relative"}}/>
            <InputGroup.Text> <img src={passwordlock} alt="password"/>  </InputGroup.Text></InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" style={{fontSize:"0.8rem"}}/>
            <p style={{fontSize:"0.8rem"}}>Forgot Password?</p>
        </Form.Group>
       
        <div className='d-grid gap-2'>
            <Button variant='primary' onClick={handleSubmitButton} style={{backgroundColor:"orange", border:"none",zIndex:1, position:"relative"}}>
                Login Now
            </Button>
            Dont have an account? Sign up Today
        </div>
        <br></br>
        </Form>
            </Card.Body>
            </Card>
        <img src={hrlogo} class="hrlogo" alt="hrlogo" style={{width:"28rem",height: "6.25rem",left:"6.25rem",top: "15rem",position:"absolute"}}/> 
        <img src={orange} class="orange" alt="orange"/>
        <img src={green} class="green" alt="green"/> 
        <img src={blue} class="blue" alt="blue"/>         
             </div>
  )
}

export default Login