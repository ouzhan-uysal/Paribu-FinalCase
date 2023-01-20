import { IProposalData } from "types/proposal.interface";

export const proposalReducer = (proposalData: IProposalData, action: {
  type: string;
  payload: unknown;
}) => {
  switch (action.type) {
    case IProposalActions.SET_CONTRACT_ADDR:
      return { ...proposalData, contractAddr: action.payload }
    case IProposalActions.SET_PROPOSAL_LIST:
      return { ...proposalData, proposalList: action.payload }
    case IProposalActions.SET_SELECTED_PROPOSAL:
      return { ...proposalData, selectedProposal: action.payload }
    default:
      return { ...proposalData }
  }
};

export enum IProposalActions {
  SET_CONTRACT_ADDR = "SET_CONTRACT_ADDR",
  SET_PROPOSAL_LIST = "SET_PROPOSAL_LIST",
  SET_SELECTED_PROPOSAL = "SET_SELECTED_PROPOSAL"
};

export const initProposalData: IProposalData = {
  contractAddr: '',
  proposalList: [],
  selectedProposal: null,
};