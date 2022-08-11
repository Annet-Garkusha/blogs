import { Alert, Spin } from 'antd';
import React from 'react';

const Spinner = () => (
  <Spin tip="Loading...">
    <Alert message="Loading page..." type="info" style={{ marginTop: '20px' }} />
  </Spin>
);

export { Spinner };
