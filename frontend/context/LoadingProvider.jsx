import { useState } from "react";
import LoadingContext from "./LoadingContext";

const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = () => setLoadingCount((c) => c + 1);
  const stopLoading = () => setLoadingCount((c) => c - 1);

  const loading = loadingCount > 0;

  return (
    <LoadingContext.Provider
      value={{ loading, startLoading, stopLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;