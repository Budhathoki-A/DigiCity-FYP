import React from "react";
import { useAddContent } from "../../callback";
import {
  useGetDownloadUrl,
  useUploadInStorage,
} from "../../callback";
import { useCourses } from "../../context/courseContext";
import { CourseForm } from "../Courses/courseForm";

export function CourseAdd(props) {
  const { data: courseList, setData: setCourseList } = useCourses();
  const addCourse = useAddContent();
  const uploadPdf = useUploadInStorage();
  const getDownloadUrl = useGetDownloadUrl();
  const handleSubmit = async (course) => {
    try {
      console.log(course)
      const pdfSnapshot = await uploadPdf(course.pdfLink, `pdf/${course.id}.pdf`);
      const downloadUrl = await getDownloadUrl(pdfSnapshot);
      course.pdfLink = downloadUrl;
      console.log(course)
      await addCourse("courses", course);
      setCourseList([...courseList, course]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CourseForm submitCourse={handleSubmit} />
    </>
  );
}
