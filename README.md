# ROAD TO WEB3 Weekly Learning Challenges (Week 4)

This week's challenge is to create an NFT gallery using Alchemy's NFT API. Tutorial is found [here](https://docs.alchemy.com/alchemy/road-to-web3/weekly-learning-challenges/4.-how-to-create-an-nft-gallery-alchemy-nft-api).

## How does this gallery work?
By entering either a Ethereum wallet address or contract address you are able to fetch a list of owned NFT.

*Only NFTs minted on Ethereum's Mainnet will be fetched.* 

## How can I run this locally?

### Prerequisite 
* Log into [Alchemy](https://www.alchemy.com/) and create your own Ethereum Mainnet application. Save your API Key, you're going to need it. 


### Next
```bash
git clone https://github.com/tatara-eth/NFT-Gallery.git
cd into this newly cloned folder.
npm install
Open the .env.replace file in your code editor and replace the "NEXT_PUBLIC_API_KEY" value with your own Alchemy Ethereum Mainnet App Api Key. 
Save and rename the .env.replace file to .env.local
npm run dev
```
