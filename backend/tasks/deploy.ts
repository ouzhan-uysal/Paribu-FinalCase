/* eslint-disable prettier/prettier */
import '@nomiclabs/hardhat-waffle';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

task('deploy', 'Deploy Greeter contract').setAction(
  async (_, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const Greeter = await hre.ethers.getContractFactory('Greeter');
    const greeter = await Greeter.deploy('Hello, Hardhat!');

    await greeter.deployed();

    console.log('Contract deployed to:', greeter.address);
  }
);

// ! upgrade
// task("deploy:updateToken").setAction(async function (_: TaskArguments, { ethers, upgrades, run }) {
//   // get current proxy address
//   const oldToken = getTokenInfo("./oldTokenAddress.json");

//   // token upgrade
//   const UpgradedToken: NewToken__factory = await ethers.getContractFactory("NewToken");
//   const upgraded: NewToken = <NewToken>await upgrades.upgradeProxy(oldToken.proxy, UpgradedToken);

//   await upgraded.deployed();

//   const tokenImplementationAddress = await upgrades.erc1967.getImplementationAddress(upgraded.address);

//   // write to local
//   const data = {
//     token: { proxy: upgraded.address, implementation: tokenImplementationAddress },
//   };

//   saveJSON(data, "./newTokenAddress.json");

//   // etherscan verification
//   await run("verify:verify", {
//     address: tokenImplementationAddress,
//   });
// });