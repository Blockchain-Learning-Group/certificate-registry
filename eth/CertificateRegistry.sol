pragma solidity ^0.4.24;

contract CertificateRegistry {

    // merkle roots of graduating classes
    mapping(bytes32 => bool) classRoots_;

    // IPFS hash to associated data with each class
    mapping(bytes32 => bytes32) classData_;

    function addClassRoot(bytes32 _root, bytes32 _data) external {
        classRoots_[_root] = true;
        classData_[_root] = _data;
    }

    function verifyCertificate(bytes32 _root, bytes32[] _merkleProof)
        external
        view
        returns (bool)
    {
        // Confirm
        require(classRoots_[_root], "Root does not exist.");

        /**
         * TODO verify merkle proof
         */

        // First item is the sender's address
                // Compute the merkle root
        // bytes32 node = keccak256(msg.sender);
        // uint256 path = 0;
        // for (uint16 i = 0; i < _merkleProof.length; i++) {
        //     if ((path & 0x01) == 1) {
        //         node = keccak256(_merkleProof[i], node);
        //     } else {
        //         node = keccak256(node, _merkleProof[i]);
        //     }
        //     path /= 2;
        // }

        // Check the merkle proof
        // require(node == _root, "node does not match root.");



        return true;
    }
}
