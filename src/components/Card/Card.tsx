import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 230px;
  border-radius: 10px;
  box-shadow: 2px 2px #ccc;
  position: relative;

  &:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: 10px;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
  }

  &:hover:before {
    background-color: #000;
  }

  > div {
    opacity: 0;
    display: none;
  }

  &:hover > div {
    display: flex;
    animation: ${fadeIn} 200ms ease-in-out;
    opacity: 1;
  }

  img {
    object-fit: cover;
    border-radius: 10px;
    width: 100%;
    height: 230px;
  }
`;

export const CardPicture = styled.picture``;
export const CardImage = styled.img`
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out;
`;

export const CardInfo = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: 2rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: white;
`;

export const CardDescription = styled.span`
  text-transform: capitalize;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardUserName = styled.span`
  width: 100%;
  text-align: center;
  font-style: italic;
  position: relative;
  padding-top: 0.5rem;

  &:before {
    content: " ";
    position: absolute;
    height: 2px;
    background-color: white;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    width: 30%;
  }
`;

type CardButtonProps = { favorite: boolean };

export const CardButton = styled.button<CardButtonProps>`
  background-color: ${(props) => (props.favorite ? "white" : "transparent")};
  color: ${(props) => (props.favorite ? "black" : "white")};
  border-radius: 20px;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 200ms;
  border: 1px solid rgba(255, 255, 255, 0.7);
`;

export default Card;
