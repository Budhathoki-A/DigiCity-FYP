import React from 'react'
import styled from 'styled-components';

import headerBg from "../assets/landing-layer-2.png";

const StyledTopLayer = styled.div`
  background-color: #20bbb7;
  background-image: url(${headerBg}),
    linear-gradient(135deg, #5e32ca 15%, #98059a 85%);
  background-position: right, 50%;
  background-repeat: no-repeat;
  background-size: cover, auto;
  color: #fefefe;
  max-height: 100px;
  display: flex;
  align-items: center;
  padding: 30px 20px;
  > h4 {
    font-size: 20px;
  }
`;
export function TopLayer({text}) {
    

    return (
        <>
        
        <StyledTopLayer>
          <h4>{text}</h4>
        </StyledTopLayer>    
        </>
    )
}
