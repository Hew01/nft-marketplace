import styled from 'styled-components';

export const DimBackground = styled.div`
    background-color: rgba(0,0,0,0.5);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    position: fixed;

`

export const ModalContent = styled.div`
    max-width: 400px;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 35px 50px;
    transform: translate(-50%, -50%);
    z-index: 9999;

    background-color: var(--oxford-blue-2);
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
    border-radius: 15px;     

    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;


`;

export const Title = styled.h1`
    color: var(--blue-violet);
    font-weight: var(--fw-700);
    font-size: var(--headline-md);
    margin-bottom: 30px;
    text-align: center;
`

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background-color: transparent;
    font-size: 20px;
    cursor: pointer;
`;

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

export const CardHolder = styled.div`
    --width: 500px;
    --height: 500px;
    position: relative;
    border-radius: var(--radius-8);
    aspect-ratio: var(--width) / var(--height);
    background-color: var(--oxford-blue);
    overflow: hidden;
    margin-bottom: 30px;
    .img-cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition-2);
    }
`

export const UpdateButton = styled.button`
    border-radius: 15px;
    background-color: var(--blue-violet);
    width: 100%;
    margin: 10px 0;
`

export const DisconnectButton = styled.button`
    border-radius: 15px;
    background-color: var(--maximum-red);
    width: 100%;
    margin: 10px 0;
`

export const ButtonContent = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    max-width: max-content;
    margin: auto;
`

export const CardTitle = styled.h3`
    font-size: var(--title-md);
    margin-block-start: 12px;
    margin-block-end: 12px;
`

export const CardTitleLink = styled.a`
    color: var(--white);
    font-weight: var(--fw-600);
    letter-spacing: 0.5px;
    font-size: var(--title-lg);
    &:hover {
        color: var(--blue-violet);
        cursor: pointer;
    }
`
export const Error = styled.div`
    color: var(--maximum-red);
    text-align: center;
    margin-top: 15px;
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

