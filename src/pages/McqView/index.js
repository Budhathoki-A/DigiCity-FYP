import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TopLayer } from "../../components/topLayer";
import okImg from "../../assets/okjob.jpg";
import goodImg from "../../assets/goodjob.jpg";
import iconA from "../../assets/a.svg";
import iconB from "../../assets/b.svg";
import iconC from "../../assets/c.svg";
import iconD from "../../assets/d.svg";
import { useQuiz } from "../../context/quizContext";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEditContent } from "../../callback";
import { useAward } from "../../context/awardContext";
import { authority } from "../../utils/info";

const Wrapper = styled.div`
  padding: 10px 13px;
  position: relative;
`;
const QuestionCard = styled.div`
  max-width: 550px;
  margin: 0 auto;
  > h3 {
    background: #1abc9c;
    color: #f5f5f5;
    padding: 24px;
    border: 1px solid #03503e;
    border-radius: 20px;
    font-size: 20px;
    margin: 10px 0;
  }
  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0;
    > li {
      flex: 35%;
      display: flex;
      gap: 10px;
      margin: 24px;
      cursor: pointer;
      background: #af1717;
      color: #f5f5f5;
      font-size: 15px;
      padding: 16px;
      border-radius: 20px;
      :hover {
        background: #cc2525;
      }
      :nth-of-type(1) {
        background: #d24a15f5;
      }
      :nth-of-type(2) {
        background: #05a995;
      }
      :nth-of-type(3) {
        background: #af0808;
      }
      :nth-of-type(4) {
        background: #a5650a;
      }
    }
  }
`;
const CompleteCard = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  > img {
    width: 100%;
    object-fit: cover;
    margin: 0 auto;
    border: 6px;
  }
  > p {
    background: #f3ccb1;
    color: #543418;
    padding: 8px;
    border-radius: 5px;
    margin: 10px 0;
  }
`;
const Choice = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  > span > img {
    max-width: 34px;
  }
`;
const PointCard = styled.div`
  width: 30px;
  padding: 16px;
  border-radius: 10px;
  color: #f5f5f5;
  opacity: 1;
  transition: 0.3s;
  position: absolute;
  left: 84px;
  transform: rotate(15deg);
`;
export function McqView(props) {
  const { id } = useParams();
  const { data: awardDoc } = useAward();
  const editContent = useEditContent();
  let icons = [iconA, iconB, iconC, iconD];
  const { user, setUser } = useAuth();
  const { data: quizList, setData: setQuizList } = useQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const [goodResult, setGoodResult] = useState(false);
  const [disableAnswer, setDisableAnswer] = useState(false);
  const [questionList, setQuestionList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (quizList) {
      const selected = quizList.find((quiz) => quiz.id === id);
      if (selected) {
        const userParticipated =
          selected.participants &&
          selected.participants.find(
            (participant) => participant.id === user.id
          );
        //check if user already participated and display result if did
        if (userParticipated) {
          let scorePercentage =
            userParticipated.score / selected.questionList.length;
          if (scorePercentage * 10 >= 70) {
            setGoodResult(true);
          }
          setScore(userParticipated.score);
          setComplete(true);
        } else {
          setQuestionList(selected.questionList);
        }
      }
    }
    setLoading(false);
  }, [id, quizList]);

  const handleAnswer = (userAnswer, correctAnswer) => {
    setDisableAnswer(true);
    let isCorrect = false;
    let newScore = 0;

    if (userAnswer === correctAnswer) {
      newScore = score + 10;
      setScore(score + 10);
      isCorrect = true;
    } else {
      //only deduct score if greater than 10
      if (score > 0) {
        newScore = score - 10;
        setScore(newScore);
      }
      isCorrect = false;
    }

    if (currentIndex + 1 < questionList.length) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setDisableAnswer(false);
      }, 1000);
    } else {
      handleComplete(newScore);
    }
    displayHidePointCard(isCorrect);
  };
  const displayHidePointCard = (isCorrect) => {
    let pointCard = document.getElementById("point-card");

    if (isCorrect === false) {
      pointCard.style.background = "#ec2525";
      pointCard.innerText = "-10";
    }
    if (isCorrect === true) {
      pointCard.style.background = "#25ec47";
      pointCard.innerText = "+10";
    }
    pointCard.style.opacity = 1;
    setTimeout(() => {
      pointCard.style.opacity = 0;
    }, 500);
  };
  const handleComplete = async (finalScore) => {
    setLoading(true);
    let scorePercentage = finalScore / questionList.length;
    const selectedQuiz = quizList.find((quiz) => quiz.id === id);

    const selectedIndex = quizList.findIndex((quiz) => quiz.id === id);

    if (scorePercentage * 10 >= 70) {
      const randomNumber = Math.floor(
        Math.random() * awardDoc[0].allAward.length
      );
      let awardImgLink = awardDoc[0].allAward[randomNumber].imgLink;
      await editContent("users", user.id, {
        awards: [...user.awards, { imgLink: awardImgLink }],
      });
      user.awards = [...user.awards, { imgLink: awardImgLink }];
      setUser(user);
      setGoodResult(true);
    }
    let finalResult = { score: finalScore, id: user.id };

    selectedQuiz.participants = [...selectedQuiz.participants, finalResult];

    await editContent("quiz", id, selectedQuiz);
    quizList[selectedIndex].participants = [
      ...quizList[selectedIndex].participants,
      finalResult,
    ];
    setQuizList([...quizList]);
    setComplete(true);
  };
  return (
    <>
      <TopLayer text="Question" />

      <Wrapper>
        {user.auth === authority.child ? (
          <>
            <PointCard id="point-card"></PointCard>
            <h2>Score:{score}</h2>
            {loading === true ? (
              <p>loading</p>
            ) : complete === false ? (
              questionList && (
                <QuestionCard>
                  <h3>{questionList[currentIndex].question}</h3>

                  <ul>
                    {Object.keys(questionList[currentIndex].answerList).map(
                      (answer, i) => (
                        <Choice
                          onClick={() =>
                            disableAnswer === false
                              ? handleAnswer(
                                  questionList[currentIndex].answerList[answer],
                                  questionList[currentIndex].answerList["right"]
                                )
                              : null
                          }
                        >
                          <span>
                            <img src={icons[i]} />
                          </span>
                          <div>
                            {questionList[currentIndex].answerList[answer]}
                          </div>
                        </Choice>
                      )
                    )}
                  </ul>
                </QuestionCard>
              )
            ) : goodResult ? (
              <CompleteCard>
                <img src={goodImg} alt="" />
                <p>
                  Excellent job. You have just recieved an award. Go to your
                  profile and see it.
                </p>
              </CompleteCard>
            ) : (
              <CompleteCard>
                <img src={okImg} alt="" />
                <p>Nice try. Get better score to get award next time.</p>
              </CompleteCard>
            )}
          </>
        ) : (
          <CompleteCard>
            <img src={okImg} alt="" />
            <p>Only kids are allowed to answer these quiz.</p>
          </CompleteCard>
        )}
      </Wrapper>
    </>
  );
}
