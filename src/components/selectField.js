import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 14px;
  background: transparent;
  width: ${({ width }) => {
    switch (width) {
      case "full":
        return "100%";
      case "small":
        return "100px";
      case "medium":
        return "190px";
      default:
        return width;
    }
  }};
  padding: 10px 10px;
  margin-top: 24px;
  margin-bottom: 24px;
`;
const StyledOption = styled.option`
  padding: 10px;
`;
const StyledLabel = styled.label`
  margin-bottom: 8px;
  display: block;
`;
export function Selectfield({
  onChange,
  value,
  selectOption,
  title,
  nestedOption = false,
  width = "full",
  name,
  disabled = false,
  required = false,
  childWork
}) {
  return (
    <>
      {title && <StyledLabel>{title} :</StyledLabel>}
      <StyledSelect
        width={width}
        value={`${value}` || ""}
        name={name}
        onChange={(e) => onChange(e)}
        disabled={disabled}
        required={required}
      >
        <StyledOption value=""></StyledOption>
        {selectOption &&
          selectOption.map((item, i) => (
            <StyledOption
              key={i}
              value={nestedOption ? childWork?  item.title: item.id : item}
            >
              {nestedOption ? item.name || item.title : item}
            </StyledOption>
          ))}
      </StyledSelect>
    </>
  );
}
