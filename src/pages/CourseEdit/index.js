import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetDownloadUrl,
  useUploadInStorage
} from "../../callback/firebaseStorageCallback";
import { useEditContent } from "../../callback/firestoreCallback";
import { useCourses } from "../../context/courseContext";
import { CourseForm } from "../Courses/courseForm";

export function CourseEdit(props) {
  const courseEdit = useEditContent();
  const uploadPdf = useUploadInStorage();
  const getDownloadUrl = useGetDownloadUrl();
  const { id } = useParams();
  const { data: courseList, setData: setCourseList } = useCourses();

  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    if (courseList) {
      const selected = courseList.find((quiz) => quiz.id === id);
      if (selected) {
        setCurrentCourse(selected);
      }
    }
  }, [id, courseList]);

  const editCourse = async (course) => {
    try {
      console.log(course);
      delete course.id;
      if (typeof course.pdfLink !== "string") {
        console.log("pd")
        const pdfSnapshot = await uploadPdf(course.pdfLink, `pdf/${id}.pdf`);
        const downloadUrl = await getDownloadUrl(pdfSnapshot);
        course.pdfLink = downloadUrl;
      }
      await courseEdit("courses", id, course);
      console.log(course);
      const index = courseList.findIndex(
        (currentCourse) => currentCourse.id === id
      );
      course.id = id;
      courseList[index] = course;
      setCourseList([...courseList]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CourseForm currentCourse={currentCourse} submitCourse={editCourse} />
    </>
  );
}
