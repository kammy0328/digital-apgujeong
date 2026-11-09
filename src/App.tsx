import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Company from "./pages/Company";
import Portfolio from "./pages/Portfolio";
import Consultation from "./pages/Consultation";
import NotFound from "./pages/NotFound";
import { LangProvider, localizedPath, useLang } from "./i18n";
function Legacy({ to }: { to: string }) {
  const { lang } = useLang();
  return <Navigate to={localizedPath(to, lang)} replace />;
}
export function SiteRoutes() {
  return (
    <LangProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/work" element={<Portfolio />} />
          <Route path="/service" element={<Company />} />
          <Route path="/contact" element={<Consultation />} />
          <Route path="/beauty" element={<Legacy to="/service#beauty" />} />
          <Route path="/cleanup" element={<Legacy to="/service#cleanup" />} />
          <Route path="/consultation" element={<Legacy to="/contact" />} />
          <Route path="/about/*" element={<Legacy to="/service" />} />
          <Route path="/en" element={<Landing />} />
          <Route path="/en/work" element={<Portfolio />} />
          <Route path="/en/service" element={<Company />} />
          <Route path="/en/contact" element={<Consultation />} />
          <Route path="/en/beauty" element={<Legacy to="/service#beauty" />} />
          <Route
            path="/en/cleanup"
            element={<Legacy to="/service#cleanup" />}
          />
          <Route path="/en/consultation" element={<Legacy to="/contact" />} />
          <Route path="/en/about/*" element={<Legacy to="/service" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LangProvider>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <SiteRoutes />
    </BrowserRouter>
  );
}
