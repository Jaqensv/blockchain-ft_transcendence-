// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PONGcontract is ERC20 {

constructor() ERC20("PONG token", "PONG") {
    _mint(msg.sender, 1000 * 10 ** decimals());
}
    mapping(address => string) players;
    mapping(string => uint) scores;
    bytes encodedId;

    function _addPlayer(string memory _playerName) public {
        require(keccak256(abi.encodePacked(players[msg.sender])) != keccak256(abi.encodePacked(_playerName)));
        players[msg.sender] = _playerName;
        _encodeId(_playerName);
    }

    function _getPlayer() public view returns (string memory) {
        return players[msg.sender];
    }

    function _encodeId(string memory _playerName) public {
        encodedId = abi.encodePacked(_playerName, msg.sender);
    }

    function _setScore(string memory _playerName, uint _newScore) public {
        scores[_playerName] = _newScore;
    }

    function _getScore(string memory _playerName) public view returns (uint) {
        return scores[_playerName];
    }
}