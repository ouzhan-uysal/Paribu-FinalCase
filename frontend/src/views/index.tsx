import AppContainer from 'views/appContainer';
import AppFooter from 'components/AppFooter';
import AppHeader from 'components/AppHeader';
// import AppSidebar from '@app/core/AppSidebar';
import type { NextPage } from 'next'
import { GlobalWrapper } from 'styles'

const Home: NextPage = () => {
  return (
    <GlobalWrapper>
      <header id="pageHeader">
        <AppHeader />
      </header>
      <article id="pageContainer">
        <AppContainer />
      </article>
      {/* <nav id="pageSidebar">
        <AppSidebar />
      </nav> */}
      <footer id="pageFooter">
        <AppFooter />
      </footer>
    </GlobalWrapper>
  );
};

export default Home;
