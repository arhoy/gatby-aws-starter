import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Modal, Button } from 'antd';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalForForm = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Container>
      <Button type="primary" onClick={showModal}>
        Create New Market
      </Button>
      <Modal
        title="Create New Market"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </Container>
  );
};
