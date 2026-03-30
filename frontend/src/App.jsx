import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Accounts from "./pages/Wallet";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import TransactionsPage from "./pages/TransactionHistory";
import Settings from "./pages/Settings";
import OverviewPage from "./pages/OverviewPage";
import Transfer from "./pages/Transfer";
import AnalyticsPage from "./pages/Analytics";
import ProtectedRoute from "./components/protectedRoutes";
import LoadingProvider from "../context/LoadingProvider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          // Global style for all toasts
          style: {
            background: "#1e293b", 
            color: "#f8fafc", 
            border: "1px solid rgba(99, 102, 241, 0.2)", 
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#6366f1", 
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", 
              secondary: "#fff",
            },
            style: {
              border: "1px solid rgba(239, 68, 68, 0.2)", 
            },
          },
        }}

        
      />
      <LoadingProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Private Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<OverviewPage />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="transactions" element={<TransactionsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="wallets" element={<Accounts />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </LoadingProvider>
    </>
  );
}

export default App;
