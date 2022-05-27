import './App.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import 'sf-font';
import axios from 'axios';

var account = null;
var contract = null;
var vaultcontract = null;
var web3 = null;

const NFTCONTRACT = "0xC6Ad2824B03275D4cC5E8f4f61c5a143b999717b";
const STAKINGCONTRACT = "0x09aE75315fE2E63271B4F218C4b00F4fF143052A"
const polygonscanapikey = "DBQX5JUSAVUZRK8CC4IN2UZF9N2HA63P4U";
const polygonscanapi = "https://api-testnet.polygonscan.com/api"
const moralisapi = "https://deep-index.moralis.io/api/v2/";
const moralisapikey = "2VBV4vaCLiuGu6Vu7epXKlFItGe3jSPON8WV4CrXKYaNBEazEUrf1xwHxbrIo1oM";
const nftpng = "https://ipfs.io/ipfs/QmavM8Zpo9bD3r4zEnhbbBLLvHyfr1YL7f1faG3ovaeSSG/";

class App extends Component {
	constructor() {
		super();
		this.state = {
			balance: [],
			nftdata: [],
			rawearn: [],
		};
	}

	handleModal(){  
		this.setState({show:!this.state.show})  
	} 

	handleNFT(nftamount) {
		this.setState({outvalue:nftamount.target.value});
  	}

