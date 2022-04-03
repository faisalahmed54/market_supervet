import { useReducer } from 'react';

import TokenContext from './token-context';

const defaultTokenState = {
    contract: null
};

const tokenReducer = (state, action) => {
    if (action.type === 'CONTRACT') {
        return {
            contract: action.contract
        };
    }

    return defaultTokenState;
};

const TokenProvider = props => {
    const [TokenState, dispatchTokenAction] = useReducer(tokenReducer, defaultTokenState);

    const loadContractHandler = (web3, Token, deployedNetwork) => {
        const contract = deployedNetwork ? new web3.eth.Contract(Token.abi, deployedNetwork.address) : '';
        dispatchTokenAction({ type: 'CONTRACT', contract: contract });
        return contract;
    };

    const tokenContext = {
        contract: TokenState.contract,
        loadContract: loadContractHandler
    };

    return (
        <TokenContext.Provider value={tokenContext}>
            {props.children}
        </TokenContext.Provider>
    );
};

export default TokenProvider;