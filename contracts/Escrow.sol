// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
	address public arbiter;
	address public beneficiary;
	address public depositor;
	bool public isApproved;

	constructor(address _arbiter, address _beneficiary) payable {
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}

	event Approved(uint256 _balance);

	function approve() external isArbiter {
		isApproved = true;
		uint256 balance = address(this).balance;
		(bool s, ) = beneficiary.call{value: address(this).balance}("");
		require(s, "funds couldn't be sent to beneficiary");
		emit Approved(balance);
	}

	modifier isArbiter() {
		require(msg.sender == arbiter, "must be the arbiter");
		_;
	}
}
