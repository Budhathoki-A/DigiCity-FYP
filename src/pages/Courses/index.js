import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDeleteContent, useDeleteFromStorage } from "../../callback";
import { Button } from "../../components/button";
import Table, { TInfo, TRow } from "../../components/table";
import { TopLayer } from "../../components/topLayer";
import { useCategory } from "../../context/categoryContext";
import { useCourses } from "../../context/courseContext";

const TableWrapper = styled.div`
  width: 85%;
  background: #eae6ec;
  margin: 0 auto;
  padding: 20px;
  border-radius: 6px;
  margin-top: 20px;
`;
export function Course(props) {
  const history = useHistory();
  const deletePdf = useDeleteFromStorage()
  const { data: courseList, setData: setCourseList } = useCourses();
  const { data: categoryList } = useCategory();
  const deleteCourse = useDeleteContent();

  const handleDelete = async (id) => {
    try {
      await deletePdf(`pdf/${id}.pdf`)
      await deleteCourse("courses", id);
      setCourseList(courseList.filter((course) => course.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TopLayer text="Courses" />
      <TableWrapper>
        <Button
          onClick={() => history.push("/admin/add-course")}
          buttonType="primary"
          margin={"10px 0"}
          padding={"12px 13px"}
        >
          Add Course
        </Button>
        <Table headers={["Title", "Category", "Edit","Delete"]}>
          {courseList &&
            courseList.map((course) => (
              <TRow key={course.id}>
                <td>{course.title}</td>
                <td>
                  {categoryList &&
                    categoryList.find(
                      (category) => category.id === course.category
                    ).name}
                </td>
                <td>
                  <Button
                    color={"var(--primary-color)"}
                    nature="flat"
                    onClick={() =>
                      history.push(`/admin/edit-course/${course.id}`)
                    }
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    color={"var(--primary-color)"}
                    nature="flat"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </Button>
                </td>
              </TRow>
            ))}
          {courseList && courseList.length === 0 && (
            <TInfo totalColumn={4}>Nothing to show...</TInfo>
          )}
        </Table>
      </TableWrapper>
    </>
  );
}
