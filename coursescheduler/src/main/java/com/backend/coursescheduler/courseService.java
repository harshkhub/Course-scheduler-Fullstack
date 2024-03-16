package com.backend.coursescheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;


@Service
public class courseService {

    @Autowired
    private courseRepo courserepository;

    public List<course> getAll(){
        return courserepository.findAll();
    }

    public course addCourse(@RequestBody course newcourse){
        return courserepository.save(newcourse);
    }

    public List<course> getCoursebyName(String courseNum){

        return courserepository.findByCourseNumContaining(courseNum);

    }

    public List<course> getCoursebySection(String sectionNum){

        return courserepository.findBySectionNum(sectionNum);

    }

    @Transactional
    public void deleteCourse(courseKeys courskey){
        Optional<course> courseDel = courserepository.findById(courskey);

        if (courseDel.isPresent()){
            courserepository.deleteByCourseNumAndSectionNum(courskey.getCourseNum(), courskey.getSectionNum());
        }
    }

}
