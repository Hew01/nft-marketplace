import { BuyTokenSection } from "@/components/BuyToken/BuyTokenSection"
import { Header } from "@/components/Header/Header"
import { HeroApproval } from "@/components/Hero/HeroApproval"
import { Hero } from "@/components/Hero/HeroContent"
import ModalRoot from "@/components/PopupModal/ModalRoot"
import { SellTokenSection } from "@/components/SellToken/SellTokenSection"
import { useReadContractOneArgs } from "@/hooks/useReadContractOneArg"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

export const Homepage = () => {
    const [isAccountAllowed, setIsAccountAllowed] = useState(true);
    const { address } = useAccount();
    const { erc20Allowance } = useReadContractOneArgs(address);
    console.log('result', erc20Allowance?.result);

    useEffect(() => {
        if (erc20Allowance?.result === BigInt(0)) {
            setIsAccountAllowed(false);
        }
    }, [erc20Allowance]);

    return (
        <>
            <Header />
            {isAccountAllowed ? (
                <>
                    <Hero />
                    <SellTokenSection />
                    <BuyTokenSection />
                    <ModalRoot />
                </>) : (
                <>
                    <HeroApproval setIsAccountApproved={setIsAccountAllowed} />
                </>
            )}
        </>
    )
}