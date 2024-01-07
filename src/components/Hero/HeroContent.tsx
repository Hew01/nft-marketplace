import { ButtonContent, Container, ExploreBtn, SectionText, SpecialSpan, StyledHero, Title } from "./styled";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice";

export const Hero = () => {
    const dispatch = useDispatch();
    const handleCreateNFT = () => {
        dispatch(openModal({
            modalType: 'CREATE_NFT',
            modalProps: {}
        }))
    }
    return (
        <StyledHero aria-label="home">
            <Container>
                <Title>
                    Discover your Kitten
                    <SpecialSpan> Arts & NFTs</SpecialSpan>
                </Title>
                <SectionText>
                    We are a marketplace dedicated to getting cute kittens for yours truly unique token collection!
                </SectionText>
                <ButtonContent>
                    <ExploreBtn onClick={handleCreateNFT}>Create your NFT</ExploreBtn>
                    <button>Explore more</button>
                </ButtonContent>
            </Container>
        </StyledHero>
    );
}