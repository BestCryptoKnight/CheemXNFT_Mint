// test/Rematic.proxy.js
// Load dependencies
const { expect } = require('chai')
const { BigNumber } = require('ethers')
const _ = require('lodash')

let NFTContract
let NFTFactory

let CheemsXYZContract;
let CheemsXYZFactory;

const toBigNumberArray = (arr) => {
  const newArr = []
  arr.map((item) => {
    newArr.push(BigNumber.from(item))
  })
  return newArr
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

// Start test block
describe('Racekingdom', function () {
  beforeEach(async function () {
    NFTFactory = await ethers.getContractFactory('CheemsXfractional')
    NFTContract = await NFTFactory.deploy()

    CheemsXYZFactory = await ethers.getContractFactory('CheemsXYZ')
    CheemsXYZContract = await CheemsXYZFactory.deploy()
  })

  // Test case
  it('Basic Token Contract works correctly.', async function () {
    const [
      owner,
      addr1,
      addr2,
      addr3,
      addr4,
      addr5,
      addr6,
      addr7,
      addr8,
      addr9,
      addr10,
    ] = await ethers.getSigners()

    await NFTContract.connect(owner).setXYZtoken(CheemsXYZContract.address);

    await CheemsXYZContract.connect(owner).transfer(addr1.address, (await CheemsXYZContract.totalSupply()).div(2));

    // const val = await NFTContract.getAmount(owner.address)
    // console.log('before', val.toString())

    await NFTContract.connect(owner).setListConfig([10,10,20,30,40,50,60,70,80,90,4],2);
    await NFTContract.connect(owner).setUpgradable(true)
    await NFTContract.connect(owner).setMintOption(1)
    await NFTContract.connect(owner).setListOption(
      [
        addr1.address,
        addr2.address,
        addr3.address,
        addr4.address,
        addr5.address,
        addr6.address,
        addr7.address,
        addr8.address,
        addr9.address,
        addr10.address,
      ],
      true,
      2
    )

    // await NFTContract.connect(owner).setWAVAX(CheemsXYZContract.address)

    await NFTContract.connect(owner).setListOption([owner.address], true, 0);

    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})

    const res1 = await NFTContract.getUserTotalAmount(owner.address)
    console.log(res1)
    console.log(await NFTContract.maxTier0())
    console.log(await NFTContract.max_Regular_tier(9))

    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})

    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})

    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})

    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})

    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})

    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('0.1000009') },
    )

    await NFTContract.connect(owner).fractionalize(1,{value: ethers.utils.parseEther('0.1')})

    console.log("asdfasdfasdf", await NFTContract.connect(owner).userInfo(owner.address))

    // await NFTContract.connect(owner).mintNFTWithAvax(
    //   owner.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('0.1000009') },
    // )

    // await NFTContract.connect(owner).transferFrom(NFTContract.address, owner.address, 1);

    
  })
})
