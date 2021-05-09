import styled from 'styled-components';
import { Header } from 'antd/lib/layout/layout';

export const StyledHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  text-align: center;

  h2 {
    color: white;
  }
`;
