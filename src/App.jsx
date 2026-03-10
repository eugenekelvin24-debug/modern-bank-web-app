import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Wallets from "./components/Wallet";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import Transactions from "./components/Transactions";
import Settings from "./pages/Settings";
import Overview from "./components/Overview";
import Transfer from "./components/Transfer";
import AnalyticsPage from "./components/Analys";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Private Routes wrapped in MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* This renders Overview when the path is exactly "/" */}
          <Route index element={<Overview />} /> 
          
          {/* Optional: if you also want /overview to work */}
          <Route path="overview" element={<Overview />} />
          
          <Route path="wallets" element={<Wallets />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="settings" element={<Settings />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="analys"   element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
