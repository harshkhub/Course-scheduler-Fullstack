package com.backend.coursescheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;



@RestController
@RequestMapping(path = "api/course")
@CrossOrigin(origins = "http://localhost:3001")
public class courseController {

    @Autowired
    private courseService courseservice;


    @GetMapping
    public ResponseEntity<List<course>> getCoursebycourseNum(@RequestParam String courseNum){
        List<course> courses = courseservice.getCoursebyName(courseNum);

        if(courses.isEmpty()){
            return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(null);
        }

        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(courses);
    }

    @GetMapping("/section")
    public ResponseEntity<List<course>> getcoursebysectionNum(@RequestParam String sectionNum){
        List<course> coursebySec = courseservice.getCoursebySection(sectionNum);

        if(coursebySec == null){
            String message = "Requested course does not exist";
            return ResponseEntity.status(HttpStatusCode.valueOf(404)).body(null);
        }

        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(coursebySec);


    }

    @PostMapping("/newCourse")
    public ResponseEntity<String> addCourse(@RequestBody course newCourse){

        course newcourse = courseservice.addCourse(newCourse);

        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body("Successfully added new course");
    }

    @DeleteMapping("course/delete")
    public ResponseEntity<String> deleteCourse(@RequestParam String courseNum, @RequestParam String sectionNum){

        courseKeys delKey = new courseKeys(courseNum, sectionNum);

        courseservice.deleteCourse(delKey);

        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body("Deleted course");

    }


}

