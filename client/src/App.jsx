import { Route, Routes, Navigate } from "react-router";
import { Layout } from "./components/pages/layout";
import LandingPage from "./components/pages";
import AdminLayout from "./components/pages/admin/layout";
import Dashboard from "./components/pages/admin/dashboard";
import About from "./components/pages/about";
import Login from "./components/pages/auth/login";
import Contact from "./components/pages/contact";
import ForgotPassword from "./components/pages/auth/forgot-password";
import ResetPassword from "./components/pages/auth/reset-password";
import ChooseRegister from "./components/pages/auth/register/choose";
import PetOwnerSignUp from "./components/pages/auth/register/pet-owner";
import FosterSignUp from "./components/pages/auth/register/foster";
import AdopterSignUp from "./components/pages/auth/register/adopter";
import RescueShelterSignUp from "./components/pages/auth/register/rescue-shelter";
import PetShopSignUp from "./components/pages/auth/register/pet-shop";
import HomePage from "./components/pages/pet-owner/home";
import PetOwnerProfile from "./components/pages/pet-owner/profile";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import { useAuth } from "./hooks/auth";
import TermsOfService from "./components/pages/TermsOfService";
import AboutPrivacy from "./components/pages/AboutPrivacy";
import FAQ from "./components/pages/FAQ";
import LogoutPrompt from "./components/pages/auth/LogoutPrompt";
import AdminProfilePage from "./components/pages/admin/profile"; // Import AdminProfilePage

function App() {
  const { isAuthenticated, user, isLoading } = useAuth();

  // if (isLoading) {
  //   return <div>Loading...</div>; // Or a loading spinner
  // }

  const isPetOwner = user?.role === "pet_owner";

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            isAuthenticated && isPetOwner ? (
              <HomePage />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated && isPetOwner ? (
              <HomePage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout-prompt" element={<LogoutPrompt />} />
        <Route path="/register">
          <Route index element={<ChooseRegister />} />
          <Route path="pet-owner" element={<PetOwnerSignUp />} />
          <Route path="foster" element={<FosterSignUp />} />
          <Route path="adopter" element={<AdopterSignUp />} />
          <Route path="rescue-shelter" element={<RescueShelterSignUp />} />
          <Route path="pet-shop" element={<PetShopSignUp />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Added :token */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<ProtectedRoute><PetOwnerProfile /></ProtectedRoute>} />

        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/about-privacy" element={<AboutPrivacy />} />
        <Route path="/faq" element={<FAQ />} />

      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<AdminProfilePage />} /> {/* Added Admin Profile route */}
      </Route>
    </Routes>
  );
}

export default App;
