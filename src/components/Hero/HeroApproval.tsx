import { Button, Container, Error, SectionText, StyledHero, Title } from "./styled";
import { ERC20Contract } from '@/constants/ContractList'
import Loader from '@/assets/images/Ellipsis-1s-200px_1.gif'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface HeroApprovalProps {
    setIsAccountApproved: (isAccountApproved: boolean) => void;
}

export const HeroApproval: React.FC<HeroApprovalProps> = ({ setIsAccountApproved }) => {

    //Set Render state
    const [current, setCurrent] = useState('Current');

    //Setup Contract
    const NFTVaultContractAddress = '0xB37f99CAD2B7Dc870A2E4e385cbA1AD2E759Fd50';
    const { config } = usePrepareContractWrite({
        ...ERC20Contract,
        functionName: 'approve',
        args: [NFTVaultContractAddress, parseEther('10')],
    })
    const { write, data, error, isError } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
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
            setIsAccountApproved(true);
        }
        if (isError) {
            toast.error("There was an error in handling your case")
            setCurrent('Current');
        }
    }, [isSuccess, isError]);
    return (
        <StyledHero aria-label="home">
            <Container>
                {(current === 'Current') && (
                    <>
                        <Title>Uh oh...</Title>
                        <SectionText>
                            Looks like your account hasn't been approved yet.
                        </SectionText>
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
                        <Title style={{ color: 'white' }}>Approving your token...</Title>
                        <img src={Loader} />
                    </>
                )}
                {(current === 'Success') && (
                    <>
                        <Title style={{ color: 'green' }}>Your Token has been Approved!</Title>
                    </>
                )}
            </Container>
        </StyledHero>
    );
}