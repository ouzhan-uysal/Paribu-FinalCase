import { BigNumber } from "ethers";
import { ReactNode } from "react";

export interface IProposalContextProps {
  proposalData: IProposalData;
  proposalDispatch: React.Dispatch<{
    type: string;
    payload: unknown;
  }>;
};

export interface IProposalContextProviderProps {
  children: ReactNode;
};

export interface IProposalData {
  contractAddr: string;
  proposalList: any[];
  selectedProposal: {
    description: string;
    id: BigNumber,
    options: string[];
  } | null;
};