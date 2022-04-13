import React, { Component, useState } from "react";
import { useEffect, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Pagination from "./Pagination";

const Leftside = () => {
  const [VetDetails, setVetDetails] = useState([]);
  const history = useHistory();
  const vetsData = [
    {
      id: "1",
      url: "https://qazibucket.s3.us-east-2.amazonaws.com/vet/jsons/bruce.json",
      image: "assets/images/characters/bruce.webp",
      status: "soon",
      catergory: "characters",
    },
    {
      id: "2",
      url: "N/A",
      image: "assets/images/characters/nina.webp",
      status: "soon",
      catergory: "characters",
    },
    {
      id: "3",
      url: "N/A",
      image: "assets/images/characters/wolf.webp",
      status: "soon",
      catergory: "characters",
    },
    {
      id: "4",
      url: "N/A",
      image: "assets/images/characters/steelshot.webp",
      status: "soon",
      catergory: "characters",
    },
    {
      id: "5",
      url: "N/A",
      image: "assets/images/characters/x.webp",
      status: "soon",
      catergory: "characters",
    },
    {
      id: "6",
      url: "N/A",
      image: "assets/images/characters/ivy.webp",
      status: "soon",
      catergory: "characters",
    },
    {
      id: "7",
      url: "N/A",
      image: "assets/images/characters/vision.webp",
      status: "soon",
      catergory: "characters",
    },
    {
      id: "8",
      url: "N/A",
      image: "assets/images/characters/maximus.webp",
      status: "soon",
      catergory: "characters",
    },
    {
      id: "9",
      url: "N/A",
      image: "assets/images/characters/gibran.webp",
      status: "soon",
      catergory: "characters",
    },
    {
      id: "10",
      url: "N/A",
      image: "assets/images/characters/psycho.webp",
      status: "soon",
      catergory: "characters",
    },
    {
      id: "11",
      url: "N/A",
      image: "assets/images/assets_cards/health_potion.webp",
      status: "soon",
      catergory: "serums",
    },
    {
      id: "12",
      url: "N/A",
      image: "assets/images/assets_cards/power_potion.webp",
      status: "soon",
      catergory: "serums",
    },
    {
      id: "13",
      url: "N/A",
      image: "assets/images/assets_cards/flying_potion.webp",
      status: "soon",
      catergory: "serums",
    },
    {
      id: "14",
      url: "N/A",
      image: "assets/images/assets_cards/speed_potion.webp",
      status: "soon",
      catergory: "serums",
    },
    {
      id: "15",
      url: "N/A",
      image: "assets/images/assets_cards/stamina_potion.webp",
      status: "soon",
      catergory: "serums",
    },
    {
      id: "16",
      url: "N/A",
      image: "assets/images/assets_cards/saw.webp",
      status: "soon",
      catergory: "tools",
    },
    {
      id: "17",
      url: "N/A",
      image: "assets/images/assets_cards/knife.webp",
      status: "soon",
      catergory: "tools",
    },
    {
      id: "18",
      url: "N/A",
      image: "assets/images/assets_cards/hammer.webp",
      status: "soon",
      catergory: "tools",
    },
    {
      id: "19",
      url: "N/A",
      image: "assets/images/assets_cards/clamps.webp",
      status: "soon",
      catergory: "tools",
    },
    {
      id: "20",
      url: "N/A",
      image: "assets/images/assets_cards/bottle.webp",
      status: "soon",
      catergory: "tools",
    },
    {
      id: "21",
      url: "N/A",
      image: "assets/images/assets_cards/injections.webp",
      status: "soon",
      catergory: "tools",
    },
    {
      id: "22",
      url: "N/A",
      image: "assets/images/assets_cards/razor.webp",
      status: "soon",
      catergory: "tools",
    },
    {
      id: "23",
      url: "N/A",
      image: "assets/images/assets_cards/rope.webp",
      status: "soon",
      catergory: "tools",
    },
    {
      id: "24",
      url: "N/A",
      image: "assets/images/assets_cards/scope.webp",
      status: "soon",
      catergory: "tools",
    },
    {
      id: "25",
      url: "N/A",
      image: "assets/images/assets_cards/first_aid.webp",
      status: "soon",
      catergory: "tools",
    },
  ];

  const setSelectedItem = async (nft) => {
    let item;
    try {
      const response = await fetch(nft.url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      item = await response.json();
    } catch {
      console.error("Something went wrong");
    }
    if (item) {
      history.push({
        pathname: `/details/${nft?.id}`,
        state: item,
        url: nft.url,
      });
    }
  };
  //checkboxes Handle function
  const [filterInfo, setFilterInfo] = useState({
    filterBoxesChecked: [],
  });
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { filterBoxesChecked } = filterInfo;

    // console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setFilterInfo({
        filterBoxesChecked: [...filterBoxesChecked, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setFilterInfo({
        filterBoxesChecked: filterBoxesChecked.filter((e) => e !== value),
      });
    }
  };
  //Update Vet Details According to Filteration
  const updateVetDetailsAccordingToFilter = () => {
    if (filterInfo.filterBoxesChecked.length > 0) {
      var vetsDataIndexes = [];
      vetsData.map((item, index) => {
        var indexFound = filterInfo.filterBoxesChecked.indexOf(item.catergory);
        if (indexFound < 0) {
          vetsDataIndexes.push(index);
        }
        if (index == vetsData.length - 1) {
          var vetsDataTemp = [...vetsData];
          for (var i = vetsDataIndexes.length - 1; i >= 0; i--) {
            vetsDataTemp.splice(vetsDataIndexes[i], 1);
            if (i == 0) {
              setVetDetails(vetsDataTemp);
            }
          }
        }
      });
    }
  };
  //show pages function
  const showPages = async (id) => {
    try {
      if (id == 1) {
        document.getElementById("firstPageNumber").style.color = "orange";
        document.getElementById("secondPageNumber").style.color = "white";
        document.getElementById("thirdPageNumber").style.color = "white";
        document.getElementById("forthPageNumber").style.color = "white";
        document.getElementById("fifthPageNumber").style.color = "white";
        setVetDetails(Array.from(vetsData).slice(0, 6));
      } else if (id == 2) {
        document.getElementById("firstPageNumber").style.color = "white";
        document.getElementById("secondPageNumber").style.color = "orange";
        document.getElementById("thirdPageNumber").style.color = "white";
        document.getElementById("forthPageNumber").style.color = "white";
        document.getElementById("fifthPageNumber").style.color = "white";
        setVetDetails(Array.from(vetsData).slice(6, 12));
      } else if (id == 3) {
        document.getElementById("firstPageNumber").style.color = "white";
        document.getElementById("secondPageNumber").style.color = "white";
        document.getElementById("thirdPageNumber").style.color = "orange";
        document.getElementById("forthPageNumber").style.color = "white";
        document.getElementById("fifthPageNumber").style.color = "white";
        setVetDetails(Array.from(vetsData).slice(12, 18));
      } else if (id == 4) {
        document.getElementById("firstPageNumber").style.color = "white";
        document.getElementById("secondPageNumber").style.color = "white";
        document.getElementById("thirdPageNumber").style.color = "white";
        document.getElementById("forthPageNumber").style.color = "orange";
        document.getElementById("fifthPageNumber").style.color = "white";
        setVetDetails(Array.from(vetsData).slice(18, 24));
      } else {
        document.getElementById("firstPageNumber").style.color = "white";
        document.getElementById("secondPageNumber").style.color = "white";
        document.getElementById("thirdPageNumber").style.color = "white";
        document.getElementById("forthPageNumber").style.color = "white";
        document.getElementById("fifthPageNumber").style.color = "orange";
        setVetDetails(Array.from(vetsData).slice(24, 25));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    setVetDetails(vetsData);
    showPages(1);
  }, []);
  useEffect(async () => {
    updateVetDetailsAccordingToFilter();
  }, [filterInfo]);

  return (
    <div id="wrapper">
      <div id="page" class="clearfix">
        <section class="flat-title-page inner">
          <div class="overlay"></div>
          <div class="themesflat-container">
            <div class="row">
              <div class="col-md-12">
                <div class="page-title-heading mg-bt-12">
                  <h1 class="heading text-center">Super Vet Marketplace</h1>
                </div>
                <div class="breadcrumbs style2">
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

        <section class="tf-explore tf-section">
          <div class="themesflat-container">
            <div class="row">
              <div class="col-xl-3 col-lg-3 col-md-12">
                <div id="side-bar" class="side-bar style-3">
                  <div class="widget widget-category mgbt-24 boder-bt">
                    <div class="title-wg-category">
                      <h4 class="title-widget style-2">Status</h4>
                      <i class="icon-fl-down-2"></i>
                    </div>
                    <div class="content-wg-category">
                      <form action="#" id="statusForm">
                        <label>
                          Buy Now
                          <input
                            type="checkbox"
                            id="buyNowCB"
                            value="buy"
                            onChange={handleChange}
                          />
                          <span class="btn-checkbox"></span>
                        </label>
                        <br />

                        <label>
                          On Auctions
                          <input
                            type="checkbox"
                            id="onAuctionsCB"
                            value="onAuctions"
                            onChange={handleChange}
                          />
                          <span class="btn-checkbox"></span>
                        </label>
                        <br />

                        <label class="mgbt-none">
                          Has Offers
                          <input
                            type="checkbox"
                            id="hasOffersCB"
                            value="hasOffers"
                            onChange={handleChange}
                          />
                          <span class="btn-checkbox"></span>
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div class="widget widget-category mgbt-24 boder-bt">
                    <div class="title-wg-category">
                      <h4 class="title-widget style-2">Categories</h4>
                      <i class="icon-fl-down-2"></i>
                    </div>
                    <div class="content-wg-category">
                      <form action="#" id="catergoriesForm">
                        <label>
                          Characters
                          <input
                            type="checkbox"
                            id="charactersCB"
                            value="characters"
                            onChange={handleChange}
                          />
                          <span class="btn-checkbox"></span>
                        </label>
                        <br />

                        <label>
                          Tools
                          <input
                            type="checkbox"
                            id="toolsCB"
                            value="tools"
                            onChange={handleChange}
                          />
                          <span class="btn-checkbox"></span>
                        </label>
                        <br />

                        <label>
                          Serums
                          <input
                            type="checkbox"
                            id="serumsCB"
                            value="serums"
                            onChange={handleChange}
                          />
                          <span class="btn-checkbox"></span>
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div class="widget widget-category mgbt-24 boder-bt">
                    <div class="title-wg-category">
                      <h4 class="title-widget style-2">Chains</h4>
                      <i class="icon-fl-down-2"></i>
                    </div>
                    <div class="content-wg-category">
                      <form action="#" id="chainsForm">
                        <label>
                          Binance Smart Chain
                          <input
                            type="checkbox"
                            id="bSmartChainCB"
                            value="binanceSmartChain"
                            onChange={handleChange}
                          />
                          <span class="btn-checkbox"></span>
                        </label>
                        <br />

                        <label>
                          Super Crypto Chain
                          <input
                            type="checkbox"
                            id="sCryptoChainCB"
                            value="superCryptoChain"
                            onChange={handleChange}
                          />
                          <span class="btn-checkbox"></span>
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                  <div class="widget widget-category">
                    <div class="title-wg-category">
                      <h4 class="title-widget style-2">Collections</h4>
                      <i class="icon-fl-down-2"></i>
                    </div>
                    <div class="content-wg-category">
                      <form action="#" id="collectionsForm">
                        <label>
                          Super Mystery Boxes
                          <input
                            type="checkbox"
                            id="sMysteryBoxesCB"
                            value="superMysteryBoxes"
                            onChange={handleChange}
                          />
                          <span class="btn-checkbox"></span>
                        </label>
                        <br />

                        <label>
                          Super Serums
                          <input
                            type="checkbox"
                            id="sSerumsCB"
                            value="superSerums"
                            onChange={handleChange}
                          />
                          <span class="btn-checkbox"></span>
                        </label>
                        <br />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 col-lg-9 col-md-12">
                <div class="box-epxlore">
                  {Array.isArray(VetDetails) && VetDetails.length > 0 ? (
                    VetDetails.map((item) => (
                      <div
                        class={`sc-card-product explode style2 mg-bt ${item.catergory}`}
                      >
                        <div class="card-media">
                          <img src={item.image} alt="Image" />
                          {item.url === "N/A" ? (
                            <div class="button-place-bid">
                              <a
                                href="#"
                                data-toggle="modal"
                                data-target="#popup_bid"
                                class="sc-button style-place-bid style bag fl-button pri-3"
                              >
                                <span style={{ paddingLeft: "0px" }}>
                                  Coming Soon
                                </span>
                              </a>
                            </div>
                          ) : (
                            <div class="button-place-bid">
                              <button
                                onClick={() => setSelectedItem(item)}
                                class="sc-button style-place-bid style bag fl-button pri-3"
                              >
                                <span style={{ paddingLeft: "0px" }}>
                                  Buy Now
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div class="sc-card-product explode style2 mg-bt">
                      <div class="card-media"></div>
                    </div>
                  )}
                </div>
                {/* <div class="btn-auction center">
                                        <a href="#" class="sc-button loadmore fl-button pri-3"><span>Load More</span></a>
                                    </div> */}
              </div>
              <div id="paging">
                <div
                  className="row mx-auto"
                  id="pagingDivId"
                  style={{ paddingLeft: "77rem" }}
                >
                  <div class="sc-button style style-1  paging">
                    <ul
                      class="pagination pagination-lg"
                      style={{
                        float: "right",
                        fontSize: "20px",
                        marginBottom: "0rem",
                      }}
                    >
                      <li
                        style={{
                          marginRight: "40px",
                          marginLeft: "2.5rem",
                          fontWeight: 700,
                        }}
                      >
                        <a
                          href="#"
                          id="firstPageNumber"
                          onClick={() => showPages(1)}
                        >
                          1
                        </a>
                      </li>
                      <li style={{ marginRight: "40px", fontWeight: 700 }}>
                        <a
                          href="#"
                          id="secondPageNumber"
                          onClick={() => showPages(2)}
                        >
                          2
                        </a>
                      </li>
                      <li style={{ marginRight: "40px", fontWeight: 700 }}>
                        <a
                          href="#"
                          id="thirdPageNumber"
                          onClick={() => showPages(3)}
                        >
                          3
                        </a>
                      </li>
                      <li style={{ marginRight: "40px", fontWeight: 700 }}>
                        <a
                          href="#"
                          id="forthPageNumber"
                          onClick={() => showPages(4)}
                        >
                          4
                        </a>
                      </li>
                      <li style={{ marginRight: "40px", fontWeight: 700 }}>
                        <a
                          href="#"
                          id="fifthPageNumber"
                          onClick={() => showPages(5)}
                        >
                          5
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        class="modal fade popup"
        id="popup_bid"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div class="modal-body space-y-20 pd-40">
              <h3>Super Vet Marketplace</h3>{" "}
              <h3 style={{ color: "white", fontSize: "medium" }}>
                Coming Soon
              </h3>
            </div>
          </div>
        </div>
      </div>
      <a id="scroll-top"></a>
    </div>
  );
};

export default Leftside;
