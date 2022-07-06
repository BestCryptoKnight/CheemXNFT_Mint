import * as dotenv from 'dotenv'
dotenv.config()

import { HardhatUserConfig } from 'hardhat/types'
import { task } from 'hardhat/config'

// Plugins

import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-abi-exporter'
import 'hardhat-gas-reporter'
import 'hardhat-contract-sizer'
import '@tenderly/hardhat-tenderly'
import '@openzeppelin/hardhat-upgrades'
import '@typechain/hardhat'
import "hardhat-contract-sizer";

// Networks

interface NetworkConfig {
  network: string
  chainId: number
  gas?: number | 'auto'
  gasPrice?: number | 'auto'
}

const networkConfigs: NetworkConfig[] = [
  { network: 'mainnet', chainId: 1 },
  { network: 'ropsten', chainId: 3 },
  { network: 'rinkeby', chainId: 4 },
  { network: 'kovan', chainId: 42 },
]

function getAccountMnemonic() {
  return process.env.MNEMONIC || ''
}

function getDefaultProviderURL(network: string) {
  return `https://${network}.infura.io/v3/${process.env.INFURA_KEY}`
}

function setupDefaultNetworkProviders(buidlerConfig) {
  for (const netConfig of networkConfigs) {
    buidlerConfig.networks[netConfig.network] = {
      chainId: netConfig.chainId,
      url: getDefaultProviderURL(netConfig.network),
      gas: netConfig.gasPrice || 'auto',
      gasPrice: netConfig.gasPrice || 'auto',
      accounts: {
        mnemonic: getAccountMnemonic(),
      },
    }
  }
}

// Tasks

task('accounts', 'Prints the list of accounts', async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners()
  for (const account of accounts) {
    console.log(await account.getAddress())
  }
})

// Config

const config: HardhatUserConfig = {
  paths: {
    sources: './contracts',
    tests: './test',
    artifacts: './build/contracts',
  },
  mocha: {
    timeout: 100000000
  },
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
          outputSelection: {
            '*': {
              '*': ['storageLayout'],
            },
          },
        },
      },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
      loggingEnabled: false,
      gas: 12000000,
      gasPrice: 'auto',
      blockGasLimit: 12000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 1,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    rinkeby: {
        url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
        chainId: 4,
        gasPrice: 20000000000,
        accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/YYZyqE0v2BO7ap26Ie16IWdRWpr2T0Wy',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 8000000000,
    },
    matic: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/RiEdJAsZdbKF1nIOcrNerAF1YgEOVfbR',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 80000000000,
    },
    bsc: {
      url: 'https://data-seed-prebsc-1-s3.binance.org:8545/',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    bsc_mainnet: {
      url: 'https://bsc-dataseed.binance.org',
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    avaxTest: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    avaxMain: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    ganache: {
      chainId: 1337,
      url: 'http://localhost:8545',
    },
  },
  etherscan: {
    //  apiKey: "NURDXE28N6MM9VI216UCSEBZVV5IA7UWSS" // for ether net work
    //  apiKey: "N2E5BV7EU18ZEFEMGM8YS5NBPPQH9QJK3Q"
    apiKey: "BCT83TFQ1QJ7XPRIVG2V82YVF6SVTRVNDE"
  },
  typechain: {
    outDir: 'build/types',
    target: 'ethers-v5',
  },
  abiExporter: {
    path: './build/abis',
    clear: false,
    flat: true,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: true,
  },
}

setupDefaultNetworkProviders(config)

export default config
