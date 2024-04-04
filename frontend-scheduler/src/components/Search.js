import './Search.css'
import { useState } from 'react';

const Search = ({ onSearch }) => {

    const[searchQuery, setQuery] = useState("");
    const[selectedOption, setOption] = useState('Change semester');
    const[selectedSchool, setSchool] = useState('Change school')

    const handleInputChange = (event) =>{
      setQuery(event.target.value);
    }

    const handleKeyDown = (event) =>{
      if(event.key == "Enter"){
        handleGoButtonClick();
      }
    }
    const handleGoButtonClick = () => {  
      setTimeout(() => {
        window.location.href = `/data?name=${encodeURIComponent(searchQuery)}`;
      }, 1000);
    };

    const handleOptionChange = (event) =>{
      setOption(event.target.value)
    }

    const handleSchoolChange = (event) =>{
      setSchool(event.target.value)
    }

    return (
      <div className="search">
        <h1>Search</h1>
        <h3 style={{textAlign:'left'}}>Add your semester and school to make the search more specific. Either use your course name (Eg: BUAD 280) 
        or your section number (Eg: 14472D).Once you are satisfied export it to your personal calendar!
        </h3>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Change semester</option>
            <option value="fall 2024">Fall 2024</option>
            <option value="more">More semesters coming soon!</option>
          </select>
          <select value={selectedSchool} onChange={handleSchoolChange}>
            <option value="">Change school</option>
            <option value="marshall">Marshall School of business</option>

          </select>
          <input
            type='text'
            placeholder='Search for classes...'
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className='narrow'
          />
          <button onClick={handleGoButtonClick}>Search</button>

      </div>
      );
    };


export default Search