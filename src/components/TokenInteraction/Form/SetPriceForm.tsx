import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useDebounce } from 'usehooks-ts'
import React, { useEffect, useState } from 'react'
import { VaultContract } from '@/constants/ContractList'
import { Button, Error, Input, InputGroup, InputText, SetTokenPriceForm } from '../styled'
import { useDispatch } from 'react-redux'
import { setNewNftEvent } from '@/redux/globalSlice'
import { parseEther } from 'viem'

interface TokenInterface {
  tokenId: string,
  placeholder: string,
  onSuccess: () => void,
}

export const SetPriceForm: React.FC<TokenInterface> = ({ tokenId, placeholder, onSuccess }) => {
  const [price, setPrice] = useState('')
  const debouncedTokenId = useDebounce(tokenId, 500)
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (isSuccess) {
      alert('Transaction was successful!');
      console.log('Transaction detail: ', JSON.stringify(data))
      dispatch(setNewNftEvent({ newNftEvent: 'SellBuy' }))
      onSuccess?.();
    }
    if (isError) {
      console.error(error);
    }
  }, [isSuccess, onSuccess]);


  return (
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
              onClick={() => write?.()}>
        {isLoading ? 'Setting price...' : 'Set price'}
      </Button>
      {error && (
        <Error>An error occurred preparing the transaction. See console for details</Error>
      )}
    </SetTokenPriceForm>

  )
}
