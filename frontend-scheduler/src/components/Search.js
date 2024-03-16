import './Search.css'
import { useState } from 'react';

const Search = ({ onSearch }) => {

    const[searchQuery, setQuery] = useState("");

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

    return (
      <div className="search">
          <input
            type='text'
            placeholder='Search for...'
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleGoButtonClick}>Search</button>

      </div>
      );
    };


export default Search