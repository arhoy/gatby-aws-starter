import React, { useEffect, useContext } from 'react';

// styling
import styled from '@emotion/styled';
import { Button } from 'antd';

// aws
import { API, graphqlOperation } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
import { deleteProduct } from '../../../../../graphql/mutations';

// utils
import { centsToDollars } from '../../../../../utils/awsHelpers';

// context
import { UserContext } from '../../../../../context/user-context';

// components
import { EditFormModal } from './EditFormModal';
import { onDeleteProduct } from '../../../../../graphql/subscriptions';
import { ProductsContext } from '../../../../../context/products-context';

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
  // context
  const [market, setMarket] = useContext(ProductsContext);
  const user = useContext(UserContext);
  const owner = user.sub;

  useEffect(() => {
    const deleteProductListener = API.graphql(
      graphqlOperation(onDeleteProduct, { owner }),
    ).subscribe({
      next: productData => {
        const deleteProduct = productData.value.data.onDeleteProduct;
        setMarket(prevMarket => {
          const updatedProducts = prevMarket.products.items.filter(
            product => product.id !== deleteProduct.id,
          );
          return { ...market, products: { items: updatedProducts } };
        });
      },
    });

    // cleanup
    return () => {
      deleteProductListener.unsubscribe();
    };
  }, [market]);

  // delete the product from AWS
  const deleteProductHandler = async () => {
    try {
      const input = {
        id: product.id,
      };
      await API.graphql(graphqlOperation(deleteProduct, { input }));
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
        <EditFormModal product={product} owner={owner} />
        <StyledButton onClick={deleteProductHandler}>
          Delete Product
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};
