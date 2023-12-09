import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ERC20Contract } from '@/constants/ContractList'
import { parseEther } from 'viem';
import { Button, Error, SectionText } from '../styled';
import { useEffect } from 'react';
import { setNewNftEvent } from '@/redux/globalSlice';
import { useDispatch } from 'react-redux';

export const ApproveAccount = () => {
    const NFTVaultContractAddress = '0xB37f99CAD2B7Dc870A2E4e385cbA1AD2E759Fd50';
    const { config } = usePrepareContractWrite({
        ...ERC20Contract,
        functionName: 'approve',
        args: [NFTVaultContractAddress, parseEther('10')],
    })
    const dispatch = useDispatch();
    const { write, data, error, isError } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    useEffect(() => {
        if (isSuccess) {
            alert('Transaction was successful!');
            console.log('Transaction detail: ', JSON.stringify(data))
            dispatch(setNewNftEvent({ newNftEvent: 'Buy' }))
        }
        if (isError) {
            console.error(error);
        }
    }, [isSuccess]);

    return (
        <>
            <SectionText>It seem like your account hasn't been approved yet.</SectionText>
            <Button disabled={!write || isLoading}
                    onClick={() => write?.()}>
                {isLoading ? 'Approving...' : 'Approve your account'}
            </Button>
            {error && (
                <Error>An error occurred preparing the transaction. See console for details</Error>
            )}
        </>
    )
}
