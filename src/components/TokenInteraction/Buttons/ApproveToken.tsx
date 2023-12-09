import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useDebounce } from 'usehooks-ts'
import React, { useEffect } from 'react'
import { ERC721Contract } from '@/constants/ContractList'
import { Button, Error } from '../styled';
import { useDispatch } from 'react-redux';
import { setNewNftEvent } from '@/redux/globalSlice';

interface TokenInterface {
  tokenId: string,
  onSuccess: () => void;
}

export const ApproveToken: React.FC<TokenInterface> = ({ tokenId, onSuccess }) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    console.log(isLoading, isSuccess, isError);
    if (isSuccess) {
      alert('Transaction was successful!');
      console.log('Transaction detail: ', JSON.stringify(data))
      dispatch(setNewNftEvent({newNftEvent: 'Sell'}))
      onSuccess?.();
    }
    if (isError)
    {
      console.log('error', error)
    }
  }, [isSuccess, onSuccess]);

  return (
    <>
      <Button
        disabled={!write || isLoading}
        onClick={() => write?.()}>
        {isLoading ? 'Approving' : 'Approve'}
      </Button>
      {error && (
        <Error>An error occurred preparing the transaction. See console for details</Error>
      )}
    </>
  )
}
