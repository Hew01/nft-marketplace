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
import { getHighestId } from '@/functions/getHighestId';
import { saveImage } from '@/functions/saveImage';

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
  const [tokenId, setTokenId] = useState<number | null>(null);
  const { address } = useAccount();

  // Get the highestId of the database
  const handleCreate = async () => {
    const result = await getHighestId();
    if (result) {
      const { highestId } = result;
      setTokenId(highestId);
    }
  }

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
                    onChange={(e) => {
                      handleFileChange(e as React.ChangeEvent<HTMLInputElement>);
                      handleCreate();
                    }} />
                </Form.Group>
                <Button disabled={!write || isLoading}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrent('isLoading');
                    toastId = toast.loading("Creating...");
                    
                    write?.();
                    saveImage(tokenId, image);
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
