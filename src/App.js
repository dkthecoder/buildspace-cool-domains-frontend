import React, {useEffect, useState} from 'react';
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = 'It1swhat1t1s';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
	//Just a state variable we use to store our user's public wallet. Don't forget to import useState at the top.
	const [currentAccount, setCurrentAccount] = useState('');

	// Implement your connectWallet method here
	const connectWallet = async () => {
		try {
		  const { ethereum } = window;
		  if (!ethereum) {
			alert("Get MetaMask -> https://metamask.io/");
			return;
		  }
	
		  // Fancy method to request access to account.
		  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
		  // Boom! This should print out public address once we authorize Metamask.
		  console.log("Connected", accounts[0]);
		  setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	  }

	// Gotta make sure this is async.
	const checkIfWalletIsConnected = async () => {
		// First make sure we have access to window.ethereum
		const { ethereum } = window;

		if (!ethereum) {
			console.log("Make sure you have MetaMask!");
			return;
		} else {
			console.log("We have the ethereum object", ethereum);
		}
	
	// Check if we're authorized to access the user's wallet
    const accounts = await ethereum.request({ method: 'eth_accounts' });

	// Users can have multiple authorized accounts, we grab the first one if its there!
    if (accounts.length !== 0) {
		const account = accounts[0];
		console.log('Found an authorized account:', account);
		setCurrentAccount(account);
	  } else {
		console.log('No authorized account found');
	  }
	};


	// Create a function to render if wallet is not connected yet
	const renderNotConnectedContainer = () => (
		<div className="connect-wallet-container">
			<img src="https://i.giphy.com/media/idYdfZ9xxVgVPNXjs0/giphy.webp" alt="Strawberry boi gif" />
			<button className="cta-button connect-wallet-button">Connect Wallet</button>
		</div>
	);

	// This runs our function when the page loads.
	useEffect(() => {checkIfWalletIsConnected()}, [])

	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<header>
						<div className="left">
							<p className="title">🍓🍰 Strawberry Name Service</p>
							<p className="subtitle">Your tasty API on the blockchain!</p>
						</div>
					</header>
				</div>

				{!currentAccount && renderNotConnectedContainer()}

				<div className="footer-container">
					<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
					<a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">{`this guy made it(ish) @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;
