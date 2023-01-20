import { AppContainerWrapper } from "./style";
import { ethers, Signer } from "ethers";
import { abi } from "contracts";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "contexts/authContext";
import { ProposalContext } from "contexts/proposalContext";
import { IProposalActions } from "reducers/proposalReducer";
import Image from "next/image";
import SelectProposalLogo from "assets/svg/undraw_selection_re_ycpo.svg";

const AppContainer = () => {
  const { account } = useContext(AuthContext);
  const { proposalData, proposalDispatch } = useContext(ProposalContext);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const getProposals = async () => {
    const { ethereum } = window as any;
    if (!account) {
      return alert("Login")
    }
    if (ethereum && ethers.utils.isAddress(proposalData.contractAddr)) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer: Signer = provider.getSigner();
      const DaoContract = new ethers.Contract(process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDR as string, abi, signer);
      const getAllProposals = await DaoContract.getAllProposals(proposalData.contractAddr);
      console.log("getAllProposals: ", getAllProposals);
      proposalDispatch({
        type: IProposalActions.SET_PROPOSAL_LIST,
        payload: getAllProposals
      })
    };
  };
  return (
    <AppContainerWrapper>
      <div className="pContainer">
        <div className="pSide">
          <ul className="proposalContainer">
            {proposalData.proposalList.map((elm, index) => (
              <li className={`proposal ${proposalData.selectedProposal === elm && 'selected'}`} key={index}
                onClick={() => proposalDispatch({
                  type: IProposalActions.SET_SELECTED_PROPOSAL,
                  payload: elm
                })}
              >{elm.description}</li>
            ))}
          </ul>
          <div className="createContainer">
            <Button variant="outlined" onClick={() => setIsCreating(!isCreating)}>
              {isCreating ? 'Close Proposal Creation Window' : 'Create Proposal'}
            </Button>
          </div>
        </div>
        <div className="pWindow">
          {isCreating
            ? <div className="creatingWindow"></div>
            : proposalData.selectedProposal
              ? <></>
              : <Image src={SelectProposalLogo} alt="select proposal" />
          }
          <div className="contractAddrContainer">
            <TextField
              label="Contract Address..."
              variant="outlined"
              value={proposalData.contractAddr}
              onChange={(e) => proposalDispatch({
                type: IProposalActions.SET_CONTRACT_ADDR,
                payload: e.target.value
              })}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => getProposals()}
            >Get Proposals</Button>
          </div>
          <div className="proposalContent">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">{proposalData.selectedProposal?.description}</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {proposalData.selectedProposal?.options.map((elm, index) => (
                  <FormControlLabel value={elm} control={<Radio />} label={elm} key={index} />
                ))}
              </RadioGroup>
            </FormControl>
            <div className="proposalBtns">
              <Button variant="outlined">Cast Vote</Button>
              <Button variant="outlined">Get Votes</Button>
            </div>
          </div>
        </div>
      </div>
    </AppContainerWrapper>
  )
}

export default AppContainer;