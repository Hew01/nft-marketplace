import { useState, useEffect, useCallback } from 'react';
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

  const fetchHoldings = useCallback(async (vaultAllHoldings: any) => {
    setIsLoading(true);
    try {
      let parsed: any[] = [];

      // Using MongoDB Atlas
      if (vaultAllHoldings) {
        for (let tokenId of vaultAllHoldings) {
          // Fetch image data from the server based on tokenId
          const response = await fetch(`http://localhost:3001/api/getImages/${tokenId}`);
          if (response.ok) {
            const imageData = await response.json();
            parsed.push({ id: tokenId, image: imageData.image });
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
