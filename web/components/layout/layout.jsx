import styled from "@emotion/styled";

export const FlexRow = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  
  & > * {
    margin: 0 8px;
  }
`;
