import React, { useState } from "react";
import { BasketIcon, Button, Card, CardBanner, CardTitleContainer, CardMeta, CardPrice, CardProfile, CardTitle, StyledLink, TooltipContainer, TooltipText  } from "./styled"
import { useReadContractOneArgs } from "@/hooks/useReadContractOneArg";
import { formatEther } from "viem";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RootState } from "@/redux/store";

interface BuyTokenProps {
    item: {
        id: number;
        image: string;
    };
}

export const ImageCard: React.FC<BuyTokenProps> = ({ item }) => {
    console.log(item);
    const { vaultGetPrice, vaultGetOwner } = useReadContractOneArgs(item.id);
    const price = (vaultGetPrice) ? (formatEther(vaultGetPrice?.result)) : ('');
    const owner = (vaultGetOwner)
        ? (vaultGetOwner?.result.substring(0, 4) + '...' + vaultGetOwner?.result.slice(-4))
        : ('NaN');

    const allowance: bigint = useSelector((state: RootState) => state.global.allowance);
    const balance: bigint = useSelector((state: RootState) => state.global.balance);

    const dispatch = useDispatch();
    const handleBuy = () => {
        dispatch(openModal({
            modalType: 'BUY',
            modalProps: {
                tokenId: item.id.toString(),
                image: item.image,
                price: price,
            }
        }))
    }

    let tooltipText = 'Information about the card';
    let isDisabled = false;

    if (allowance < vaultGetPrice?.result) {
        tooltipText = 'Your amount of paying exceed the allowed amount';
        isDisabled = true;
    } else if (balance < vaultGetPrice?.result) {
        tooltipText = "You don't have enough balance to buy this token";
        isDisabled = true;
    }

    return (
        <li>
            <Card>
                <CardBanner>
                    <img src={item.image} loading="lazy" width="500" height="500"
                        alt={'Kitten #' + item.id} className="img-cover" />
                    <Button onClick={handleBuy} disabled={isDisabled}>
                        <BasketIcon />
                        <span className="span" style={{ marginLeft: "5px" }}>Buy</span>
                    </Button>
                </CardBanner>
                <CardProfile>
                    <img src="./src/assets/images/avatar-8.jpg" width="32" height="32" loading="lazy" alt="StreetBoy profile"
                        className="img" />
                    <StyledLink>@{owner}</StyledLink>
                </CardProfile>
                <CardTitleContainer>
                    <CardTitle>Kitten {item.id}</CardTitle>
                    <TooltipContainer>
                        <IoInformationCircleOutline />
                        <TooltipText>{tooltipText}</TooltipText>
                    </TooltipContainer>
                </CardTitleContainer>
                <CardMeta>
                    <p>Price</p>
                    <CardPrice>
                        <img src="./src/assets/images/ethereum.svg" width="16" height="24" loading="lazy" alt="ethereum icon" />
                        <span className="span">{price} BCO</span>
                    </CardPrice>
                </CardMeta>
            </Card>
        </li>
    )
}