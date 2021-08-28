import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import avatarImg from "../assets/avatar.png";
import { useLogout } from "../callback";
import { useAuth } from "../context/authContext";
import {
  IconBook,
  IconBookQuiz,
  IconCreate,
  IconFile,
  IconFileAdd,
  IconKid,
  IconLogout,
  IconPriceTag,
  IconProfile,
} from "../utils/icons";
import { authority } from "../utils/info";
const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0px;
  bottom: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #2e103c;
  @media only screen and (max-width: 1050px) {
    position: fixed;
    width: 60px;
    white-space: nowrap;
    left: 0;
    bottom: 0;
    top: 0;
  }
`;
const Avatar = styled.div`
  background: #180521;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 10px;
  color: #fff;
  > img {
    padding-top: 1px;
    width: 95%;
    height: 95%;
    object-fit: cover;
    object-position: top;
  }
  @media only screen and (max-width: 1050px) {
    width: 47px;
    height: 47px;
  }
`;
const NavList = styled.ul`
  margin-top: 40px;
  width: 100%;
`;
const NavItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #e8b4ff;
  margin-bottom: 17px;
  padding: 5px;
  padding-left: 17px;
  cursor: pointer;
  :hover {
    background: #a672bd;
    color: #fff;

    > svg path {
      fill: #d4cfcf;
    }
    > svg:nth-last-of-type() {
      stroke: #d4cfcf;
    }
  }
  @media only screen and (max-width: 1050px) {
    > svg {
      min-width: 25px;
      min-height: 25px;
    }
  }
`;
export function Sidebar(props) {
  const logout = useLogout();
  const history = useHistory();
  const { user } = useAuth();
  return (
    <>
      <StyledSidebar>
        <Link to={user.auth === authority.child ? "/profile" : ""}>
          <Avatar>
            {user.avatar ? (
              <img src={user.avatar} alt="" />
            ) : (
              user.fullname[0].toUpperCase()
            )}
          </Avatar>
        </Link>
        <NavList>
          {user.auth === authority.child && (
            <Link to="/profile">
              <NavItem>
                <IconProfile size={"25"} color={"#a852ce"} />{" "}
                <span>Profile</span>
              </NavItem>
            </Link>
          )}{" "}
          {(user.auth === authority.admin) || (user.auth === authority.teacher) && (
            <Link to="/admin/category">
              <NavItem>
                <IconFileAdd size={"25"} color={"#a852ce"} />{" "}
                <span>Category</span>
              </NavItem>
            </Link>
          )}
          {(user.auth === authority.admin) || (user.auth === authority.teacher) && (
            <Link to="/admin/course">
              <NavItem>
                <IconCreate size={"25"} color={"#a852ce"} />{" "}
                <span>Admin Course</span>
              </NavItem>
            </Link>
          )}
          {(user.auth === authority.admin) || (user.auth === authority.teacher) && (
            <Link to="/admin/quiz">
              <NavItem>
                <IconBookQuiz size={"25"} color={"#a852ce"} />{" "}
                <span>Admin Quiz</span>
              </NavItem>
            </Link>
          )}
          {(user.stripeSubId || user.auth === authority.admin ||  user.auth === authority.teacher) && (
            <Link to="/">
              <NavItem>
                <IconBook size={"25"} color={"#a852ce"} /> <span>Learn</span>
              </NavItem>
            </Link>
          )}
          {(user.stripeSubId || user.auth === authority.admin || user.auth === authority.teacher) && (
            <Link to="/quiz">
              <NavItem>
                <IconFile size={"25"} color={"#a852ce"} /> <span>Quiz</span>
              </NavItem>
            </Link>
          )}
          <Link to="/child-work">
            <NavItem>
              <IconFile size={"25"} color={"#a852ce"} />{" "}
              <span>
                {user.auth === authority.child ? "My work" : "Child Work"}
              </span>
            </NavItem>
          </Link>
          {user.auth === authority.parents && (
            <Link to="/pricing">
              <NavItem>
                <IconPriceTag size={"25"} color={"#a852ce"} />{" "}
                <span>Pricing</span>
              </NavItem>
            </Link>
          )}
          {user.stripeSubId && user.auth === authority.parents && (
            <Link to="/my-kid">
              <NavItem>
                <IconKid size={"25"} color={"#a852ce"} /> <span>My Kid</span>
              </NavItem>
            </Link>
          )}
          <NavItem
            onClick={async () => {
              await logout();
            }}
          >
            <IconLogout size={"25"} color={"#a852ce"} /> <span>Logout</span>
          </NavItem>
        </NavList>
      </StyledSidebar>
    </>
  );
}
