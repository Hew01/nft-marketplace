import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import { ModalContent, CloseButton, Title, CardHolder, DimBackground } from './styled';
import { MintNFTButton } from '@/components/TokenInteraction/Buttons/MintNFTButton';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';

export const CreateNftModal = () => {
    const dispatch = useDispatch();
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

    return (
        <DimBackground>
            <ModalContent>
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
                    <MintNFTButton img={imgData} src={image} onSuccess={() => dispatch(closeModal())}/>
                </Form>
            </ModalContent>
        </DimBackground>
    );
}
