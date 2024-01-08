import { AppRouters } from "@/constants/AppRoutes";
import { openModal } from "@/redux/modalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { ButtonContent, Container, ExploreBtn, SectionText, SpecialSpan, StyledHero, Title } from "./styled";

export const HeroDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { address, isConnected } = useAccount({
        onConnect() {
            navigate(AppRouters.HOME);
        },
        onDisconnect() {
            navigate(AppRouters.DASHBOARD);
        }
    });
    console.log('isConnected', isConnected);
    const handleConnect = () => {
        dispatch(openModal({
            modalType: 'DISPLAY_WALLET',
            modalProps: {}
        }))
    }
    const handleDisconnect = () => {
        dispatch(openModal({
            modalType: 'CONFIRM_DISCONNECT',
            modalProps: {}
        }))
    }
    return (
        <StyledHero aria-label="home">
            <Container>
                {isConnected ? (
                    <>
                        <Title>
                            You are
                            <SpecialSpan> connected!</SpecialSpan>
                        </Title>
                        <SectionText>
                            Explore more on your journey to find your very best Kitten!
                        </SectionText>
                        <SectionText>Your account: {address}</SectionText>
                        <ButtonContent>
                            <ExploreBtn onClick={() => navigate(AppRouters.HOME)}>Explore more</ExploreBtn>
                            <button onClick={handleDisconnect}>Disconnect your wallet</button>
                        </ButtonContent>
                    </>
                ) : (
                    <>
                        <Title>
                            Discover your Kitten
                            <SpecialSpan> Arts & NFTs</SpecialSpan>
                        </Title>
                        <SectionText>
                            We are a marketplace dedicated to getting cute kittens for yours truly unique token collection!
                        </SectionText>
                        <ButtonContent>
                            <ExploreBtn onClick={handleConnect}>Connect your wallet NOW</ExploreBtn>
                        </ButtonContent>
                    </>
                )}

            </Container>
        </StyledHero>
    );
}