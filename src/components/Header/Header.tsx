import { useState, useEffect } from 'react';
import { Container, HeaderAction, IonWallet, Logo, LogoSmall, NavToggleBtn, Navbar, NavbarLink, NavbarList, StyledHeader, WalletButton } from "./styled";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { useAccount } from 'wagmi';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/modalSlice';
import { useReadContractOneArgs } from '@/hooks/useReadContractOneArg';
import { formatEther } from 'viem';

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { address: account, isConnected } = useAccount();
  const { erc20BalanceOf } = useReadContractOneArgs(account);

  if (isConnected) {
    let balanceOf;
    if (erc20BalanceOf?.result !== undefined) {
      balanceOf = formatEther(erc20BalanceOf.result);
    } else {
      balanceOf = '';
    }
    const balance = (Math.round(parseFloat(balanceOf) * 1e4) / 1e4).toString();
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
            <LogoSmall src="./src/assets/logo-small.svg" alt="Meowlink home" />
            <Logo src="./src/assets/logo.svg" alt="Meowlink home" />
          </a>
          {/* <Navbar className={isActive ? "active" : ""}>
            <NavbarList>
              <li><NavbarLink href="#">Explore</NavbarLink></li>
              <li><NavbarLink href="#">Your Wallet</NavbarLink></li>
            </NavbarList>
          </Navbar> */}
          <HeaderAction>
            <NavbarLink>Balance: {balance} BCO</NavbarLink>
            <WalletButton onClick={handleDisconnect}>
              <IonWallet />
              <span style={{ marginLeft: '10px' }}>
                {account ? `${account.substring(0, 4)}...${account.slice(-4)}` : 'Account not defined'}
              </span>
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
