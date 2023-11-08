import styled from "styled-components";


export const Button = styled.button`
  background-color: var(--color-secondary);
  border-radius: 20px;

  padding: 8px 20px;

  text-align: center;
  color: var(--color-primary);

  border: none;

  :has(div.loading) {
    padding: 4px 20px;
  }

  :disabled {
    filter: brightness(0.8);
    cursor: not-allowed;
  }
`;