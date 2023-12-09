import React from 'react';
import { ModalContent, Title, CardHolder, DimBackground, CardTitle, CardTitleLink, CloseButton } from './styled';
import { SetPriceForm } from '../TokenInteraction/Form/SetPriceForm';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';

interface NftModalProps {
    image: string,
    tokenId: string,
    placeholder: string,
}

export const SetPriceModal: React.FC<NftModalProps> = ({ image, tokenId, placeholder }) => {
    const dispatch = useDispatch();
    return (
        <DimBackground>
            <ModalContent>
                <Title>Set Token Price</Title>
                <CloseButton onClick={() => dispatch(closeModal())}><IoCloseOutline /></CloseButton>
                <CardHolder>
                    <img src={image as string} loading="lazy" width="500" height="500"
                        alt="preview" className="img-cover" />
                </CardHolder>
                <CardTitle>
                    <CardTitleLink>Kitten #{tokenId}
                    </CardTitleLink>
                </CardTitle>
                <SetPriceForm tokenId={tokenId} placeholder={placeholder} onSuccess={() => dispatch(closeModal())}/>
            </ModalContent>
        </DimBackground>
    );
}
