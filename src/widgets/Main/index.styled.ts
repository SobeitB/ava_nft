import styled from 'styled-components';

export const MainWidget = styled.div`
  max-width: 400px;
  padding: 25px;
  background: #1d1d20;
  margin: 0 auto;
  position: relative;
  z-index: 0;
  top:150px;
  border-radius: 6px;
  
  @media (max-width: 420px) {
    margin: 0 10px;
  }
`