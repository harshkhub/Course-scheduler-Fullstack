import './Home.css'
import { Link } from 'react-router-dom'
import test1 from '../assets/test1.mp4';
import React, { useEffect, useRef } from 'react';


const Home = () => {
    const videoRef = useRef(null);

    const startVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    useEffect(() => {
        document.querySelector('video').playbackRate = 1.5;
    }, []);


    return(
        <div className='home-container'>
            <h1>Calendarize your USC classes in seconds!</h1>
            <h2>Our web app supports the Marshall school of business for Fall 2024!</h2>
            <Link to='/search' className='button'>Get started</Link>
            <video ref={videoRef} autoPlay loop muted className='video-element'>
                <source src={test1} type="video/mp4"/>
                Your browser does not support this video tag.
            </video>
        </div>
    )
}

export default Home