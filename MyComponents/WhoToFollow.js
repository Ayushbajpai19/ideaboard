import React,{useState} from 'react'
import './WhoToFollow.css'
import Card from "react-bootstrap/Card";

export default function WhoToFollow() {

  const [name,setName] = useState('Mert Karabay');
  const [username,setUserName] = useState('@mcuth');

  return (
    <>
    <Card className='whotofollow'>
    <Card.Body>
    <Card.Title className='whoto'>Who To Follow</Card.Title>

    <Card.Text className='tofollow'>

    <div id='stat'>
      <div className='colo'>
        <div className='image-con'>
       <img src="https://www.freecodecamp.org/news/content/images/2021/03/Quincy-Larson-photo.jpg" alt='' height="100px" width="100px"/>  
       </div>
	  	</div>
			<div className='colo'>
      <div className='follow'>
      <h3> {name} </h3> 
      <h4> {username} </h4>
    </div> 
        <p><button>Follow</button></p>
	   	</div>
    </div>
     
    
    </Card.Text>

    </Card.Body>
    </Card>
  </>
  )
}
