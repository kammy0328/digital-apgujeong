import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CompanyIntro from './pages/CompanyIntro';
import DirectorGreeting from './pages/DirectorGreeting';
import StaffIntro from './pages/StaffIntro';
import CommercialProcedures from './pages/CommercialProcedures';
import CommercialReviews from './pages/CommercialReviews';
import CommercialGuidelines from './pages/CommercialGuidelines';
import Consultation from './pages/Consultation';
import Careers from './pages/Careers';
import Event from './pages/Event';
import WeddingProcedures from './pages/WeddingProcedures';
import WeddingReviews from './pages/WeddingReviews';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about/company" element={<CompanyIntro />} />
          <Route path="about/director" element={<DirectorGreeting />} />
          <Route path="about/staff" element={<StaffIntro />} />
          <Route path="commercial/procedures" element={<CommercialProcedures />} />
          <Route path="commercial/reviews" element={<CommercialReviews />} />
          <Route path="commercial/guidelines" element={<CommercialGuidelines />} />
          <Route path="wedding/procedures" element={<WeddingProcedures />} />
          <Route path="wedding/reviews" element={<WeddingReviews />} />
          <Route path="consultation" element={<Consultation />} />
          <Route path="careers" element={<Careers />} />
          <Route path="event" element={<Event />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
