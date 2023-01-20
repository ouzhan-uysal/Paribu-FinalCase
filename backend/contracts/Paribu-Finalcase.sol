// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ERC20/ERC20.sol";

contract Paribu_FinalCase {
    address private immutable owner;
    // IERC20 public immutable token;
    uint256 private proposalCount = 0;

    struct IOptions {
        string option;
        uint256 voteCount;
    }

    struct IProposal {
        uint256 id;
        string description;
        // IOptions[] options;
        string[] options;
    }

    // IProposal[] public proposals;

    mapping(IERC20 => IProposal[]) private proposals;

    constructor() {
        owner = msg.sender;
        // token = _token;
    }

    function getAllProposals(IERC20 _token)
        external
        view
        returns (IProposal[] memory)
    {
        return proposals[_token];
    }

    // function getProposalVotes(IERC20 _token) external view returns () {
    //     return 
    // }

    function createProposal(
        IERC20 _token,
        string calldata _description,
        string[] calldata _options
    ) external {
        // IOptions[] memory tempArr = new IOptions[](_options.length);
        // for (uint256 i = 0; i < _options.length; i++) {
        //     tempArr[i] = {
        //         option: _options[i],
        //         voteCount: 0
        //     }
        // }
        proposals[_token].push(
            IProposal({
                // id: keccak256(abi.encode(description)),
                id: proposalCount,
                description: _description,
                options: _options
            })
        );
        proposalCount += 1;
    }
}
