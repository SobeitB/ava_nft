import { createGlobalStyle } from 'styled-components'
import computer_1920 from './background/1920x900.png'
import computer_1200 from './background/1200x900.png'
import tablet_920 from './background/992x900.png'
import tablet_768 from './background/768x900.png'
import mobile_650 from './background/650х900.png'
import mobile_480 from './background/480x900.png'
import mobile_320 from './background/320x900.png'


export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
  }

  a{
    text-decoration: none;
  }

  li{
    list-style-type:none;
  }

  html, body {
    height: 100%;
    overflow: hidden;
  }


  #root{
    min-height: 100%;
  }

  main{
    flex: 1 1 auto;
  }
  
  body {
    background-image:url(${computer_1920});
    background-position: 50% 50%;
    background-size: 100% 100%;
    //display: flex;
    //align-items: center;
    //justify-content: center;
  }

  .container{
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (max-width: 1200px) {
    .container{
      max-width: 992px;
    }
    
    body {
      background-image: url(${computer_1200});
    }  
  }
  @media (max-width: 992px) {
    .container{
      max-width: 768px;
    }

    body {
      background-image: url(${tablet_920});
    }
  }
  @media (max-width: 768px) {
    .container{
      max-width: 480px;
    }

    body {
      background-image: url(${tablet_768});
    }
  }

  @media (max-width: 650px) {
    body {
      background-image: url(${mobile_650});
    }
  }
  
  @media (max-width: 480px) {
    #root{
      margin: 150px 10px;  
    }
    
    .container{
      max-width: 320px;
    }

    body {
      background-image: url(${mobile_480});
    }
  }
  
  @media (max-width: 320px) {
    .container{
      max-width: none;
    }

    body {
      background-image: url(${mobile_320});
    }
  }
`