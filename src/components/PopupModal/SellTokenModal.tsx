import React from 'react';
import { ModalContent, Title, CardHolder, DimBackground, CardTitle, CardTitleLink, CloseButton } from './styled';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';
import { useReadContractOneArgs } from '@/hooks/useReadContractOneArg';
import { formatEther } from 'viem';
import { SellToken } from '../TokenInteraction/Buttons/SellToken';
import { RootState } from '@/redux/store';

interface NftModalProps {
    image: string,
    tokenId: string,
}

export const SellTokenModal: React.FC<NftModalProps> = ({ image, tokenId }) => {
    const dispatch = useDispatch();
    const {vaultGetPrice} = useReadContractOneArgs(tokenId);
    const allowance: bigint = useSelector((state: RootState) => state.global.allowance);
    if (allowance === BigInt(0))
        return <></>
    else return (
        <DimBackground>
            <ModalContent>
                <Title>Sell this Token?</Title>
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
                    &nbsp;{vaultGetPrice?.result ? formatEther(vaultGetPrice.result) : ''} BCO
                </span>
                <SellToken tokenId={tokenId} onSuccess={() => dispatch(closeModal())}/>
            </ModalContent>
        </DimBackground>
    );
}
