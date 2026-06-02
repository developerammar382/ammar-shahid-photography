import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdminProvider } from "@/context/AdminContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import AlbumDetail from "@/pages/AlbumDetail";
import ClientLogin from "@/pages/ClientLogin";
import ClientDelivery from "@/pages/ClientDelivery";
import ClientProofing from "@/pages/ClientProofing";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Services from "@/pages/Services";
import Booking from "@/pages/Booking";
import Press from "@/pages/Press";
import FAQ from "@/pages/FAQ";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminOverview from "@/pages/admin/AdminOverview";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminServices from "@/pages/admin/AdminServices";
import AdminClients from "@/pages/admin/AdminClients";
import AdminPortfolio from "@/pages/admin/AdminPortfolio";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminSettings from "@/pages/admin/AdminSettings";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isClientPage = pathname.startsWith("/client/");
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:albumId" element={<AlbumDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/journal" element={<Blog />} />
          <Route path="/journal/:slug" element={<BlogPost />} />
          <Route path="/press" element={<Press />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/client" element={<ClientLogin />} />
          <Route path="/client/:albumId" element={<ClientDelivery />} />
          <Route path="/client/:albumId/proof" element={<ClientProofing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isClientPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppLayout />
        </BrowserRouter>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
