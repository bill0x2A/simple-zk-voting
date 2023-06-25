pragma solidity ^0.8.0;

contract Voting {
    uint256 public yesVotes;
    uint256 public noVotes;

    mapping(address => bool) public hasVoted;

    modifier hasNotVoted {
        require(!hasVoted[msg.sender], "You have already voted.");
        _;
    }

    function voteYes() hasNotVoted public {
        hasVoted[msg.sender] = true;
        yesVotes++;
    }

    function voteNo() hasNotVoted public {
        require(!hasVoted[msg.sender], "You have already voted.");
        hasVoted[msg.sender] = true;
        noVotes++;
    }
}
