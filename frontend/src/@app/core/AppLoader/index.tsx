import { AppLoaderWrapper } from './style';

const AppLoader = () => {
  return (
    <AppLoaderWrapper>
      <div className='loaderSpin'>
        <span className='loaderDot loaderDotSpin'>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </AppLoaderWrapper>
  );
};

export default AppLoader;
