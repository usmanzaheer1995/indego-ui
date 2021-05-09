import styled from 'styled-components';

export const Container = styled.div`
  height: 90%;
`;

export const GridContainer = styled.div`
  height: 90%;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .ag-root-wrapper {
      overflow-y: auto;
    }
  }
`;

export const Filters = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
