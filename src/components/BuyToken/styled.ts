import styled from "styled-components";

export const Section = styled.section`
    padding-block: var(--section-padding);
`

export const Container = styled.div`
    display: block;
    padding-inline: 12px;
    @media (min-width: 575px) {
        max-width: 480px;
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

export const Title = styled.h2`
    color: var(--white);
    font-size: var(--headline-md);
    font-weight: var(--fw-600);
    line-height: 1.35;

    margin-block-end: 44px;
    text-align: center;
`

export const GridList = styled.ul`
    display: grid;
    gap: 32px;
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        gap: 24px;
    }
    @media (min-width: 992px) {
        grid-template-columns: repeat(3, 1fr); 
    }
    @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }
`

export const StyledLink = styled.a`
  margin-inline: auto;
  margin-block-start: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: max-content;
  color: var(--white);
  font-weight: var(--fw-600);
  letter-spacing: 0.5px;
  font-size: var(--title-md);
  &:hover {
    color: var(--blue-violet);
    cursor: pointer;
  }
  @media (min-width: 768px) {
    margin-block-start: 60px;
  }
`