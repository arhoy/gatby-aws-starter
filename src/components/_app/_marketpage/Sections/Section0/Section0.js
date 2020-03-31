import React from 'react';
import styled from '@emotion/styled';
import { Container1200 } from '../../../../reusableStyles/sections/Sections';
import { H3 } from '../../../../reusableStyles/typography/Typography';
import { ProductTabs } from './ProductTabs';

const CustomSection = styled.div`
  margin: 3rem 3rem;
  @media (max-width: ${props => props.theme.screenSize.mobileL}) {
    margin: 1rem 0;
  }
`;

const Button = styled.button`
  outline: none;
  border: none;
  padding: 4px 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    filter: brightness(0.95);
  }
`;

export const Section0 = ({ market, isOwner }) => {
  return (
    <CustomSection>
      <Container1200>
        <H3>{market.name}</H3>
        <p>Created By: {market.owner}</p>
        <p>Listed Under: {market.tags[0]}</p>
        <p>Created: {market.createdAt}</p>
        {!isOwner && <Button> Add New Product</Button>}
      </Container1200>
      <Container1200>
        <ProductTabs isOwner={isOwner} market={market} />
      </Container1200>
    </CustomSection>
  );
};
