pragma solidity ^0.5.2;

contract Migrations {
    address internal owner;
    uint public lastCompletedMigration;

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function setCompleted(uint completed) external restricted {
        lastCompletedMigration = completed;
    }
}
