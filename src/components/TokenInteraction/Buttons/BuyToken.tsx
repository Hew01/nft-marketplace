import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useDebounce } from 'usehooks-ts'
import React, { useEffect } from 'react'
import { VaultContract } from '@/constants/ContractList'
import { Button, Error } from '../styled'
import { IoLogoUsd } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { setNewNftEvent } from '@/redux/globalSlice'

interface TokenInterface {
  tokenId: string,
  onSuccess: () => void,
}

export const BuyToken: React.FC<TokenInterface> = ({ tokenId, onSuccess }) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (isSuccess) {
      alert('Transaction was successful!');
      console.log('Transaction detail: ', JSON.stringify(data))
      dispatch(setNewNftEvent({newNftEvent: 'SellBuy'}))
      onSuccess?.();
    }
    if (isError) {
      console.error(error);
    }
  }, [isSuccess, onSuccess]);

  return (
    <>
      <Button
        disabled={!write || isLoading}
        onClick={() => write?.()}>
        <IoLogoUsd />
        {isLoading ? 'Buying' : 'Buy'}
      </Button>
      {error && (
        <Error>An error occurred preparing the transaction. See console for details</Error>
        )}
    </>
  )
}
