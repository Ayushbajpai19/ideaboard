import React from 'react'
import './Post.css'
import Card from "react-bootstrap/Card";
import { CardGroup, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function Post() {
  return (
    <div className='post'>
      <Card body>
      <div id='states'>
        <div>
          <div className='image-conta'>
           <img src="https://www.eyerys.com/sites/default/files/mark_zuckerberg.jpg" alt='' height="100px" width="100px"/>  
          </div>
	    	</div>
			  <div>
          <ListGroupItem className='poppin'>
             Whats Poppin?
          </ListGroupItem>
	      	</div>
      </div>
      
      <p><butto>Share</butto></p>
      </Card>
    </div>
  )
}
