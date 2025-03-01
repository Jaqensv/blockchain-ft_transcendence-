// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PONGcontract is ERC20 {

constructor() ERC20("PONG token", "PONG") {
    _mint(msg.sender, 1000 * 10 ** decimals());
}
    mapping(address => string) players_with_address;
    mapping(string => address) address_with_players;
    mapping(string => uint) scores;
    string[] public players;

    function rewardPlayer(address _player, uint _amount) public {
        require(balanceOf(msg.sender) >= _amount, "Error: Not enough PONG tokens");
        _transfer(msg.sender, _player, _amount);
    }

    function getPlayerBalance(address _player) public view returns (uint) {
        return balanceOf(_player);
    }

    function addPlayer(string memory _playerName) public {
        require(keccak256(abi.encodePacked(players_with_address[msg.sender])) != keccak256(abi.encodePacked(_playerName)), "Error: Player in database");
        players_with_address[msg.sender] = _playerName;
        address_with_players[_playerName] = msg.sender;
        players.push(_playerName);
    }

    function removePlayer(string memory _playerName) public {
        uint index = findIndex(_playerName);
        require(index < players.length, "Error: Unknown player");
        players[index] = players[players.length - 1];
        players.pop();
    }

    function findIndex(string memory _playerName) internal view returns (uint) {
        for (uint i = 0; i < players.length; ++i) {
            if (keccak256(bytes(players[i])) == keccak256(bytes(_playerName))) {
                return i;
            }
        }
        return players.length;
    }

    function getPlayer() public view returns (string memory) {
        return players_with_address[msg.sender];
    }

    function getAddressPlayer(string memory _playerName) public view returns (address) {
        return address_with_players[_playerName];
    }

    function setScore(string memory _playerName, uint _newScore) public {
        scores[_playerName] = _newScore;
        require(scores[_playerName] >= 100, "Error: Not enough point for the hundredReward");
        hundredReward(address_with_players[_playerName]);
    }

    function getScore(string memory _playerName) public view returns (uint) {
        return scores[_playerName];
    }

    function hundredReward(address _player) internal {
        _transfer(msg.sender, _player, 100);
    }
}