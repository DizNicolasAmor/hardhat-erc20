const { expect } = require("chai");
const { ethers } = require("hardhat");
const { name, symbol, initialSupply } = require("../deploy/deploySettings");

describe("MyToken", function () {
  [deployer, user] = await ethers.getSigners();
  let accounts;
  // let deployer;
  let account1;
  let token;

  before(async function () {
    accounts = await web3.eth.getAccounts();
    deployer = accounts[0];
    account1 = accounts[1];
  });

  describe("Deployment", function () {
    it("Should deploy with the right params", async function () {
      const MyToken = await ethers.getContractFactory(
        name,
        symbol,
        initialSupply
      );
      const myToken = await MyToken.deploy(initialSupply);

      await myToken.deployed();

      assert.equal(await token.name(), settings.name);
      assert.equal(await token.symbol(), settings.symbol);
      assert.equal(await token.decimals(), settings.decimals);
      assert.equal(
        await token.hasRole(await token.MINTER_ROLE(), deployer),
        true
      );
      assert.equal(
        await token.hasRole(await token.PAUSER_ROLE(), deployer),
        true
      );
      assert.equal(
        await token.hasRole(await token.DEFAULT_ADMIN_ROLE(), deployer),
        true
      );
    });
  });

  describe("Interactive", function () {
    it("Should mint successfully", async function () {
      await token.mint(deployer, 100);
      assert.equal(await token.balanceOf(deployer), 100);
      assert.equal(await token.totalSupply(), 100);
    });

    it("Should mint failed", async function () {
      try {
        await token.mint(account1, 100, { from: account1 });
      } catch (err) {
        return;
      }
      assert.fail("Should mint failed");
    });

    it("Should transfer successfully", async function () {
      await token.transfer(account1, 10);
      assert.equal(await token.balanceOf(deployer), 90);
      assert.equal(await token.balanceOf(account1), 10);
      assert.equal(await token.totalSupply(), 100);
    });

    it("Should transfer failed", async function () {
      try {
        await token.transfer(account1, 100);
      } catch (err) {
        return;
      }
      assert.fail("Should transfer failed");
    });

    it("Should burn successfully", async function () {
      await token.burn(10);
      assert.equal(await token.balanceOf(deployer), 80);
      assert.equal(await token.totalSupply(), 90);
    });

    it("Should burn failed", async function () {
      try {
        await token.burn(100);
      } catch (err) {
        return;
      }
      assert.fail("Should burn failed");
    });
  });
});
