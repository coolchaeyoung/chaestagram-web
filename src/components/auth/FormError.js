import React from "react";
import styled from "styled-components";

const SFormError = styled.span`
  margin: ${(props) => props.margin};
  color: tomato;
  font-weight: 600;
  font-size: 12px;
`;

const FormError = ({ message, margin }) => {
  return message === "" || !message ? null : (
    <SFormError margin={margin}>{message}</SFormError>
  );
};

export default FormError;
