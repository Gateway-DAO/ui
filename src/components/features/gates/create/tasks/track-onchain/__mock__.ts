const chainIds = {
  Ethereum: 1,
  Görli: 5,
  Kovan: 6,
  Optimistic: 10,
  'Binance Smart Chain': 56,
  Polygon: 137,
  Arbitrum: 42161,
};

export const mockChains = ['Polygon', 'Ethereum', 'Arbitrum', 'Optimistic'].map(
  (chain) => ({
    value: chainIds[chain],
    label: chain,
  })
);

export const mockEvents = [
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }],
    name: 'proposals',
    outputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'description', type: 'string' },
      { name: 'votingDeadline', type: 'uint256' },
      { name: 'executed', type: 'bool' },
      { name: 'proposalPassed', type: 'bool' },
      { name: 'numberOfVotes', type: 'uint256' },
      { name: 'currentResult', type: 'int256' },
      { name: 'proposalHash', type: 'bytes32' },
    ],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'proposalNumber', type: 'uint256' },
      { name: 'transactionBytecode', type: 'bytes' },
    ],
    name: 'executeProposal',
    outputs: [{ name: 'result', type: 'int256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'memberId',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'numProposals',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'priceOfAUnicornInFinney',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'newUnicornPriceInFinney', type: 'uint256' },
      { name: 'newUnicornAddress', type: 'address' },
    ],
    name: 'changeUnicorn',
    outputs: [],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'uint256' }],
    name: 'members',
    outputs: [
      { name: 'member', type: 'address' },
      { name: 'voteWeight', type: 'uint256' },
      { name: 'canAddProposals', type: 'bool' },
      { name: 'name', type: 'string' },
      { name: 'memberSince', type: 'uint256' },
    ],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'debatingPeriodInMinutes',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'minimumQuorum',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'targetMember', type: 'address' },
      { name: 'voteWeight', type: 'uint256' },
      { name: 'canAddProposals', type: 'bool' },
      { name: 'memberName', type: 'string' },
    ],
    name: 'changeMembership',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'beneficiary', type: 'address' },
      { name: 'weiAmount', type: 'uint256' },
      { name: 'JobDescription', type: 'string' },
      { name: 'transactionBytecode', type: 'bytes' },
    ],
    name: 'newProposalInWei',
    outputs: [{ name: 'proposalID', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'majorityMargin',
    outputs: [{ name: '', type: 'int256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'unicornAddress',
    outputs: [{ name: '', type: 'address' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'beneficiary', type: 'address' },
      { name: 'etherAmount', type: 'uint256' },
      { name: 'JobDescription', type: 'string' },
      { name: 'transactionBytecode', type: 'bytes' },
    ],
    name: 'newProposalInEther',
    outputs: [{ name: 'proposalID', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'minimumQuorumForProposals', type: 'uint256' },
      { name: 'minutesForDebate', type: 'uint256' },
      { name: 'marginOfVotesForMajority', type: 'int256' },
    ],
    name: 'changeVotingRules',
    outputs: [],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'proposalNumber', type: 'uint256' },
      { name: 'supportsProposal', type: 'bool' },
      { name: 'justificationText', type: 'string' },
    ],
    name: 'vote',
    outputs: [{ name: 'voteID', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: 'proposalNumber', type: 'uint256' },
      { name: 'beneficiary', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'transactionBytecode', type: 'bytes' },
    ],
    name: 'checkProposalCode',
    outputs: [{ name: 'codeChecksOut', type: 'bool' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      { name: 'minimumQuorumForProposals', type: 'uint256' },
      { name: 'minutesForDebate', type: 'uint256' },
      { name: 'marginOfVotesForMajority', type: 'int256' },
      { name: 'congressLeader', type: 'address' },
    ],
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'proposalID', type: 'uint256' },
      { indexed: false, name: 'recipient', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
      { indexed: false, name: 'description', type: 'string' },
    ],
    name: 'ProposalAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'proposalID', type: 'uint256' },
      { indexed: false, name: 'position', type: 'bool' },
      { indexed: false, name: 'voter', type: 'address' },
      { indexed: false, name: 'justification', type: 'string' },
    ],
    name: 'Voted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'proposalID', type: 'uint256' },
      { indexed: false, name: 'result', type: 'int256' },
      { indexed: false, name: 'quorum', type: 'uint256' },
      { indexed: false, name: 'active', type: 'bool' },
    ],
    name: 'ProposalTallied',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: 'member', type: 'address' }],
    name: 'MembershipChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'minimumQuorum', type: 'uint256' },
      {
        indexed: false,
        name: 'debatingPeriodInMinutes',
        type: 'uint256',
      },
      { indexed: false, name: 'majorityMargin', type: 'int256' },
    ],
    name: 'ChangeOfRules',
    type: 'event',
  },
];
