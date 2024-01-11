import { useContractRead } from 'wagmi'
import { VaultContract } from '@/constants/ContractList'

export function useReadContractAllHolding() {
    const {data: vaultAllHoldings, isError, refetch} = useContractRead({
        ...VaultContract,
        functionName: 'allHoldings',
    })
    return {
        vaultAllHoldings,
        isError,
        refetch,
    }
}