import styled from "styled-components";

export const StyledHero = styled.section`
    position: relative;
    --section-padding: 180px 64px;
    text-align: center;
    padding-block: var(--section-padding);
    @media (min-width: 768px) {
        --section-padding: 240px 80px;
    }
`

export const Container = styled.div`
    display: block;
    padding-inline: 12px;
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

export const Title = styled.h1`
    color: var(--white);
    font-size: var(--headline-lg);
    font-weight: var(--fw-700);
    line-height: 1.35;
`

export const SpecialSpan = styled.span`
    display: inline;
    background-image: var(--linear-gradient-2);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

export const SectionText = styled.p`
    color: var(--white);
    opacity: 0.7;
    margin-block: 16px 32px;
    font-size: var(--body-lg);
    @media (min-width: 768px) {
        max-width: 575px;
        margin-inline: auto;
    }
`

export const ExploreBtn = styled.a`
    background-color: var(--blue-violet);
    color: var(--white);
    cursor: pointer;

    font-size: var(--body-md);
    font-weight: var(--fw-600);
    padding: 8px 20px;
    margin-inline: auto;
    border-radius: var(--radius-pill);
    display: flex;
    align-items: center;
    gap: 4px;
    transition: var(--transition-1);
    &:is(:hover, :focus-visible) {
        background-color: var(--electric-indigo);
    }
`

export const ButtonContent = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    max-width: max-content;
    margin: auto;
`