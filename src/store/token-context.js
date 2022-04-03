import React from 'react';

const TokenContext = React.createContext({
    contract: null,
    loadContract: () => { }
});

export default TokenContext;