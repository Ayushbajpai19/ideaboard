import React,{useState} from 'react'
import './OthersPost.css'
import { Card } from 'react-bootstrap'

export default function OthersPost() {
  const [name,setName] = useState('Jim Harper');
    const [post,setPost] = useState("I'm not sure this is the best way to tell the story");
  return (
  
  <div className='othersPost'>
      <Card body>
      
      <div id='states'>
       
        <div>
        <div className='image-conta'> 
          <img src="https://buffer.com/library/content/images/2022/03/amina.png" alt='' height="100px" width="100px"/>
        </div>
	    	</div>

			  <div>
            <div className='lower-contain'>
            <h3> {name} </h3>
            <p1> {post} </p1>
           </div>
	      </div>
      </div>

      </Card>
    </div>
  )
}
