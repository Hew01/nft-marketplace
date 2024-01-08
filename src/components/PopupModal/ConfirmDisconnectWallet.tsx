import { ModalContent, Title, DimBackground, ButtonContent, CloseButton, DisconnectButton, UpdateButton, CardHolder } from './styled';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';
import { useAccount, useDisconnect } from 'wagmi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRouters } from '@/constants/AppRoutes';
import { Form } from 'react-bootstrap';
import { updateUser } from '@/functions/updateUser';
import { IoCloseOutline } from 'react-icons/io5';
import { getUserInformation } from '@/functions/getUserInformation';

export const ConfirmDisconnectModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { disconnect } = useDisconnect();
    const { address, isConnected } = useAccount();

    const [name, setName] = useState('');
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

    useEffect(() => {
        const fetchUserInformation = async () => {
            const userInfo = await getUserInformation(address);
            if (userInfo) {
                setName(userInfo.displayName);
                setImage(userInfo.image);
            }
        };
        fetchUserInformation();
    }, [address]);
    

    const handleDisconnect = () => {
        disconnect();
        navigate(AppRouters.DASHBOARD);
    }

    const handleUpdate = (
        account: `0x${string}` | undefined,
        image: string | ArrayBuffer | null, 
        displayName: string) => {
            updateUser(account, displayName, image);
            dispatch(closeModal());
    }

    useEffect(() => {
        if (!isConnected) {
            dispatch(closeModal());
        }
    }, [isConnected]);

    return (
        <DimBackground>
            <ModalContent>
                <Title>User info</Title>
                <CloseButton onClick={() => (dispatch(closeModal()))}><IoCloseOutline /></CloseButton>
                <CardHolder>
                    {image && <img src={image as string} loading="lazy" width="500" height="500"
                        alt="preview" className="img-cover" />}
                </CardHolder>
                <Form>
                    <Form.Group controlId="formText" className="mb-3">
                        <Form.Label>Display name</Form.Label>
                        <Form.Control type="text" 
                            placeholder=''
                            onChange={(e) => {
                                e.preventDefault();
                                setName(e.target.value);
                            }} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Image display</Form.Label>
                        <Form.Control type="file"
                            onChange={handleFileChange} />
                    </Form.Group>
                </Form>
                <ButtonContent>
                    <DisconnectButton onClick={handleDisconnect}>Disconnect</DisconnectButton>
                    <UpdateButton onClick={() => handleUpdate(address, image, name)}>Update info</UpdateButton>
                    <button onClick={() => dispatch(closeModal())}>Cancel</button>
                </ButtonContent>
            </ModalContent>
        </DimBackground>
    );
}
