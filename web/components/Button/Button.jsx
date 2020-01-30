import React from 'react';
import styled from '@emotion/styled';

const ButtonBase = styled.button`
  display: block;
  border-radius: 4px;
  padding: 8px;
  background-color: #00e676;
  border: none;
  box-shadow: 0 10px 25px rgba(79, 82, 177, 0.35);
  color: #fff;
  font-family: museo-slab, sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  transition: 0.25s ease-in-out background-color;
  white-space: nowrap;
  
  &:hover {
    background-color: #66ffa6;
  }
  
  &:disabled {
    background-color: #ccc;
    pointer-events: none;
  }
`;

export default function Button({ onClick, ...restProps }) {
  return (
    <ButtonBase
      {...restProps}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();

        onClick();
      }}
    />
  );
}