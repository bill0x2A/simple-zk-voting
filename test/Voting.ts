const { expect } = require("chai");

declare let ethers: any;

describe("Voting contract", function() {
  it("Should count votes correctly", async function() {
    const [owner, addr1] = await ethers.getSigners();

    const voting = await ethers.deployContract("Voting");
    await voting.waitForDeployment();

    await voting.connect(owner).voteYes();
    expect(await voting.yesVotes()).to.equal(1);
    expect(await voting.noVotes()).to.equal(0);

    await voting.connect(addr1).voteNo();
    expect(await voting.yesVotes()).to.equal(1);
    expect(await voting.noVotes()).to.equal(1);
  });

  it("Should prevent double voting", async function() {
    const [owner] = await ethers.getSigners();

    const voting = await ethers.deployContract("Voting");
    await voting.waitForDeployment();

    await voting.connect(owner).voteYes();
    await expect(voting.connect(owner).voteYes()).to.be.revertedWith("You have already voted.");
  });
});
