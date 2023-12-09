import { IoBasket } from 'react-icons/io5';
import styled from 'styled-components';

export const Button = styled.button`
  background-color: var(--blue-violet);
  color: var(--white);
  max-width: max-content;
  font-weight: var(--fw-600);
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  font-size: var(--label-md);
  position: absolute;
  top: calc(100% + 50px);
  left: 50%;
  transform: translate(-50%, -50%);
  transition: var(--transition-2);
  z-index: 1;
  &:is(:hover, :focus-visible) { 
    background-color: var(--electric-indigo);
  }
  &:disabled {
        background-color: var(--manatee);
        cursor: not-allowed;
    }
`;

export const Card = styled.div`
  padding: 8px;
  border: 1px solid var(--gunmetal);
  box-shadow: var(--shadow-5);
  transition: var(--transition-1);
  background-color: var(--oxford-blue-2);
  border-radius: var(--radius-8);
  &:is(:hover, :focus-within) {
    box-shadow: var(--shadow-3);
    transform: translateY(-8px);
  }
  &:is(:hover, :focus) {
    ${Button} {
        top: 50%;
    }
  }
`;

export const CardBanner = styled.figure`
  --width: 500px;
  --height: 500px;
  position: relative;
  border-radius: var(--radius-8);
  aspect-ratio: var(--width) / var(--height);
  background-color: var(--oxford-blue);
  overflow: hidden;
  .img-cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition-2);
  }
  .img {
        height: auto;
    }
`;



export const CardProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-block-start: 12px;

  .img {
    border-radius: var(--radius-circle);
  }
`;

export const BasketIcon = styled(IoBasket)`
    font-size: 2.2rem;
`

export const CardTitleContainer = styled.div`
    margin: 12px 5px;
    display: flex;
    justify-content: space-between;
`

export const CardTitle = styled.h3`
  font-size: var(--title-sm);
`;

export const StyledLink = styled.a`
  &:hover {
    color: var(--blue-violet);
    cursor: pointer;
  }
`

export const CardMeta = styled.div`
  background-color: var(--prussian-blue);
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-radius: var(--radius-8);
`;

export const CardPrice = styled.div`
  color: var(--white);
  display: flex;
  gap: 4px;
  font-weight: var(--fw-500);
`;

export const Countdown = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  min-width: max-content;
  background-image: var(--linear-gradient-2);
  color: var(--white);
  font-weight: var(--fw-700);
  padding: 4px 16px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TooltipText = styled.span`
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    position: absolute;
    bottom: 100%;
    right: 50%;
    margin-right: -40px;
    opacity: 0;
    transition: opacity 0.3s;
`;

export const TooltipContainer = styled.div`
    position: relative;
    display: inline-block;
    cursor: pointer;

    &:hover ${TooltipText} {
        visibility: visible;
        opacity: 1;
        z-index: 10;
    }
`;
