import React from 'react';
import styled from "@emotion/styled";

const CARD_RADIUS = '8px';

const CardContainer = styled.div`
  padding: 16px;
`;

const CardBoundary = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(79, 82, 177, 0.35);
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: ${CARD_RADIUS};
  width: 100%;
  margin: auto;
`;

const Header = styled.header`
`;

const Content = styled.main`
  padding: 16px;
`;

// @NOTE Radii set here because overflow: hidden can not be set on card boundary
// due to avatar positioning.
const Footer = styled.footer`
  overflow: hidden;
  border-bottom-left-radius: ${CARD_RADIUS};
  border-bottom-right-radius: ${CARD_RADIUS};
`;

export default function Card({ header, children, footer, ...restProps }) {
  return (
    <CardContainer>
      <CardBoundary {...restProps}>
        {header && (
          <Header>
            {header}
          </Header>
        )}

        {children && (
          <Content>
            {children}
          </Content>
        )}

        {footer && (
          <Footer>
            {footer}
          </Footer>
        )}
      </CardBoundary>
    </CardContainer>
  );
}