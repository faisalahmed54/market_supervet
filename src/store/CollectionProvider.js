import { useReducer } from 'react';

import CollectionContext from './collection-context';

const defaultCollectionState = {
  contract: null,
  totalSupply: null,
  collection: [],
  nftIsLoading: true
};

const collectionReducer = (state, action) => {
  if (action.type === 'CONTRACT') {
    return {
      contract: action.contract,
      totalSupply: state.totalSupply,
      collection: state.collection,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'LOADSUPPLY') {
    return {
      contract: state.contract,
      totalSupply: action.totalSupply,
      collection: state.collection,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'LOADCOLLECTION') {
    return {
      contract: state.contract,
      totalSupply: state.totalSupply,
      collection: action.collection,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'UPDATECOLLECTION') {
    const index = state.collection.findIndex(NFT => NFT.id === parseInt(action.NFT.id));
    let collection = [];

    if (index === -1) {
      collection = [action.NFT, ...state.collection];
    } else {
      collection = [...state.collection];
    }

    return {
      contract: state.contract,
      totalSupply: state.totalSupply,
      collection: collection,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'UPDATEOWNER') {
    const index = state.collection.findIndex(NFT => NFT.id === parseInt(action.id));
    let collection = [...state.collection];
    collection[index].owner = action.newOwner;

    return {
      contract: state.contract,
      totalSupply: state.totalSupply,
      collection: collection,
      nftIsLoading: state.nftIsLoading
    };
  }

  if (action.type === 'LOADING') {
    return {
      contract: state.contract,
      totalSupply: state.totalSupply,
      collection: state.collection,
      nftIsLoading: action.loading
    };
  }

  return defaultCollectionState;
};

const CollectionProvider = props => {
  const [CollectionState, dispatchCollectionAction] = useReducer(collectionReducer, defaultCollectionState);

  const loadContractHandler = (web3, NFTCollection, deployedNetwork) => {
    const contract = deployedNetwork ? new web3.eth.Contract(NFTCollection.abi, deployedNetwork.address) : '';
    dispatchCollectionAction({ type: 'CONTRACT', contract: contract });
    return contract;
  };

  const loadTotalSupplyHandler = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    dispatchCollectionAction({ type: 'LOADSUPPLY', totalSupply: totalSupply });
    return totalSupply;
  };

  const loadCollectionHandler = async (contract, totalSupply) => {
    let collection = [];
    // var lastname = "";
    // var lastimage = "";
    // var last_desc = "";
    // var count = 0;
    // var start_num = 0;
    // var last_attributes = [];

    // const creater = "0x67349e618A9bb9B64A1f3aBdc345025136392886";
    // const market = "0x4C71864835A927249FeC57348fcB4259282AA8f0";

    // for (let i = 0; i < totalSupply; i++) {
    //   const ownBy = await contract.methods.ownerOf(i + 1).call();
    //   if (ownBy === creater || ownBy === market) {
    //     const hash = await contract.methods.tokenURIs(i).call();
    //     try {
    //       const response = await fetch(hash);
    //       if (!response.ok) {
    //         throw new Error('Something went wrong');
    //       }
    //       const metadata = await response.json();
    //       //Check for same NFT
    //       if (lastname == "") {
    //         lastname = metadata.name;
    //         lastimage = metadata.image;
    //         last_desc = metadata.description;
    //         last_attributes = metadata.attributes;
    //         count = count + 1;
    //         start_num = i + 1;
    //       } else if (lastname == metadata.name) {
    //         lastname = metadata.name;
    //         lastimage = metadata.image;
    //         last_desc = metadata.description;
    //         last_attributes = metadata.attributes;
    //         count = count + 1;
    //       } else if (lastname != metadata.name) {
    //         const owner = await contract.methods.ownerOf(i + 1).call();
    //         collection = [{
    //           id: start_num,
    //           title: lastname,
    //           img: lastimage,
    //           owner: owner,
    //           quantity: count,
    //           description: last_desc,
    //           attributes: last_attributes
    //         }, ...collection];
    //         // console.log(collection);
    //         lastname = metadata.name;
    //         lastimage = metadata.image;
    //         last_desc = metadata.description;
    //         last_attributes = metadata.attributes;
    //         count = 1;
    //         start_num = i + 1;
    //       }
    //     } catch {
    //       console.error('Something went wrong');
    //     }
    //   }
    // }
    // const owner = await contract.methods.ownerOf(totalSupply).call();
    // if (owner === creater || owner === market) {
    //   collection = [{
    //     id: start_num,
    //     title: lastname,
    //     img: lastimage,
    //     owner: owner,
    //     quantity: count,
    //     description: last_desc,
    //     attributes: last_attributes
    //   }, ...collection];
    // }
    // console.log(collection);
    dispatchCollectionAction({ type: 'LOADCOLLECTION', collection: collection });
  };

  const updateCollectionHandler = async (contract, id, owner) => {
    let NFT;
    var lastname = "";
    var lastimage = "";
    var count = 0;
    const hash = await contract.methods.tokenURI(id).call();
    try {
      const response = await fetch(hash);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const metadata = await response.json();

      NFT = {
        id: parseInt(id),
        title: metadata.name,
        img: metadata.image,
        owner: owner
      };
    } catch {
      console.error('Something went wrong');
    }
    dispatchCollectionAction({ type: 'UPDATECOLLECTION', NFT: NFT });
  };

  const updateOwnerHandler = (id, newOwner) => {
    dispatchCollectionAction({ type: 'UPDATEOWNER', id: id, newOwner: newOwner });
  };

  const setNftIsLoadingHandler = (loading) => {
    dispatchCollectionAction({ type: 'LOADING', loading: loading });
  };

  const collectionContext = {
    contract: CollectionState.contract,
    totalSupply: CollectionState.totalSupply,
    collection: CollectionState.collection,
    nftIsLoading: CollectionState.nftIsLoading,
    loadContract: loadContractHandler,
    loadTotalSupply: loadTotalSupplyHandler,
    loadCollection: loadCollectionHandler,
    updateCollection: loadCollectionHandler,
    updateOwner: updateOwnerHandler,
    setNftIsLoading: setNftIsLoadingHandler
  };

  return (
    <CollectionContext.Provider value={collectionContext}>
      {props.children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;