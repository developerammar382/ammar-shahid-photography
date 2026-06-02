import { createContext, useContext, useState, useCallback, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { BlogPost, Booking, ClientAlbum, ServicePackage, Album } from "@/data/index";
import { BLOG_POSTS, BOOKINGS, CLIENT_ALBUMS, SERVICES, PORTFOLIO_ALBUMS } from "@/data/index";

interface AdminContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  posts: BlogPost[];
  setPosts: Dispatch<SetStateAction<BlogPost[]>>;
  bookings: Booking[];
  setBookings: Dispatch<SetStateAction<Booking[]>>;
  clientAlbums: ClientAlbum[];
  setClientAlbums: Dispatch<SetStateAction<ClientAlbum[]>>;
  services: ServicePackage[];
  setServices: Dispatch<SetStateAction<ServicePackage[]>>;
  portfolioAlbums: Album[];
  setPortfolioAlbums: Dispatch<SetStateAction<Album[]>>;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);
  const [clientAlbums, setClientAlbums] = useState<ClientAlbum[]>(CLIENT_ALBUMS);
  const [services, setServices] = useState<ServicePackage[]>(SERVICES);
  const [portfolioAlbums, setPortfolioAlbums] = useState<Album[]>(PORTFOLIO_ALBUMS);

  const login = useCallback((username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setIsAuthenticated(false), []);

  const updateBookingStatus = useCallback((id: string, status: Booking["status"]) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  }, []);

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout,
      posts, setPosts,
      bookings, setBookings,
      clientAlbums, setClientAlbums,
      services, setServices,
      portfolioAlbums, setPortfolioAlbums,
      updateBookingStatus,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
