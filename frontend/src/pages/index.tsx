import AppLoader from "@app/core/AppLoader";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ViewHome = dynamic(() => import('views'), {
  ssr: false
});

const Home = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <ViewHome />
    </Suspense>
  );
};

export default Home;