	async componentDidMount() {
		
		await axios.get((polygonscanapi + `?module=stats&action=tokensupply&contractaddress=${NFTCONTRACT}&apikey=${polygonscanapikey}`))
		.then(outputa => {
            this.setState({
                balance:outputa.data
            })
            console.log(outputa.data)
        })
		let config = {'X-API-Key': moralisapikey, 'accept': 'application/json'};
		await axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=mumbai&format=decimal`), {headers: config})
		.then(outputb => {
			const { result } = outputb.data
            this.setState({
                nftdata:result
            })
            console.log(outputb.data)
        })
	}
  
  render() {
	const {balance} = this.state;
	const {nftdata} = this.state;
	const {outvalue} = this.state;

  return (
    <div className="App nftapp">
        <nav class="navbar navbarfont navbarglow navbar-expand-md navbar-dark bg-dark mb-4">
          <div class="container-fluid" style={{ fontFamily: "SF Pro Display" }}>
            <a class="navbar-brand px-5" style={{ fontWeight: "800", fontSize: '25px' }} href="#"></a><img src="n2d-logo.png" width="7%" />
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 px-3 mb-md-0" style={{ fontSize: "25px" }}>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">List NFTs</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">Bridge NFTs</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='px-5'>
            <input id="connectbtn" type="button" className="connectbutton" style={{ fontFamily: "SF Pro Display" }} value="Connect Your Wallet" />
          </div>
        </nav>
        <div className='container container-style'>
          <div className='col'>
            <body className='nftminter'>
          <form>
            <div className="row pt-3">
              <div>
                <h1 className="pt-2" style={{ fontWeight: "30" }}>NFT Minter</h1>
              </div>
              <h3>/1000</h3>
              <h6>Your Wallet Address</h6>
              <div className="pb-3" id='wallet-address' style={{
                color: "#39FF14",
                fontWeight: "400",
                textShadow: "1px 1px 1px black",
              }}>
                <label for="floatingInput">Please Connect Wallet</label>
              </div>
            </div>
            <div>
              <label style={{ fontWeight: "300", fontSize: "18px" }}>Select NFT Quantity</label>
            </div>
            <ButtonGroup size="lg"
              aria-label="First group"
              name="amount"
              style={{ boxShadow: "1px 1px 5px #000000" }}
            >
              <Button value="1">1</Button>
              <Button value="2">2</Button>
              <Button value="3">3</Button>
              <Button value="4">4</Button>
              <Button value="5">5</Button>
            </ButtonGroup>
            <h6 className="pt-2" style={{ fontFamily: "SF Pro Display", fontWeight: "300", fontSize: "18px" }}>Buy with your preferred crypto!</h6>
            <div className="row px-2 pb-2 row-style">
              <div className="col ">
                <Button className="button-style" style={{ border: "0.2px", borderRadius: "14px", boxShadow: "1px 1px 5px #000000" }}>
                  <img src={"n2dr-logo.png"} width="100%" />
                </Button>
              </div>
              <div className="col">
                <Button className="button-style" style={{ border: "0.2px", borderRadius: "14px", boxShadow: "1px 1px 5px #000000" }}>
                  <img src="usdt.png" width="70%" />
                </Button>
              </div>
              <div className="col">
                <Button className="button-style" style={{ border: "0.2px", borderRadius: "14px", boxShadow: "1px 1px 5px #000000" }}>
                  <img src="matic.png" width="70%" />
                </Button>
              </div>
              <div>
                <div id='txout' style={{ color: "#39FF14", marginTop: "5px", fontSize: '20px', fontWeight: '500', textShadow: "1px 1px 2px #000000" }}>
                  <p style={{ fontSize: "20px" }}>Transfer Status</p>
                </div>
              </div>
            </div>
          </form>
          </body>
          </div>
        <div className='col'>
          <body className='nftstaker border-0'>
            <form  style={{ fontFamily: "SF Pro Display" }} >
              <h2 style={{ borderRadius: '14px', fontWeight: "300", fontSize: "25px" }}>N2DR NFT Staking Vault </h2>
              <h6 style={{ fontWeight: "300" }}>First time staking?</h6>
              <Button className="btn" style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} >Authorize Your Wallet</Button>
              <div className="row px-3">
                <div className="col">
                  <form class="stakingrewards" style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #ffffff" }}>
                    <h5 style={{ color: "#FFFFFF", fontWeight: '300' }}>Your Vault Activity</h5>
                    <h6 style={{ color: "#FFFFFF" }}>Verify Staked Amount</h6>
                    <Button style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} >Verify</Button>
                    <table className='table mt-3 mb-5 px-3 table-dark'>
                      <tr>
                        <td style={{ fontSize: "19px" }}>Your Staked NFTs:
                          <span style={{ backgroundColor: "#ffffff00", fontSize: "21px", color: "#39FF14", fontWeight: "500", textShadow: "1px 1px 2px #000000" }} id='yournfts'></span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: "19px" }}>Total Staked NFTs:
                          <span style={{ backgroundColor: "#ffffff00", fontSize: "21px", color: "#39FF14", fontWeight: "500", textShadow: "1px 1px 2px #000000" }} id='stakedbalance'></span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: "19px" }}>Unstake All Staked NFTs
                          <Button className='mb-3' style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }}>Unstake All</Button>
                        </td>
                      </tr>
                    </table>
                  </form>
                  </div>
                  <img className="col-lg-4" src="art.png"/>
                  <div className="col">
                    <form className='stakingrewards' style={{ borderRadius: "25px", boxShadow: "1px 1px 15px #ffffff", fontFamily: "SF Pro Display" }}>
                      <h5 style={{ color: "#FFFFFF", fontWeight: '300' }}> Staking Rewards</h5>
                      <Button style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} >Earned N2D Rewards</Button>
                      <div id='earned' style={{ color: "#39FF14", marginTop: "5px", fontSize: '25px', fontWeight: '500', textShadow: "1px 1px 2px #000000" }}><p style={{ fontSize: "20px" }}>Earned Tokens</p></div>
                      <div className='col-12 mt-2'>
                        <div style={{ color: 'white' }}>Claim Rewards</div>
                        <Button style={{ backgroundColor: "#ffffff10", boxShadow: "1px 1px 5px #000000" }} className="mb-2">Claim</Button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row px-4 pt-2">
                  <div class="header">
                    <div style={{ fontSize: '25px', borderRadius: '14px', color: "#ffffff", fontWeight: "300" }}>N2DR NFT Staking Pool Active Rewards</div>
                    <table className='table px-3 table-bordered table-dark'>
                      <thead className='thead-light'>
                        <tr>
                          <th scope="col">Collection</th>
                          <th scope="col">Rewards Per Day</th>
                          <th scope="col">Exchangeable Items</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>N2D Bronze Collection</td>
                          <td class="amount" data-test-id="rewards-summary-ads">
                            <span class="amount">0.50</span>&nbsp;<span class="currency">N2DR</span>
                          </td>
                          <td class="exchange">
                            <span class="amount">2</span>&nbsp;<span class="currency">NFTs/M</span>
                          </td>
                        </tr>
                        <tr>
                          <td>N2D Silver Collection</td>
                          <td class="amount" data-test-id="rewards-summary-ac">
                            <span class="amount">2.50</span>&nbsp;<span class="currency">N2DR</span>
                          </td>
                          <td class="exchange"><span class="amount">10</span>&nbsp;<span class="currency">NFTs/M</span>
                          </td>
                        </tr>
                        <tr className='stakegoldeffect'>
                          <td>N2D Gold Collection</td>
                          <td class="amount" data-test-id="rewards-summary-one-time"><span class="amount">1</span>&nbsp;<span class="currency">N2DR+</span>
                          </td>
                          <td class="exchange">
                            <span class="amount">25 NFTs/M or </span>
                            <span class="currency">100 N2DR/M</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="header">
                      <div style={{ fontSize: '25px', borderRadius: '14px', fontWeight: '300' }}>N2DR Token Stake Farms</div>
                      <table className='table table-bordered table-dark' style={{ borderRadius: '14px' }} >
                        <thead className='thead-light'>
                          <tr>
                            <th scope="col">Farm Pools</th>
                            <th scope="col">Harvest Daily Earnings</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Stake N2DR to Earn N2DR</td>
                            <td class="amount" data-test-id="rewards-summary-ads">
                              <span class="amount">0.01</span>&nbsp;<span class="currency">Per N2DR</span>
                            </td>
                          </tr>
                          <tr>
                            <td>Stake N2DR to Earn N2DR+</td>
                            <td class="amount" data-test-id="rewards-summary-ac">
                              <span class="amount">0.005</span>&nbsp;<span class="currency">Per N2DR</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
            </form>
          </body>
        </div>
      </div>
        <div className="container col-lg-11">
          <div className="row items px-3 pt-3">
            <div className="ml-3 mr-3" style={{ display: "inline-grid", gridTemplateColumns: "repeat(4, 5fr)", columnGap: "20px" }}>
              {nftdata.map((result, i) => {
                async function stakeit() {
                  vaultcontract.methods.stake([result.token_id]).send({ from: account });
                }
                async function unstakeit() {
                  vaultcontract.methods.unstake([result.token_id]).send({ from: account });
                }
                return (
                  <div className="card nft-card mt-3" key={i} >
                    <div className="image-over">
                      <img className="card-img-top" src={nftpng + result.token_id + '.png'} alt="" />
                    </div>
                    <div className="card-caption col-12 p-0">
                      <div className="card-body">
                        <h5 className="mb-0">Net2Dev Collection NFT #{result.token_id}</h5>
                        <h5 className="mb-0 mt-2">Location Status<p style={{ color: "#39FF14", fontWeight: "bold", textShadow: "1px 1px 2px #000000" }}>{result.owner_of}</p></h5>
                        <div className="card-bottom d-flex justify-content-between">
                          <input key={i} type="hidden" id='stakeid' value={result.token_id} />
                          <Button style={{ marginLeft: '2px', backgroundColor: "#ffffff10" }} onClick={stakeit}>Stake it</Button>
                          <Button style={{ marginLeft: '2px', backgroundColor: "#ffffff10" }} onClick={unstakeit}>Unstake it</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default App;


