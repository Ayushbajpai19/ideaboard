import React,{useState} from 'react'
import './MyProfile.css'

function MyProfile() {

  const [name,setName] = useState('Mark Zuckerberg');
  const [username,setUserName] = useState('@merty');
  const [about,setAbout] = useState('Well-versed in software tools including HTML, JavaScript, CSS, BackBone and JQuery, among others.');

  return (
    <div className='myprofile'>
      <div className='upper-container'>
        <div className='image-container'> 
          <img src="https://www.eyerys.com/sites/default/files/mark_zuckerberg.jpg" alt='' height="100px" width="100px"/>
        </div>
      </div>

  <div className='lower-container'>
    <h3> {name} </h3>
    <h4> {username} </h4> 
    <p1> {about} </p1>
  </div>

  <hr className='new1'/>
  
    <div id="stats">
      <div className='col'>
      <p className='label'>Followers</p>
      <p className='stat'>345</p>
	  	</div>
			<div className='col'>
        <p className='label'>Following</p>
		  	<p className='stat'>229</p>
	   	</div>
    </div>

    <p><button>My Profile</button></p>
  </div>
  )
}

export default MyProfile