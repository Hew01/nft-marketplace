import React from 'react';
import { ModalContent, Title, CardHolder, DimBackground, CardTitle, CardTitleLink, CloseButton } from './styled';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';
import { BuyToken } from '../TokenInteraction/Buttons/BuyToken';

interface NftModalProps {
    image: string,
    tokenId: string,
    price: string,
}

export const BuyTokenModal: React.FC<NftModalProps> = ({ image, tokenId, price }) => {
    const dispatch = useDispatch();
    return (
        <DimBackground>
            <ModalContent>
                <Title>Buy this Token?</Title>
                <CloseButton onClick={() => dispatch(closeModal())}><IoCloseOutline /></CloseButton>
                <CardHolder>
                    <img src={image as string} loading="lazy" width="500" height="500"
                        alt="preview" className="img-cover" />
                </CardHolder>
                <CardTitle>
                    <CardTitleLink>Kitten #{tokenId}
                    </CardTitleLink>
                </CardTitle>
                <span>Price:
                    &nbsp;{price} BCO
                </span>
                <BuyToken tokenId={tokenId} onSuccess={() => dispatch(closeModal())}/>
            </ModalContent>
        </DimBackground>
    );
}
