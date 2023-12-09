import styled from "styled-components";

export const SliderItem = styled.li`
    min-width: calc(100% / var(--slider-item));
    width: calc(100% / var(--slider-item));
    padding-inline: 12px;
    @media (min-width: 768px) {
        padding-inline: 12px; 
    }
`

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
`;


export const ItemCard = styled.div`
    padding: 12px;
    box-shadow: var(--shadow-1);
    background-color: var(--oxford-blue-2);
    border-radius: var(--radius-8);
    transition: var(--transition-1);
    &:is(:hover, :focus-within) {
        box-shadow: var(--shadow-3);
        transform: translateY(-8px);
  }
    &:is(:hover, :focus) {
    ${Button} {
        top: 55%;
    }
  }
`

export const CardBanner = styled.figure`
    border-radius: var(--radius-8);
    aspect-ratio: var(--width) / var(--height);
    background-color: var(--oxford-blue);
    overflow: hidden;
    position: relative;
    --width: 500;
    --height: 500;
    .img-cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition-2);
    }
`

export const CardContent = styled.div`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`

export const CardTitle = styled.h3`
    font-size: var(--title-md);
    margin-block-start: 12px;
`

export const CardTitleLink = styled.a`
    color: var(--white);
    font-weight: var(--fw-600);
    letter-spacing: 0.5px;
    font-size: var(--title-md);
`

export const CardAuthor = styled.p`
    display: flex;
    gap: 2px;
    font-style: italic;
    font-size: var(--label-md);
`

export const CardAuthorLink = styled.a`
    color: var(--white);
    font-weight: var(--fw-400);
    letter-spacing: 0.5px;
    font-size: var(--title-md);
    color: var(--blue-violet);
`

export const CardText = styled.p`
    margin-block-start: 4px;
`

export const SellButton = styled.button`
  padding: 0.5em 1.2em;
  background-color: var(--blue-violet);
  color: var(--white);
  max-width: max-content;
  font-weight: var(--fw-600);
  border-radius: var(--radius-pill);
`