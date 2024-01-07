import { IoArrowForward } from "react-icons/io5"
import { ImageCard } from "./ImageCard/ImageCard"
import { Container, GridList, Section, SectionText, StyledLink, Title } from "./styled"
import useAllHoldings from "@/hooks/useAllHoldings"
import { LoaderGif } from "../Loader/LoaderGif"
import { useReadContractOneArgs } from "@/hooks/useReadContractOneArg"
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import { ERC20Contract } from '@/constants/ContractList'
import { parseEther } from "viem"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { setNewNftEvent } from "@/redux/globalSlice"
import { Button, Error } from "../PopupModal/styled"
import Loader from '@/assets/images/Ellipsis-1s-200px_1.gif'

export const BuyTokenSection = () => {
    const { result: nfts, isLoading: isAllHoldingsLoading } = useAllHoldings();
    const { address } = useAccount();
    const { erc20Allowance: allowance } = useReadContractOneArgs(address);

    //Set Render state
    const [current, setCurrent] = useState('Current');

    //setup Contract
    const NFTVaultContractAddress = '0xB37f99CAD2B7Dc870A2E4e385cbA1AD2E759Fd50';
    const { config } = usePrepareContractWrite({
        ...ERC20Contract,
        functionName: 'approve',
        args: [NFTVaultContractAddress, parseEther('10')],
    })
    const dispatch = useDispatch();
    const { write, data, error, isError, isSuccess } = useContractWrite(config)
    const { isLoading } = useWaitForTransaction({
        hash: data?.hash,
    });

    //Handle notification with the contract state
    let toastId: any = null;
    useEffect(() => {
        toast.dismiss(toastId);
        if (isSuccess) {
            setCurrent('Success');
            toast.success("Successfully approved your account!")
            console.log('Transaction detail: ', JSON.stringify(data))
            dispatch(setNewNftEvent({ newNftEvent: 'Buy' }))
        }
        if (isError) {
            toast.error("There was an error in handling your case")
            setCurrent('Current');
        }
    }, [isSuccess, isError]);
    if (allowance?.result === BigInt(0))
        return (
            <>
                <ToastContainer />
                <Section>
                    <Container>
                        {(current === 'Current') && (
                            <>
                                <Title>Uh oh...</Title>
                                <SectionText>It seem like your account hasn't been approved yet to see other people's kitten.</SectionText>
                                <Button disabled={!write || isLoading}
                                    onClick={() => {
                                        setCurrent('isLoading');
                                        toastId = toast.loading("Approving...");
                                        write?.()
                                    }}>
                                    {isLoading ? 'Approving...' : 'Approve your account'}
                                </Button>
                                {error && (
                                    <Error>An error occurred preparing the transaction. See console for details</Error>
                                )}
                            </>
                        )}
                        {(current === 'isLoading') && (
                            <>
                                <Title style={{ color: 'white' }}>Approving your account...</Title>
                                <img src={Loader} />
                            </>
                        )}
                        {(current === 'Success') && (
                            <>
                                <Title style={{ color: 'green' }}>Your Account has been Approved!</Title>
                            </>
                        )}
                    </Container>
                </Section>
            </>
        )
    else return (
        <Section>
            <Container>
                <Title>Get your kittens</Title>
                {isAllHoldingsLoading
                    ? <LoaderGif />
                    : nfts ? (
                        nfts.length > 0 ? (
                            <>
                                <GridList>
                                    {
                                        nfts.filter(item => item && item.id !== null).map((item) => (
                                            <ImageCard
                                                key={item.id}
                                                item={item} />
                                        ))
                                    }
                                </GridList>
                                <StyledLink>
                                    <span className="span">Explore More</span>
                                    <IoArrowForward />
                                </StyledLink>
                            </>
                        ) : (
                            <SectionText>Weird, nothing is here yet... You can comeback later for more kittens or
                                <span style={{fontWeight: 'bold', fontSize: 28}}>sell your kitten NOW!</span>
                            </SectionText>
                        )
                    ) : (
                        <SectionText>There was an error in displaying the kittens, please check console for more details.</SectionText>
                    )}
            </Container>
        </Section>
    )
}
