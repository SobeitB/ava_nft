import styled from 'styled-components'

export const ErrorBackground = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(28, 28, 28, 0.7);
  
  display: flex;
  padding-top:50px;
  justify-content: center;
`

export const Modal = styled.div`
  width: 450px;
  height: 250px;
  background-color: white;
  box-shadow: rgba(14, 18, 22, 0.35) 0px 10px 38px -10px, rgba(14, 18, 22, 0.2) 0px 10px 20px -15px;
  border-radius: 6px;
  padding: 25px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media(max-width: 450px) {
    width:90%;
  }
`

export const ModalTitle = styled.h1`
  color: rgb(205, 43, 49);
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`

export const ModalText = styled.p`
  color: hsl(252, 4.0%, 44.8%);
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  margin-top: 10px;
`

export const Next = styled.button`
  margin: 10px auto;
  border-radius: 4px;
  padding: 0 15px;
  height: 35px;
  cursor: pointer;

  color: hsl(120, 86%, 29%);
  text-align: center;
  font-size: 17px;
  font-weight: bold;

  box-shadow: hsl(120, 68%, 40%) 0px 0px 0px 2px;
`