import React, { useEffect, useState } from 'react';
import { ModalContent, Title, CardHolder, DimBackground, CardTitle, CardTitleLink, CloseButton, Button, Error } from './styled';
import { IoCloseOutline, IoLogoUsd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';
import { useDebounce } from 'usehooks-ts';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { VaultContract } from '@/constants/ContractList'
import Loader from '@/assets/images/Ellipsis-1s-200px_1.gif'
import { ToastContainer, toast } from 'react-toastify';
import { setNewNftEvent } from '@/redux/globalSlice';

interface NftModalProps {
    image: string,
    tokenId: string,
    price: string,
}

export const BuyTokenModal: React.FC<NftModalProps> = ({ image, tokenId, price }) => {
    const dispatch = useDispatch();

    //Set Render state
    const [current, setCurrent] = useState('Current');

    const debouncedTokenId = useDebounce(tokenId, 500);
    const { config } = usePrepareContractWrite({
        ...VaultContract,
        functionName: 'buyToken',
        args: [BigInt(debouncedTokenId)],
        enabled: Boolean(debouncedTokenId),
    })
    const { write, data, isError, error } = useContractWrite(config);
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    let toastId: any = null;
    useEffect(() => {
        toast.dismiss(toastId);
        if (isSuccess) {
            setCurrent('Success');
            toast.success("Successfully bought your token!")
            console.log('Transaction detail: ', JSON.stringify(data))
            dispatch(setNewNftEvent({ newNftEvent: 'SellBuy' }))
        }
        if (isError) {
            toast.error("There was an error in handling your case")
            setCurrent('Current');
        }
    }, [isSuccess, isError]);

    return (
        <>
            <ToastContainer />
            <DimBackground>
                <ModalContent>
                    {(current === 'Current') && (
                        <>
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
                            <Button
                                disabled={!write || isLoading}
                                onClick={() => {
                                    setCurrent('isLoading');
                                    toastId = toast.loading("Doing your transaction...");
                                    write?.()
                                }}>
                                <IoLogoUsd />
                                {isLoading ? 'Buying' : 'Buy'}
                            </Button>
                            {error && (
                                <Error>An error occurred preparing the transaction. See console for details</Error>
                            )}
                        </>
                    )}
                    {(current === 'isLoading') && (
                        <>
                            <Title style={{ color: 'white' }}>Doing your transaction...</Title>
                            <img src={Loader} />
                        </>
                    )}
                    {(current === 'Success') && (
                        <>
                            <Title style={{ color: 'green' }}>Your Token has been Approved!</Title>
                            <Button onClick={() => dispatch(closeModal())}>Close</Button>
                        </>
                    )}
                </ModalContent>
            </DimBackground>
        </>
    );
}
