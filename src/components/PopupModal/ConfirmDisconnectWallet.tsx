import { ModalContent, Title, DimBackground, ButtonContent, WalletButton } from './styled';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/modalSlice';
import { useAccount, useDisconnect } from 'wagmi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRouters } from '@/constants/AppRoutes';

export const ConfirmDisconnectModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {disconnect} = useDisconnect();
    const {isConnected} = useAccount();
    const handleDisconnect = () => {
        disconnect();
        console.log('disconnected?: ',!isConnected);
        navigate(AppRouters.DASHBOARD);
    }
    useEffect(() => {
        if (!isConnected) {
            dispatch(closeModal());
        }
      }, [isConnected]);
    return (
        <DimBackground>
            <ModalContent>
                <Title>Disconnect your wallet?</Title>
                <ButtonContent>
                    <WalletButton onClick={handleDisconnect}>Disconnect</WalletButton>
                    <button onClick={() => dispatch(closeModal())}>Cancel</button>
                </ButtonContent>
            </ModalContent>
        </DimBackground>
    );
}
