import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { Product } from './Product';
import { ProductsContext } from '../../../../../context/products-context';

const Container = styled.div``;

export const Products = () => {
  const [market, setMarket] = useContext(ProductsContext);
  const products = market.products.items;

  return (
    <Container>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </Container>
  );
};
