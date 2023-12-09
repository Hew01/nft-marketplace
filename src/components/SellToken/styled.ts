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

export const TitleWrapper = styled.div`
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
`

export const SectionTitle = styled.h2`
    color: var(--white);
    font-size: var(--headline-md);
    font-weight: var(--fw-600);
    line-height: 1.35;

    margin-block-end: 44px;
    text-align: center;
`

export const ButtonLink = styled.a`
    display: none;
    align-items: center;
    gap: 4px;
    max-width: max-content;
    color: var(--white);
    font-weight: var(--fw-600);
    letter-spacing: 0.5px;

    margin-inline: auto;
    margin-block-start: 32px;

    @media (min-width: 768px) {
        display: flex;
        margin: 0;
    }

    &:hover {
        color: var(--blue-violet);
        cursor: pointer;
    }
`

export const Slider = styled.div`
    --slider-item: 1;
    position: relative;
    overflow: hidden;
    @media (min-width: 768px) {
        --slider-item: 2;
        margin-inline: -16px;
        padding-inline: 8px;
    }
    @media (min-width: 992px) {
        --slider-item: 3;
    }
    @media (min-width: 1200px) {
        --slider-item: 4;
    }
`

export const SliderContainer = styled.ul`
    position: relative;
    display: flex;
    transition: transform 300ms ease;
`

export const SliderButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--oxford-blue-2);
    font-size: 1.7rem;
    width: 32px;
    height: 32px;
    display: grid;
    padding: 0;
    place-items: center;
    border-radius: var(--radius-circle);
    box-shadow: var(--shadow-2);
    transition: var(--transition-1);
    &:is(:hover, :focus-visible) {
        background-color: var(--blue-violet);
    }
    &:disabled {
        display: none;
    }
    &.prev {
        left: 5px;
    }
    &.next {
        right: 5px;
    }
`