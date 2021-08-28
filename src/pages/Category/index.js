import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDeleteContent, useDeleteFromStorage } from "../../callback";
import { Button } from "../../components/button";
import Table, { TInfo, TRow } from "../../components/table";
import { TopLayer } from "../../components/topLayer";
import { useCategory } from "../../context/categoryContext";

const TableWrapper = styled.div`
  width: 85%;
  background: #eae6ec;
  margin: 0 auto;
  padding: 20px;
  border-radius: 6px;
  margin-top: 20px;
`;
export function Category(props) {
  const history = useHistory();
  const deleteImage = useDeleteFromStorage()
  const { data: categoryList, setData: setCategory } = useCategory();
  const deleteQuiz = useDeleteContent();

  const handleDelete = async (id) => {
    try {
      await deleteImage(`/courses/${id}.jpg`)
      await deleteImage(`/quiz/${id}.jpg`)
     
      await deleteQuiz("category", id);
      setCategory(categoryList.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TopLayer text="Category List" />
      <TableWrapper>
        <Button
          onClick={() => history.push("/admin/add-category")}
          buttonType="primary"
          margin={"10px 0"}
          padding={"12px 13px"}
        >
          Add Category
        </Button>
        <Table headers={["Title","Edit","Delete"]}>
          
          {categoryList &&
            categoryList.map((category) => (
              <TRow>
                <td>{category.name}</td>
                <td>
                <Button
                    color={"var(--primary-color)"}
                    nature="flat"
                    onClick={() =>
                      history.push(`/admin/edit-category/${category.id}`)
                    }
                  >
                    Edit
                  </Button>
                </td>   
                <td>
                  <Button
                    color={"var(--primary-color)"}
                    nature="flat"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </Button>
                </td>
              </TRow>
            ))}
          {categoryList && categoryList.length === 0 && (
            <TInfo totalColumn={4}>Nothing to show...</TInfo>
          )}{" "}
        </Table>
      </TableWrapper>
    </>
  );
}
