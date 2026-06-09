import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import DonationDashboard from "./pages/DonationDashboard";
import ScrollToTop from "./components/ScrollToTop";
import { initLenis, destroyLenis } from "./lib/lenis";

function TitleHandler() {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const brand = t("footer.brand_name");
    if (location.pathname === "/courses") {
      document.title = `${t("nav.courses")} | ${brand}`;
    } else if (location.pathname.startsWith("/courses/")) {
      document.title = `${t("nav.courses")} | ${brand}`;
    } else if (location.pathname === "/donate") {
      document.title = `${t("nav.donate")} | ${brand}`;
    } else {
      document.title = brand;
    }
  }, [location, t]);

  return null;
}

function App() {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <Router>
      <TitleHandler />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/donate" element={<DonationDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
