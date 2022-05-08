import React,{useState} from 'react'
import './Trending.css'
import Card from "react-bootstrap/Card";


export default function Trending() {
  const [trending,setTrending] = useState('Trending in the USA');
  const [tag,setTag] = useState('#SQUID');
  const [tweets,setTweets] = useState('1,066 Tweets');

  return (
    <>
      <Card className='trending'>
      <Card.Body>
      <Card.Title className='trend'>Trending</Card.Title>

      <Card.Text className='ding'>
        <h4> {trending} </h4>
        <h3> {tag} </h3> 
        <p1> {tweets} </p1>
      </Card.Text>

      </Card.Body>
      </Card>
    </>
  )
}
