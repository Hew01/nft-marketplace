import React from 'react';
import { ModalContent, Title, CardHolder, DimBackground, CardTitle, CardTitleLink, CloseButton } from './styled';
import { ApproveToken } from '../TokenInteraction/Buttons/ApproveToken';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';

interface NftModalProps {
    image: string,
    tokenId: string,
}

export const ApproveModal: React.FC<NftModalProps> = ({ image, tokenId }) => {
    const dispatch = useDispatch();
    return (
        <DimBackground>
            <ModalContent>
                <Title>Approve Token?</Title>
                <CloseButton onClick={() => dispatch(closeModal())}><IoCloseOutline /></CloseButton>
                <CardHolder>
                    <img src={image as string} loading="lazy" width="500" height="500"
                        alt="preview" className="img-cover" />
                </CardHolder>
                <CardTitle>
                    <CardTitleLink>Kitten #{tokenId}
                    </CardTitleLink>
                </CardTitle>
                <ApproveToken tokenId={tokenId} onSuccess={() => dispatch(closeModal())}/>
            </ModalContent>
        </DimBackground>
    );
}
