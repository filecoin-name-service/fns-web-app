import Web3 from "web3";
import Portis from '@portis/web3';
import { METAMASK_WALLET, PORTIS_WALLET, PORTIS_DAPP_NETWORK, PORTIS_APP_ID } from "../constants/constants";

const getWeb3 = (wallet: string) =>
  new Promise(async (resolve, reject) => {
    let _window = window as any
    try {
      // Wait for loading completion to avoid race conditions with web3 injection timing.
      _window.ethereum.on('accountsChanged', (accounts: any) => {
        window.location.reload();
        // Time to reload your interface with accounts[0]!
      })

      if (wallet === PORTIS_WALLET) {

        const appId: any = PORTIS_APP_ID
        const appNetwork: any = PORTIS_DAPP_NETWORK

        const portis = new Portis(appId, appNetwork);
        const web3 = new Web3(portis.provider);
        resolve(web3);
      }

      else if (wallet === METAMASK_WALLET) {

        // _window.addEventListener("load", async () => {
        // Modern dapp browsers...
        if (_window.ethereum) {
          const web3 = new Web3(_window.ethereum);
          try {
            // Request account access if needed
            await _window.ethereum.enable();
            // Acccounts now exposed
            const networkId = await web3.eth.net.getId();
            if (networkId !== 3141) {

              _window.ethereum
                .request({
                  method: 'wallet_addEthereumChain',
                  params: [{
                    chainId: '0xC45',
                    chainName: 'FEVM Testnet',
                    nativeCurrency: { name: 'Filecoin', symbol: 'tFil', decimals: 18 },
                    rpcUrls: ['https://api.hyperspace.node.glif.io/rpc/v1'],
                    blockExplorerUrls: ['https://hyperspace.filfox.info/en'],
                  }],
                })
                .then(() => {
                  resolve(web3);
                }).catch((error: any) => {
                  reject(error)
                });
            } else {
              resolve(web3);

            }
          } catch (error) {
            reject(error);
          }
        }
        // Legacy dapp browsers...
        else if (_window.web3) {
          // Use Mist/MetaMask's provider.
          const web3 = _window.web3;
          console.log("Injected web3 detected.");
          resolve(web3);
        }
        // Fallback to localhost; use dev console port by default...
        else {
          const provider = new Web3.providers.HttpProvider(
            "https://api.hyperspace.node.glif.io/rpc/v1"
          );
          const web3 = new Web3(provider);
          console.log("No web3 instance injected, using Local web3.");
          resolve(web3);
        }
        // });
      }
    } catch (err: any) {
      console.log("ERR ", err)
      resolve(null);
    }
  });

export default getWeb3;
