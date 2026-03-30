import Overview from "../pages/Overview";
import Layout from "../layouts/Layout";
import Mobileheader from "../components/Mobileheader";
import OverviewSkeleton from "../Skeletons/OverviewSkeleton";

const OverviewPage = () => {
  return (
    <>
      <div className="md:hidden sticky top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-lg">
        <Mobileheader />
      </div>
      <Layout skeleton={<OverviewSkeleton />}>
        <Overview />
      </Layout>
    </>
  );
};

export default OverviewPage;
