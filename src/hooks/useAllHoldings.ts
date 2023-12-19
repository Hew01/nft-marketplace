import { useState, useEffect, useCallback } from 'react';
import { useReadContractNoArgs } from './useReadContractNoArgs';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setNewNftEvent } from '@/redux/globalSlice';
// import database from '@/database/db';

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

  // Grabbing all the images from MongoDB
  // const fetchHoldingsOnDB = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     // Assuming 'images' is the name of your MongoDB Atlas collection
  //     const imagesCollection = database.getDb().collection('images');
  
  //     // Perform a query to retrieve all documents from the 'images' collection
  //     const allImages = await imagesCollection.find().toArray();
  
  //     // Map the retrieved documents to the 'parsed' array
  //     const parsed = allImages.map((imageDocument) => {
  //       const itemValue = imageDocument.data;
  //       if (typeof itemValue === 'string') {
  //         const parsedItem = JSON.parse(itemValue);
  //         if (Object.keys(parsedItem).length !== 0) {
  //           return parsedItem;
  //         }
  //       }
  //       return null; // Filter out null items
  //     }).filter(Boolean); // Remove null items
  
  //     setResult(parsed);
  //   } catch (e: any) {
  //     setError(e.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [newNftEvent]);    

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
