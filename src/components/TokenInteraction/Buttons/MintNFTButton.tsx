import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useDebounce } from 'usehooks-ts'
import React, { useEffect, useState } from 'react'
import { ERC721Contract } from '@/constants/ContractList'
import { Button, Error } from '../styled'
import localForage from 'localforage'
import { useDispatch } from 'react-redux'
import { setNewNftEvent } from '@/redux/globalSlice'
// import database from '@/database/db'

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
    let parsedValue = JSON.parse(jsonValue);
    console.log(parsedValue);
  }

  // MongoDB Database Image Upload
  // const handleCreateOnDB = async () => {
  //   try {
  //     let value = {
  //       image: src,
  //       id: tokenId,
  //     };
  
  //     // Convert 'value' to a JSON string
  //     let jsonValue = JSON.stringify(value);
  
  //     // Save to MongoDB Atlas
  //     await database.connectToDb(async (error) => {
  //       if (error) {
  //         console.error('Failed to connect to the database:', error);
  //         return;
  //       }
  
  //       const imagesCollection = database.getDb().collection('images');
  
  //       // Insert the document into the 'images' collection
  //       await imagesCollection.insertOne({ data: jsonValue });
  
  //       console.log('Item was successfully inserted into MongoDB Atlas');
  //     });
  
  //     // Rest of your code remains unchanged
  //     var storedValue = await localForage.getItem(`key${tokenId}`);
  //     if (storedValue === jsonValue) {
  //       console.log('Item was successfully set in localForage');
  //     } else {
  //       console.log('Failed address set item in localForage');
  //     }
  //     let parsedValue = JSON.parse(jsonValue);
  //     console.log(parsedValue);
  //   } catch (error) {
  //     console.error('Error in handleCreate:', error);
  //   }
  // }

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
      <Button disabled={!write || isLoading}
        onClick={(e) => {
          e.preventDefault()
          write?.()
          handleCreate()}}>
        {isLoading ? 'Minting...' : 'Mint'}
      </Button>
      {error && (
        <Error>An error occurred preparing the transaction. See console for details</Error>
        )}
    </>
      // <Button onClick={(e) => {
      //   e.preventDefault();
      //   handleCreate()
      // }}>Create</Button>
      
  )
}
