import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Portfolio from "./pages/Portfolio";
import { Beauty, Cleanup } from "./pages/Services";
import Consultation from "./pages/Consultation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Portfolio />} />
          <Route path="beauty" element={<Beauty />} />
          <Route path="cleanup" element={<Cleanup />} />
          <Route path="contact" element={<Consultation />} />
          <Route path="consultation" element={<Navigate to="/contact" replace />} />
          <Route path="about/*" element={<Navigate to="/beauty" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
