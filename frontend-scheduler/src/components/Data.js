import { useEffect, useState } from 'react'
import './Data.css'
import './Search.js'
import { Link } from 'react-router-dom'

const Data = () =>{

   const[courses, setCourses] = useState([]);
   const[selectedcourse, setSelection] = useState(new Set());
   const[calendarCourses, setCalendarCourses] = useState([]);
   const[searchQuery, setQuery] = useState("");
   const[hasTime, setHasTime] = useState(false)

   const handleInputChange = (event) =>{
    setQuery(event.target.value);
   }

   const handleGoButtonClick =() =>{
    setTimeout(() => {
        window.location.href = `/data/?name=${encodeURIComponent(searchQuery)}`;
    }, 1000);
   }

   const handleKeyDown = (event) =>{

    if (event.key == "Enter"){
        handleGoButtonClick();
    }
   }





   useEffect(() =>{

    const getCourses = async (searchQuery) =>{
        
        try{
            const response = await fetch(`http://localhost:8080/api/course?courseNum=${encodeURIComponent(searchQuery)}`);
            const data = await response.json()
            setCourses(data);
        } catch(error){
            console.error("Error fetching courses", error)
        }

    }

    const getCoursesBySection = async (searchQuery) =>{
        
        try{
            const response = await fetch(`http://localhost:8080/api/course/section?sectionNum=${encodeURIComponent(searchQuery)}`);
            const data = await response.json()
            setCourses(data);
        } catch(error){
            console.error("Error fetching courses", error)
        }

    }


    const params = new URLSearchParams(window.location.search)

    const courseNum = params.get('name');
    console.log(courseNum);
    const substring = courseNum.substring(0,3);
    console.log(substring);

    if (/^\d+$/.test(substring)){
        console.log(substring)
        getCoursesBySection(courseNum)
    }
    else{
        getCourses(courseNum);
    }

    console.log(localStorage.getItem('calendar').length);



   }, []);



   const handleAddtolist = (course) =>{

    setCalendarCourses((prevCourses) => {
        const calendarNew = [...prevCourses, course];
        setSelection((prevAdded) => new Set([...prevAdded, course.courseKey]));
        localStorage.setItem('calendar', JSON.stringify(calendarNew));
        return calendarNew;
    });

    
  
    
   }

   const handleRemove = (course) =>{
    setSelection(((prevAdded) => {
        const newCourse = new Set(prevAdded);
        newCourse.delete(course.sectionNum);
        return newCourse;
    }))

   }

   const generateMapUrl = (roomName) =>{
    const substring = roomName.substring(0,3);

        return `https://maps.usc.edu/?id=1928#!ct/53723,53722,55414,55415,55418?s/${encodeURIComponent(substring)}`;

   }

   const handleLocation = (name) =>{
    const url = generateMapUrl(name);
    window.open(url,'_blank');
   }

    return(
        
        <div className='table-container'>
            
            <Link to='/calendar' className='calendar-view'> View calendar</Link>
            <button onClick={handleGoButtonClick} className='section-btn'>Search</button>
            {courses.length === 0 ? (<h1>No classes found for the given search. Please search again!</h1>): 
            <table>
                <thead>
                    <tr>
                        <th>Course title</th>
                        <th>Course name</th>
                        <th>Section number</th>
                        <th>Units</th>
                        <th>Course type</th>
                        <th>Duration</th>
                        <th>Days</th>
                        <th>Instructor name</th>
                        <th>Location</th>
                        <th>Calendar</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course =>(
                        <tr key={`${course.courseNum}-${course.sectionNum}`}>
                            <td>{course.courseNum}</td>
                            <td>{course.courseName}</td>
                            <td>{course.sectionNum}</td>
                            <td>{course.numUnits}</td>
                            <td>{course.courseType}</td>
                            <td>{course.startTime}</td>
                            <td>{course.courseDays}</td>
                            <td>{course.instructorName}</td>
                            {course.room !== "TBA" ? 
                            <td>{course.room} <button onClick={() => handleLocation(course.room)} className='location-button'>Find classroom</button></td>
                            : <span>Room not announced</span>}
                            <td>
                            {course.startTime !== "TBA" ?
                            (<button onClick={() => handleAddtolist(course)} disabled={selectedcourse.has(course.courseKey)}>
                                <span class="shadow"></span>
                                <span class="edge"></span>
                                <span class="front text">{selectedcourse.has(course.courseKey) ? 'Added' : 'Add To Calendar'}</span>
                            </button>)
                            : (<span>Time not announced yet</span>)}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>}
            <div className='search-more'>
            <h1>Course not showing up? Make the search more specific by adding your section number!</h1>
                <input
                    type='text'
                    placeholder='Search for more classes...'
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    />
                <button onClick={handleGoButtonClick}>Search</button>
            </div>

        </div>

    )
}

export default Data