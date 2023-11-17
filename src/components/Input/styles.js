import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & + div {
    margin-top: 2rem;
  }

  input {
    font-size: 15px;
    color: #fff;
    line-height: 1.2;
    border: none;
    display: block;

    width: 100%;
    height: 45px;
    background-color: transparent;

    padding: 0 5px;

    &:focus {
      outline: 0;
    }

    & + .focusInput &:after {
      top: -15px;
    }

    & + .focusInput &:before {
      width: 100%;
    }
  }

  .focusInput {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    pointer-events: none;
    color: var(--color-text-gray);
  }
  .focusInput {
    &:before {
      content: "";
      display: block;
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;

      -webkit-transition: all 0.4s;
      -o-transition: all 0.4s;
      -moz-transition: all 0.4s;
      background: -webkit-linear-gradient(to left, var(--color-button-primary), var(--color-button-secondary));
      background: -o-linear-gradient(to left, var(--color-button-primary), var(--color-button-secondary));
      background: -moz-linear-gradient(to left, var(--color-button-primary), var(--color-button-secondary));
      background: linear-gradient(to left, var(--color-button-primary), var(--color-button-secondary));
    }
  }

  .focusInput {
    &:after {
      font-size: 15px;
      color: #999999;
      line-height: 1.2;

      content: attr(data-placeholder);

      display: block;
      width: 100%;
      position: absolute;
      top: 16px;
      left: 0;

      padding-left: 5px;

      -webkit-transition: all 0.4s;
      -o-transition: all 0.4s;
      -moz-transition: all 0.4s;
    }
  }

  .has-val {
    & + .focusInput {
      &:after {
        top: -15px;
      }
    }
  }

  .has-val {
    & + .focusInput {
      &:before {
        width: 100%;
      }
    }
  }

  .color-text-blue{
    color: var(--color-text-blue);
  }

`;
