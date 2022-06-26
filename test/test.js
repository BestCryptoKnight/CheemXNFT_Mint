// test/Rematic.proxy.js
// Load dependencies
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const _ = require("lodash");

let NFTContract;
let NFTFactory;

const toBigNumberArray = (arr) => {
  const newArr = [];
  arr.map((item) => {
    newArr.push(BigNumber.from(item));
  })
  return newArr;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

// Start test block
describe("Racekingdom", function () {
  beforeEach(async function () {
    NFTFactory = await ethers.getContractFactory("CheemsXfractional");
    NFTContract = await NFTFactory.deploy();
  });

  // Test case
  it("Basic Token Contract works correctly.", async function () {

    const [owner, addr1, addr2] = await ethers.getSigners();

    const val = await NFTContract.getAmount(owner.address);
    console.log("before",val.toString());

    let res = await NFTContract.connect(owner).mintNFTWithAvax(owner.address, 9, 
      "https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak", {value: ethers.utils.parseEther("1000")})
    const tx = await res.wait();
    // console.log(tx);
    let result = _.find(tx.events, {event: "Transfer"})
    const tokenId = result.args["tokenId"].toString();

    const tire = await NFTContract.tierInfo(tokenId);
    console.log("==========tire=======",tokenId, tire)

    // await NFTContract.connect(owner).transferFrom(NFTContract.address, owner.address, 1);
    await NFTContract.connect(owner).setUpgradable(true);

    console.log("before mint",await NFTContract.getAmount(owner.address));
    res = await NFTContract.connect(owner).downgradeNFT(1, 0);
    res.wait();
    res = await NFTContract.connect(owner).aggregation(5000, 0);
    res.wait();
    res = await NFTContract.connect(owner).fractionalize(7)
    res = await NFTContract.connect(owner).upgradeNFTByAvax(3, 4, {value: ethers.utils.parseEther("35")})

    await NFTContract.connect(owner).mintNFTWithAvax(owner.address, 9, 
      "https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak", {value: ethers.utils.parseEther("1000")})
    await NFTContract.connect(owner).mintNFTWithAvax(owner.address, 7, 
        "https://gateway.pinata.cloud/ipfs/QmaFxL15oSodfwnpJ5exy3sHN6zb6v8wiCxhdL99Lj75Ak", {value: ethers.utils.parseEther("100")})
    // let tx1 = await res.wait();
    // result = _.find(tx1.events, {event: "UpgradeNFTByAvax"})
    // console.log(result);
    for (let i = 0; i < 10; i++) {
      let len = await(await NFTContract.getLen(owner.address, i)).toString();
      let str = "";
      let res = (await NFTContract.getInfo(owner.address, i));
      console.log(i, res)
    }

    

    // console.log("tier1: ",(await NFTContract.getLen(owner.address, 0)).toString())
    // console.log("tier2: ",(await NFTContract.getLen(owner.address, 1)).toString())
    // console.log("tier3: ",(await NFTContract.getLen(owner.address, 2)).toString())
    // console.log("tier4: ",(await NFTContract.getLen(owner.address, 3)).toString())
    // console.log("tier5: ",(await NFTContract.getLen(owner.address, 4)).toString())
    // console.log("tier6: ",(await NFTContract.getLen(owner.address, 5)).toString())
    // console.log("tier7: ",(await NFTContract.getLen(owner.address, 6)).toString())
    // console.log("tier8: ",(await NFTContract.getLen(owner.address, 7)).toString())
    // console.log("tier9: ",(await NFTContract.getLen(owner.address, 8)).toString())
    // console.log("tier10: ",(await NFTContract.getLen(owner.address, 9)).toString())
    console.log("tier0: ",(await NFTContract.getLen(owner.address, 10)).toString())

    console.log("after mint",await NFTContract.getAmount(owner.address));
  });

//   it("Vesting and Staking contracts are working correctly.", async function () {
//     //Trigger vesting contract.
//     await vestingContract.Trigger();

//     //Get current month
//     //test Month(), getMonth()
//     expect(parseInt(await vestingContract.Month())).to.equal(1);

//     //Set Vesting Amounts.
//     await vestingContract.SetSeedRoundVestingAmount(toBigNumberArray(seedRoundVestingAmount));
//     expect(await vestingContract.SeedRoundVestingAmount()).to.deep.equal(toBigNumberArray(seedRoundVestingAmount));

//     await vestingContract.SetPrivateRoundVestingAmount(toBigNumberArray(privateRoundVestingAmount));
//     expect(await vestingContract.PrivateRoundVestingAmount()).to.deep.equal(toBigNumberArray(privateRoundVestingAmount));

//     await vestingContract.SetPublicRoundVestingAmount(toBigNumberArray(publicRoundVestingAmount));
//     expect(await vestingContract.PublicRoundVestingAmount()).to.deep.equal(toBigNumberArray(publicRoundVestingAmount));

//     await vestingContract.SetTeamVestingAmount(toBigNumberArray(teamVestingAmount));
//     expect(await vestingContract.TeamVestingAmount()).to.deep.equal(toBigNumberArray(teamVestingAmount));

//     await vestingContract.SetAdvisorsVestingAmount(toBigNumberArray(advisorsVestingAmount));
//     expect(await vestingContract.AdvisorsVestingAmount()).to.deep.equal(toBigNumberArray(advisorsVestingAmount));

//     await vestingContract.SetP2EVestingAmount(toBigNumberArray(p2eVestingAmount));
//     expect(await vestingContract.P2EVestingAmount()).to.deep.equal(toBigNumberArray(p2eVestingAmount));

//     await vestingContract.SetStakingVestingAmount(toBigNumberArray(stakingRewardVestingAmount30), toBigNumberArray(stakingRewardVestingAmount60), toBigNumberArray(stakingRewardVestingAmount90));

//     await vestingContract.SetEcosystemVestingAmount(toBigNumberArray(ecosystemVestingAmount));
//     expect(await vestingContract.EcosystemVestingAmount()).to.deep.equal(toBigNumberArray(ecosystemVestingAmount));


//     //Get 90 APY ceiling for Q1.
//     //getAPY, quarterTotalStaked90, quarterStake90Of
//     expect(await stakingContract.getAPY(BigNumber.from(await vestingContract.start()), 90)).to.deep.equal(BigNumber.from(12306));

//     //getAPY, quarterTotalStaked60, quarterStake60Of
//     expect(await stakingContract.getAPY(BigNumber.from(await vestingContract.start()), 60)).to.deep.equal(BigNumber.from(1844));

//     //getAPY, quarterTotalStaked30, quarterStake30Of
//     expect(await stakingContract.getAPY(BigNumber.from(await vestingContract.start()), 30)).to.deep.equal(BigNumber.from(943));


//     //Stake amount of 1000000000000000000.
//     const [addr1, addr2] = await ethers.getSigners();

//     //test mint function of token contract.
//     await mainContract.mint(addr1.address, BigNumber.from("1000000000000000000"));
//     await mainContract.mint(stakingContract.address, BigNumber.from("100000000000000000000"));

//     //test approve function of token contract.
//     await mainContract.connect(addr1).approve(stakingContract.address, BigNumber.from("1000000000000000000"));

//     //test createStake function of Staking contract.
//     //createStake, addStakeholder.
//     await stakingContract.connect(addr1).createStake(BigNumber.from("1000000000000000000"), 30);

//     //test isStakeholder, addStakeholder function.
//     expect(await stakingContract.isStakeholder(addr1.address)).to.deep.equal(true);

//     //test stakeOf function.
//     expect(await stakingContract.stakeOf(addr1.address)).to.deep.equal(BigNumber.from("1000000000000000000"));

//     //test totalStakes function.
//     expect(await stakingContract.totalStakes()).to.deep.equal(BigNumber.from("1000000000000000000"));
    
//     expect(await stakingContract.removableStake(addr1.address)).to.deep.equal(BigNumber.from("0"));
//     expect(BigNumber.from(await mainContract.balanceOf(addr1.address))).to.deep.equal(BigNumber.from("0"));

//     await delay(35000);

//     //mint
//     await mainContract.mint(addr2.address, BigNumber.from("1000000000000000000"));

//     //rewardsOf
//     expect(await stakingContract.rewardsOf(addr1.address)).to.deep.equal(BigNumber.from("94300000000000000"));

//     //removableStake
//     expect(await stakingContract.removableStake(addr1.address)).to.deep.equal(BigNumber.from("1000000000000000000"));
    
//     //totalRewards.  
//     expect(await stakingContract.connect(addr1).totalRewards()).to.deep.equal(BigNumber.from("94300000000000000"));
    
//     //remove stake amount of 500000000000000000.
//     //test claim, removeStake, removeStakeholder, claimReward, removableStake  function of Staking contract.
//     await stakingContract.connect(addr1).claim();
//     await delay(2000);

//     //removeStakeholder, isStakeholder
//     expect(await stakingContract.isStakeholder(addr1.address)).to.deep.equal(false);


//     //withdrawClaimed
//     await stakingContract.connect(addr1).withdrawClaimed();
//     expect(BigNumber.from(await mainContract.balanceOf(addr1.address))).to.deep.equal(BigNumber.from("1094300000000000000"));


//     expect(await stakingContract.totalStakes()).to.deep.equal(BigNumber.from("0"));
//   });
});
