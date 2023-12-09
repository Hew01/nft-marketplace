import { useState, useEffect } from 'react';
import { Container, HeaderAction, IonWallet, Logo, LogoSmall, NavToggleBtn, Navbar, NavbarLink, NavbarList, StyledHeader, WalletButton } from "./styled";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { useAccount } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/redux/modalSlice';
import { useReadContractOneArgs } from '@/hooks/useReadContractOneArg';
import { formatEther, parseEther } from 'viem';
import { RootState } from '@/redux/store';

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { address: account, isConnected } = useAccount();

  if (isConnected) {
    const balanceOf: bigint = useSelector((state: RootState) => state.global.balance);
    const balance = balanceOf ? (
      Math.round(formatEther(balanceOf))) : ('');

    const dispatch = useDispatch();

    const handleToggle = () => {
      setIsActive(!isActive);
    };

    const handleDisconnect = () => {
      dispatch(openModal({
        modalType: 'CONFIRM_DISCONNECT',
        modalProps: {}
      }))
    }

    useEffect(() => {
      const checkScroll = () => {
        if (!isScrolled && window.pageYOffset > 200) {
          setIsScrolled(true);
        } else if (isScrolled && window.pageYOffset <= 200) {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", checkScroll);
      return () => {
        window.removeEventListener("scroll", checkScroll);
      };
    }, [isScrolled]);

    return (
      <StyledHeader className={isScrolled ? "active" : ""}>
        <Container>
          <a href="#">
            <LogoSmall src="./src/assets/logo-small.svg" alt="Metalink home" />
            <Logo src="./src/assets/logo.svg" alt="Metalink home" />
          </a>
          <Navbar className={isActive ? "active" : ""}>
            <NavbarList>
              <li><NavbarLink href="#">Explore</NavbarLink></li>
              <li><NavbarLink href="#">Your Wallet</NavbarLink></li>
            </NavbarList>
          </Navbar>
          <HeaderAction>
            <NavbarLink>Balance: {balance} BCO</NavbarLink>
            <WalletButton onClick={handleDisconnect}>
              <IonWallet />
              <span style={{ marginLeft: '10px' }}>{account.substring(0, 4)}...{account.slice(-4)}</span>
            </WalletButton>
            <NavToggleBtn onClick={handleToggle}>
              {isActive ? <IoCloseOutline /> : <IoMenuOutline />}
            </NavToggleBtn>
          </HeaderAction>
        </Container>
      </StyledHeader>
    );
  }
  else return <></>

}
