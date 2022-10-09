import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  padding: 0 5px;
  margin:0 auto;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ButtonCounter = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid hsl(252, 56.0%, 57.5%);
  background: none;
  cursor: pointer;
  border-radius:50%;
  
  color:hsl(252, 56.0%, 57.5%);
  font-weight: bolder;
  font-size: 16px;
`