import React from 'react';
import styled from '@emotion/styled';
import { S3Image } from 'aws-amplify-react';
import { Button } from 'antd';
import { centsToDollars } from '../../../../../utils/awsHelpers';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteProduct } from '../../../../../graphql/mutations';
import { FormModal } from './FormModal';
import { EditProductForm } from './EditProductForm';

const Container = styled.div`
  border-bottom: 1px black dashed;
  margin: 1rem 0;
  padding: 1rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  & button {
    margin-right: 4px;
    outline: none;
    border: none;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const StyledButton = styled(Button)`
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 1.2rem;
  &:hover,
  &:focus,
  &:active {
    background: ${props => props.theme.colors.red};
    color: white;
  }
`;

export const Product = ({ product }) => {
  // delete the product from AWS
  const deleteProductHandler = async () => {
    try {
      const input = {
        id: product.id,
      };
      console.log('I was deleted');
      const result = await API.graphql(
        graphqlOperation(deleteProduct, { input }),
      );
      console.log('delete success', result);
    } catch (error) {
      console.error('Could not delete product', error);
    }
  };

  return (
    <Container>
      <p>{product.description}</p>
      <p>${centsToDollars(product.price)}</p>
      <S3Image
        imgKey={product.file.key}
        theme={{ photoImg: { maxWidth: '100%', maxHeight: '100%' } }}
      />
      <ButtonContainer>
        <FormModal>
          <EditProductForm product={product} />
        </FormModal>
        <StyledButton onClick={deleteProductHandler}>
          Delete Product
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};
