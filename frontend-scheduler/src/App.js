import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Data from './components/Data'
import Home from './components/Home'
import { FaCalendar } from 'react-icons/fa';
import Calendar from './components/Calendar'

function App() {
  return (
    <>
    <Routes> {/* Use BrowserRouter as the root router */}
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home />}/>
        <Route path="search" element={<Search/>}/>
        <Route path="data" element={<Data/>}/>
        <Route path='calendar' element={<Calendar/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
