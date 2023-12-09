import { ButtonContent, Container, ExploreBtn, SectionText, SpecialSpan, StyledHero, Title } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import { ApproveAccount } from "../TokenInteraction/Form/ApproveAccount";
import { RootState } from "@/redux/store";

export const Hero = () => {
    const dispatch = useDispatch();
    const handleCreateNFT = () => {
        dispatch(openModal({
            modalType: 'CREATE_NFT',
            modalProps: {}
        }))
    }
    const allowance: bigint = useSelector((state: RootState) => state.global.allowance);
    return (
        <StyledHero aria-label="home">
            <Container>
                <Title>
                    Discover your Kitten
                    <SpecialSpan> Arts & NFTs</SpecialSpan>
                </Title>
                {allowance === BigInt(0)
                    ? (<ApproveAccount />)
                    : (<>
                        <SectionText>
                            We are a marketplace dedicated to getting cute kittens for yours truly unique token collection!
                        </SectionText>
                        <ButtonContent>
                            <ExploreBtn onClick={handleCreateNFT}>Create your NFT</ExploreBtn>
                            <button>Explore more</button>
                        </ButtonContent>
                    </>)}
            </Container>
        </StyledHero>
    );
}