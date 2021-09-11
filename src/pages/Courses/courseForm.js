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
const PdfPreview = styled.div`
  padding: 20px 0;
  > .react-pdf__Document > * > canvas {
    margin: 10px auto;
  }
  .react-pdf__Document > .react-pdf__message--no-data {
    border: 1px dotted;
    padding: 30px;
    max-width: 190px;
    margin: 10px 0;
  }
`;
const Error = styled.p`
  margin: 10px 0;
  color: red;
  font-size: 13px;
`;
export function CourseForm({ submitCourse, currentCourse }) {
  const history = useHistory();
  const fileUploadRef = useRef();
  const { data: categoryOptions } = useCategory();
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [videoLink, setVideoLink] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentCourse) {
      setTitle(currentCourse.title);
      setVideoLink(currentCourse.videoLink);
      setPdf(currentCourse.pdfLink);
      setCategory(currentCourse.category);
    }
  }, [currentCourse, categoryOptions]);

  function onFileChange(event) {
    if (event.target.files.length > 0) {
      setPdf(event.target.files[0]);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const handleSubmit = async () => {
    try {
      setError(null);
      if (pdf && videoLink) {
        setLoading(true);
        let course = {
          id: generateId(),
          title,
          videoLink,
          pdfLink: pdf,
          category,
        };
        await submitCourse(course);
        setLoading(false);
        history.push("/admin/course");
      } else {
        setError("Add pdf and videoLink.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Error occured. Try again.");
    }
  };
  return (
    <>
      <TopLayer text="Add Course" />
      <CourseWrapper>
        <TextField
          title="Course Title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
          width={"90%"}
          placeholder="title"
          required={true}
        />
        <Selectfield
          selectOption={categoryOptions}
          title="Category"
          value={category}
          width={"medium"}
          nestedOption={true}
          required={true}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <TextField
          title="Video Link"
          value={videoLink || ""}
          onChange={(e) => setVideoLink(e.target.value)}
          width={"90%"}
          placeholder="url"
          required={true}
        />
        <input
          className="fileUploader"
          type="file"
          accept=".pdf"
          ref={fileUploadRef}
          onChange={onFileChange}
        />
        <FileUploaderButton onClick={() => fileUploadRef.current.click()}>
          Upload pdf
        </FileUploaderButton>
        <PdfPreview>
          <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </PdfPreview>
        {error && <Error>Add Pdf</Error>}
        <Button buttonType="primary" disabled={loading} onClick={handleSubmit}>
          {loading === true ? "Loading" : "Submit"}
        </Button>
      </CourseWrapper>
    </>
  );
}
