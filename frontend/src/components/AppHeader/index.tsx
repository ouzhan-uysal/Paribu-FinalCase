import { Button } from "@mui/material";
import { AppHeaderWrapper } from "./style";
import Image from "next/image";
import { useContext, useEffect } from "react";
import AuthContext from "contexts/authContext";

const AppHeader = () => {
  const { account, setAccount } = useContext(AuthContext);

  useEffect(() => {
    const { ethereum } = window as any;
    if (setAccount) {
      setAccount(ethereum.selectedAddress);
    };
  }, [setAccount]);

  const connectMetamask = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length > 0) {
      if (setAccount) {
        setAccount(accounts[0]);
      }
    }
  };

  return (
    <AppHeaderWrapper>
      <div className="row align-items-center">
        <div className="col-lg-6 text-start">
          <Image
            src={"data:image/png;base64,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"}
            alt="paribu-logo"
            height={32}
            width={150}
          />
        </div>
        <div className="col-lg-6 text-end">
          <Button className="fw-bold text-light border border-light rounded-pill px-4"
            onClick={() => connectMetamask()}
          >{account ? `${account.slice(0, 4)}...${account.slice(-4)}` : 'Connect'}</Button>
        </div>
      </div>
    </AppHeaderWrapper>
  )
}

export default AppHeader;