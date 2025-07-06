import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import AboutUs from "./pages/AboutUs/AboutUs";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Login from "./pages/Login/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import FAQ from "./pages/FAQ/FAQ";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import DashboardView from "./Components/Dashboard/sections/DashboardView/DashboardView";
import DashboardLayout from "./Components/Dashboard/Dashboard";
import UserCvView from "./Components/Dashboard/sections/UserCvView/UserCvView";
import FindJobView from "./Components/Dashboard/sections/FindJobView/FindJobView";
import ExploreTalentView from "./Components/Dashboard/sections/ExploreTalentView/ExploreTalentView";
import PaymentView from "./Components/Dashboard/sections/PaymentView/PaymentView";
import SupportView from "./Components/Dashboard/sections/SupportView/SupportView";
import SettingsView from "./Components/Dashboard/sections/SettingsView/SettingsView";
import ResetPasswordView from "./Components/Dashboard/sections/ResetPasswordView/ResetPasswordView";
import CloseAccountView from "./Components/Dashboard/sections/CloseAccountView/CloseAccountView";
import VerifyForm from "./pages/Verify/VerifyForm";
import UserBioForm from "./Components/Dashboard/sections/UserCvView/UserBioForm";
import ShareDashboard from "./Components/Dashboard/sections/DashboardView/ShareDashboard";
import { ToastContainer } from "react-toastify";
import ForgotPasswordInstructions from "./pages/ForgotPassword/ForgotPasswordInstructions";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import { clearAutoLogout, setupAutoLogout } from "./utils/tokenManager";
import { useEffect } from "react";
// import RecommendedJob from "./Components/Dashboard/sections/FindJobView/Recommended/RecommendedJob";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      setupAutoLogout(user.token, () => {
        alert("Your session has expired.");
        clearAutoLogout();
        localStorage.clear();
        navigate("/login");
      });
    }
  }, []);

  return (
    <div className="app">
      <ToastContainer aria-label={undefined} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordInstructions />}
        />
        <Route path="/forgot-password/reset" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyForm />} />
        <Route path="/verify/:token" element={<VerifyForm />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="share/dashboard/:id" element={<ShareDashboard />} />
        <Route path="explore-talent" element={<ExploreTalentView />} />

        {/* Protected Dashboard Routes */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardView />} />
          <Route path="user-cv" element={<UserCvView />} />
          <Route path="user-bio" element={<UserBioForm />} />
          <Route path="find-job" element={<FindJobView />} />
          {/* <Route path="find-job" element={<FindJobView />} >
            <Route path="recommended" element={<RecommendedJob />} />
          </Route> */}
          <Route path="explore-talent" element={<ExploreTalentView />} />
          <Route path="payment" element={<PaymentView />} />
          <Route path="support" element={<SupportView />} />
          <Route path="settings" element={<SettingsView />} />
          <Route path="settings/close-account" element={<CloseAccountView />} />
          <Route
            path="settings/reset-password"
            element={<ResetPasswordView />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
