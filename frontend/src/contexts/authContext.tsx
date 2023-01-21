import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export interface IAuthContextProps {
  account: string | null;
  setAccount?(...args: unknown[]): unknown;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);
interface IAuthContextProviderProps {
  children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  // useEffect(() => {
  //   if (account) {
  //     localStorage.setItem('paribu_authUser', account);
  //   }
  // }, [account]);

  const value = useMemo(
    () => ({
      account,
      setAccount,
    }),
    [account],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
