import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '@app/utility/createEmotionCache';
import lightTheme from '@app/utility/theme/lightTheme';
import darkTheme from '@app/utility/theme/darkTheme';
import 'bootstrap/dist/css/bootstrap.css'
import { AuthContextProvider } from 'contexts/authContext';
import { ProposalContextProvider } from 'contexts/proposalContext';

const clientSideEmotionCache = createEmotionCache();

interface ICustomAppProps extends AppProps {
  emotionCache: any;
};

const MyApp = (props: ICustomAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme || lightTheme}>
        <CssBaseline />
        <AuthContextProvider>
          <ProposalContextProvider>
            <Component {...pageProps} />
          </ProposalContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};


export default MyApp;