import { useContractReads } from 'wagmi'
import { ERC721Contract, VaultContract, ERC20Contract } from '@/constants/ContractList'

export function useReadContractOneArgs(param: any) {
    const { data, isError, refetch } = useContractReads({
        contracts: [
            {
                ...ERC721Contract,
                functionName: 'balanceOf',
                args: [param],
            },
            {
                ...ERC721Contract,
                functionName: 'ownerOf',
                args: [BigInt(param)],
            },
            {
                ...ERC721Contract,
                functionName: 'getApproved',
                args: [BigInt(param)],
            },
            {
                ...VaultContract,
                functionName: 'getPrice',
                args: [BigInt(param)],
            },
            {
                ...VaultContract,
                functionName: 'getOwner',
                args: [BigInt(param)],
            },
            {
                ...ERC20Contract,
                functionName: 'allowance',
                args: [param, '0xB37f99CAD2B7Dc870A2E4e385cbA1AD2E759Fd50'],
            },
            {
                ...ERC20Contract,
                functionName: 'balanceOf',
                args: [param],
            },
        ],
    })
    let erc721BalanceOf,
        erc721OwnerOf,
        erc721GetApproved,
        vaultGetPrice,
        vaultGetOwner,
        erc20Allowance,
        erc20BalanceOf

    if (data) {[
        erc721BalanceOf,
        erc721OwnerOf,
        erc721GetApproved,
        vaultGetPrice,
        vaultGetOwner,
        erc20Allowance,
        erc20BalanceOf
    ] = data
    }

    return {
        erc721BalanceOf,
        erc721OwnerOf,
        erc721GetApproved,
        vaultGetPrice,
        vaultGetOwner,
        erc20Allowance,
        erc20BalanceOf,
        isError,
        refetch,
    }
}
