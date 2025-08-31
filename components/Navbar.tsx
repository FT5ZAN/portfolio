
import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import '../app/globals.css';

// Define props for Button component
interface ButtonProps {
  text: string;
}

// Dynamically import the Button component for CSR
const Button = dynamic(() => import('./Button'), { ssr: false });

// Hamburger component
const Checkbox: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  return (
    <StyledHamburger>
      <label className="hamburger">
        <input type="checkbox" onChange={onToggle} />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          />
          <path className="line" d="M7 16 27 16" />
        </svg>
      </label>
    </StyledHamburger>
  );
};

// Styled components for hamburger
const StyledHamburger = styled.div`
  .hamburger {
    cursor: pointer;
  }

  .hamburger input {
    display: none;
  }

  .hamburger svg {
    height: 3em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
                stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger input:checked + svg {
    transform: rotate(-45deg);
  }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`;

// Navbar component
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <StyledNav>
      <div className="nav-container">
        <Checkbox onToggle={toggleMenu} />
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <a href="#first" onClick={toggleMenu}>
              <Button text="Home" />
            </a>
          </li>
          <li>
            <a href="#outab" onClick={toggleMenu}>
              <Button text="About" />
            </a>
          </li>
          <li>
            <a href="#update" onClick={toggleMenu}>
              <Button text="Skills" />
            </a>
          </li>
          <li>
            <a href="#updates" onClick={toggleMenu}>
              <Button text="Projects" />
            </a>
          </li>
          <li>
            <a href="#updatrs" onClick={toggleMenu}>
              <Button text="Contact" />
            </a>
          </li>
        </ul>
      </div>
    </StyledNav>
  );
};

// Styled components for navbar
const StyledNav = styled.nav`
  background: #041118;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

export default Navbar;