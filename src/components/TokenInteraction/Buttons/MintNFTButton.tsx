import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useDebounce } from 'usehooks-ts'
import React, { useEffect, useState } from 'react'
import { ERC721Contract } from '@/constants/ContractList'
import { Button, Error } from '../styled'
import localForage from 'localforage'
import { useDispatch } from 'react-redux'
import { setNewNftEvent } from '@/redux/globalSlice'

interface TokenInterface {
  img: File | null,
  src: string | ArrayBuffer | null,
  onSuccess?: () => void
}

export const MintNFTButton: React.FC<TokenInterface> = ({ img, src, onSuccess }) => {
  const [tokenId, setTokenId] = useState<number | null>(null);
  const {address} = useAccount();
  const dispatch = useDispatch();
  useEffect(() => {
    if (img !== null) {
      const fileName = (img.name as string);
      let start = fileName.lastIndexOf('_') + 1;
      let end = fileName.lastIndexOf('.');
      const baseName = fileName.substring(start, end);
      setTokenId(parseInt(baseName));
    }
  }, [img]);

  const handleCreate = async () => {
    console.log(img)
    let value = {
      image: src,
      id: tokenId,
    }
    let jsonValue = JSON.stringify(value);
      await
    localForage.setItem(`key${tokenId}`, jsonValue)

    var storedValue = await localForage.getItem(`key${tokenId}`);
    if (storedValue === jsonValue) {
      console.log('Item was successfully set in localForage');
    } else {
      console.log('Failed address set item in localForage');
    }

    await handleCreateOnDB();

    let parsedValue = JSON.parse(jsonValue);
    console.log(parsedValue);
  }

  const handleCreateOnDB = async () => {
    try {
      // Fetch the document with the highest ID
      const response = await fetch('http://localhost:3001/api/getHighestId', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.error(`Failed to get the highest ID. Server responded with status ${response.status}`);
      }
  
      const highestIdData = await response.json();
      let highestId = 1;
  
      if (highestIdData.success) {
        highestId = highestIdData.highestId + 1;
      }
  
      // Use the highest ID for the new document
      const responseSaveImage = await fetch('http://localhost:3001/api/saveImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenId: highestId, image: src }),
      });
  
      if (!responseSaveImage.ok) {
        console.error(`Failed to save image. Server responded with status ${responseSaveImage.status}`);
        return;
      }
  
      const data = await responseSaveImage.json();
  
      if (data.success) {
        console.log('Image saved successfully!');
      } else {
        console.error('Failed to save image:', data.error);
      }

    } catch (error) {
      console.error('Error saving image:', error);
      console.error(error.stack); // Log the stack trace
    }
  };
  
  

  const debouncedTokenId = useDebounce(tokenId, 500)

  const { config } = usePrepareContractWrite({
    ...ERC721Contract,
    functionName: 'mint',
    args: ((debouncedTokenId!==null) && (address!==undefined)) 
      ? [address, BigInt(debouncedTokenId)] 
      : undefined,
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
      dispatch(setNewNftEvent({newNftEvent: 'Sell'}))
      onSuccess?.();
    }
    if (isError) {
      console.error(error);
    }
  }, [isSuccess, onSuccess]);

  return (
    <>
      {/* <Button disabled={!write || isLoading}
        onClick={(e) => {
          e.preventDefault()
          write?.()
          handleCreate()}}>
        {isLoading ? 'Minting...' : 'Mint'}
      </Button>
      {error && (
        <Error>An error occurred preparing the transaction. See console for details</Error>
        )} */}
      <Button onClick={(e) => {
        e.preventDefault();
        handleCreate()
      }}>Create</Button>
    </>
      
      
  )
}
