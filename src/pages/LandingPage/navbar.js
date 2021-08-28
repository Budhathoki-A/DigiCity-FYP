import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";
import { Button } from "../../components/button";
import { IconClose, IconMenu } from "../../utils/icons";

const StyledNavbar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 59px;
  margin: 0 auto;
  z-index: 4;
  background: #fff;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  overflow: hidden;
  @media only screen and (max-width: 990px) {
    flex-direction: column;
    max-height: ${(props) => (props.navOpen ? "1000px" : "25px")};
    transition: 0.4s;
  }
`;
const Logo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  @media only screen and (max-width: 990px) {
    position: absolute;
    left: 29px;
  }
`;
const NavList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  gap: 40px;
  align-items: center;
  @media only screen and (max-width: 990px) {
    flex-direction: column;
    margin-top: 40px;
    width: 100%;
  }
`;
const NavItem = styled.li`
  cursor: pointer;
  text-align: center;
  :hover {
    color: var(--primary-color);
  }

  @media only screen and (max-width: 990px) {
    width: 100%;
  }
`;

const Icon = styled.div`
  display: none;
  cursor: pointer;
  @media only screen and (max-width: 990px) {
    display: block;
    position: absolute;
    right: 29px;
    opacity: ${(props) => (props.navOpen ? "0" : "1")};
    z-index: ${(props) => (props.navOpen ? "0" : "1")};

    transition: none.4s;
  }
`;
const Icon1 = styled.div`
  display: none;
  cursor: pointer;
  @media only screen and (max-width: 990px) {
    display: block;
    position: absolute;
    right: 29px;
    opacity: ${(props) => (props.navOpen ? "1" : "0")};
    z-index: ${(props) => (props.navOpen ? "1" : "0")};
    transition: none.4s;
  }
`;
export function Navbar(props) {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <StyledNavbar navOpen={navOpen}>
        <HashLink to="/#Hero">
          <Logo>
            <p>Logo</p>
            <span>DigiCity For Kids</span>
          </Logo>
        </HashLink>
        <NavList>
          <HashLink to="/#Hero">
            <NavItem>Home</NavItem>
          </HashLink>

          <HashLink to="/#Instruction">
            <NavItem>Guide</NavItem>
          </HashLink>
          <HashLink to="/#Features">
            <NavItem>Features</NavItem>
          </HashLink>
          <HashLink to="/#Pricing">
            <NavItem>Pricing</NavItem>
          </HashLink>
          <Link to="/login?action=signup">
            <NavItem>
              <Button buttonType="primary">Sign Up</Button>
            </NavItem>
          </Link>
        </NavList>
        {console.log(navOpen)}
        <Icon navOpen={navOpen} onClick={() => setNavOpen(true)}>
          <IconMenu size={"25"} color={"var(--primary-color)"} />
        </Icon>
        <Icon1 navOpen={navOpen} onClick={() => setNavOpen(false)}>
          <IconClose size={"25"} color={"var(--primary-color)"} />
        </Icon1>
      </StyledNavbar>
    </>
  );
}
