import './App.css';
import Layout from './layout/Layout';
import Details from './layout/Details';
import React, { useEffect } from "react";
import { useContext, useRef, createRef } from 'react';
import web3 from './connection/web3';
import Web3Context from './store/web3-context';
import CollectionContext from './store/collection-context';
import MarketplaceContext from './store/marketplace-context'
import TokenContext from './store/token-context'
import NFTCollection from './abi/contracts/contracts/NFTCollection.json';
import Token from './abi/contracts/contracts/SvetToken.json';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const web3Ctx = useContext(Web3Context);
  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);
  const tokenCtx = useContext(TokenContext);

  useEffect(() => {
    // store.dispatch(loadUser());
    // Check if the user has Metamask active
    if (!web3) {
      // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      toast('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return;
    }

    // Function to fetch all the blockchain data
    const loadBlockchainData = async () => {
      // Request accounts acccess if needed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error(error);
      }

      // Load account
      const account = await web3Ctx.loadAccount(web3);

      // Load Network ID
      const networkId = await web3Ctx.loadNetworkId(web3);

      console.log(networkId);

      // Load Contracts      
      const nftDeployedNetwork = NFTCollection.networks[networkId];
      const nftContract = collectionCtx.loadContract(web3, NFTCollection, nftDeployedNetwork);

      // const mktDeployedNetwork = NFTMarketplace.networks[networkId];
      // const mktContract = marketplaceCtx.loadContract(web3, NFTMarketplace, mktDeployedNetwork);

      const tokenDeployedNetwork = Token.networks[networkId];
      const tokenContract = tokenCtx.loadContract(web3, Token, tokenDeployedNetwork);

      if (nftContract) {
        // Load total Supply
        //const totalSupply = await collectionCtx.loadTotalSupply(nftContract);

        // Load Collection
        // collectionCtx.loadCollection(nftContract, totalSupply);

        // Event subscription
        nftContract.events.Transfer()
          .on('data', (event) => {
            collectionCtx.updateCollection(nftContract, event.returnValues.tokenId, event.returnValues.to);
            collectionCtx.setNftIsLoading(false);
          })
          .on('error', (error) => {
            console.log(error);
          });

      } else {
        // window.alert('NFTCollection contract not deployed to detected network.')
      }

      // if (mktContract) {

      //   // Load offer count
      //   const offerCount = await marketplaceCtx.loadOfferCount(mktContract);

      //   // Load offers
      //   marketplaceCtx.loadOffers(mktContract, offerCount);

      //   // Load User Funds
      //   account && marketplaceCtx.loadUserFunds(mktContract, account);

      //   // Event OfferFilled subscription 
      //   mktContract.events.OfferFilled()
      //     .on('data', (event) => {
      //       marketplaceCtx.updateOffer(event.returnValues.offerId);
      //       collectionCtx.updateOwner(event.returnValues.id, event.returnValues.newOwner);
      //       marketplaceCtx.setMktIsLoading(false);
      //     })
      //     .on('error', (error) => {
      //       console.log(error);
      //     });

      //   // Event Offer subscription 
      //   mktContract.events.Offer()
      //     .on('data', (event) => {
      //       marketplaceCtx.addOffer(event.returnValues);
      //       marketplaceCtx.setMktIsLoading(false);
      //     })
      //     .on('error', (error) => {
      //       console.log(error);
      //     });

      //   // Event offerCancelled subscription 
      //   mktContract.events.OfferCancelled()
      //     .on('data', (event) => {
      //       marketplaceCtx.updateOffer(event.returnValues.offerId);
      //       collectionCtx.updateOwner(event.returnValues.id, event.returnValues.owner);
      //       marketplaceCtx.setMktIsLoading(false);
      //     })
      //     .on('error', (error) => {
      //       console.log(error);
      //     });

      // } else {
      //   window.alert('NFTMarketplace contract not deployed to detected network.')
      // }

      // collectionCtx.setNftIsLoading(false);
      // marketplaceCtx.setMktIsLoading(false);

      // // Metamask Event Subscription - Account changed
      // window.ethereum.on('accountsChanged', (accounts) => {
      //   web3Ctx.loadAccount(web3);
      //   accounts[0] && marketplaceCtx.loadUserFunds(mktContract, accounts[0]);
      // });

      // Metamask Event Subscription - Network changed
      window.ethereum.on('accountsChanged', function () {
        window.location.reload();
      });
    };

    loadBlockchainData();
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Layout} />
            <Route path="/details/:id" exact component={Details} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
