import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TopLayer } from "../../components/topLayer";
import Youtube from "react-youtube";
import sittingKids from "../../assets/sitting-kids.jpg";
import { BowTieSvg } from "../../utils/icons";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useParams } from "react-router-dom";
import { useCourses } from "../../context/courseContext";

const Wrapper = styled.div``;
const Content = styled.div`
  padding: 0 20px;
`;
const VideoContainer = styled.div`
  position: relative;
  max-width: 600px;
  max-height: 400px;
  margin: 15px auto;
  border: 10px solid #0e4823;
  border-radius: 5px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  > svg {
    width: 40px;
    height: 40px;
    position: absolute;
    top: -19px;
    left: -20px;
    transform: rotate(140deg);
  }
`;
const ImageContainer = styled.div`
  max-width: 250px;
  margin: 0 auto;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const PdfPreview = styled.div`
  padding: 20px 0;
  > .react-pdf__Document > * > canvas {
    margin: 10px auto;
  }

  .react-pdf__Document > .react-pdf__message--loading {
    border: 1px dotted;
    padding: 30px;
    margin: 10px 0;
    min-height: 800px;
    width: 100%;
  }
  .react-pdf__Document > .react-pdf__message--no-data {
    border: 1px dotted;
    padding: 30px;
    max-width: 190px;
    margin: 10px 0;
  }
`;
const Button = styled.button`
  min-width: auto;
  background-color: var(--primary-color);
  border: none;
  border-radius: 9px;
  cursor: pointer;
  color: #fff;
  padding: 9px 15px;
  margin: 20px 0;
  -webkit-transition: 0.3s all;
  transition: 0.3s all;
  margin-right: 10px;
`;

export function CourseDetails(props) {
  const { data: courseList, setData: setCourseList } = useCourses();
  const { id } = useParams();
  const [pdf, setPdf64] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (courseList) {
      const selectedCourse = courseList.find((course) => course.id === id);
      if (selectedCourse) {
        setCourse(selectedCourse);
        setPdf64(selectedCourse.pdfLink);
      }
    }
  }, [id, courseList]);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <>
      <Wrapper>
        {console.log(setCourse)}
        <TopLayer text="Video Section" />
        <Content>
          <VideoContainer>
            <Youtube
              videoId={course && course.videoLink.split("v=")[1].slice(0, 11)}
              className="course-video"
            />
            <BowTieSvg />
          </VideoContainer>
          <ImageContainer>
            <img src={sittingKids} alt="" />
          </ImageContainer>

          <PdfPreview>
            <Document
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={console.error}
            >
              <Page
                key={`page_${currentPage + 1}`}
                pageNumber={currentPage + 1}
              />
            </Document>
            {numPages && numPages !== 0 && numPages - 1 !== currentPage && (
              <Button onClick={() => setCurrentPage(currentPage + 1)}>
                Previous
              </Button>
            )}
            {numPages && numPages !== 0 && currentPage && currentPage !== 1 && (
              <Button onClick={() => setCurrentPage(currentPage - 1)}>
                Next
              </Button>
            )}
          </PdfPreview>
        </Content>
      </Wrapper>
    </>
  );
}
