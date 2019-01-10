pragma solidity ^0.5.0;

import "@gnosis.pm/util-contracts/contracts/GnosisStandardToken.sol";

contract TokenGNO is GnosisStandardToken {
    string public constant symbol = "GNO";
    string public constant name = "Gnosis";
    uint8 public constant decimals = 18;

    constructor(uint amount) public {
        totalTokens = amount;
        balances[msg.sender] = amount;
    }
}
