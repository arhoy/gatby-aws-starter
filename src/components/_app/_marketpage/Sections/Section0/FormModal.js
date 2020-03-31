import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Modal, Button } from 'antd';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 1.2rem;
`;

export const FormModal = ({ children }) => {
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
      <StyledButton type="primary" onClick={showModal}>
        Edit Product Form
      </StyledButton>
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
