// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public owner;
    bool public votingActive;

    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    modifier votingIsActive() {
        require(votingActive, "Voting is not active");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // เพิ่มผู้สมัคร
    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate(_name, 0));
    }

    // เปิดระบบโหวต
    function startVoting() public onlyOwner {
        votingActive = true;
    }

    // ปิดระบบโหวต
    function endVoting() public onlyOwner {
        votingActive = false;
    }

    // โหวตให้ผู้สมัคร
    function vote(uint _candidateIndex) public votingIsActive {
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateIndex < candidates.length, "Invalid candidate");

        candidates[_candidateIndex].voteCount += 1;
        hasVoted[msg.sender] = true;
    }

    // ดึงเฉพาะชื่อผู้สมัครทั้งหมด (เพื่อใช้บน frontend)
    function getCandidateList() public view returns (string[] memory) {
    string[] memory names = new string[](candidates.length);
    for (uint i = 0; i < candidates.length; i++) {
        names[i] = candidates[i].name;
    }
    return names;
}


    // ดึงข้อมูลผู้สมัครทั้งหมด
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    // ดึงจำนวนผู้สมัคร
    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }

    // ดูผู้ชนะ
    function getWinner() public view returns (string memory winnerName, uint maxVotes) {
        require(!votingActive, "Voting still active");

        uint winningVoteCount = 0;
        uint winnerIndex;

        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winnerIndex = i;
            }
        }

        return (candidates[winnerIndex].name, candidates[winnerIndex].voteCount);
    }
}
