import React, { useState } from 'react';
import { useEffect } from "react";
import web3 from "../connection/web3";
import { useHistory } from "react-router";
import { useAlert } from 'react-alert';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import logo from './logo_dark.png';

function Header(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [networkError, setNetworkError] = useState(undefined);
    const [userAdd, setUserAdd] = useState("");
    const [walletConnected, setWalletConnected] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [tooltipText, settooltipText] = useState("");
    const HARDHAT_NETWORK_ID = "97";
    //const HARDHAT_NETWORK_ID = "56";
    const history = useHistory();
    const alert = useAlert();

    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const getCurrentWalletConnected = async () => {
        if (web3) {
            try {
                web3.eth.net.getId().then(netId => {
                    if (netId.toString() === HARDHAT_NETWORK_ID) {
                        web3.eth.requestAccounts().then(addressArray => {
                            if (addressArray.length > 0) {
                                setSelectedAddress(addressArray[0]);
                                localStorage.setItem('address', addressArray[0]);
                                if (!localStorage.getItem('signer') === null) {
                                    //getSignIn();
                                } else {
                                    if (!(localStorage.getItem('signer') === addressArray[0])) {
                                        //getSignIn();
                                    }
                                }
                            } else {
                                setSelectedAddress("");
                                localStorage.setItem('address', "");
                            }
                        });
                        // const addressArray = web3.eth.getAccounts();

                    } else {
                        toast("Please connect Metamask to BSC Testnet");
                        setSelectedAddress("");
                        localStorage.setItem('address', "");
                    }
                });
            }
            catch (err) {
                setSelectedAddress("");
                localStorage.setItem('address', "");
            }
        } else {
            setSelectedAddress("");
            localStorage.setItem('address', "");
        }
    };

    useEffect(async () => {
        // settooltipText("Copy");
        await getCurrentWalletConnected();
        //setSelectedAddress(address);
        addWalletListener();
        chainListener();
    }, []);

    const signMessage = async ({ message }) => {
        const address = (await web3.eth.requestAccounts())[0]
        const signature = await web3.eth.personal.sign(message, address)
        return {
            signature,
            address,
            message
        };
    };

    const getSignIn = async () => {
        try {
            const sig = await signMessage({
                message: 'Super Vet'
            });
            if (sig) {
                // await saveTodo(sig);
                // await timeout(8000);
                localStorage.setItem('signer', sig.address);
                window.location.reload();
                // alert.show("Your SignIn Hash: " + sig.signature);
            }
        } catch (err) {
            toast("Please Sign In To Continue......");
            setSelectedAddress("");
            localStorage.setItem('address', "");
            await timeout(2000);
            window.location.reload();
        }

    };

    const connectWalletPressed = async () => {
        if (window.ethereum) {
            web3.eth.net.getId().then(netId => {
                if (netId.toString() === HARDHAT_NETWORK_ID) {
                    console.log("connectWalletPressed");
                    const walletResponse = connectWallet();
                    setSelectedAddress(walletResponse.address);
                    localStorage.setItem('address', walletResponse.address);
                    // getSignIn();
                } else {
                    toast("Please connect Metamask to BSC Testnet");
                }
            });
        } else {
            toast('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const obj = {
                    address: addressArray[0],
                };
                return obj;
            } catch (err) {
                return {
                    address: ""
                };
            }
        } else {
            return {
                address: ""
            };
        }
    };

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setSelectedAddress(accounts[0]);
                    localStorage.setItem('address', accounts[0]);
                    console.log("addWalletListener");
                    // history.push({
                    //   pathname: `/`
                    // });
                    window.location.reload();
                } else {
                    setSelectedAddress("");
                    localStorage.setItem('address', "");
                    toast("Connect to Metamask using the top right button.");
                }
            });
        } else {
            toast("You must install Metamask, a virtual Ethereum wallet, in your browser.");
        }
    }

    function chainListener() {
        if (window.ethereum) {
            window.ethereum.on("chainChanged", (_chainId) => {
                console.log(_chainId);
                if (_chainId !== HARDHAT_NETWORK_ID) {
                    localStorage.setItem('address', "");
                    window.location.reload();
                }
                // if (_chainId === HARDHAT_NETWORK_ID) {
                //   console.log('Hello BC');
                //   window.location.reload();
                // }
            });
        } else {
            toast("You must install Metamask, a virtual Ethereum wallet, in your browser.");
        }
    }

    return (
        <React.Fragment>
            <header id="header_main" class="header_1 header_2 style2 style3 js-header">
                <div class="themesflat-container">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="site-header-inner">
                                <div class="wrap-box flex"> 
                                <div id="site-logo" class="clearfix">
                                    <div id="site-logo-inner">
                                        <a href="/" rel="home" class="main-logo">
                                            <img id="logo_header" src={logo} alt="nft-gaming" width="130"
                                                height="100"  data-width="133" style={{ paddingTop: '5rem' }}
                                                data-height="56" />
                                        </a>
                                    </div>
                                </div>
                                    {
                                        !selectedAddress ?
                                            <div class="flat-search-btn flex">
                                                <div class="sc-btn-top mg-r-12" id="site-header">
                                                    <button onClick={() => connectWalletPressed()}
                                                        class="sc-button header-slider style style-1 wallet fl-button pri-1"><span>Wallet connect
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                            : <div class="flat-search-btn flex">
                                                <div class="sc-btn-top mg-r-12" id="site-header">
                                                <button disabled
                                                        class="sc-button header-slider style style-1 wallet fl-button pri-1">
                                                    <span>{"Address: " + String(selectedAddress).substring(0, 5) +
                                                        "..." +
                                                        String(selectedAddress).substring(
                                                            String(selectedAddress).length - 3,
                                                            String(selectedAddress).length
                                                        )} </span>
                                                         </button>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment >
    );
}

export default Header  