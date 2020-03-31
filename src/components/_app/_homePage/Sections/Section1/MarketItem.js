import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import { TagContainer, Tag } from '../../../../reusableStyles/tags/Tag';

const Container = styled(Link)`
  color: ${props => props.theme.colors.black};
  background: ${props => props.theme.colors.lightgrey};
  display: grid;
  margin: 1.25rem 0;
  padding: 0.6rem;
  &:hover {
    -webkit-box-shadow: 10px 11px 8px -5px rgba(0, 0, 0, 0.08);
    -moz-box-shadow: 10px 11px 8px -5px rgba(0, 0, 0, 0.08);
    box-shadow: 10px 11px 8px -5px rgba(0, 0, 0, 0.08);
  }
  & h4 {
  }
  & p {
  }
`;

const TitleContainer = styled.div``;

export const MarketItem = ({ data }) => {
  return (
    <Container to={`/app/markets/${data.id}`}>
      <TitleContainer>
        <h4>{data.name}</h4>
        <h6>Created By: {data.owner}</h6>
        <p>Listed: {data.createdAt.substring(0, 10)}</p>
      </TitleContainer>
      <TagContainer>
        <Tag>{data.tags && data.tags[0]}</Tag>
      </TagContainer>
    </Container>
  );
};
