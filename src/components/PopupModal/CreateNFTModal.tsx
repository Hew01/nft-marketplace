import React, { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import { ModalContent, CloseButton, Title, CardHolder, DimBackground, Button, Error } from './styled';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import localforage from 'localforage';
import { useDebounce } from 'usehooks-ts';
import { ERC721Contract } from '@/constants/ContractList'
import { setNewNftEvent } from '@/redux/globalSlice';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '@/assets/images/Ellipsis-1s-200px_1.gif'

export const CreateNftModal = () => {
    const dispatch = useDispatch();

    //Set Render state
    const [current, setCurrent] = useState('Current');

    //Setup image url
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [imgData, setImgData] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImgData(e.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    //Setup Contract
    // const [tokenId, setTokenId] = useState<number | null>(null);
    const { address } = useAccount();
    // useEffect(() => {
    //     if (imgData !== null) {
    //         const fileName = (imgData.name as string);
    //         let start = fileName.lastIndexOf('_') + 1;
    //         let end = fileName.lastIndexOf('.');
    //         const baseName = fileName.substring(start, end);
    //         setTokenId(parseInt(baseName));
    //     }
    // }, [imgData]);

    // const handleCreate = async () => {
    //     console.log(imgData)
    //     let value = {
    //         image: image,
    //         id: tokenId,
    //     }
    //     let jsonValue = JSON.stringify(value);
    //     await
    //         localforage.setItem(`key${tokenId}`, jsonValue)

    //     var storedValue = await localforage.getItem(`key${tokenId}`);
    //     if (storedValue === jsonValue) {
    //         console.log('Item was successfully set in localForage');
    //     } else {
    //         console.log('Failed address set item in localForage');
    //     }
    //     let parsedValue = JSON.parse(jsonValue);
    //     console.log(parsedValue);
    // }

    // Get the highestId of the database
  const getHighestId = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/getHighestId', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        console.log(`Failed to get the highest ID. Server responded with status ${response.status}`);
      }
  
      const highestIdData = await response.json();
      let highestId = 1;
  
      if (highestIdData.success) {
        highestId = highestIdData.highestId + 1;
      }
  
      return highestId;
    } catch (error) {
      console.error('Error getting highest ID:', error);
      console.error(error.stack); // Log the stack trace
    }
  }; 

  // Save the image on the Database
  const saveImage = async (currentHighestId, imageSrc) => {
    try {
      const responseSaveImage = await fetch('http://localhost:3001/api/saveImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenId: currentHighestId, image: imageSrc }),
      });
  
      if (!responseSaveImage.ok) {
        console.log(`Failed to save image. Server responded with status ${responseSaveImage.status}`);
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
        args: ((debouncedTokenId !== null) && (address !== undefined))
            ? [address, BigInt(debouncedTokenId)]
            : undefined,
        enabled: Boolean(debouncedTokenId),
    })
    const { write, data, isError, error } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    //Handle notification with render state
    let toastId: any = null;
    useEffect(() => {
        toast.dismiss(toastId);
        if (isSuccess) {
            setCurrent('Success');
            toast.success("Successfully created your token!")
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
                            <Title>Create NFT</Title>
                            <CloseButton onClick={() => (dispatch(closeModal()))}><IoCloseOutline /></CloseButton>
                            <CardHolder>
                                {image && <img src={image as string} loading="lazy" width="500" height="500"
                                    alt="preview" className="img-cover" />}
                            </CardHolder>
                            <Form>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file"
                                        onChange={handleFileChange} />
                                </Form.Group>
                                <Button disabled={!write || isLoading}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setCurrent('isLoading');
                                        toastId = toast.loading("Creating...");
                                        write?.()
                                        handleCreate()
                                    }}>
                                    {isLoading ? 'Minting...' : 'Mint'}
                                </Button>
                                {error && (
                                    <Error>An error occurred preparing the transaction. See console for details</Error>
                                )}
                            </Form>
                        </>
                    )}
                    {(current === 'isLoading') && (
                        <>
                            <Title style={{ color: 'white' }}>Creating your token...</Title>
                            <img src={Loader} />
                        </>
                    )}
                    {(current === 'Success') && (
                        <>
                            <Title style={{ color: 'green' }}>Your Token has been Created!</Title>
                            <Button onClick={() => dispatch(closeModal())}>Close</Button>
                        </>
                    )}
                </ModalContent>
            </DimBackground>
        </>
    );
}
