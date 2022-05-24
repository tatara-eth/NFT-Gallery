import { useState } from "react";
import NFTCard from "../components/nftCard";

const Home = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [collectionAddress, setCollectionAddress] = useState("");
    const [NFTs, setNFTs] = useState([]);
    const [fetchForCollection, setFetchForCollection] = useState(false);

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const BASE_URL = `https://eth-mainnet.alchemyapi.io/v2/${API_KEY}/`
    const getNFTsEndpoint = "getNFTs/";
    const getNFTsInCollectionEndpoint = "getNFTsForCollection/"



    const fetchNFTS = async () => {
        let returnedNFTs;
        console.log("Fetching NFTs");
        const baseURL = BASE_URL + getNFTsEndpoint;
        let requestOptions = {
            method: "GET"
        };

        if (!collectionAddress.length) {
            // Fetch NFTs using only wallet address.
            const fetchURL = `${baseURL}?owner=${walletAddress}`;
            returnedNFTs = await fetch(fetchURL, requestOptions).then(data => data.json());
        } else {
            // Fetch NFTs using wallet address and contract address.
            // The "5B%5D" string right after the "contractAddresses" parameters specifies
            // that the "contractAddresses" parameter is an array and not a simple string.
            console.log("Fetching nfts for collection owned by address");
            const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
            returnedNFTs = await fetch(fetchURL, requestOptions).then(data => data.json());
        }

        if (returnedNFTs.totalCount > 0) {
            console.log("nfts:", returnedNFTs);
            setNFTs(returnedNFTs.ownedNfts);
        }
    };

    const fetchNFTsForCollection = async () => {
        if (collectionAddress.length) {
            let requestOptions = {
                method: "GET"
            };
            const baseURL = BASE_URL + getNFTsInCollectionEndpoint;
            const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`;
            const returnedNFTs = await fetch(fetchURL, requestOptions).then(data => data.json());
            if (returnedNFTs) {
                console.log("NFTs in collection: ", returnedNFTs);
                setNFTs(returnedNFTs.nfts);
            }
        }
    }

    return (
      <div className="flex flex-col items-center justify-center py-8 gap-y-3">
          <h1 className="text-lg uppercase font-bold">NFT Gallery</h1>
          <div className="flex flex-col w-full justify-center items-center gap-y-2">
              <input
                  onChange={e => setWalletAddress(e.target.value)}
                  value={walletAddress}
                  type={"text"}
                  placeholder="Wallet address"
                  disabled={fetchForCollection}
                  className="p-2 bg-gray-100"
              />
              <input
                  onChange={e => setCollectionAddress(e.target.value)}
                  value={collectionAddress}
                  type={"text"}
                  placeholder="Collection address"
                  className="p-2 bg-gray-100"
              />
              <label className="text-gray-600">
                  <input
                      type={"checkbox"}
                      className="mr-2"
                      onChange={e => setFetchForCollection(e.target.checked)}
                  />
                  Fetch for collection
              </label>
              <button
                  className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"}
                  onClick={() => {
                      if (fetchForCollection) {
                          fetchNFTsForCollection();
                      } else {
                          fetchNFTS();
                      }
                  }}
              >
                  Fetch NFTs
              </button>
          </div>
          <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
              {
                  NFTs.length > 0 && NFTs.map((nft, index) => {
                      return (
                          <NFTCard nft={nft} key={index}/>
                      );
                  })
              }
          </div>
      </div>
    );
}

export default Home;