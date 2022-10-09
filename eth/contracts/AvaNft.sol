// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract AvaJarvis is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    using ECDSA for bytes32;

    string private baseURI;

    // PRICES
//    uint constant PRICE_OG = 0 ether;
//    uint constant PRICE_WL = .007 ether;
//    uint constant PRICE_PUBLIC =  .02 ether;

    // PRICES TESTNET
        uint constant PRICE_OG = 0 ether;
        uint constant PRICE_WL = .0000007 ether;
        uint constant PRICE_PUBLIC =  .00002 ether;

    // MAX_AMOUNT
    uint constant maxSupply = 9200;
    uint constant MAX_AMOUNT_OG = 1;
    uint constant MAX_AMOUNT_WL = 2;
    uint constant MAX_AMOUNT_PUBLIC =  2;

    // ADDRESSES_SIGNATURE
    address ADDRESS_OG;
    address ADDRESS_WL;

    // STATUS
    enum STATUS_LIST {
        NOT_STARTED,
        OG,
        WL,
        PUBLIC
    }
    STATUS_LIST public status = STATUS_LIST.NOT_STARTED;

    // amounts
    mapping(address => bool) public wlPermission;
    mapping(address => bool) public publicPermission;

    constructor(string memory uri, address _ADDRESS_OG, address _ADDRESS_WL) ERC721("AvaJarvis", "AVJ") {
        setBaseUri(uri);

        ADDRESS_OG = _ADDRESS_OG;
        ADDRESS_WL = _ADDRESS_WL;
    }

    function mintJarvis(uint _count, bytes memory signature) public payable {


        require(!paused() && status != STATUS_LIST.NOT_STARTED, "contract paused");
        require(_tokenId.current() < maxSupply, "all tokens have been sold");
        require(_count > 0, "mint at least one token");
        require(_tokenId.current() + _count <= maxSupply, "not enough tokens left");
        uint balance = balanceOf(msg.sender);

        // require msg.value
        require(
            status == STATUS_LIST.OG && PRICE_OG <= msg.value ||
            status == STATUS_LIST.WL && PRICE_WL * _count <= msg.value ||
            status == STATUS_LIST.PUBLIC && PRICE_PUBLIC * _count <= msg.value
        , "incorrect ether value");

        if(status == STATUS_LIST.OG) {
            // require signature
            require(
                _verify(signature),
                "invalid signature"
            );

            // require amount
            require(
                !wlPermission[msg.sender],
                'a lot of nft'
            );
            wlPermission[msg.sender]=true;
        }

        if(status == STATUS_LIST.WL) {
            // require signature
            require(
                _verify(signature),
                "invalid signature"
            );

            // require amount
            uint countWlPermission = wlPermission[msg.sender] ? 2 : 1;
            require(
                balance + _count < MAX_AMOUNT_WL + countWlPermission,
                'a lot of nft'
            );

            if(
                !wlPermission[msg.sender] && balance + _count == 2 ||
                wlPermission[msg.sender] && balance + _count == 3
            ) {
                publicPermission[msg.sender] = true;
            }
        }

        if(status == STATUS_LIST.PUBLIC) {
            // require amount
            uint countWlPermission = wlPermission[msg.sender] ? 2 : 1;
            uint countPublicPermission = publicPermission[msg.sender] ? 2 : 1;
            require(
                balance + _count < MAX_AMOUNT_PUBLIC + countPublicPermission + countWlPermission,
                'a lot of nft'
            );
        }

        for (uint i = 0; i < _count; i++){
            uint256 tokenId = _tokenId.current();
            _tokenId.increment();
            _safeMint(msg.sender, tokenId);
        }
    }

    // verify
    function _verify(bytes memory signature) public view returns (bool) {
        if(status == STATUS_LIST.PUBLIC) {
            return true;
        }

        address data = keccak256(
            abi.encodePacked(
                msg.sender
            )
        ).toEthSignedMessageHash()
        .recover(signature);

        if(status == STATUS_LIST.OG) {
            return data == ADDRESS_OG;
        }


        return data == ADDRESS_WL || data == ADDRESS_OG;
    }

    // status change using an internal smart contract
    function changeStatus(STATUS_LIST new_status) private {
        status = new_status;
    }

    // status change via owner
    function changeStatusOwner(STATUS_LIST new_status) public onlyOwner {
        changeStatus(new_status);
    }

    // view total supply
    function getTotalSupply() view public returns(uint) {
        return _tokenId.current();
    }

    // URI
    function setBaseUri(string memory _uri) public onlyOwner {
        baseURI = _uri;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

//    function withdraw() public onlyOwner{
//        uint _balance = address(this).balance;
//        payable(0x612DBBe0f90373ec00cabaEED679122AF9C559BE).transfer(_balance * 20 / 100);
//        payable(0xF93680291Bc5edD45e5C66200149D52e24846c49).transfer(address(this).balance);
//    }


    // UTILS
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    whenNotPaused
    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
