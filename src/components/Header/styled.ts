import { IoWalletOutline } from "react-icons/io5";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`;

export const StyledHeader = styled.header`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--oxford-blue-2);
    box-shadow: var(--shadow-1);
    padding-block: 16px;
    z-index: 4;
    &.active {
        position: fixed;
        animation: ${slideIn} 0.5s ease forwards;
    }
    @media (min-width: 992px) {
        background: none;
        box-shadow: none;
        &.active {
            background: var(--oxford-blue-2);
            box-shadow: var(--shadow-1);
        }
    }
`

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 575px) {
        max-width: unset;
        width: 100%;
        margin-inline: auto;
    }
    @media (min-width: 768px) {
        max-width: 768px;
    }
    @media (min-width: 992px) {
        max-width: 950px;
    }
    @media (min-width: 1200px) {
        max-width: 1120px;
    }
`

export const LogoSmall = styled.img`
    width: 40px;
    height: 40px;
    @media (min-width: 768px) {
        display: none;
    }
`

export const Logo = styled.img`
    width: 126px;
    height: 28px;
    display: none;
    @media (min-width: 768px) {
        display: block;
    }
`

export const Navbar = styled.nav`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 0;
    background-color: var(--oxford-blue-2);
    padding-inline: 16px;
    box-shadow: var(--shadow-1);
    z-index: 1;
    overflow: hidden;
    &.active { height: max-content; }
    @media (min-width: 992px) {
        all: unset;
        display: block;
        margin-inline: auto 24px;
        &.active {
            all: unset;
            display: block;
            margin-inline: auto 24px;
        }
    }
`

export const NavbarList = styled.ul`
    @media (min-width: 992px) {
        display: flex;
        gap: 12px;
    }
`

export const NavbarLink = styled.a`
    color: var(--white);
    font-weight: var(--fw-600);
    padding: 10px 13px;
`

export const HeaderAction = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    @media (min-width: 992px) {
        gap: 12px;
    }
`

export const IonWallet = styled(IoWalletOutline)`
    stroke-width: 50px;
    width: 20px;
    height: 20px;
`

export const NavToggleBtn = styled.button`
  font-size: 3.5rem;

  .default-icon {
    display: block;
  }

  .active-icon {
    display: none;
  }

  &.active {
    .default-icon {
      display: none;
    }

    .active-icon {
      display: block;
    }
  }
  @media (min-width: 992px) {
        display: none;
    }
`;

export const WalletButton = styled.button`
    height: 45px;
    display: flex;
    place-items: center;
    border-radius: 10px;
    border: 1px solid var(--blue-violet);
    background-color: var(--blue-violet);
    transition: var(--transition-1);
    &:is(:hover, :focus-visible) {
        background-color: var(--electric-indigo);
        border-color: var(--electric-indigo);
    }
`