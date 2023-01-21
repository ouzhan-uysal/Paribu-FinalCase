import { AppContainerWrapper } from "./style";
import { ContractInterface, ethers, Signer } from "ethers";
import { abi } from "contracts";
import { Button, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "contexts/authContext";
import { ProposalContext } from "contexts/proposalContext";
import { IProposalActions } from "reducers/proposalReducer";
import Image from "next/image";
import SelectProposalLogo from "assets/svg/undraw_selection_re_ycpo.svg";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AppLoader from "@app/core/AppLoader";
import Head from "next/head";

const AppContainer = () => {
  const { account } = useContext(AuthContext);
  const { proposalData, proposalDispatch } = useContext(ProposalContext);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProposals = async () => {
    const { ethereum } = window as any;
    if (!account) {
      return alert("Connect to wallet!")
    }
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const createProposal = async () => {
    const { ethereum } = window as any;
    if (!account) {
      return alert("Connect to wallet!");
    }
    setIsLoading(true);
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer: Signer = provider.getSigner();
      const DaoContract = new ethers.Contract(process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDR as string, abi, signer);
      const createProposal = await DaoContract.createProposal(token, description, options)
        .then(async (res: any) => await res.wait()).catch((err: Error) => console.error(err));
      console.log(createProposal);
      setIsCreating(false);
      getProposals();
    }
  };

  const [token, setToken] = useState<ContractInterface>('');
  const [description, setDescription] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['']);
  const addOption = () => {
    setOptions([...options, '']);
  };
  const updateOption = (index: number, newText: string) => {
    const tempArr = options.map((elm, i) => {
      if (i === index) {
        return newText;
      }
      return elm;
    })
    setOptions(tempArr);
  }
  const removeOption = (index: number) => {
    const tempArr = options.filter((elm, i) => i !== index);
    setOptions(tempArr);
  };
  return (
    <AppContainerWrapper>
      {isLoading && <AppLoader />}
      <Head>
        <title>Paribu - Final Case</title>
      </Head>
      <div className="pContainer">
        <div className="pSide">
          <ul className="proposalContainer">
            {proposalData.proposalList.map((elm, index) => (
              <li className={`proposal ${proposalData.selectedProposal === elm && 'selected'}`} key={index}
                onClick={() => {
                  if (proposalData.selectedProposal === elm) {
                    return proposalDispatch({
                      type: IProposalActions.SET_SELECTED_PROPOSAL,
                      payload: null
                    })
                  }
                  return proposalDispatch({
                    type: IProposalActions.SET_SELECTED_PROPOSAL,
                    payload: elm
                  })
                }}
              >{elm.description}</li>
            ))}
          </ul>
          <div className="createContainer">
            <Button variant="outlined" onClick={() => setIsCreating(!isCreating)}>
              {isCreating ? 'Close Creation' : 'Create Proposal'}
            </Button>
          </div>
        </div>
        <div className="pWindow">
          {(!isCreating && !proposalData.selectedProposal) ?
            <div className="contractAddrContainer">
              <div className="row">
                <div className="col-lg-8">
                  <TextField
                    label="Contract Address"
                    variant="outlined"
                    value={proposalData.contractAddr}
                    onChange={(e) => proposalDispatch({
                      type: IProposalActions.SET_CONTRACT_ADDR,
                      payload: e.target.value
                    })}
                  />
                </div>
                <div className="col-lg-4">
                  <Button
                    variant="outlined"
                    onClick={() => getProposals()}
                  >Get Proposals</Button>
                </div>
              </div>
              <Image src={SelectProposalLogo} alt="select proposal" layout="responsive" height={200} />
            </div>
            : isCreating
              ? <div className="creatingWindow">
                <div className="row">
                  <div className="col-lg-12 my-2">
                    <TextField
                      label="Proposal Token"
                      variant="outlined"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12 my-2">
                    <TextField
                      label="Proposal Description"
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12 my-2">
                    {options.map((elm, index) => (
                      <FormControl fullWidth className="my-2" variant="outlined" key={index}>
                        <InputLabel>Option {index + 1}</InputLabel>
                        <OutlinedInput
                          value={elm}
                          onChange={(e) => updateOption(index, e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => removeOption(index)}
                                edge="end"
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                    ))}
                  </div>
                  <div className="col-lg-12 my-2">
                    <Button variant="outlined" onClick={addOption}>Add Option</Button>
                  </div>
                  <div className="col-lg-12 my-2 text-end">
                    <Button variant="outlined" onClick={createProposal}>Create Proposal</Button>
                  </div>
                </div>
              </div>
              : <div className="proposalContent">
                <Typography variant="h5">{proposalData.selectedProposal?.description}</Typography>
                <FormControl>
                  <FormLabel>Options</FormLabel>
                  <RadioGroup
                    row
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
          }
        </div>
      </div>
    </AppContainerWrapper>
  )
}

export default AppContainer;