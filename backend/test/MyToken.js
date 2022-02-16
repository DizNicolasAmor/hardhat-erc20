const { ethers } = require("hardhat");
const { expect } = require("chai");
const { name, symbol, initialSupply } = require("../scripts/deploySettings");

describe("MyToken", function () {
  let token;
  let deployer, user;

  before(async () => {
    [deployer, user] = await ethers.getSigners();

    const MyToken = await hre.ethers.getContractFactory("MyToken");
    token = await MyToken.deploy(name, symbol, initialSupply);

    await token.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy with the right params", async function () {
      expect(await token.name()).to.equal(name);
      expect(await token.symbol()).to.equal(symbol);
      expect(await token.totalSupply()).to.equal(initialSupply);
    });
  });

  describe("Interactive", function () {
    /*
    it("Should mint successfully", async function () {
      await token.mint(deployer, 100);
      expect(await token.balanceOf(deployer)).to.equal(100);
      expect(await token.totalSupply()).to.equal(100);
    });

    it("Should mint failed", async function () {
      try {
        await token.mint(user, 100, { from: user });
      } catch (err) {
        return;
      }
      expect.fail("Should mint failed");
    });

    it("Should transfer successfully", async function () {
      await token.transfer(user, 10);
      expect(await token.balanceOf(deployer)).to.equal(90);
      expect(await token.balanceOf(user)).to.equal(10);
      expect(await token.totalSupply()).to.equal(100);
    });

    it("Should transfer failed", async function () {
      try {
        await token.transfer(user, 100);
      } catch (err) {
        return;
      }
      expect.fail("Should transfer failed");
    });

    it("Should burn successfully", async function () {
      await token.burn(10);
      expect(await token.balanceOf(deployer)).to.equal(80);
      expect(await token.totalSupply()).to.equal(90);
    });

    it("Should burn failed", async function () {
      try {
        await token.burn(100);
      } catch (err) {
        return;
      }
      expect.fail("Should burn failed");
    });
  */
  });
});
