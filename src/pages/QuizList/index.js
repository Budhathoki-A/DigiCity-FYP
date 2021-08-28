import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDeleteContent } from "../../callback";
import { Button } from "../../components/button";
import Table, { TInfo, TRow } from "../../components/table";
import { TopLayer } from "../../components/topLayer";
import { useCategory } from "../../context/categoryContext";
import { useQuiz } from "../../context/quizContext";

const TableWrapper = styled.div`
  width: 85%;
  background: #eae6ec;
  margin: 0 auto;
  padding: 20px;
  border-radius: 6px;
  margin-top: 20px;
`;
export function QuizList(props) {
  const history = useHistory();
  const { data: quizList, setData: setQuizList } = useQuiz();
  const { data: categoryList } = useCategory();
  const deleteQuiz = useDeleteContent();

  const handleDelete = async (id) => {
    try {
      await deleteQuiz("quiz", id);
      setQuizList(quizList.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TopLayer text="Quiz" />
      <TableWrapper>
        <Button
          onClick={() => history.push("/admin/add-quiz")}
          buttonType="primary"
          margin={"10px 0"}
          padding={"12px 13px"}
        >
          Add Quiz
        </Button>
        <Table headers={["Title", "Category", "Edit","Delete"]}>
          
          {quizList &&
            quizList.map((quiz) => (
              <TRow>
                <td>{quiz.title}</td>
                <td>
                  {categoryList &&
                    categoryList.find(
                      (category) => category.id === quiz.category
                    ).name}
                </td>
                <td>
                  <Button
                    color={"var(--primary-color)"}
                    nature="flat"
                    onClick={() => history.push(`/admin/edit-quiz/${quiz.id}`)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    color={"var(--primary-color)"}
                    nature="flat"
                    onClick={() => handleDelete(quiz.id)}
                  >
                    Delete
                  </Button>
                </td>
              </TRow>
            ))}
          {quizList && quizList.length === 0 && (
            <TInfo totalColumn={4}>Nothing to show...</TInfo>
          )}{" "}
        </Table>
      </TableWrapper>
    </>
  );
}
