// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import "@openzeppelin/contracts/access/IAccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SafeTicket is ERC721URIStorage {

  error MustBeCollectionOwner();

  uint256 private _nextTicketId;

  constructor() ERC721("SafeTicket", "SFT") {}

  modifier onlyCollectionOwner(address _collection) {
    if(!isCollectionOwner(_collection)) {
      revert MustBeCollectionOwner();
    }
    _;
  }

  /**
   * @dev Mint a new ticket
   * chose mint over safeMint based on:
   * https://ethereum.stackexchange.com/questions/115280/mint-vs-safemint-which-is-best-for-erc721
   */
  function mintTicket(address _collection, string memory _ticketURI) external onlyCollectionOwner(_collection) returns (uint256) {

    uint256 TicketId = _nextTicketId++;
    _mint(_collection, TicketId);
    _setTokenURI(TicketId, _ticketURI);
    return TicketId;
  }

  function attachTicketCollection(address _collection, uint256 ticketId, address newOwner) external onlyCollectionOwner(_collection) {

  }

  function isCollectionOwner(address collection) private view returns (bool) {
    return IAccessControl(collection).hasRole(keccak256("OWNER"), msg.sender);
  }
}