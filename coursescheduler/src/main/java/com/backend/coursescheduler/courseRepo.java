package com.backend.coursescheduler;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface courseRepo extends JpaRepository<course, courseKeys>{
    @Query("SELECT c FROM course c WHERE REPLACE(LOWER(c.courseNum), ' ', '-') LIKE LOWER(CONCAT('%', REPLACE(:courseNum, ' ', '-'), '%'))")
    public List<course> findByCourseNumContaining(String courseNum);
    public List<course> findBySectionNum(String sectionNum);

    void deleteByCourseNumAndSectionNum(String courseNum, String sectionNum);

    //void deleteBycourseKey(courseKeys delKey);




}
