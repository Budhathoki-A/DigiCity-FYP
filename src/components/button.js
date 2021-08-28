import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({ width }) => (width === "full" ? "100%" : width)};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : "auto")};
  background-color: ${({ bgColor, nature, buttonType }) => {
    if (nature === "flat") {
      return bgColor ?? "#FFF";
    } else {
      if (bgColor) {
        return bgColor;
      } else {
        switch (buttonType) {
          case "primary":
            return "var(--primary-color)";
          case "danger":
            return "var(--red)";
          default:
            return "#FFF";
        }
      }
    }
  }};
  border: none;
  border-radius: 9px;
  cursor: pointer;
  color: ${({ nature, buttonType, color }) => {
    if (nature === "flat") {
      switch (buttonType) {
        case "primary":
          return "var(--primary-color)";

        default:
          return "var(--primary-color)";
      }
    } else {
      if (color) {
        return color;
      } else {
        if (buttonType) {
          return "#FFF";
        } else {
          return "var(--text-color)";
        }
      }
    }
  }};
  padding: ${(props) => (props.padding ? props.padding : "9px 15px")};
  margin: ${(props) => props.margin};
  transition: 0.3s all;

  &:hover {
    opacity: 0.8;
  }
`;
export function Button({
  onClick,
  style,
  padding,
  margin,
  buttonType,
  children,
  color,
  disabled,
  type
}) {
  return (
    <>
      <StyledButton
        onClick={onClick}
        buttonType={buttonType}
        padding={padding}
        margin={margin}
        style={style}
        color={color}
        disabled={disabled}
        type={type}
      >
        {children}
      </StyledButton>
    </>
  );
}
