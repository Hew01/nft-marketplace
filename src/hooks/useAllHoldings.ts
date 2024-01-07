import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setNewNftEvent } from '@/redux/globalSlice';
import { useReadContractAllHolding } from './useReadContractAllHolding';

function useAllHoldings() {
  const [result, setResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { vaultAllHoldings, refetch } = useReadContractAllHolding();

  const dispatch = useDispatch();
  const newNftEvent: string = useSelector((state: RootState) => state.global.newNftEvent);

  console.log('result: ', result);
  const fetchHoldings = useCallback(async (vaultAllHoldings: any) => {
    setIsLoading(true);
    console.log('isLoading: ', isLoading);
    try {
      let parsed: any[] = [];
      if (vaultAllHoldings) {
        console.log('vaultAllHoldings: ', vaultAllHoldings);
        for (let item of vaultAllHoldings) {
          const itemValue = await localforage.getItem(`key${item}`);
          if (itemValue !== null && typeof itemValue === 'string') {
            const parsedItem = JSON.parse(itemValue);
            if (Object.keys(parsedItem).length !== 0) {
              parsed.push(parsedItem);
            }
          }
        }
      }
      console.log('parsed: ', parsed);
      setResult(parsed);
    } catch (e: any) {
      setError(e.message);
    }
    setIsLoading(false);
    console.log('isLoading: ', isLoading);
  }, [vaultAllHoldings, newNftEvent]);

  useEffect(() => {
    fetchHoldings(vaultAllHoldings);
  }, [])

  useEffect(() => {
    console.log('new nft event: ', newNftEvent);
    if ((newNftEvent === 'Buy') || (newNftEvent === 'SellBuy')) {
      refetch().then((queryResult) => {
        const newVaultAllHoldings = queryResult.data;
        fetchHoldings(newVaultAllHoldings);
      })
    }
  }, [fetchHoldings, newNftEvent]);

  useEffect(() => {
    if (!isLoading && error === null) {
      dispatch(setNewNftEvent({ newNftEvent: '' }));
    }
  }, [result, isLoading, error, dispatch]);

  return {
    result,
    isLoading,
    error,
  }
}

export default useAllHoldings
