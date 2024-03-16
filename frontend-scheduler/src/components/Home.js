import './Home.css'
import { Link } from 'react-router-dom'


const Home = () => {

    return(
        <div className='home-container'>
            <h1>Hello, welcome to USC class scheduler</h1>
            <Link to='/search' className='button'>Search for classes</Link>
        </div>
    )
}

export default Home