import React, {createRef, useState} from 'react';
import styled from '@emotion/styled';

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 5px);
  z-index: 999;
`;

const Label = styled.label`
  text-align: left;
  position: relative;
  display: block;
  margin-top: 16px;
  
  &:first {
    margin-top: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    background-color: #ccc;
    height: 3px;
    
    transition: background-color 0.1s ease-in-out;
  }
  
  &:focus-within {
    &:after {
      background-color: #333;
    }
  }
`;

const LabelText = styled.p`
  margin: 0;
`;

const inputStyles = `
  padding: 8px;
  font-size: 16px;
  margin-bottom: 16px;
  width: 100%;
  border: none;
  margin: 0;
  outline: none;
`;

// @TODO Should display outline only on keyboard navigation
const InputBase = styled.input`
  ${inputStyles}
`;

const TextAreaBase = styled.textarea`
  ${inputStyles}

  resize: none;
`;

// @TODO add validation and error display
export default function Input({ label, type, onChange, onFocus, onBlur, tooltip, placeholder = 'Enter value', ...restProps }) {
  const { rows } = restProps;
  const [focused, setFocus] = useState(false);

  const InputComponent = rows && rows > 1 ? TextAreaBase : InputBase;
  const containerRef = createRef();

  return (
    <Label ref={containerRef}>
      <LabelText>
        {label}
      </LabelText>

      <InputComponent
        {...restProps}
        placeholder={placeholder}
        onChange={onChange ? ({ target }) => onChange(target.value) : undefined}
        onFocus={() => {
          setFocus(true);

          if (onFocus) onFocus();
        }}
        onBlur={({ target }) => {
          if (!containerRef.current.contains(target)) {
            setFocus(false);

            if (onBlur) onBlur(target.value);
          }
        }}
      />

      {tooltip && focused && (
        <Tooltip>
          {tooltip}
        </Tooltip>
      )}
    </Label>
  );
}