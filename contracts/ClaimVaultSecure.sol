// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract ClaimVaultSecure is SepoliaConfig {
    using FHE for *;
    
    struct InsuranceClaim {
        euint32 claimId;
        euint32 claimAmount;
        euint32 policyNumber;
        euint8 claimStatus; // 0: Pending, 1: Approved, 2: Rejected, 3: Under Review
        euint8 claimType; // 0: Auto, 1: Health, 2: Property, 3: Life
        bool isActive;
        bool isVerified;
        string description;
        string evidenceHash;
        address claimant;
        address insurer;
        uint256 timestamp;
        uint256 reviewDeadline;
    }
    
    struct Policy {
        euint32 policyId;
        euint32 coverageAmount;
        euint32 premiumAmount;
        euint8 policyType;
        bool isActive;
        bool isVerified;
        string policyDetails;
        address policyholder;
        address insurer;
        uint256 startDate;
        uint256 endDate;
    }
    
    struct VerificationReport {
        euint32 reportId;
        euint32 claimId;
        euint8 verificationScore;
        ebool isLegitimate;
        string reportHash;
        address verifier;
        uint256 timestamp;
    }
    
    mapping(uint256 => InsuranceClaim) public claims;
    mapping(uint256 => Policy) public policies;
    mapping(uint256 => VerificationReport) public verificationReports;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public insurerReputation;
    
    uint256 public claimCounter;
    uint256 public policyCounter;
    uint256 public reportCounter;
    
    address public owner;
    address public verifier;
    
    event ClaimFiled(uint256 indexed claimId, address indexed claimant, string description);
    event ClaimReviewed(uint256 indexed claimId, uint8 status, address indexed reviewer);
    event PolicyCreated(uint256 indexed policyId, address indexed policyholder, address indexed insurer);
    event VerificationSubmitted(uint256 indexed reportId, uint256 indexed claimId, address indexed verifier);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createPolicy(
        string memory _policyDetails,
        uint256 _coverageAmount,
        uint256 _premiumAmount,
        uint8 _policyType,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_policyDetails).length > 0, "Policy details cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 policyId = policyCounter++;
        
        policies[policyId] = Policy({
            policyId: FHE.asEuint32(0), // Will be set properly later
            coverageAmount: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            premiumAmount: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            policyType: FHE.asEuint8(_policyType),
            isActive: true,
            isVerified: false,
            policyDetails: _policyDetails,
            policyholder: msg.sender,
            insurer: address(0), // Will be set by insurer
            startDate: block.timestamp,
            endDate: block.timestamp + _duration
        });
        
        emit PolicyCreated(policyId, msg.sender, address(0));
        return policyId;
    }
    
    function fileClaim(
        uint256 policyId,
        string memory _description,
        string memory _evidenceHash,
        externalEuint32 claimAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(policies[policyId].policyholder != address(0), "Policy does not exist");
        require(policies[policyId].isActive, "Policy is not active");
        require(block.timestamp <= policies[policyId].endDate, "Policy has expired");
        
        uint256 claimId = claimCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(claimAmount, inputProof);
        
        claims[claimId] = InsuranceClaim({
            claimId: FHE.asEuint32(0), // Will be set properly later
            claimAmount: internalAmount,
            policyNumber: FHE.asEuint32(0), // Will be set to policyId
            claimStatus: FHE.asEuint8(0), // Pending
            claimType: policies[policyId].policyType,
            isActive: true,
            isVerified: false,
            description: _description,
            evidenceHash: _evidenceHash,
            claimant: msg.sender,
            insurer: policies[policyId].insurer,
            timestamp: block.timestamp,
            reviewDeadline: block.timestamp + 30 days
        });
        
        emit ClaimFiled(claimId, msg.sender, _description);
        return claimId;
    }
    
    function reviewClaim(
        uint256 claimId,
        uint8 status,
        string memory reviewNotes
    ) public {
        require(claims[claimId].insurer == msg.sender || msg.sender == verifier, "Not authorized to review");
        require(claims[claimId].isActive, "Claim is not active");
        require(block.timestamp <= claims[claimId].reviewDeadline, "Review deadline passed");
        
        claims[claimId].claimStatus = FHE.asEuint8(status);
        
        if (status == 1) { // Approved
            claims[claimId].isVerified = true;
        } else if (status == 2) { // Rejected
            claims[claimId].isActive = false;
        }
        
        emit ClaimReviewed(claimId, status, msg.sender);
    }
    
    function submitVerificationReport(
        uint256 claimId,
        euint8 verificationScore,
        ebool isLegitimate,
        string memory reportHash
    ) public returns (uint256) {
        require(claims[claimId].claimant != address(0), "Claim does not exist");
        require(msg.sender == verifier, "Only verifier can submit reports");
        
        uint256 reportId = reportCounter++;
        
        verificationReports[reportId] = VerificationReport({
            reportId: FHE.asEuint32(0), // Will be set properly later
            claimId: FHE.asEuint32(0), // Will be set to claimId
            verificationScore: verificationScore,
            isLegitimate: isLegitimate,
            reportHash: reportHash,
            verifier: msg.sender,
            timestamp: block.timestamp
        });
        
        emit VerificationSubmitted(reportId, claimId, msg.sender);
        return reportId;
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is claimant or insurer based on context
        if (claims[claimCounter - 1].claimant == user) {
            userReputation[user] = reputation;
        } else {
            insurerReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getClaimInfo(uint256 claimId) public view returns (
        string memory description,
        string memory evidenceHash,
        uint8 claimStatus,
        uint8 claimType,
        bool isActive,
        bool isVerified,
        address claimant,
        address insurer,
        uint256 timestamp,
        uint256 reviewDeadline
    ) {
        InsuranceClaim storage claim = claims[claimId];
        return (
            claim.description,
            claim.evidenceHash,
            0, // FHE.decrypt(claim.claimStatus) - will be decrypted off-chain
            0, // FHE.decrypt(claim.claimType) - will be decrypted off-chain
            claim.isActive,
            claim.isVerified,
            claim.claimant,
            claim.insurer,
            claim.timestamp,
            claim.reviewDeadline
        );
    }
    
    function getPolicyInfo(uint256 policyId) public view returns (
        string memory policyDetails,
        uint8 policyType,
        bool isActive,
        bool isVerified,
        address policyholder,
        address insurer,
        uint256 startDate,
        uint256 endDate
    ) {
        Policy storage policy = policies[policyId];
        return (
            policy.policyDetails,
            0, // FHE.decrypt(policy.policyType) - will be decrypted off-chain
            policy.isActive,
            policy.isVerified,
            policy.policyholder,
            policy.insurer,
            policy.startDate,
            policy.endDate
        );
    }
    
    function getVerificationReportInfo(uint256 reportId) public view returns (
        uint8 verificationScore,
        bool isLegitimate,
        string memory reportHash,
        address verifier,
        uint256 timestamp
    ) {
        VerificationReport storage report = verificationReports[reportId];
        return (
            0, // FHE.decrypt(report.verificationScore) - will be decrypted off-chain
            false, // FHE.decrypt(report.isLegitimate) - will be decrypted off-chain
            report.reportHash,
            report.verifier,
            report.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getInsurerReputation(address insurer) public view returns (uint8) {
        return 0; // FHE.decrypt(insurerReputation[insurer]) - will be decrypted off-chain
    }
    
    function processClaim(uint256 claimId) public {
        require(claims[claimId].insurer == msg.sender, "Only insurer can process claim");
        require(claims[claimId].isVerified, "Claim must be verified");
        require(claims[claimId].claimStatus == FHE.asEuint8(1), "Claim must be approved");
        
        // Mark claim as processed
        claims[claimId].isActive = false;
        
        // In a real implementation, funds would be transferred based on decrypted amount
        // payable(claims[claimId].claimant).transfer(amount);
    }
    
    function withdrawFunds(uint256 claimId) public {
        require(claims[claimId].claimant == msg.sender, "Only claimant can withdraw");
        require(claims[claimId].isVerified, "Claim must be verified");
        require(claims[claimId].claimStatus == FHE.asEuint8(1), "Claim must be approved");
        require(!claims[claimId].isActive, "Claim must be processed");
        
        // Transfer funds to claimant
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        // payable(msg.sender).transfer(amount);
    }
}