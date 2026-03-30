import useLoading from "../components/hooks/useLoading";

const Layout = ({ children, skeleton }) => {
  const { loading } = useLoading();

  return <div className="pb-10">{loading ? skeleton : children}</div>;
};

export default Layout;
