import React from 'react';
import LoaderSpinner from "react-loader-spinner";
import styled from "@emotion/styled";

const LoaderWrapper = styled.div`
  text-align: center;
`;

export default function Loader({ text }) {
  return (
    <LoaderWrapper>
      <LoaderSpinner type="Rings" color="#ccc" />

      {text && (<p>{text}</p>)}
    </LoaderWrapper>
  );
}