import React from 'react';
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import {css} from "@emotion/core";

const colorStyle = props => css`
  color: ${props.color};
`;

export const Link = styled.a`
  color: #00f;
  text-decoration: initial;
  text-underline-position: under;
  
  ${colorStyle}
`;

export function RouteLink(props) {
  return (
    <Link as="span">
      <RouterLink {...props} />
    </Link>
  );
}