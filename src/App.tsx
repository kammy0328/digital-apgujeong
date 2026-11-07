import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Company from "./pages/Company";
import Portfolio from "./pages/Portfolio";
import { Beauty, Cleanup } from "./pages/Services";
import Consultation from "./pages/Consultation";
import { LangProvider } from "./i18n";

export default function App() {
  return (
    <LangProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="work" element={<Portfolio />} />
          <Route path="service" element={<Company />} />
          <Route path="beauty" element={<Beauty />} />
          <Route path="cleanup" element={<Cleanup />} />
          <Route path="contact" element={<Consultation />} />
          <Route path="consultation" element={<Navigate to="/contact" replace />} />
          <Route path="about/*" element={<Navigate to="/beauty" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </LangProvider>
  );
}
