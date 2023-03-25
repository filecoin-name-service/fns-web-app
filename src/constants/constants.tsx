// env types
export const ENVIRONMENT = process.env.NODE_ENV

// app platform
export const REACT_APP_PLATFORM = process.env.REACT_APP_PLATFORM

// app base api url
export const REACT_APP_BASE_API_URL = process.env.REACT_APP_BASE_API_URL

// enable map
export const REACT_APP_ENABLE_MAP = process.env.REACT_APP_ENABLE_MAP

export const IMAGE_PATH_PREFIX =
  ENVIRONMENT === "development" || REACT_APP_PLATFORM !== "web" ? "/assets/" : "/build/assets/";


//PATHS  
export const baseSocketUrl =
  ENVIRONMENT === "development"
    ? "http://localhost:3000"
    : REACT_APP_BASE_API_URL;

// state name for APK 
export const APP_NAME = 'name'
export const APP_TAG_LINE = 'tagLine'
export const APP_DESCRIPTION = 'description'
export const APP_ICON = 'icon'
export const APK = 'apk'
export const APP_IMAGES = 'images'
export const TYPE_APK = 'application/vnd.android.package-archive'

export const LOCAL_STORAGE_PUBLIC_KEY = 'publicKey'
export const LOCAL_STORAGE_PRIVATE_KEY = 'privateKey'

export const PORTIS_WALLET = "PORTIS_WALLET"
export const METAMASK_WALLET = "METAMASK_WALLET"

// public images export
export const HOME_IMAGE = '/assets/logo.svg'
export const METAMASK_WALLET_IMAGE = '/assets/images/metamask.png'
export const PORTIS_WALLET_IMAGE = '/assets/images/portis.png'

// 
export const PORTIS_DAPP_NETWORK = process.env.REACT_APP_PORTIS_NETWORK
export const PORTIS_APP_ID = process.env.REACT_APP_PORTIS_APP_ID
export const LOCAL_STORAGE_WALLET = "FNS-WALLET"

// WALLET SELECT ERROR
export const OPEN_WALLET_SELECT_MODAL = "OPEN_WALLET_SELECT_MODAL"

export const FEVM_TESTNET_CONTRACT_ADDRESSES = {
  FNSRegistry: '0x911bF786D5655e1823FC35a3b3A9Dee5724acb68',
  Root: '0xa8b193a9e1ceeCaFC04c4b0f4182d2B2930F2634',
  BaseRegistrarImplementation: '0xC6AC3b271a5885e8fCC17a7002f1c12F2Dcdf8B9',
  Aggregator: '0x7422124B030134734B3b048219D973Af040F0560',
  StablePriceOracle: '0xB10E6D2326eE6A58537D8085Ee0677063f416988',
  ReverseRegistrar: '0x6DbB2516DE2a3Ca9709d01aAbe0C32D67FE4798b',
  StaticMetadataService: '0xd134C54a1C6A97b7dB7Ad6a8b2D41e47805789b1',
  NameWrapper: '0x055c54e1892e35f92F53064c3FbeA3dD490673B2',
  FILRegistrarController: '0x23D6924368063937eCe177adcc1e99C96664dD44',
  PublicResolver: '0x6eC83F002054d1B47590a382ceB8CC76989A7E7C',
  UniversalResolver: '0x6D0502E3B306Db11Dc0F178B627E0b2C003Ec20e',
  FaucetContract: '0xfD3b1e89f754E4D245c93AF682e2e8Aa4d5955AD'
}