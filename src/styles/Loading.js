import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Loading = styled.div.attrs({
    className: "loading"
})`
  display: inline-block;

  :after {
    content: " ";
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 4px solid #adadad;
    border-color: #adadad transparent #adadad
      transparent;
    animation: ${rotateAnimation} 1.2s linear infinite;
  }
`;
