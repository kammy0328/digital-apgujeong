import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Portfolio from "./pages/Portfolio";
import CompanyIntro from "./pages/CompanyIntro";
import Consultation from "./pages/Consultation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Portfolio />} />
          <Route path="about/company" element={<CompanyIntro />} />
          <Route
            path="about/director"
            element={<Navigate to="/about/company" replace />}
          />
          <Route
            path="about/staff"
            element={<Navigate to="/about/company" replace />}
          />
          <Route
            path="commercial/guidelines"
            element={<Navigate to="/" replace />}
          />
          <Route path="consultation" element={<Consultation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
