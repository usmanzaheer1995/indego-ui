import styled from 'styled-components';
import Spin from 'antd/lib/spin';

export const StyledSpinner = styled(Spin)`
  position: absolute;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
