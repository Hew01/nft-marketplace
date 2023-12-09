import { IoArrowForward } from "react-icons/io5"
import { ImageCard } from "./ImageCard/ImageCard"
import { Container, GridList, Section, StyledLink, Title } from "./styled"
import useAllHoldings from "@/hooks/useAllHoldings"
import { LoaderGif } from "../LoaderGif"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export const BuyTokenSection = () => {
    const { result: nfts, isLoading } = useAllHoldings();
    const allowance: bigint = useSelector((state: RootState) => state.global.allowance);
    if (allowance === BigInt(0))
        return <></>
    else return (
        <Section>
            <Container>
                <Title>Get your kittens</Title>
                {isLoading
                    ? <LoaderGif />
                    : (
                        <GridList>
                            {(nfts)
                                ? (nfts.filter(item => item && item.id !== null).map((item) => (
                                    <ImageCard
                                        key={item.id}
                                        item={item} />
                                ))
                                ) : (
                                    <></>
                                )}
                        </GridList>
                    )}
                <StyledLink>
                    <span className="span">Explore More</span>
                    <IoArrowForward />
                </StyledLink>
            </Container>
        </Section>
    )
}
