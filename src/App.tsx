import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Portfolio from './pages/Portfolio';
import CompanyIntro from './pages/CompanyIntro';
import DirectorGreeting from './pages/DirectorGreeting';
import StaffIntro from './pages/StaffIntro';
import CommercialGuidelines from './pages/CommercialGuidelines';
import Consultation from './pages/Consultation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Portfolio />} />
          <Route path="about/company" element={<CompanyIntro />} />
          <Route path="about/director" element={<DirectorGreeting />} />
          <Route path="about/staff" element={<StaffIntro />} />
          <Route path="commercial/guidelines" element={<CommercialGuidelines />} />
          <Route path="consultation" element={<Consultation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
