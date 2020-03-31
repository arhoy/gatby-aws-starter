import React from 'react';
import styled from '@emotion/styled';
import { Tabs } from 'antd';

import { PlusSquareOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Products } from './Products';
import { NewProductForm } from './NewProductForm';
const { TabPane } = Tabs;
const Container = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.lightgrey};
  font-size: 1.5rem;
`;

export const ProductTabs = ({ market }) => {
  return (
    <Container>
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <PlusSquareOutlined />
              Add Product
            </span>
          }
          key="1"
        >
          <NewProductForm marketId={market.id} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <AppstoreOutlined />
              Products {`(${market.products && market.products.items.length})`}
            </span>
          }
          key="2"
        >
          <Products products={market.products.items} />
        </TabPane>
      </Tabs>
    </Container>
  );
};
