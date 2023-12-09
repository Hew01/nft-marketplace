import { BuyTokenSection } from "@/components/BuyToken/BuyTokenSection"
import { Header } from "@/components/Header/Header"
import { Hero } from "@/components/Hero/HeroContent"
import ModalRoot from "@/components/PopupModal/ModalRoot"
import { SellTokenSection } from "@/components/SellToken/SellTokenSection"
import { useReadContractOneArgs } from "@/hooks/useReadContractOneArg"
import { setAllowance, setBalanceOf } from "@/redux/globalSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAccount } from "wagmi"

export const Homepage = () => {
    const dispatch = useDispatch();
    const { address } = useAccount();
    const { erc20Allowance } = useReadContractOneArgs(address);
    const { erc20BalanceOf } = useReadContractOneArgs(address);

    useEffect(() => {
        if (erc20Allowance?.result !== undefined) {
            dispatch(setAllowance({ allowance: (erc20Allowance?.result).toString() }));
        }
    }, [dispatch, erc20Allowance?.result]);
    
    useEffect(() => {
        if (erc20BalanceOf?.result !== undefined) {
            dispatch(setBalanceOf({ balance: erc20BalanceOf?.result.toString() }));
        }
    }, [dispatch, erc20BalanceOf?.result]);

    
    return (
        <>
            <Header />
            <Hero />
            <SellTokenSection />
            <BuyTokenSection />
            <ModalRoot />
        </>
    )
}