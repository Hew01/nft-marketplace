import React, { useEffect, useState } from 'react';
import { ModalContent, Title, CardHolder, DimBackground, CardTitle, CardTitleLink, CloseButton, Button, Error } from './styled';
import { IoCloseOutline, IoLogoUsd } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';
import { useReadContractOneArgs } from '@/hooks/useReadContractOneArg';
import { formatEther } from 'viem';
import Loader from '@/assets/images/Ellipsis-1s-200px_1.gif'
import { useDebounce } from 'usehooks-ts';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { VaultContract } from '@/constants/ContractList'
import { ToastContainer, toast } from 'react-toastify';
import { setNewNftEvent } from '@/redux/globalSlice';

interface NftModalProps {
    image: string,
    tokenId: string,
}

export const SellTokenModal: React.FC<NftModalProps> = ({ image, tokenId }) => {
    const dispatch = useDispatch();

    //Set Render state
    const [current, setCurrent] = useState('Current');

    //Setup Contract
    const debouncedTokenId = useDebounce(tokenId, 500);
    const { config } = usePrepareContractWrite({
        ...VaultContract,
        functionName: 'sellToken',
        args: [BigInt(debouncedTokenId)],
        enabled: Boolean(debouncedTokenId),
    })
    const { write, data, error, isError } = useContractWrite(config);
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    //Handle notification with the contract state
    let toastId: any = null;
    useEffect(() => {
        toast.dismiss(toastId);
        if (isSuccess) {
            setCurrent('Success');
            toast.success("Successfully sold your token!")
            console.log('Transaction detail: ', JSON.stringify(data))
            dispatch(setNewNftEvent({ newNftEvent: 'SellBuy' }))
        }
        if (isError) {
            toast.error("There was an error in handling your case")
            setCurrent('Current');
        }
    }, [isSuccess, isError]);

    const { vaultGetPrice } = useReadContractOneArgs(tokenId);
    return (
        <>
        <ToastContainer />
        <DimBackground>
            <ModalContent>
                {(current === 'Current') && (
                    <>
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
                        <Button
                            disabled={!write || isLoading}
                            onClick={() => {
                                setCurrent('isLoading');
                                toastId = toast.loading("Approving...");
                                write?.()
                            }}>
                            <IoLogoUsd />
                            <span>{isLoading ? 'Selling' : 'Sell'}</span>
                        </Button>
                        {error && (
                            <Error>An error occurred preparing the transaction. See console for details</Error>
                        )}
                    </>
                )}
                {(current === 'isLoading') && (
                    <>
                        <Title style={{ color: 'white' }}>Selling your token...</Title>
                        <img src={Loader} />
                    </>
                )}
                {(current === 'Success') && (
                    <>
                        <Title style={{ color: 'green' }}>Your Token has been Sold!</Title>
                        <Button onClick={() => dispatch(closeModal())}>Close</Button>
                    </>
                )}
            </ModalContent>
        </DimBackground>
        </>
    );
}
