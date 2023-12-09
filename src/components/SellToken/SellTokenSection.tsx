import { IoArrowForward, IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5"
import { ButtonLink, Container, Section, SectionTitle, Slider, SliderButton, SliderContainer, TitleWrapper } from "./styled"
import { ImageCard } from "./ImageCard/ImageCard"
import { useEffect, useRef, useState } from "react";
import { useFilterNFTs } from "@/hooks/useFilterNFTs";
import { useAccount } from "wagmi";
import { LoaderGif } from "../LoaderGif";

export const SellTokenSection = () => {
    
    const [totalSlides, setTotalSlides] = useState(0);
    const [slideIndex, setSlideIndex] = useState(0);
    const [sliderItems, setSliderItems] = useState(0);
    const sliderRef = useRef(null);

    const { address, isConnected } = useAccount();
    let nfts, isLoading;
    if (address) {
        const result = useFilterNFTs(address);
        nfts = result.nfts;
        isLoading = result.isLoading;
    }

    useEffect(() => {
        const updateSliderItems = () => {
            if (sliderRef.current) {
                setSliderItems(parseFloat(getComputedStyle(sliderRef.current).getPropertyValue('--slider-item')));
            }
        };

        updateSliderItems(); // Call it once initially
        window.addEventListener('resize', updateSliderItems); // Call it whenever the window is resized

        return () => {
            window.removeEventListener('resize', updateSliderItems); // Clean up the event listener
        };
    }, []);

    useEffect(() => {
        const total = Math.ceil(nfts.length / sliderItems);
        setTotalSlides(total);
    }, [nfts, sliderItems]);

    // Handle slider button clicks
    const handleNextClick = () => {
        setSlideIndex((prevSlideIndex) => (prevSlideIndex + 1) % totalSlides);
    };

    const handlePrevClick = () => {
        setSlideIndex((prevSlideIndex) => (prevSlideIndex - 1 + totalSlides) % totalSlides);
    };

    /* HANDLE LOGIC */

    return (
        <Section>
            {(isConnected) ? (
                <Container>
                    <TitleWrapper>
                        <SectionTitle>Sell your Tokens</SectionTitle>
                        <ButtonLink>
                            <span className="span">See More</span>
                            <IoArrowForward />
                        </ButtonLink>
                    </TitleWrapper>
                    <Slider ref={sliderRef}>
                        {isLoading
                            ? <LoaderGif />
                            : (
                                <>
                                    <SliderContainer style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                                        {(nfts) ? (nfts.filter(item => item && item.id !== null).map((item) => (
                                            <ImageCard
                                                key={item.id}
                                                item={item} />
                                        ))
                                        ) : (
                                            <></>
                                        )}
                                    </SliderContainer>
                                    <SliderButton className="prev" data-slider-prev onClick={handlePrevClick}>
                                        <IoChevronBackSharp />
                                    </SliderButton>
                                    <SliderButton className="next" data-slider-prev onClick={handleNextClick}>
                                        <IoChevronForwardSharp />
                                    </SliderButton>
                                </>
                            )}
                    </Slider>
                </Container>
            ) : (<></>)}
        </Section>
    )
}

