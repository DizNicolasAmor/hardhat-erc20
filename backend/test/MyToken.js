const { ethers } = require("hardhat");
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
        await token.mint(user, 100, { from: user });
      } catch (err) {
        return;
      }
      assert.fail("Should mint failed");
    });

    it("Should transfer successfully", async function () {
      await token.transfer(user, 10);
      assert.equal(await token.balanceOf(deployer), 90);
      assert.equal(await token.balanceOf(user), 10);
      assert.equal(await token.totalSupply(), 100);
    });

    it("Should transfer failed", async function () {
      try {
        await token.transfer(user, 100);
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
