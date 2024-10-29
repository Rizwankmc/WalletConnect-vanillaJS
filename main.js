import { createAppKit } from '@reown/appkit'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers'

// 1. Get projectId from https://cloud.reown.com
const projectId = '2a5b380174ce2addc7b01138b4cfca46'

// 2. Create your application's metadata object
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}
// 3. Create a AppKit instance
const modal = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [{
    id: 56,
    name: 'Binance Smart Chain (BSC)',
    nativeCurrency: { name: 'BNB (Binance Coin)', symbol: 'BNB', decimals: 18 },
    rpcUrls: {
      default: {
        http: ['https://bsc-dataseed.binance.org'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Binance Smart Chain',
        url: 'https://bscscan.com',
        apiUrl: 'https://api.bscscan.com/api',
      },
    },
  }],
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

// Trigger modal programaticaly
// Add this code inside `main.js` file at the end of the code file
const openConnectModalBtn = document.getElementById('open-connect-modal')
const openNetworkModalBtn = document.getElementById('open-network-modal')

openConnectModalBtn.addEventListener('click', () => modal.open())
openNetworkModalBtn.addEventListener('click', () => modal.open({ view: 'Networks' }))

const tokenAddress = '0x2D9079dD4f144a2dbcEcffdB841e1BDC60094CA3'; // Replace with your BEP-20 token contract address
const tokenABI =[
    {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
    },
    {
    "indexed": true,
    "internalType": "address",
    "name": "spender",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
    }
    ],
    "name": "Approval",
    "type": "event"
    },
    {
    "constant": false,
    "inputs": [
    {
    "internalType": "address",
    "name": "spender",
    "type": "address"
    },
    {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    }
    ],
    "name": "approve",
    "outputs": [
    {
    "internalType": "bool",
    "name": "",
    "type": "bool"
    }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [
    {
    "internalType": "address",
    "name": "spender",
    "type": "address"
    },
    {
    "internalType": "uint256",
    "name": "subtractedValue",
    "type": "uint256"
    }
    ],
    "name": "decreaseAllowance",
    "outputs": [
    {
    "internalType": "bool",
    "name": "",
    "type": "bool"
    }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [
    {
    "internalType": "address",
    "name": "spender",
    "type": "address"
    },
    {
    "internalType": "uint256",
    "name": "addedValue",
    "type": "uint256"
    }
    ],
    "name": "increaseAllowance",
    "outputs": [
    {
    "internalType": "bool",
    "name": "",
    "type": "bool"
    }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [
    {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    }
    ],
    "name": "mint",
    "outputs": [
    {
    "internalType": "bool",
    "name": "",
    "type": "bool"
    }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
    },
    {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
    }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
    },
    {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [
    {
    "internalType": "address",
    "name": "recipient",
    "type": "address"
    },
    {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    }
    ],
    "name": "transfer",
    "outputs": [
    {
    "internalType": "bool",
    "name": "",
    "type": "bool"
    }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "anonymous": false,
    "inputs": [
    {
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
    },
    {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
    },
    {
    "indexed": false,
    "internalType": "uint256",
    "name": "value",
    "type": "uint256"
    }
    ],
    "name": "Transfer",
    "type": "event"
    },
    {
    "constant": false,
    "inputs": [
    {
    "internalType": "address",
    "name": "sender",
    "type": "address"
    },
    {
    "internalType": "address",
    "name": "recipient",
    "type": "address"
    },
    {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
    }
    ],
    "name": "transferFrom",
    "outputs": [
    {
    "internalType": "bool",
    "name": "",
    "type": "bool"
    }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [
    {
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
    }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [
    {
    "internalType": "address",
    "name": "owner",
    "type": "address"
    },
    {
    "internalType": "address",
    "name": "spender",
    "type": "address"
    }
    ],
    "name": "allowance",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
    }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [
    {
    "internalType": "address",
    "name": "account",
    "type": "address"
    }
    ],
    "name": "balanceOf",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
    }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
    {
    "internalType": "uint8",
    "name": "",
    "type": "uint8"
    }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "getOwner",
    "outputs": [
    {
    "internalType": "address",
    "name": "",
    "type": "address"
    }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
    {
    "internalType": "string",
    "name": "",
    "type": "string"
    }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
    {
    "internalType": "address",
    "name": "",
    "type": "address"
    }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
    {
    "internalType": "string",
    "name": "",
    "type": "string"
    }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
    {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
    }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
    }
    ];
   


const getBalance = async() => {
    const walletProvider = modal.getWalletProvider()
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const tokenContract = new Contract(tokenAddress, tokenABI, signer)
    const balance = await tokenContract.balanceOf(modal.getAddress())

    console.log("balance:",formatUnits(balance, 18))
    document.getElementById("show-balance").innerHTML=`
    <label>Address: ${modal.getAddress}</label><br/>
    <label>Balance: ${balance}</label><br/><br/>
    <label> BNB: ${await ethersProvider.getBalance()}</lable>
    `
}

const handleTransfer = async () => {
    
    const recipient = document.getElementById('recipientAddress').value;
    const amount = document.getElementById('amount').value;


    const walletProvider = modal.getWalletProvider()
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    try{
    const tokenContract = new Contract(tokenAddress, tokenABI, signer);
   const isSend =await tokenContract.transfer(recipient, parseUnits(amount, "ether"));
   console.log("is Send", isSend);
   alert("transfer success", isSend);
    }catch(e){
        alert(e.message)
    }


}

document.querySelector("#transfer").addEventListener('click', handleTransfer);
window.onload = getBalance
    