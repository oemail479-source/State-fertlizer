import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import FloatingVisitor from './components/layout/FloatingVisitor';

// Public Pages
import { Home } from './pages/public/Home';
import { Products } from './pages/public/Products';
import { CartCheckout } from './pages/public/CartCheckout';
import { OrderTracking } from './pages/public/OrderTracking';
import { CircuitBungalows } from './pages/public/CircuitBungalows';
import { Procurement } from './pages/public/Procurement';
import { FertilizerPrices } from './pages/public/FertilizerPrices';
import { InquiryPage } from './pages/public/Inquiry';
import { TestingLab, RTISection } from './pages/public/OtherPages';
import { AboutUs, VacanciesPage, FAQPage, GalleryPage, SiteMapPage } from './pages/public/PublicContent';
import { ContactUs } from './pages/public/ContactUs';
import { GlobalSearch } from './pages/public/GlobalSearch';
import { AdminLogin } from './pages/public/AdminLogin';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { BookingManagement } from './pages/admin/BookingManagement';
import { OrderManagement } from './pages/admin/OrderManagement';
import { ProcurementManagement } from './pages/admin/ProcurementManagement';
import { InquiryManagement } from './pages/admin/InquiryManagement';
import { IntegrationsManagement } from './pages/admin/IntegrationsManagement';
import { ReportsAudit } from './pages/admin/ReportsAudit';
import { GalleryManagement } from './pages/admin/GalleryManagement';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <a href="#main-content" className="sr-only focus:not-sr-only px-4 py-2">Skip to content</a>
      <Header />
      <FloatingVisitor />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Website Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="products" element={<Products />} />
                <Route path="cart" element={<CartCheckout />} />
                <Route path="order-tracking" element={<OrderTracking />} />
                <Route path="circuit-bungalows" element={<CircuitBungalows />} />
                <Route path="procurement" element={<Procurement />} />
                <Route path="fertilizer-prices" element={<FertilizerPrices />} />
                <Route path="testing-lab" element={<TestingLab />} />
                <Route path="news" element={<FAQPage />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="rti" element={<RTISection />} />
                <Route path="vacancies" element={<VacanciesPage />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="sitemap" element={<SiteMapPage />} />
                <Route path="search" element={<GlobalSearch />} />
              </Route>

              {/* Admin Portal Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="bookings" element={<BookingManagement />} />
                <Route path="tenders" element={<ProcurementManagement />} />
                <Route path="inquiries" element={<InquiryManagement />} />
                <Route path="integrations" element={<IntegrationsManagement />} />
                <Route path="reports" element={<ReportsAudit />} />
                <Route path="gallery" element={<GalleryManagement />} />
                <Route path="users" element={<ReportsAudit />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
            </Routes>
          </Router>
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
