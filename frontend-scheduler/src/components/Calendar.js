import { useEffect, useState } from 'react'
import './Calendar.css'
import download from '../assets/download.png'
import { Link } from 'react-router-dom'

const Calendar = () =>{

    const[calendarCourses, SetCourses] = useState([])
    const[hasitems, setHasItems] = useState(false);

    useEffect(() =>{

        const calendar = JSON.parse(localStorage.getItem('calendar'));

        SetCourses(calendar);
        setHasItems(calendar && calendar.length > 0);
    })

    const formatStartTime = (timeString , calendarType) =>{
        const [startTime, endTime] = timeString.split('-');
        const [startMeridiem, endMeridiem] = endTime.slice(-2) === 'pm' ? ['PM', 'PM'] : ['AM', 'AM'];
        let pmIndex = 0;
        if (endMeridiem == 'PM') {
            pmIndex = endTime.indexOf('pm');
        } else {
            pmIndex = endTime.indexOf('am');
        }

        const endTimeSub = endTime.substring(0, pmIndex);
        const [startHour, startMinute] = startTime.split(':');
        const [endHour, endMinute] = endTimeSub.split(':');

        return { startTime: formatTime(startHour, startMinute, startMeridiem, calendarType), endTime: formatTime(endHour, endMinute,endMeridiem, calendarType) };
        

    }

    const formatDays = (courseDays) =>{
        let days = '';
        if (courseDays.includes(',')) {
            days = courseDays.split(',').map(day => {
                switch (day.trim().toUpperCase()) {
                    case "MON":
                        return "MO";
                    case "TUE":
                        return "TU";
                    case "WED":
                        return "WE";
                    case "THU":
                        return "TH";
                    case "FRI":
                        return "FR";
                    case "SAT":
                        return "SA";
                    case "SUN":
                        return "SU";
                }
            }).join(',');
        } else {
            days = courseDays.substring(0, 2).toUpperCase();
        }
        return days;
    }

    const handleRemove = (courseKey) =>{
        
        const updatedCourses = calendarCourses.filter(course=>course.courseKey !== courseKey)
        SetCourses(updatedCourses)
        localStorage.setItem('calendar', JSON.stringify(updatedCourses));    
    }

    const handleGoogle = (course) =>{
        const title = course.courseNum;
        const description = course.courseName;
        const location = course.room;
        console.log(course.room);
        const startDate = "2024-08-26"; 
        const endDate = "2024-08-26";

        const {startTime, endTime} = formatStartTime(course.startTime, 'google');
        // Format start and end dates and times
        const startDateTime = new Date(`${startDate}T${startTime}:00`).toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
        const endDateTime = new Date(`${endDate}T${endTime}:00`).toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
        console.log(course.courseDays);


        const days = formatDays(course.courseDays);
        console.log(days);
        const recurrenceRule = `RRULE:FREQ=WEEKLY;BYDAY=${days}`; 
    

        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${encodeURIComponent(startDateTime)}/${encodeURIComponent(endDateTime)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&recur=${encodeURIComponent(recurrenceRule)}`;
        window.open(googleCalendarUrl, '_blank');
    }

    const generateCalendarFile = () =>{

            let icsContent = 'BEGIN:VCALENDAR\n';
            icsContent += 'VERSION:2.0\n';
            icsContent += 'PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n';

            calendarCourses.forEach((course) =>{
                const {startTime, endTime} = formatStartTime(course.startTime);
                const days = formatDays(course.courseDays);

                icsContent += 'BEGIN:VEVENT\n';
                icsContent += `DTSTART:20240826T${startTime}\n`;
                icsContent += `DTEND:20240826T${endTime}\n`;
                icsContent += `RRULE:FREQ=WEEKLY;BYDAY=${days}\n`;
                icsContent += `SUMMARY:${course.courseNum} - ${course.courseName}\n`;
                icsContent += `DESCRIPTION:Instructor: ${course.instructorName}\\nRoom: ${course.room}\n`;
                icsContent += `LOCATION:${course.room}\n`;
                icsContent += 'END:VEVENT\n';
            })

            icsContent += 'END:VCALENDAR\n';

            const blob = new Blob([icsContent], {type: 'text/calendar;charset=utf-8'});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'calendar.ics')
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        
    }

    const formatTime = (hour, minute, meridiem, calendarType) => {
        let formattedHour = parseInt(hour);
        if (meridiem === 'PM' && formattedHour !== 12) {
          formattedHour += 12;
        } else if (meridiem === 'AM' && formattedHour === 12) {
          formattedHour = 0;
        }
        if(calendarType === 'google'){
            return `${formattedHour.toString().padStart(2, '0')}:${minute.padStart(2, '0')}`;
        }
        else{
        return `${formattedHour.toString().padStart(2, '0')}${minute.padStart(2, '0')}00`;
        }
    };


    return(
        <div className='table-container'>
            {calendarCourses.length === 0 ? 
            <div>
            <h1>No courses added yet, search for classes!</h1>
            <button className='section-btn'>
                <Link to='/search'>Search</Link>
            </button> 
            </div>:
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
                    {calendarCourses.map((course) =>(
                        <tr key={`${course.courseNum}-${course.sectionNum}`}>
                            <td>{course.courseNum}</td>
                            <td>{course.courseName}</td>
                            <td>{course.sectionNum}</td>
                            <td>{course.numUnits}</td>
                            <td>{course.courseType}</td>
                            <td>{course.startTime}</td>
                            <td>{course.courseDays}</td>
                            <td>{course.instructorName}</td>
                            <td>{course.room} </td>
                            <td>
                            <div className='buttons'>
                                <button onClick={() =>handleRemove(course.courseKey)}>Remove</button>
                                <button onClick={() =>handleGoogle(course)} className='google-button'>
                                    <img src={download} alt='google logo' className='google-logo'/>
                                </button>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>}
            {hasitems && <button onClick={generateCalendarFile} >Export calendar</button>}
        </div>
)}

export default Calendar