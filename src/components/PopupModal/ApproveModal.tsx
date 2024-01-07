import React, { useEffect, useState } from 'react';
import { ModalContent, Title, CardHolder, DimBackground, CardTitle, CardTitleLink, CloseButton, Button, Error } from './styled';
import { ERC721Contract } from '@/constants/ContractList'
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';
import Loader from '@/assets/images/Ellipsis-1s-200px_1.gif'
import { useDebounce } from 'usehooks-ts';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { setNewNftEvent } from '@/redux/globalSlice';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface NftModalProps {
    image: string,
    tokenId: string,
}

export const ApproveModal: React.FC<NftModalProps> = ({ image, tokenId }) => {
    const dispatch = useDispatch();

    //Set Render state
    const [current, setCurrent] = useState('Current');

    //Setup Contract
    const debouncedTokenId = useDebounce(tokenId, 500);
    const NFTVaultContractAddress = '0xB37f99CAD2B7Dc870A2E4e385cbA1AD2E759Fd50';
    const { config } = usePrepareContractWrite({
        ...ERC721Contract,
        functionName: 'approve',
        args: [NFTVaultContractAddress, BigInt(debouncedTokenId)],
        enabled: Boolean(debouncedTokenId),
    })
    const { write, data, isError, error } = useContractWrite(config);
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    //Handle notification with the contract state
    let toastId: any = null;
    useEffect(() => {
        toast.dismiss(toastId);
        if (isSuccess) {
            setCurrent('Success');
            toast.success("Successfully approved your token!")
            console.log('Transaction detail: ', JSON.stringify(data))
            dispatch(setNewNftEvent({ newNftEvent: 'Sell' }))
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
                            <Button
                                disabled={!write || isLoading}
                                onClick={() => {
                                    setCurrent('isLoading');
                                    toastId = toast.loading("Approving...");
                                    write?.();
                                }}>
                                {isLoading ? 'Approving' : 'Approve'}
                            </Button>
                            {error && (
                                <Error>An error occurred preparing the transaction. See console for details</Error>
                            )}
                        </>
                    )}
                    {(current === 'isLoading') && (
                        <>
                            <Title style={{ color: 'white' }}>Approving your token...</Title>
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
    )
};
