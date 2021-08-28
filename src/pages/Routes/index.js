import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Sidebar } from "../../components/sidebar";
import { HomePage } from "../HomePage";
import bg from "../../assets/landing-layer-2.png";
import { Profile } from "../Profile";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { Course } from "../Courses";
import { CourseAdd } from "../CourseAdd";
import { McqView } from "../McqView";
import { Quiz } from "../Quiz";
import { QuizList } from "../QuizList";
import { QuizAdd } from "../QuizAdd";
import { CourseDetails } from "../CourseDetail.js";
import { MyKid } from "../MyKid";
import { QuizEdit } from "../QuizEdit";
import { CourseEdit } from "../CourseEdit";
import ProtectedRoute from "./protectedRoute";
import { authority } from "../../utils/info";
import { useAuth } from "../../context/authContext";
import { Pricing } from "../Pricing";
import SubscriptionRoute from "./subscriptionRoute";
import { Category } from "../Category";
import { CategoryAdd } from "../CategoryAdd";
import { CategoryEdit } from "../CategoryEdit";
import { NotFound } from "../../components/404";
import { ChildWork } from "../ChildWork";
import { ChildWorkAdd } from "../ChildWorkAdd";
import { ChildWorkDetail } from "../ChildWorkDetail";
import TeacherRoute from "./teacherRoute";
const Layout = styled.div`
  display: grid;
  grid-template-columns: 0.17fr 1fr;
  @media only screen and (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;
const BgImg = styled.img`
  position: absolute;
  left: 20px;
  z-index: -1;
  width: 95%;
  height: 95%;
  object-fit: cover;
  overflow: hidden;
`;
const MainContent = styled.div`
  @media only screen and (max-width: 1050px) {
    margin-left: 60px;
  }
`;
export default function Routes(props) {
  const history = useHistory();
  const { user } = useAuth();
  const [miniSidebar, setMiniSidebar] = useState(true);
  useEffect(() => {
    if (history.location.pathname === "/all-login") {
      if (user && user.auth === authority.parents && !user.expiresAt) {
        history.push("/pricing");
      }
      if (user && user.auth === authority.parents && user.expiresAt) {
        history.push("/");
      }

      if (
        user &&
        (user.auth === authority.child || user.auth === authority.admin ||user.auth === authority.teacher)
      ) {
        history.push("/");
      }
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        {console.log(user, history.location.pathname)}
        <Layout>
          <Sidebar miniSidebar={miniSidebar} setMiniSidebar={setMiniSidebar} />
          <BgImg src={bg} alt="" />
          <MainContent>
            <Switch>
              <Route exact path="/404" component={NotFound} />
              <Route exact path="/course/:id">
                <CourseDetails />
              </Route>
              <ProtectedRoute
                component={Profile}
                authorityTobeChecked={authority.child}
                exact
                path="/profile"
              />
              <SubscriptionRoute component={Quiz} exact path="/quiz" />
              <SubscriptionRoute
                component={McqView}
                exact
                path="/mcq-view/:id"
              />
              <Route component={ChildWork} exact path="/child-work" />{" "}
              <ProtectedRoute
                component={ChildWorkAdd}
                authorityTobeChecked={authority.child}
                exact
                path="/child-work/add"
              />
              <Route component={ChildWorkDetail} path="/child-work/:id" />
              <ProtectedRoute
                component={Pricing}
                authorityTobeChecked={authority.parents}
                exact
                path="/pricing"
              />
              <TeacherRoute
                component={Category}
                authorityTobeChecked={authority.admin}
                exact
                path="/admin/category"
              />
              <TeacherRoute
                component={CategoryAdd}
                authorityTobeChecked={authority.admin}
                exact
                path="/admin/add-category"
              />
              <TeacherRoute
                component={CategoryEdit}
                authorityTobeChecked={authority.admin}
                exact
                path="/admin/edit-category/:id"
              />
              <TeacherRoute
                component={Course}
                authorityTobeChecked={authority.admin}
                exact
                path="/admin/course"
              />
              <TeacherRoute
                component={CourseAdd}
                authorityTobeChecked={authority.admin}
                exact
                path="/admin/add-course"
              />
              <TeacherRoute
                component={CourseEdit}
                authorityTobeChecked={authority.admin}
                exact
                path="/admin/edit-course/:id"
              />
              <TeacherRoute
                component={QuizList}
                authorityTobeChecked={authority.admin}
                exact
                path="/admin/quiz"
              />
              <TeacherRoute
                component={QuizAdd}
                authorityTobeChecked={authority.admin}
                exact
                path="/admin/add-quiz"
              />
              <TeacherRoute
                component={QuizEdit}
                authorityTobeChecked={authority.admin}
                exact
                path="/admin/edit-quiz/:id"
              />
              <SubscriptionRoute exact path="/" component={HomePage} />
              {user.stripeSubId && (
                <ProtectedRoute
                  component={MyKid}
                  authorityTobeChecked={authority.parents}
                  exact
                  path="/my-kid"
                />
              )}
            </Switch>
          </MainContent>
        </Layout>
      </BrowserRouter>
    </>
  );
}
