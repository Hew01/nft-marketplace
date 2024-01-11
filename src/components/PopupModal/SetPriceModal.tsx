import React, { useEffect, useState } from 'react';
import { ModalContent, Title, CardHolder, DimBackground, CardTitle, CardTitleLink, CloseButton, SetTokenPriceForm, InputGroup, Input, InputText, Button, Error } from './styled';
import Loader from '@/assets/images/Ellipsis-1s-200px_1.gif'
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';
import { useDebounce } from 'usehooks-ts';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { VaultContract } from '@/constants/ContractList'
import { parseEther } from 'viem';
import { ToastContainer, toast } from 'react-toastify';
import { setNewNftEvent } from '@/redux/globalSlice';

interface NftModalProps {
    image: string,
    tokenId: string,
    placeholder: string,
}

export const SetPriceModal: React.FC<NftModalProps> = ({ image, tokenId, placeholder }) => {
    const dispatch = useDispatch();

    //Set Render state
    const [current, setCurrent] = useState('Current');

    //Setup Contract
    const [price, setPrice] = useState('')
    const debouncedTokenId = useDebounce(tokenId, 500)

    const { config } = usePrepareContractWrite({
        ...VaultContract,
        functionName: 'setPrice',
        args: [[BigInt(debouncedTokenId)], [parseEther(price)]],
        enabled: Boolean(debouncedTokenId),
    })
    const { write, data, isError, error } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    //Handle notification with the contract state
    let toastId: any = null;
    useEffect(() => {
        toast.dismiss(toastId);
        if (isSuccess) {
            setCurrent('Success');
            toast.success("Successfully set your token price!")
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
                            <SetTokenPriceForm
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    write?.()
                                }}>
                                <label htmlFor="pricing">Set Token price</label>
                                <InputGroup>
                                    <Input
                                        id="pricing"
                                        type="number"
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder={placeholder}
                                        value={price}
                                    />
                                    <InputText>BCO</InputText>
                                </InputGroup>
                                <Button disabled={!write || isLoading}
                                    onClick={() => {
                                        setCurrent('isLoading');
                                        toastId = toast.loading("Setting the price...");
                                        write?.()
                                    }}>
                                    {isLoading ? 'Setting price...' : 'Set price'}
                                </Button>
                                {error && (
                                    <Error>An error occurred preparing the transaction. See console for details</Error>
                                )}
                            </SetTokenPriceForm>
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
