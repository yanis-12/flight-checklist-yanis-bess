// Header.jsx

import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(141deg, cyan 0%, rebeccapurple 40%, deeppink 90%);
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 40px; /* Ajustez la taille du logo selon vos besoins */
  height: 40px; /* Ajustez la taille du logo selon vos besoins */
`;

const Title = styled.h1`
  margin: 0;
  font-family: 'Oswald', sans-serif;
  font-size: 4vw;
  font-weight: 300;
  text-transform: uppercase;
`;

const Header = ({ logoSrc, title }) => {
  return (
    <HeaderContainer>
      {logoSrc && <Logo src={logoSrc} alt="Logo" />} {/* Afficher le logo si une source est fournie */}
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default Header;
