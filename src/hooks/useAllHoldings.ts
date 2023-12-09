import { useState, useEffect, useCallback } from 'react';
import { useReadContractNoArgs } from './useReadContractNoArgs';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setNewNftEvent } from '@/redux/globalSlice';

function useAllHoldings() {
  const [result, setResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { vaultAllHoldings, refetch } = useReadContractNoArgs();

  const dispatch = useDispatch();
  const newNftEvent: string = useSelector((state: RootState) => state.global.newNftEvent);

  const fetchHoldings = useCallback(async () => {
    setIsLoading(true);
    try {
      refetch();
      let parsed: any[] = [];
      if (vaultAllHoldings?.result) {
        for (let item of vaultAllHoldings.result) {
          const itemValue = await localforage.getItem(`key${item}`);
          if (itemValue !== null && typeof itemValue === 'string') {
            const parsedItem = JSON.parse(itemValue);
            if (Object.keys(parsedItem).length !== 0) {
              parsed.push(parsedItem);
            }
          }
        }
      }
      setResult(parsed);
    } catch (e: any) {
      setError(e.message);
    }
    setIsLoading(false);
  }, [vaultAllHoldings, newNftEvent]);

  useEffect(() => {
    if (vaultAllHoldings) {
      fetchHoldings();
    }
  }, [vaultAllHoldings]);

  useEffect(() => {
    if (newNftEvent === 'Sell' || newNftEvent === 'SellBuy') {
      fetchHoldings();
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
