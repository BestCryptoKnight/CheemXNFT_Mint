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

    await CheemsXYZContract.connect(owner).transfer(NFTContract.address, (await CheemsXYZContract.totalSupply()).div(2));

    // const val = await NFTContract.getAmount(owner.address)
    // console.log('before', val.toString())

    // await NFTContract.connect(owner).setPriceList([1,1,2,3,4,5,6,7,8,9]);
    await NFTContract.connect(owner).setUpgradable(true)
    await NFTContract.connect(owner).setMintOption(1)
    await NFTContract.connect(owner).setWhiteList(
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
    )

    let res = await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('500') },
    )
    const tx = await res.wait()
    // console.log(tx);
    let result = _.find(tx.events, { event: 'Transfer' })
    const tokenId = result.args['tokenId'].toString()

    const tire = await NFTContract.tierInfo(tokenId)
    await NFTContract.connect(owner).mintNFTWithAvax(
      owner.address,
      0,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('1') },
    )
    console.log('==========tire=======', tokenId, tire)
    await NFTContract.connect(addr1).mintNFTWithAvax(
      addr1.address,
      9,
      'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
      { value: ethers.utils.parseEther('500') },
    )

    // await NFTContract.connect(owner).transferFrom(NFTContract.address, owner.address, 1);


    res = await NFTContract.connect(owner).downgradeNFT(1, 0)
    res.wait()
    res = await NFTContract.connect(owner).aggregation(25000001, 0)
    res.wait()

    res = await NFTContract.connect(addr1).downgradeNFT(3, 0)
    res.wait()
    res = await NFTContract.connect(addr1).aggregation(50000000, 0)
    res.wait()

    console.log(
      'tier0 of this contract: ',
      (await NFTContract.getLen(NFTContract.address, 10)).toString(),
    )
    // res = await NFTContract.connect(owner).fractionalize(3)

    console.log("tier Id", await NFTContract.tierInfo(6))
    console.log(
      'balance of contract',
      (await NFTContract.getLen(NFTContract.address, 10)).toString(),
    )
    console.log(
      'before borrow: ',
      (await NFTContract.getLen(owner.address, 10)).toString(),
    )
    await NFTContract.connect(owner).borrow(4);

    console.log(
      'after borrow: ',
      (await NFTContract.getLen(owner.address, 10)).toString(),
    )
    await delay(45000);
    await NFTContract.connect(owner).redeemNFT(6, true);
    console.log(
      'after redeem: ',
      (await NFTContract.getLen(owner.address, 10)).toString(),
    )
    // res = await NFTContract.connect(owner).upgradeNFTByAvax(3, 6, {
    //   value: ethers.utils.parseEther('75'),
    // })

    // await NFTContract.connect(owner).mintNFTWithAvax(
    //   owner.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('1000') },
    // )
    // await NFTContract.connect(owner).mintNFTWithAvax(
    //   owner.address,
    //   7,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('100') },
    // )

    // await NFTContract.connect(owner).transferFrom(
    //   owner.address,
    //   addr1.address,
    //   1,
    // )
    // await NFTContract.connect(owner).tier0transfer(addr1.address, 500000)

    // await NFTContract.connect(addr1).mintNFTWithAvax(
    //   addr1.address,
    //   8,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('500') },
    // )
    // await NFTContract.connect(addr2).mintNFTWithAvax(
    //   addr2.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('1000') },
    // )
    // await NFTContract.connect(addr3).mintNFTWithAvax(
    //   addr3.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('1000') },
    // )
    // await NFTContract.connect(addr4).mintNFTWithAvax(
    //   addr4.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('1000') },
    // )
    // await NFTContract.connect(addr5).mintNFTWithAvax(
    //   addr5.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('1000') },
    // )
    // await NFTContract.connect(addr6).mintNFTWithAvax(
    //   addr6.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('1000') },
    // )
    // await NFTContract.connect(addr7).mintNFTWithAvax(
    //   addr7.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('1000') },
    // )
    // await NFTContract.connect(addr8).mintNFTWithAvax(
    //   addr8.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('1000') },
    // )
    // await NFTContract.connect(addr9).mintNFTWithAvax(
    //   addr9.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('1000') },
    // )
    // await NFTContract.connect(owner).mintNFTWithAvax(
    //   owner.address,
    //   9,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('1000') },
    // )

    // await NFTContract.connect(addr8).mintNFTWithAvax(
    //   addr8.address,
    //   8,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('500') },
    // )

    // await NFTContract.connect(addr10).mintNFTWithAvax(
    //   addr10.address,
    //   8,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('500') },
    // )

    // await NFTContract.connect(addr9).mintNFTWithAvax(
    //   addr9.address,
    //   8,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('500') },
    // )

    // await NFTContract.connect(owner).fractionalize(
    //   9
    // )

    // await NFTContract.connect(owner).mintNFTWithAvax(
    //   owner.address,
    //   7,
    //   'https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak',
    //   { value: ethers.utils.parseEther('100') },
    // )

    // console.log(await NFTContract.tBalance(9), await NFTContract.tBalance(10), await NFTContract.getMintedTotalAmount());
    // let tx1 = await res.wait();
    // result = _.find(tx1.events, {event: "UpgradeNFTByAvax"})
    // console.log(result);
    // for (let i = 0; i < 10; i++) {
    //   let len = await (await NFTContract.getLen(owner.address, i)).toString()
    //   let str = ''
    //   let res = await NFTContract.getInfo(owner.address, i)
    //   console.log(i, res)
    // }

    // console.log(
    //   'tier0: ',
    //   (await NFTContract.getLen(owner.address, 10)).toString(),
    // )

    // console.log(
    //   'tier0 of this contract: ',
    //   (await NFTContract.getLen(NFTContract.address, 10)).toString(),
    // )
    // console.log(await CheemsXYZContract.balanceOf(owner.address), await CheemsXYZContract.balanceOf(NFTContract.address));
    // await CheemsXYZContract.connect(owner).approve(NFTContract.address, BigNumber.from("50000000000000000000000000"));
    // console.log('after mint', await NFTContract.getAmount(owner.address))
    // await NFTContract.connect(owner).exchangeXYZAndTiero(600000, false);
    // console.log(await CheemsXYZContract.connect(owner).balanceOf(owner.address));
    // console.log(
    //   'tier0: ',
    //   (await NFTContract.getUserTotalAmount(owner.address)).toString(),
    // )
  })
})
