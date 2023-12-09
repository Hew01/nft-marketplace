import { BasketIcon } from "@/components/BuyToken/ImageCard/styled"
import { Button, CardAuthor, CardAuthorLink, CardBanner, CardContent, CardText, CardTitle, CardTitleLink, ItemCard, SellButton, SliderItem } from "./styled"
import { useReadContractOneArgs } from "@/hooks/useReadContractOneArg";
import { useEffect, useState } from "react";
import { openModal } from "@/redux/modalSlice";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { formatEther } from "viem";

interface ImageProp {
    item: {
        id: number;
        image: string;
    };
}

const invalidAddress = '0x0000000000000000000000000000000000000000';

export const ImageCard: React.FC<ImageProp> = ({item}) => {
    const { erc721GetApproved, vaultGetPrice } = useReadContractOneArgs(item.id);
    const placeholder = vaultGetPrice?.result
    ? formatEther(vaultGetPrice.result)
    : '';
    const dispatch = useDispatch();
    const handleSetPrice = () => {
        dispatch(openModal({
            modalType: 'SET_PRICE',
            modalProps: {tokenId: item.id.toString(), 
                        image: item.image,
                        placeholder: placeholder,
        }}))
    }
    const handleApprove = () => {
        dispatch(openModal({
            modalType: 'APPROVE',
            modalProps: {tokenId:item.id.toString(), 
                        image:item.image
        }}))
    }
    const handleSell = () => {
        dispatch(openModal({
            modalType: 'SELL',
            modalProps: {tokenId:item.id.toString(), 
                        image:item.image
        }}))
    }

    const [stateNft, setStateNft] = useState<string>('Loading...');

    useEffect(() => {
        if (erc721GetApproved?.result === invalidAddress) {
            setStateNft('Not Approved');
        } else if (vaultGetPrice?.result === BigInt(0)) {
            setStateNft('Approved')
        } else setStateNft('Good for selling');
    }, [erc721GetApproved?.result]);

    return (
        <SliderItem>
            <ItemCard>
                <CardBanner>
                    <img src={item.image} width="500" height="500" loading="lazy"
                        alt="Digital Collection" className="img-cover" />
                    {(stateNft === 'Not Approved') ? (
                        <Button onClick={handleApprove}>
                            <IoCheckmarkCircle  />
                            <span className="span" style={{ marginLeft: "3px" }}>Approve</span>
                        </Button>
                    ) : (
                        <Button onClick={handleSetPrice}>
                            <BasketIcon />
                            <span className="span" style={{ marginLeft: "1px" }}>Set Price</span>
                        </Button>
                    )}
                </CardBanner>
                <CardContent>
                    <div>
                    <CardTitle>
                        <CardTitleLink>Kitten #{item.id}
                        </CardTitleLink>
                    </CardTitle>
                    <CardText>Status</CardText>
                    <CardAuthor>
                        <CardAuthorLink>{stateNft}</CardAuthorLink>
                    </CardAuthor>
                    </div>
                    {(stateNft === 'Good for selling') && (
                    <SellButton onClick={handleSell}>
                        <span className="span" style={{ marginLeft: "1px" }}>Sell</span>
                    </SellButton>
                    )}
                </CardContent>
            </ItemCard>
        </SliderItem>
    )
}