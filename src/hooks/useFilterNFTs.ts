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
          const response = await fetch(`http://localhost:3001/api/getImages/${tokenId}`);
          if (response.ok) {
            const imageData = await response.json();
            listNfts.push({ id: tokenId, image: imageData.image })
          }
        }
      }
      // Sort the listNfts array based on tokenId
      listNfts.sort((a, b) => parseInt(a.id) - parseInt(b.id));
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
    if (accountId && ((newNftEvent === 'Sell') || (newNftEvent === 'SellBuy'))) {
      filterNFTs();
    }
  }, [filterNFTs, newNftEvent]);

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
