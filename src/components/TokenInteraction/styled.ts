import styled from "styled-components"

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

export const Button = styled.button`
    background-color: var(--blue-violet);
    color: var(--white);
    cursor: pointer;
    margin-top: 20px;

    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    font-size: var(--label-md);

    font-size: var(--body-md);
    font-weight: var(--fw-600);
    padding: 8px 20px;
    margin-inline: auto;
    border-radius: var(--radius-pill);
    transition: var(--transition-1);
    &:is(:hover, :focus-visible) {
        background-color: var(--electric-indigo);
    }
    &:disabled {
        background-color: var(--manatee);
        cursor: not-allowed;
    }
`

export const SetTokenPriceForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin: 0 auto;
`

export const Input = styled.input`
    padding: 10px;

    font-size: 1.8rem;
`

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--alice-blue);
  border-radius: 5px;
  padding-right: 15px;
`

export const InputText = styled.span`
  margin-left: 10px;
`


export const Error = styled.div`
    color: var(--maximum-red);
    text-align: center;
    margin-top: 15px;
`

