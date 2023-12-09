import { useState, useEffect, useCallback } from 'react';
import { getNFTIds } from "../functions/getNFTIds"
import localForage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setNewNftEvent } from '@/redux/globalSlice';

export const useFilterNFTs = (accountId: string) => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const newNftEvent: string = useSelector((state: RootState) => state.global.newNftEvent);

  const filterNFTs = useCallback(async () => {
    setIsLoading(true);
    try {
      const { nftList } = await getNFTIds(accountId);
      let listNfts = [];
      for (let nft of nftList) {
        if (nft.contract.name === "NFT721") {
          const tokenId = nft.tokenId;
          const storedValue = JSON.parse((await localForage.getItem(`key${tokenId}`)) || '{}');
          if (Object.keys(storedValue).length !== 0) {
            listNfts.push(storedValue)
          }
        }
      }
      setNfts(listNfts);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false)
    }
  }, [accountId, newNftEvent]);

  useEffect(() => {
    if (accountId) {
      filterNFTs();
    }
  }, [accountId]);

  useEffect(() => {
    if (accountId && (newNftEvent === 'Sell' || newNftEvent === 'SellBuy')) {
      filterNFTs();
    }
  }, [filterNFTs, accountId, newNftEvent]);

  useEffect(() => {
    if (!isLoading && error === null) {
      dispatch(setNewNftEvent({ newNftEvent: '' }));
    }
  })
  return {
    nfts,
    isLoading,
    error
  }
}
