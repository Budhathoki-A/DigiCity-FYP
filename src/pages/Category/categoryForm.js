import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Selectfield } from "../../components/selectField";
import TextField from "../../components/textField";
import { TopLayer } from "../../components/topLayer";
import { Button } from "../../components/button";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useCategory } from "../../context/categoryContext";
import { generateId } from "../../utils/x";
import { useHistory } from "react-router-dom";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

const CourseWrapper = styled.div`
  width: 85%;
  background: #eae6ec;
  margin: 0 auto;
  padding: 20px;
  border-radius: 6px;
  margin-top: 20px;
  > .fileUploader {
    display: none;
  }
`;
const FileUploaderButton = styled.div`
  width: 190px;
  background: #6e93ba;
  color: #fff;
  padding: 9px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;
const PreviewImageWrapper = styled.div`
  width: 100%;
  max-width: 255px;
  height: 154px;
  margin: 18px 0;
  border: 1px dotted dodgerblue;
  font-size: 12px;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Image = styled.img`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;

const Error = styled.p`
  margin: 10px 0;
  color: red;
  font-size: 13px;
`;
export function CategoryForm({ submitCategory, currentCategory }) {
  const history = useHistory();
  const fileCourseUploadRef = useRef();
  const fileQuizUploadRef = useRef();
  const [name, setName] = useState(null);
  const [courseImg, setCourseImg] = useState(null);
  const [quizImg, setQuizImg] = useState(null);
  const [coursePreviewImg, setCourseImgPreview] = useState(null);
  const [quizPreviewImg, setQuizImgPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentCategory) {
      setName(currentCategory.name);
      setCourseImgPreview(currentCategory.courseImg);
      setQuizImgPreview(currentCategory.quizImg);

      setCourseImg(currentCategory.courseImg);
      setQuizImg(currentCategory.quizImg);
    }
  }, [currentCategory]);

  function onFileCourseChange(event) {
    const files = event.target.files[0];
    if (files) {
      setCourseImgPreview(URL.createObjectURL(files));
      setCourseImg(files);
    }
  }
  function onFileQuizChange(event) {
    const files = event.target.files[0];
    if (files) {
      setQuizImgPreview(URL.createObjectURL(files));
      setQuizImg(files);
    }
  }

  const handleSubmit = async () => {
    try {
      setError(null);
      if (courseImg && quizImg) {
        setLoading(true);
        let category = {
          id: generateId(),
          name,
          courseImg,
          quizImg,
        };
        console.log(category)
        await submitCategory(category);
        setLoading(false);
        history.push("/admin/category");
      } else {
        setError("Add course cover and quiz cover image.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Error occured. Try again.");
    }
  };
  return (
    <>
      <TopLayer text="Add Category" />
      {console.log("currentCategory",currentCategory)}
      <CourseWrapper>
        <TextField
          name="Category name"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          width={"90%"}
          placeholder="name"
          required={true}
        />

        <input
          className="fileUploader"
          type="file"
          accept=".jpg"
          ref={fileCourseUploadRef}
          onChange={onFileCourseChange}
        />

        <input
          className="fileUploader"
          type="file"
          accept=".jpg"
          ref={fileQuizUploadRef}
          onChange={onFileQuizChange}
        />
        <FileUploaderButton onClick={() => fileCourseUploadRef.current.click()}>
          Upload Course Cover Image
        </FileUploaderButton>
        <PreviewImageWrapper onClick={() => fileCourseUploadRef.current.click()}>
          {coursePreviewImg ? (
            <Image src={coursePreviewImg} />
          ) : (
            <span>Preview Image</span>
          )}
        </PreviewImageWrapper>
        <FileUploaderButton onClick={() => fileQuizUploadRef.current.click()}>
          Upload Quiz Cover Image
        </FileUploaderButton>
        <PreviewImageWrapper onClick={() => fileQuizUploadRef.current.click()}>
          {quizPreviewImg ? (
            <Image src={quizPreviewImg} />
          ) : (
            <span>Preview Image</span>
          )}
        </PreviewImageWrapper>
        {error && <Error>{error}</Error>}
        <Button buttonType="primary" disabled={loading} onClick={handleSubmit}>
          {loading === true ? "Loading" : "Submit"}
        </Button>
      </CourseWrapper>
    </>
  );
}
