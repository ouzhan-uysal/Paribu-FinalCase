import { FC, createContext, useMemo } from "react";
import { initProposalData, proposalReducer } from "reducers/proposalReducer";
import { IProposalContextProps, IProposalContextProviderProps } from "types/proposal.interface";
import { useImmerReducer } from "use-immer";

export const ProposalContext = createContext<IProposalContextProps>({} as IProposalContextProps);

export const ProposalContextProvider: FC<IProposalContextProviderProps> = ({ children }) => {
  const [proposalData, proposalDispatch] = useImmerReducer(proposalReducer, initProposalData);

  const value = useMemo(
    () => ({
      proposalData,
      proposalDispatch,
    }),
    [proposalData, proposalDispatch],
  );
  // return <ProposalContext.Provider value={ value }> { children } </ProposalContext.Provider>;
  return <ProposalContext.Provider value={value}>{children}</ProposalContext.Provider>
}
