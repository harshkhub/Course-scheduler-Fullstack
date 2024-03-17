import './Home.css'
import { Link } from 'react-router-dom'
import test from '../assets/test.mp4';
import React, { useRef } from 'react';


const Home = () => {
    const videoRef = useRef(null);

    const startVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };


    return(
        <div className='home-container'>
            <h1>Schedule your USC classes in seconds!</h1>
            <h2>Our web app supports the Marshall school of business for Fall 2024!</h2>
            <Link to='/search' className='button'>Get started</Link>
            <video ref={videoRef} autoPlay loop muted className='video-element'>
                <source src={test} type='video/mp4'/>
                Your browser does not support this video tag.
            </video>
        </div>
    )
}

export default Home