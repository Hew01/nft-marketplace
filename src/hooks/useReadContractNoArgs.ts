import { useContractReads } from 'wagmi'
import { ERC721Contract, VaultContract, ERC20Contract } from '@/constants/ContractList'


export function useReadContractNoArgs() {
    const { data, isError, refetch } = useContractReads({
        contracts: [
            {
                ...ERC721Contract,
                functionName: 'owner',
            },
            {
                ...ERC721Contract,
                functionName: 'symbol',
            },
            {
                ...ERC721Contract,
                functionName: 'name',
            },
            {
                ...VaultContract,
                functionName: 'allHoldings',
            },
            {
                ...VaultContract,
                functionName: 'totalHoldings',
            },
            {
                ...ERC20Contract,
                functionName: 'name',
            },
            {
                ...ERC20Contract,
                functionName: 'symbol',
            },
        ],
    })

    let erc721Owner,
        erc721Symbol,
        erc721Name,
        vaultAllHoldings,
        vaultTotalHoldings,
        erc20Name,
        erc20Symbol;

    if (data) {[
        erc721Owner,
        erc721Symbol,
        erc721Name,
        vaultAllHoldings,
        vaultTotalHoldings,
        erc20Name,
        erc20Symbol,
    ] = data
    }
    return {
        data,
        erc721Owner,
        erc721Symbol,
        erc721Name,
        vaultAllHoldings,
        vaultTotalHoldings,
        erc20Name,
        erc20Symbol,
        isError,
        refetch,
    }
}
