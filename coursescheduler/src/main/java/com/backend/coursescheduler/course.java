package com.backend.coursescheduler;

import java.io.Serializable;
import java.time.LocalTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "course_table_new")
@IdClass(courseKeys.class)
public class course implements Serializable {

    @Id
    @Column(name = "courseNum", nullable = true)
    private String courseNum; //BUAD-311



    private String courseName;
    private String registrationRest;
    private String numUnits; //2.0 or 4.0
    private String courseType;  // Lecture, discussion,lab, qui
    @Id
    @Column(name="section_num", nullable = false)
    private String sectionNum; //14566D
    private String sessionType; //001
    private String startTime; //10:00
    //private LocalTime endTime; //11:50am
    private String courseDays; //Tue,wed
    private String seats; //001
    private String registered; //001
    private String waitlist; //001
    private String instructorName; // Eric Briggs
    private String room;


    public String getNumUnits() {
        return numUnits;
    }
    public void setNumUnits(String numUnits) {
        this.numUnits = numUnits;
    }
    public String getCourseType() {
        return courseType;
    }
    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }
    public String getSectionNum() {
        return sectionNum;
    }
    public void setSectionNum(String sectionNum) {
        this.sectionNum = sectionNum;
    }
    public String getSessionType() {
        return sessionType;
    }
    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }
    public String getStartTime() {
        return startTime;
    }
    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
  /*  public LocalTime getEndTime() {
        return endTime;
    }*/
   /* public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }*/
    public String getCourseDays() {
        return courseDays;
    }
    public void setCourseDays(String courseDays) {
        this.courseDays = courseDays;
    }
    public String getInstructorName() {
        return instructorName;
    }
    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }
    public String getCourseNumber() {
        return courseNum;
    }
    public void setCourseNumber(String courseNumber) {
        this.courseNum = courseNumber;
    }

    public String getCourseName() {
        return courseName;
    }
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public courseKeys getCourseKey(){
        return new courseKeys(this.courseNum, this.sectionNum);
    }

    public void setCourseKeys(courseKeys courseKey){
        this.courseNum = courseKey.getCourseNum();
        this.sectionNum = courseKey.getSectionNum();
    }



}
