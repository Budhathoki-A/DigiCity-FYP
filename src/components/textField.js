import styled from "styled-components";

const InputDiv = styled.div`
  width: ${({ width }) => {
    switch (width) {
      case "full":
        return "100%";
      case "small":
        return "70px";
      default:
        return width;
    }
  }};
  display: ${(props) =>
    props.inline ? "inline-block" : props.flex ? "flex" : "block"};
  margin-top: 24px;
  margin-bottom: 24px;
  margin-right: ${(props) => (props.inline ? "24px" : "0px")};
  overflow: hidden;
`;

const Input = styled.input`
  font-size: 14px;
  background: transparent;
  margin: ${(props) => (props.margin ? `${props.margin}` : "0")};
  width: ${(props) => (props.inputWidth ? `${props.inputWidth}` : "100%")};
  padding: ${(props) => (props.border ? "10px" : "")} 10px 10px
    ${(props) => (props.border ? "10px" : "")};
  border: none;
  border-bottom: 0.75px solid #000;

  border-radius: 2px;
  display: block;
  &::placeholder {
    color: #9c9797;
  }
`;

const InputLabel = styled.label`
  margin-bottom: 8px;
  display: block;
`;

function TextField({
  border = false,
  type = "text",
  name,
  placeholder,
  onChange,
  width = "full",
  title,
  value,
  img = false,
  flex = false,
  inputWidth = false,
  min = false,
  required = false,
  disabled = false,
  minLength = false,
  autoComplete,
  onWheel,
  margin,
}) {
  //turn off mouse scroll to increase number
  document.addEventListener("wheel", function (event) {
    if (document.activeElement.type === "number") {
      document.activeElement.blur();
    }
  });

  return (
    <>
      <InputDiv width={width} flex={flex} inline={img ? true : false}>
        {title && <InputLabel>{title} : </InputLabel>}
        <Input
          border={border}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          inputWidth={inputWidth}
          min={min ? min : undefined}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          onWheel={onWheel}
          margin={margin}
          minLength={minLength ? minLength : ""}
          checked={type === "checkbox" ? value : ""}
        />
      </InputDiv>
    </>
  );
}

export default TextField;
