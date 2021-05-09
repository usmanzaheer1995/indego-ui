import React from 'react';
import { Link } from 'react-router-dom';

import { StyledHeader } from './index.styled.component';

export function Header() {
  return (
    <StyledHeader>
      <Link to='/'>
        <h2>
          Indego
        </h2>
      </Link>
    </StyledHeader>
  )
}
