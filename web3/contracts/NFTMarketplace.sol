// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMarketplace is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;

    mapping(string => uint8) existingURIs;
    mapping(uint256 => address) public holderOf;

    address public siteOwner;
    uint256 public royalityFee;
    uint256 public currentTokenID;
    uint256 public totalTransaction = 0;
    uint256 public cost = 0.01 ether;

    event Sale(uint256 tokenId, address indexed owner, uint256 cost, string fileURI, uint256 timestamp);

    struct NFTItem {
        uint256 tokenId;
        address nftOwner;
        string title;
        string category;
        string description;
        uint256 price;
        string fileURI;
        uint256 timestamp;
        bool isOnSale;
    }

    struct Transaction {
        uint256 transactionID;
        address from;
        address to;
        string nftTitle;
        uint256 transactionPrice;
        uint256 timestamp;
    }

    Transaction[] transactions;
    NFTItem[] minted;

    constructor(
        string memory _company,
        string memory _symbol,
        uint256 _royalityFee
    ) ERC721(_company, _symbol) {
        royalityFee = _royalityFee;
        siteOwner = msg.sender;
    }

    function mintNFT(
        string memory _title,
        string memory _category,
        string memory _description,
        string memory _fileURI,
        uint256 _price
    ) external payable {
        require(msg.value >= cost, "Ether too low for minting!");
        require(msg.sender != siteOwner,"Owner is not allowed to Mint NFTs.");

        // uint256 royality = (msg.value * royalityFee) / 100;

        payTo(siteOwner, msg.value);

        _tokenIDs.increment();
        currentTokenID = _tokenIDs.current();

        minted.push(
            NFTItem(
                currentTokenID,
                msg.sender,
                _title,
                _category,
                _description,
                _price,
                _fileURI,
                block.timestamp,
                true
            )
        );

        emit Sale(
            currentTokenID,
            msg.sender,
            msg.value,
            _fileURI,
            block.timestamp
        );

        _safeMint(msg.sender, currentTokenID);
        _setTokenURI(currentTokenID, _fileURI);
        existingURIs[_fileURI] = 1;
        holderOf[currentTokenID] = msg.sender;
    }

    function buyNFT(uint256 _id) external payable {

        require(msg.value >= minted[_id].price, "Ether too low for purchase!");

        require(msg.sender != minted[_id].nftOwner, "Operation Not Allowed!");

        require(minted[_id].isOnSale == true, "Sorry! This token is not on Sale.");
        
        uint256 royality = (msg.value * royalityFee) / 100;
        payTo(siteOwner, royality);
        payTo(minted[_id].nftOwner, (msg.value - royality));

        totalTransaction++;

        transactions.push(
            Transaction(
                totalTransaction,
                msg.sender,
                minted[_id].nftOwner,
                minted[_id].title,
                msg.value,
                block.timestamp
            )
        );

        emit Sale(
            totalTransaction,
            msg.sender,
            msg.value,
            minted[_id].fileURI,
            block.timestamp
        );

        minted[_id].nftOwner = msg.sender;
        minted[_id].isOnSale = false;
    }

    function changePrice(uint256 _id, uint256 newPrice) external returns(bool) {
        
        require(newPrice > 0 ether, "New Price cannot be Zero");
        require(msg.sender == minted[_id].nftOwner, "You are not the owner of this NFT!, Try purchasing it.");

        minted[_id].price = newPrice;
        minted[_id].isOnSale = true;
        return true;
    }

    function getAllNFTs() external view returns(NFTItem[] memory) {
        return minted;
    }

    function getAllTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }

    function payTo(address to, uint256 amount) internal {
        (bool sent, ) = payable(to).call{value: amount}("");
        require(sent, "Something went wrong!");
    }
}
