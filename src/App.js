import React from "react";
import { useAuth } from "./context/authContext";
import { LandingPage } from "./pages/LandingPage";
import Routes from "./pages/Routes";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./pages/LandingPage/navbar";
import { Login } from "./pages/LandingPage/login";
import { CoursesProvider } from "./context/courseContext";
import { CategoryProvider } from "./context/categoryContext";
import { QuizProvider } from "./context/quizContext";
import { ParentsSignup } from "./pages/LandingPage/parentsSignup";
import { AllLogin, ParentsLogin } from "./pages/LandingPage/AllLogin";
import { AvatarProvider } from "./context/avatarContext";
import { AwardProvider } from "./context/awardContext";
import { LoadingPage } from "./components/loading";
import { ChildWorkProvider } from "./context/childWorkContext";
function App(props) {
  const { user, loading } = useAuth();

  return (
    <>
      <BrowserRouter>
        {console.log(loading)}
        {loading ? (
          <LoadingPage />
        ) :
        user && user.id ? (
          <CategoryProvider>
            <QuizProvider>
              <CoursesProvider>
                <AvatarProvider>
                  <AwardProvider>
                    <ChildWorkProvider>
                      <Routes />
                    </ChildWorkProvider>
                  </AwardProvider>
                </AvatarProvider>
              </CoursesProvider>
            </QuizProvider>
          </CategoryProvider>
        ) : (
          <>
            <Navbar />
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>

              <Route exact path="/parents-signup">
                <ParentsSignup />
              </Route>
              <Route exact path="/all-login">
                <AllLogin />
              </Route>

              <Route>
                <LandingPage />
              </Route>
            </Switch>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
