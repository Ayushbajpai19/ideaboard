import React from 'react';
import './App.css';
import MyProfile from "./MyComponents/MyProfile.js";
import ProductLaunches from "./MyComponents/ProductLaunches.js";
import Videos from "./MyComponents/Videos.js";
import Post from "./MyComponents/Post.js";
import Options from "./MyComponents/Options.js";
import Doubt from "./MyComponents/Doubt.js";
import OthersPost from "./MyComponents/OthersPost.js";
import NavBar from "./MyComponents/NavBar.js"
import Trending from "./MyComponents/Trending.js";
import WhoToFollow from "./MyComponents/WhoToFollow.js";

function App() {
  return (
    <>

  <div>
    <NavBar/>
  </div>

<div className='row'>
  <div className='column1'>
    <MyProfile />
    <ProductLaunches />
    <Videos />
  </div>
  
  <div className='column2'>
    <Post />
    <Options />
    <Doubt />
    <OthersPost />
  </div>
  
  <div className='column3'>
    <Trending />
    <WhoToFollow />
  </div>
</div>
    </>
  );
}

export default App;
