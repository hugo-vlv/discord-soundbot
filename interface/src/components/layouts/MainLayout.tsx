import React from 'react';
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #222;
    color: #eee;
  }
`

interface Props {
    children?: JSX.Element | JSX.Element[];
}

const MainLayout = ({ children }: Props) => {
    return (
        <div>
            <GlobalStyle />
            {children}
        </div>
    );
}

export default MainLayout;