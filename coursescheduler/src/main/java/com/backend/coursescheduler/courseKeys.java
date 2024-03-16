package com.backend.coursescheduler;

import java.io.Serializable;
import java.util.Objects;

import lombok.EqualsAndHashCode;

public class courseKeys implements Serializable{

    private String courseNum;
    public String getCourseNum() {
        return courseNum;
    }

    public void setCourseNum(String courseNum) {
        this.courseNum = courseNum;
    }

    private String sectionNum;


    public String getSectionNum() {
        return sectionNum;
    }

    public void setSectionNum(String sectionNum) {
        this.sectionNum = sectionNum;
    }

    public courseKeys(){

    }

    public courseKeys(String courseNum, String sectionNum){
        this.courseNum = courseNum;
        this.sectionNum = sectionNum;
    }
    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        courseKeys courseKey = (courseKeys) o;
        return Objects.equals(courseNum, courseKey.courseNum) &&
                Objects.equals(sectionNum, courseKey.sectionNum);

    }

    @Override
    public int hashCode(){
        return Objects.hash(courseNum, sectionNum);
    }

}
