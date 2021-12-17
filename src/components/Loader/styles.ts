import styled, { keyframes } from "styled-components";

const move = keyframes`
  0% {
    left: 1%;
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  80% {
    opacity: 1;
  }

  100% {
    left: 99%;
    opacity: 0;
  }
`;

export const LoaderBox = styled.div`
  margin-top: 5px;
  width: 100%;
  display: flex;
  position: relative;

  span:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  span:nth-of-type(3) {
    animation-delay: 0.4s;
  }

  span:nth-of-type(4) {
    animation-delay: 0.6s;
  }
`;

export const Dot = styled.span`
  opacity: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #4b6587;
  position: absolute;
  animation: ${move} 2s cubic-bezier(0.15, 0.56, 0.74, 0.35) infinite;
`;
