import React, { Component } from 'react';
import logo from './logo_dark.png';

export class Footer extends Component {
    render() {
        return (
            <div>
                <footer id="footer" className="footer-light-style clearfix">
                    <div className="themesflat-container">
                        <div className="row">
                            <div className="col-lg-3 col-md-12 col-12">
                                <div className="widget widget-logo">
                                    <div className="logo-footer" id="logo-footer">
                                        <a href="/" rel="home" className="main-logo">
                                            <img id="logo_header" src={logo} alt="nft-gaming" width="200"
                                                height="100" data-retina="assets/images/logo/logo_dark@2x.png" data-width="133"
                                                data-height="56" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
                                <div className="widget widget-menu style-1">
                                    <h5 className="title-widget">Learn More</h5>
                                    <ul>
                                        <li className="homeMenu"><a href="/" id="homeMenu">Home</a></li>
                                        <li className="gameplayMenu">
                                            <a href="supervet.io" id="gameplayMenu">Gameplay</a>
                                        </li>
                                        <li className="roadmapMenu">
                                            <a href="supervet.io" id="roadmapMenu">Roadmap</a>
                                        </li>
                                        <li className="metaverseMenu">
                                            <a href="#" data-toggle="modal" data-target="#popup_bid"
                                            ><i className="fad fa-lock"></i> SUPERVERSE</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 col-sm-7 col-7">
                                <div className="widget widget-menu style-2">
                                    <h5 className="title-widget">Marketplace</h5>
                                    <ul>
                                        <li className="charactersMenu"><a href="#">Characters</a></li>
                                        <li className="in-gameAssets"><a href="#">In-Game Assets</a></li>
                                        <li>
                                            <a href="#" data-toggle="modal" data-target="#coming_soon_popup"
                                            >Buy/Sell</a
                                            >
                                        </li>
                                        <li>
                                            <a href="#" data-toggle="modal" data-target="#coming_soon_popup"
                                            >NFT Staking</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
                                <div className="widget widget-menu fl-st-3">
                                    <h5 className="title-widget">Quick Links</h5>
                                    <ul>
                                        <li>
                                            <a
                                                href="https://super-vet.gitbook.io/super-vet-white-paper"
                                                target="_blank"
                                            >Whitepaper</a
                                            >
                                        </li>
                                        <li>
                                            <a
                                                href="https://drive.google.com/file/d/1ZkrHMFSOC-hUIZk1ACVHV48LCtrwb9b-/view" target="_blank"
                                            >Pitch Deck</a
                                            >
                                        </li>
                                        <li>
                                            <a href="/" data-toggle="modal"
                                            >Marketplace</a
                                            >
                                        </li>
                                        <li>
                                            <a href="#" data-toggle="modal" data-target="#coming_soon_popup"
                                            >Smart Contract</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-7 col-12">
                                <div className="widget widget-subcribe">
                                    <h5 className="title-widget">Subscribe Us</h5>
                                    <div className="form-subcribe">
                                        <form
                                            id="subscribe-form"
                                            action="#"
                                            method="GET"
                                            accept-charset="utf-8"
                                            className="form-submit"
                                        >
                                            <input
                                                name="email"
                                                value=""
                                                className="email"
                                                type="email"
                                                placeholder="info@yourgmail.com"
                                                required
                                            />
                                            <button id="submit" name="submit" type="submit">
                                                <i className="icon-fl-send"></i>
                                            </button>
                                        </form>
                                    </div>
                                    <div className="widget-social style-1 mg-t32">
                                        <ul>
                                            <li>
                                                <a href="https://twitter.com/SuperVet_io" target="_blank"
                                                ><i className="fab fa-twitter"></i
                                                ></a>
                                            </li>
                                            <li>
                                                <a href="https://medium.com/@SuperVet" target="_blank"
                                                ><i className="fab fa-medium"></i
                                                ></a>
                                            </li>
                                            <li className="style-2">
                                                <a href="https://t.me/SuperVet_Ann" target="_blank"
                                                ><i className="fab fa-telegram-plane"></i
                                                ></a>
                                            </li>
                                            <li>
                                                <a
                                                    href="https://www.youtube.com/channel/UCakQ5vkIGc5q1toCA7nO5sw"
                                                    target="_blank"
                                                ><i className="fab fa-youtube"></i
                                                ></a>
                                            </li>
                                            <li className="mgr-none">
                                                <a href="https://vt.tiktok.com/ZGJUqfxMd/" target="_blank"
                                                ><i className="icon-fl-tik-tok-2"></i
                                                ></a>
                                            </li>
                                            <li className="mgr-none">
                                                <a href="https://discord.com/invite/J3rywtphjz" target="_blank"
                                                ><i className="icon-fl-vt"></i
                                                ></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer 