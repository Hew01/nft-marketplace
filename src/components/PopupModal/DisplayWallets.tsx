
import { useAccount, useConnect } from 'wagmi'
import { CloseButton, DimBackground, ModalContent, Title, UpdateButton } from './styled';
import { IoCloseOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';
import { useNavigate } from 'react-router-dom';
import { AppRouters } from '@/constants/AppRoutes';

interface NftModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DisplayWallets: React.FC<NftModalProps> = ({}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const {isConnected} = useAccount();
    useEffect(() => {
        if (isConnected) {
            dispatch(closeModal());
            navigate(AppRouters.HOME);
        }
      }, [isConnected]);
    return (
        <DimBackground>
            <ModalContent>
                <Title>Connect to Wallet</Title>
                <CloseButton onClick={() => dispatch(closeModal())}>
                    <IoCloseOutline />
                </CloseButton>
                {connectors.map((connector: any) => (
                    <UpdateButton
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect({connector})}
                    >
                        {connector.name}
                        {!connector.ready && ' (unsupported)'}
                        {isLoading &&
                            connector.id === pendingConnector?.id &&
                            ' (connecting)'}
                    </UpdateButton>
                ))}

                {error && <div>{error.message}</div>}
            </ModalContent>
        </DimBackground>
    )
}