import React, { useEffect, useState, useContext } from "react";
import Web3Context from '../store/web3-context';
import CollectionContext from '../store/collection-context';
import MarketplaceContext from '../store/marketplace-context';
import TokenContext from '../store/token-context';
import Header from './Header'
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Details(props) {

    const web3Ctx = useContext(Web3Context);
    const collectionCtx = useContext(CollectionContext);
    const marketplaceCtx = useContext(MarketplaceContext);
    const tokenCtx = useContext(TokenContext);
    const item = props.history.location.state;
    const url = props.history.location.url;

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const onBuy = async (item, url) => {
        const price = "250";
        const contractAddress = collectionCtx.contract._address;
        const tokenAddress = tokenCtx.contract._address;
        const owner = "0x67349e618A9bb9B64A1f3aBdc345025136392886";
        // console.log(collectionCtx.contract._address);
        //set up your Ethereum transaction
        const transactionParameters = {
            to: contractAddress, // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            'data': collectionCtx.contract.methods.bulkMint("1", window.ethereum.selectedAddress, url).encodeABI()//make call to NFT smart contract
        };

        //sign the transaction via Metamask
        try {
            tokenCtx.contract.methods.transfer(owner, (price * 1000000000000000000).toString()).send({ from: web3Ctx.account })
                .on('transactionHash', async (hash) => {
                    const txHash = await window.ethereum
                        .request({
                            method: 'eth_sendTransaction',
                            params: [transactionParameters],
                        });
                    toast("✅ Check out your transaction on Etherscan: https://testnet.bscscan.com/address/" + txHash);
                    await timeout(5000);
                    props.history.push('/');
                    window.location.reload(false);
                })
                .on('error', (error) => {
                    toast('Something went wrong when pushing to the blockchain');
                    props.history.push('/');
                    window.location.reload(false);
                });
        } catch (error) {
            console.log("Error While Buying: " + error)
            toast("Error While Buying: " + error);
        }
    }

    return (
        <div id="wrapper">
            <Header />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <section className="flat-title-page inner">
                        <div className="overlay"></div>
                        <div className="themesflat-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-title-heading mg-bt-12">
                                        <h1 className="heading text-center">Super Vet Marketplace</h1>
                                    </div>
                                    <div className="breadcrumbs style2">
                                        <ul>
                                            <li>Buy</li>
                                            <li>|</li>
                                            <li>Sell</li>
                                            <li>|</li>
                                            <li>Trade</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="tf-section tf-item-details style-2">
                        <div className="themesflat-container">
                            <div className="row">
                                <div className="col-xl-6 col-md-12">
                                    <div className="content-left">
                                        <div className="media">
                                            <img src={item.image} alt={item.name} style={{ marginTop: "-10rem" }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-md-12">
                                    <div className="content-right">
                                        <div className="sc-item-details">
                                            <div className="meta-item">
                                                <div className="left">
                                                    <h2>{item.name}</h2>
                                                </div>
                                                <div className="right">
                                                    <span className="viewed eye mg-r-8">225</span>
                                                    <span className="liked heart wishlist-button"><span className="number-like">100</span></span>
                                                </div>
                                            </div>
                                            <div className="client-infor sc-card-product">
                                                <div className="meta-info">
                                                    <div className="author">
                                                        <div className="avatar">
                                                            <img src="assets/images/avatar/avt-8.jpg" alt="" />
                                                        </div>
                                                        <div className="info">
                                                            <span>Owned By</span>
                                                            <h6> Super Vet NFTs</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="meta-info">
                                                    <div className="author">
                                                        <div className="avatar">
                                                            <img src="assets/images/avatar/avt-2.jpg" alt="" />
                                                        </div>
                                                        <div className="info">
                                                            <span>Create By</span>
                                                            <h6> Super Vet Team</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p>{item.description}</p>
                                            <div className="meta-item-details">
                                                <div className="item-style-2 item-details">
                                                    <ul className="list-details">
                                                        <li><span>Speed:</span><h6 style={{ paddingLeft: '18rem' }}>75</h6> </li>
                                                        <li><span>Stamina:</span><h6 style={{ paddingLeft: '17rem' }}>75</h6> </li>
                                                        <li><span>Strength:</span><h6 style={{ paddingLeft: '16.5rem' }}>85</h6> </li>
                                                        <li><span>Intelligence:</span><h6 style={{ paddingLeft: '14.6rem' }}>75</h6> </li>
                                                        <li><span>Flight:</span><h6 style={{ paddingLeft: '18.5rem' }}>00</h6 > </li>
                                                        <li><span>Healing:</span><h6 style={{ paddingLeft: '17.1rem' }}>35</h6> </li>
                                                        <li><span>Stealth:</span><h6 style={{ paddingLeft: '17.4rem' }}>00</h6> </li>
                                                        <li><span>Telepathy:</span><h6 style={{ paddingLeft: '15.6rem' }}>00</h6> </li>
                                                        <li><span>Telekinesis:</span><h6 style={{ paddingLeft: '14.7rem' }}>00</h6> </li>
                                                    </ul>
                                                </div>
                                                <div className="item-style-2">
                                                    <div className="item meta-price">
                                                        <span className="heading">Price</span>
                                                        <div className="price">
                                                            <div className="price-box">
                                                                <h5> 250 $SVET</h5>
                                                                {/* <span>= $12.246</span> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item count-down">
                                                        <ul className="js-countdown">
                                                            <h6 style={{ textAlign: 'left' }}>Super Powers</h6>
                                                            <br />
                                                            <br />
                                                            <li style={{ textAlign: 'left' }}><span style={{ fontSize: 'medium' }}>1. Super Sense</span></li>
                                                            <br />
                                                            <br />
                                                            <li style={{ textAlign: 'left' }}><span style={{ fontSize: 'medium' }}>2. Medical Specialist</span></li>
                                                            <br />
                                                            <br />
                                                            <li style={{ textAlign: 'left' }}><span style={{ fontSize: 'medium' }}>3. Super Strength</span></li>
                                                            <br />
                                                            <br />
                                                            <li style={{ textAlign: 'left' }}><span style={{ fontSize: 'medium' }}>4. Cardiology</span></li>
                                                            <br />
                                                            <br />
                                                            <li style={{ textAlign: 'left' }}><span style={{ fontSize: 'medium' }}>5. Animals Friend</span></li>
                                                            <br />
                                                            <br />
                                                            <li style={{ textAlign: 'left' }}><span style={{ fontSize: 'medium' }}>6. Fast Learner</span></li>
                                                        </ul>
                                                    </div>
                                                    {/* <div className="item count-down">
                                                        <span className="js-countdown" data-timer="416400"
                                                            data-labels=" :  ,  : , : , "></span>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <button style={{ width: '-webkit-fill-available' }} onClick={() => onBuy(item, url)} className="sc-button loadmore style bag fl-button pri-3"><span>Buy NFT</span></button>
                                            {/* <div className="flat-tabs themesflat-tabs">
                                                <ul className="menu-tab tab-title">
                                                    <li className="item-title active">
                                                        <span className="inner">Bid History</span>
                                                    </li>
                                                    <li className="item-title">
                                                        <span className="inner">Info</span>
                                                    </li>
                                                    <li className="item-title">
                                                        <span className="inner">Provenance</span>
                                                    </li>
                                                </ul>
                                                <div className="content-tab">
                                                    <div className="content-inner tab-content">
                                                        <ul className="bid-history-list">
                                                            <li>
                                                                <div className="content">
                                                                    <div className="client">
                                                                        <div className="sc-author-box style-2">
                                                                            <div className="author-avatar">
                                                                                <a href="#">
                                                                                    <img src="assets/images/avatar/avt-3.jpg" alt="" className="avatar" />
                                                                                </a>
                                                                                <div className="badge"></div>
                                                                            </div>
                                                                            <div className="author-infor">
                                                                                <div className="name">
                                                                                    <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                                                                </div>
                                                                                <span className="time">8 hours ago</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <h5> 4.89 ETH</h5>
                                                                        <span>= $12.246</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="content">
                                                                    <div className="client">
                                                                        <div className="sc-author-box style-2">
                                                                            <div className="author-avatar">
                                                                                <a href="#">
                                                                                    <img src="assets/images/avatar/avt-11.jpg" alt="" className="avatar" />
                                                                                </a>
                                                                                <div className="badge"></div>
                                                                            </div>
                                                                            <div className="author-infor">
                                                                                <div className="name">
                                                                                    <h6> <a href="author02.html">Mason Woodward </a></h6> <span>bid accepted</span>
                                                                                </div>
                                                                                <span className="time">at 06/10/2021, 3:20 AM</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <h5> 4.89 ETH</h5>
                                                                        <span>= $12.246</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="content">
                                                                    <div className="client">
                                                                        <div className="sc-author-box style-2">
                                                                            <div className="author-avatar">
                                                                                <a href="#">
                                                                                    <img src="assets/images/avatar/avt-1.jpg" alt="" className="avatar" />
                                                                                </a>
                                                                                <div className="badge"></div>
                                                                            </div>
                                                                            <div className="author-infor">
                                                                                <div className="name">
                                                                                    <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                                                                </div>
                                                                                <span className="time">8 hours ago</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <h5> 4.89 ETH</h5>
                                                                        <span>= $12.246</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="content">
                                                                    <div className="client">
                                                                        <div className="sc-author-box style-2">
                                                                            <div className="author-avatar">
                                                                                <a href="#">
                                                                                    <img src="assets/images/avatar/avt-5.jpg" alt="" className="avatar" />
                                                                                </a>
                                                                                <div className="badge"></div>
                                                                            </div>
                                                                            <div className="author-infor">
                                                                                <div className="name">
                                                                                    <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                                                                </div>
                                                                                <span className="time">8 hours ago</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <h5> 4.89 ETH</h5>
                                                                        <span>= $12.246</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="content">
                                                                    <div className="client">
                                                                        <div className="sc-author-box style-2">
                                                                            <div className="author-avatar">
                                                                                <a href="#">
                                                                                    <img src="assets/images/avatar/avt-7.jpg" alt="" className="avatar" />
                                                                                </a>
                                                                                <div className="badge"></div>
                                                                            </div>
                                                                            <div className="author-infor">
                                                                                <div className="name">
                                                                                    <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                                                                </div>
                                                                                <span className="time">8 hours ago</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <h5> 4.89 ETH</h5>
                                                                        <span>= $12.246</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="content">
                                                                    <div className="client">
                                                                        <div className="sc-author-box style-2">
                                                                            <div className="author-avatar">
                                                                                <a href="#">
                                                                                    <img src="assets/images/avatar/avt-8.jpg" alt="" className="avatar" />
                                                                                </a>
                                                                                <div className="badge"></div>
                                                                            </div>
                                                                            <div className="author-infor">
                                                                                <div className="name">
                                                                                    <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                                                                </div>
                                                                                <span className="time">8 hours ago</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <h5> 4.89 ETH</h5>
                                                                        <span>= $12.246</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="content-inner tab-content">
                                                        <ul className="bid-history-list">
                                                            <li>
                                                                <div className="content">
                                                                    <div className="client">
                                                                        <div className="sc-author-box style-2">
                                                                            <div className="author-avatar">
                                                                                <a href="#">
                                                                                    <img src="assets/images/avatar/avt-3.jpg" alt="" className="avatar" />
                                                                                </a>
                                                                                <div className="badge"></div>
                                                                            </div>
                                                                            <div className="author-infor">
                                                                                <div className="name">
                                                                                    <h6> <a href="author02.html">Mason Woodward </a></h6> <span> place a bid</span>
                                                                                </div>
                                                                                <span className="time">8 hours ago</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="content-inner tab-content">
                                                        <div className="provenance">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                                                It has survived not only five centuries, but also the leap into electronic typesetting,
                                                                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                                                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Details