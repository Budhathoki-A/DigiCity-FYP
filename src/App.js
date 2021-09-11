import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoadingPage } from "./components/loading";
import { useAuth } from "./context/authContext";
import { AvatarProvider } from "./context/avatarContext";
import { AwardProvider } from "./context/awardContext";
import { CategoryProvider } from "./context/categoryContext";
import { ChildWorkProvider } from "./context/childWorkContext";
import { CoursesProvider } from "./context/courseContext";
import { QuizProvider } from "./context/quizContext";
import { LandingPage } from "./pages/LandingPage";
import { AllLogin } from "./pages/LandingPage/AllLogin";
import { Login } from "./pages/LandingPage/login";
import { Navbar } from "./pages/LandingPage/navbar";
import { ParentsSignup } from "./pages/LandingPage/parentsSignup";
import Routes from "./pages/Routes";
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
