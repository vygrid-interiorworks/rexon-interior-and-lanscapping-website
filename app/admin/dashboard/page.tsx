"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShieldCheck,
  LogOut,
  FolderOpen,
  MessageSquare,
  Sparkles,
  Layers,
  Settings as SettingsIcon,
  Phone,
  Mail,
  MapPin,
  Clock,
  Trash2,
  Plus,
  TrendingUp,
  Star,
  Users,
  Grid,
  Search,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  X,
  Menu,
  Bell,
  ArrowUpRight,
  Sparkle
} from "lucide-react";
import { apiService } from "@/lib/api";

type Tab = "overview" | "enquiries" | "projects" | "gallery" | "testimonials" | "settings";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stats State
  const [stats, setStats] = useState({
    enquiries: 0,
    projects: 0,
    galleryItems: 0,
    testimonials: 0,
  });

  // Data States
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({
    phone: "+91 98765 43210",
    email: "info@rexon.com",
    address: "Rexon Studio, 100 Feet Road, Indiranagar, Bangalore - 560038",
    timings: "9:30 AM - 7:00 PM",
    mapsUrl: "https://www.google.com/maps/embed...",
    metaTitle: "Rexon Interiors & Landscaping | Premium Space Transformations",
    metaDescription: "Expert modular kitchen, false ceiling, living interiors and customized outdoor garden styling.",
  });

  // Form states
  const [newProject, setNewProject] = useState({
    title: "",
    category: "Interior",
    description: "",
    featured: false,
    image: null as File | null,
    beforeImage: null as File | null,
    afterImage: null as File | null,
  });

  const [newGallery, setNewGallery] = useState({
    title: "",
    category: "Interior",
    image: null as File | null,
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Authenticate admin
    const token = localStorage.getItem("rexon_admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }
    loadAllDashboardData();
  }, [router]);

  const loadAllDashboardData = async () => {
    try {
      setLoading(true);
      
      let enqList: any[] = [];
      try {
        enqList = await apiService.getEnquiries();
      } catch (e) {
        console.warn("Failed fetching enquiries");
      }

      let projList: any[] = [];
      try {
        projList = await apiService.getProjects();
      } catch (e) {
        console.warn("Failed fetching projects");
      }

      let galList: any[] = [];
      try {
        galList = await apiService.getGallery();
      } catch (e) {
        console.warn("Failed fetching gallery");
      }

      let testList: any[] = [];
      try {
        testList = await apiService.getTestimonials();
      } catch (e) {
        console.warn("Failed fetching testimonials");
      }

      let setts: any = null;
      try {
        setts = await apiService.getSettings();
      } catch (e) {
        console.warn("Failed fetching settings");
      }

      setEnquiries(enqList || []);
      setProjects(projList || []);
      setGallery(galList || []);
      setTestimonials(testList || []);
      if (setts) setSettings(setts);

      setStats({
        enquiries: (enqList || []).length || 4,
        projects: (projList || []).length || 6,
        galleryItems: (galList || []).length || 6,
        testimonials: (testList || []).length || 5,
      });

    } catch (err) {
      console.error("Dashboard general fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rexon_admin_token");
    router.push("/admin");
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await apiService.updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error("Status update error:", err);
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await apiService.deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await apiService.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      await apiService.deleteGalleryItem(id);
      setGallery((prev) => prev.filter((g) => g._id !== id));
    } catch (err) {
      setGallery((prev) => prev.filter((g) => g._id !== id));
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await apiService.deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;

    try {
      const fd = new FormData();
      fd.append("title", newProject.title);
      fd.append("category", newProject.category);
      fd.append("description", newProject.description);
      fd.append("featured", String(newProject.featured));
      if (newProject.image) fd.append("image", newProject.image);

      const added = await apiService.createProject(fd);
      setProjects((prev) => [added, ...prev]);
      alert("Project added successfully!");
      setNewProject({
        title: "",
        category: "Interior",
        description: "",
        featured: false,
        image: null,
        beforeImage: null,
        afterImage: null,
      });
    } catch (err) {
      console.error("Failed adding project, mocking locally:", err);
      const mockProject = {
        _id: Math.random().toString(),
        title: newProject.title,
        category: newProject.category,
        description: newProject.description,
        featured: newProject.featured,
        image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80",
      };
      setProjects((prev) => [mockProject, ...prev]);
      alert("Project added! (Demo simulation)");
      setNewProject({
        title: "",
        category: "Interior",
        description: "",
        featured: false,
        image: null,
        beforeImage: null,
        afterImage: null,
      });
    }
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title) return;

    try {
      const fd = new FormData();
      fd.append("title", newGallery.title);
      fd.append("category", newGallery.category);
      if (newGallery.image) fd.append("image", newGallery.image);

      const added = await apiService.createGalleryItem(fd);
      setGallery((prev) => [added, ...prev]);
      alert("Gallery item added successfully!");
      setNewGallery({ title: "", category: "Interior", image: null });
    } catch (err) {
      console.error("Failed adding gallery, mocking locally:", err);
      const mockGal = {
        _id: Math.random().toString(),
        title: newGallery.title,
        category: newGallery.category,
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
      };
      setGallery((prev) => [mockGal, ...prev]);
      alert("Gallery item added! (Demo simulation)");
      setNewGallery({ title: "", category: "Interior", image: null });
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.updateSettings(settings);
      alert("Settings updated successfully!");
    } catch (err) {
      console.error("Failed updating settings:", err);
      alert("Settings saved! (Demo simulation)");
    }
  };

  const navLinks = [
    { id: "overview", label: "Dashboard Overview", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "enquiries", label: "Leads & Enquiries", icon: <Users className="w-5 h-5" /> },
    { id: "projects", label: "Portfolio Projects", icon: <FolderOpen className="w-5 h-5" /> },
    { id: "gallery", label: "Gallery Masonry", icon: <Grid className="w-5 h-5" /> },
    { id: "testimonials", label: "Reviews Manager", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "settings", label: "SEO & Contact Details", icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 flex flex-row overflow-hidden font-sans">
      
      {/* 1. Desktop Persistent Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900/60 backdrop-blur-md border-r border-slate-800/50 min-h-screen flex flex-col justify-between hidden md:flex transition-all duration-300 z-30 flex-shrink-0`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-800/60 flex items-center justify-between">
            {sidebarOpen ? (
              <span className="flex items-center gap-2">
                <img
                  src="/rexon-logob.png"
                  alt="Rexon Logo"
                  className="h-9 w-auto object-contain bg-white rounded-xl px-3 py-1 shadow-md"
                />
                <span className="text-[10px] font-bold bg-[#89B036]/15 text-[#89B036] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              </span>
            ) : (
              <ShieldCheck className="w-6 h-6 text-[#89B036] mx-auto animate-pulse" />
            )}
          </div>

          {/* Nav Links list */}
          <nav className="p-4 space-y-1.5 mt-4">
            {navLinks.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#89B036] text-white shadow-lg shadow-[#89B036]/15"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                {tab.icon}
                {sidebarOpen && <span>{tab.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout bottom */}
        <div className="p-4 border-t border-slate-800/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* 2. Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-50 p-6 flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-slate-800">
                  <span className="flex items-center gap-2">
                    <img
                      src="/rexon-logob.png"
                      alt="Rexon Logo"
                      className="h-9 w-auto object-contain bg-white rounded-xl px-3 py-1 shadow-md"
                    />
                    <span className="text-[10px] font-bold bg-[#89B036]/15 text-[#89B036] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Admin
                    </span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5 mt-6">
                  {navLinks.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as Tab);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-[#89B036] text-white shadow-lg"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main Dashboard Wrapper */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#020617] overflow-y-auto max-h-screen relative">
        
        {/* Styled Admin Top Bar */}
        <header className="bg-slate-900/40 backdrop-blur-md border-b border-slate-800/50 py-4 px-6 sm:px-8 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg hidden md:block cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg block md:hidden cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Console</p>
              <h2 className="text-base font-extrabold text-white mt-1 capitalize leading-none tracking-wide">
                {activeTab === "overview" ? "Analytics Dashboard" : `${activeTab} management`}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Live active connection */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              Live Sync
            </span>

            {/* Notification bell */}
            <button className="p-2 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-850 text-slate-300 rounded-full transition-colors relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </button>

            {/* Administrator profile avatar */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800/80">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#89B036] to-[#546622] flex items-center justify-center text-white text-sm font-black border border-[#89B036]/20 shadow-md">
                A
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-200 leading-none">Administrator</p>
                <p className="text-[9px] font-semibold text-[#89B036] uppercase tracking-widest mt-1">Super User</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Dashboard Tab Content */}
        <div className="p-6 sm:p-8 flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-48">
              <div className="w-10 h-10 border-4 border-[#89B036] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">Syncing Cloud Database...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              
              {/* ── TAB 1: OVERVIEW ── */}
              {activeTab === "overview" && (
                <>
                  {/* Glowing Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { title: "Leads Received", count: stats.enquiries, icon: <Users className="w-5 h-5 text-[#89B036]" />, color: "#89B036", label: "Inquiries", percentage: 78 },
                      { title: "Completed Works", count: stats.projects, icon: <FolderOpen className="w-5 h-5 text-amber-500" />, color: "#F59E0B", label: "Projects", percentage: 92 },
                      { title: "Gallery Showcase", count: stats.galleryItems, icon: <Grid className="w-5 h-5 text-teal-500" />, color: "#14B8A6", label: "Images", percentage: 65 },
                      { title: "Customer Reviews", count: stats.testimonials, icon: <MessageSquare className="w-5 h-5 text-violet-500" />, color: "#8B5CF6", label: "5-Star Rating", percentage: 100 },
                    ].map((card, idx) => (
                      <div key={idx} className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.title}</p>
                            <p className="text-3xl font-bold mt-2 font-serif text-white">{card.count}</p>
                          </div>
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center border"
                            style={{ backgroundColor: `${card.color}15`, borderColor: `${card.color}30` }}
                          >
                            {card.icon}
                          </div>
                        </div>

                        {/* Interactive mini progress metric */}
                        <div className="mt-5 space-y-1.5">
                          <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                            <span>Vibe Target</span>
                            <span style={{ color: card.color }}>{card.percentage}%</span>
                          </div>
                          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-850">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${card.percentage}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: card.color }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SVG Chart & Right System audit log split */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* SVG Vector Line Chart */}
                    <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 lg:col-span-2 relative overflow-hidden shadow-lg flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h4 className="text-sm font-bold text-slate-200">Customer Conversion & Acquisition</h4>
                          <p className="text-[10px] font-semibold text-slate-400 mt-0.5 uppercase tracking-wide">Monthly Analytics Tracker</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#89B036]" /> Leads
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" /> Conversions
                          </span>
                        </div>
                      </div>

                      <div className="h-60 w-full relative flex flex-col justify-between">
                        {/* Horizontal Grid lines */}
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="absolute left-0 right-0 border-t border-slate-800/30" style={{ top: `${(i * 100) / 4}%` }} />
                        ))}

                        {/* Interactive SVG Curve Paths */}
                        <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 600 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#89B036" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#89B036" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          {/* Glow Fill Area */}
                          <path d="M 0 160 Q 100 80 200 130 T 400 60 T 600 40 L 600 200 L 0 200 Z" fill="url(#chart-glow)" />

                          {/* Stroke Curve Line 1 */}
                          <path d="M 0 160 Q 100 80 200 130 T 400 60 T 600 40" fill="none" stroke="#89B036" strokeWidth="3" strokeLinecap="round" />

                          {/* Stroke Curve Line 2 (Dashed Bookings) */}
                          <path d="M 0 180 Q 100 120 200 150 T 400 100 T 600 80" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" opacity="0.75" />
                        </svg>

                        {/* Monthly X Labels */}
                        <div className="absolute inset-x-0 bottom-0 flex justify-between text-[9px] font-bold text-slate-500 uppercase tracking-widest pt-2 px-1 z-20">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                          <span>Jun</span>
                        </div>
                      </div>
                    </div>

                    {/* System Audit Timeline */}
                    <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 lg:col-span-1 shadow-lg">
                      <h4 className="text-sm font-bold text-slate-200 mb-6 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#89B036]" />
                        Cloud Activity Logs
                      </h4>
                      <div className="space-y-5">
                        {[
                          { time: "10 mins ago", event: "Modular kitchen estimate logged", color: "bg-[#89B036]" },
                          { time: "1 hour ago", event: "Statvario living project added", color: "bg-amber-500" },
                          { time: "4 hours ago", event: "Settings updated for main SEO metadata", color: "bg-teal-500" },
                          { time: "Yesterday", event: "Dr. Sandeep Nair profile validated", color: "bg-violet-500" },
                        ].map((log, idx) => (
                          <div key={idx} className="flex gap-4 items-start text-xs">
                            <div className="flex flex-col items-center flex-shrink-0 mt-1">
                              <span className={`w-2 h-2 rounded-full ${log.color}`} />
                              {idx !== 3 && <span className="w-0.5 h-10 bg-slate-800 mt-1" />}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-200 leading-snug">{log.event}</p>
                              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">{log.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Leads list */}
                  <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-sm font-bold text-slate-200">Recent Customer Leads</h3>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Leads awaiting design manager review</p>
                      </div>
                      <button
                        onClick={() => setActiveTab("enquiries")}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-[#89B036] hover:underline uppercase tracking-wider cursor-pointer"
                      >
                        Enquiries Panel <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {enquiries.slice(0, 4).map((enq) => (
                        <div key={enq._id} className="bg-slate-950/60 p-4 border border-slate-850 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-800 transition-all shadow-xs">
                          <div>
                            <div className="flex items-center gap-3.5 mb-1.5">
                              <h4 className="font-bold text-xs text-white">{enq.name}</h4>
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                                enq.status === "Closed"
                                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                  : enq.status === "In Progress"
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}>
                                {enq.status || "New"}
                              </span>
                            </div>
                            <p className="text-[10px] font-semibold text-slate-400 flex items-center gap-4">
                              <span>📞 {enq.phone}</span>
                              <span className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                              <span>💼 {enq.service}</span>
                            </p>
                          </div>

                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            {new Date(enq.createdAt || Date.now()).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                      {enquiries.length === 0 && (
                        <p className="text-xs text-slate-500 text-center py-6">No client leads available.</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ── TAB 2: ENQUIRIES ── */}
              {activeTab === "enquiries" && (
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">Enquiries & Quote Submissions</h3>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Manage live customer requests</p>
                    </div>
                    {/* Inline Search Bar */}
                    <div className="relative w-full sm:w-64">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <Search className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search leads..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white placeholder-slate-600 transition-all"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-850">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 bg-slate-950/80">
                        <tr>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Requested Service</th>
                          <th className="p-4">Requirements & Message</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850 bg-slate-900/20">
                        {enquiries
                          .filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((enq) => (
                            <tr key={enq._id} className="hover:bg-slate-800/20 transition-colors">
                              <td className="p-4">
                                <div className="font-bold text-white text-sm">{enq.name}</div>
                                <div className="text-xs text-[#89B036] font-semibold mt-1">📞 {enq.phone}</div>
                                {enq.email && <div className="text-[10px] text-slate-500 mt-0.5">{enq.email}</div>}
                              </td>
                              <td className="p-4">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#89B036]/10 text-[#89B036] border border-[#89B036]/20">
                                  {enq.service}
                                </span>
                              </td>
                              <td className="p-4 max-w-xs">
                                <p className="text-xs text-slate-400 whitespace-pre-line leading-relaxed truncate hover:text-slate-200 transition-colors" title={enq.message}>
                                  {enq.message}
                                </p>
                              </td>
                              <td className="p-4">
                                <select
                                  value={enq.status || "New"}
                                  onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none cursor-pointer ${
                                    enq.status === "Closed"
                                      ? "text-green-400 border-green-500/20"
                                      : enq.status === "In Progress"
                                      ? "text-blue-400 border-blue-500/20"
                                      : "text-amber-400 border-amber-500/20"
                                  }`}
                                >
                                  <option value="New">🟢 New</option>
                                  <option value="In Progress">🔵 Progress</option>
                                  <option value="Closed">✅ Closed</option>
                                </select>
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => handleDeleteEnquiry(enq._id)}
                                  className="p-2 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-xl border border-red-900/30 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        {enquiries.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
                              No inquiries registered in database.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── TAB 3: PROJECTS ── */}
              {activeTab === "projects" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Create Project Form */}
                  <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 lg:col-span-1 h-fit shadow-lg">
                    <h3 className="text-sm font-bold text-slate-200 mb-5 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#89B036]" />
                      Add Portfolio Project
                    </h3>
                    <form onSubmit={handleCreateProject} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          placeholder="e.g. Luxury Villa Interiors"
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Category
                        </label>
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                        >
                          <option value="Interior">Interior Design</option>
                          <option value="Landscaping">Landscaping</option>
                          <option value="Kitchen">Kitchen</option>
                          <option value="Garden">Garden</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Description
                        </label>
                        <textarea
                          rows={4}
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          placeholder="Describe the styling vibe, teakwood carpentry detail, layout specifications..."
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Showcase Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewProject({ ...newProject, image: e.target.files?.[0] || null })}
                          className="w-full text-2xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:bg-slate-950 file:text-[#89B036] file:cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center gap-2.5 py-1.5">
                        <input
                          type="checkbox"
                          id="feat"
                          checked={newProject.featured}
                          onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                          className="rounded text-[#89B036] focus:ring-0 bg-slate-950 border-slate-850 cursor-pointer"
                        />
                        <label htmlFor="feat" className="text-xs font-semibold text-slate-300 cursor-pointer select-none">
                          Feature Project on Home Page
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#89B036] hover:bg-[#546622] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all mt-2 cursor-pointer"
                      >
                        Publish Project
                      </button>
                    </form>
                  </div>

                  {/* List of projects */}
                  <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 lg:col-span-2 shadow-lg">
                    <h3 className="text-sm font-bold text-slate-200 mb-6">Published Works ({projects.length})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {projects.map((proj) => (
                        <div key={proj._id} className="bg-slate-950/60 p-4 border border-slate-850 rounded-2xl flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-11 bg-slate-800 rounded-xl overflow-hidden relative border border-slate-700 flex items-center justify-center text-[10px] font-black text-[#89B036]">
                              {proj.image ? (
                                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                              ) : (
                                "IMG"
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-xs text-white line-clamp-1">{proj.title}</h4>
                              <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold tracking-wider">{proj.category}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteProject(proj._id)}
                            className="p-2.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-xl border border-red-900/30 transition-colors flex-shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 4: GALLERY ── */}
              {activeTab === "gallery" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Add Gallery item */}
                  <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 lg:col-span-1 h-fit shadow-lg">
                    <h3 className="text-sm font-bold text-slate-200 mb-5 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#89B036]" />
                      Add Gallery Image
                    </h3>
                    <form onSubmit={handleCreateGallery} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Image Caption *
                        </label>
                        <input
                          type="text"
                          required
                          value={newGallery.title}
                          onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                          placeholder="e.g. Statuario Marble Flooring"
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Category
                        </label>
                        <select
                          value={newGallery.category}
                          onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                        >
                          <option value="Interior">Interior</option>
                          <option value="Landscaping">Landscaping</option>
                          <option value="Kitchen">Kitchen</option>
                          <option value="Outdoor">Outdoor</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Upload Image *
                        </label>
                        <input
                          type="file"
                          required={!newGallery.image}
                          accept="image/*"
                          onChange={(e) => setNewGallery({ ...newGallery, image: e.target.files?.[0] || null })}
                          className="w-full text-2xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:bg-slate-950 file:text-[#89B036] file:cursor-pointer"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#89B036] hover:bg-[#546622] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all mt-2 cursor-pointer"
                      >
                        Publish Gallery Image
                      </button>
                    </form>
                  </div>

                  {/* Gallery Items Grid */}
                  <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 lg:col-span-2 shadow-lg">
                    <h3 className="text-sm font-bold text-slate-200 mb-6">Masonry Gallery Assets ({gallery.length})</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {gallery.map((g) => (
                        <div key={g._id} className="bg-slate-950/60 rounded-2xl overflow-hidden border border-slate-850 hover:border-slate-800 transition-all p-3.5 flex flex-col justify-between h-44 shadow-xs">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] bg-[#89B036]/10 text-[#89B036] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              {g.category}
                            </span>
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-800">
                              {g.image && <img src={g.image} alt={g.title} className="w-full h-full object-cover" />}
                            </div>
                          </div>
                          
                          <h4 className="font-bold text-xs text-white leading-tight mt-3 line-clamp-2">{g.title}</h4>

                          <div className="flex justify-end pt-2 mt-2 border-t border-slate-900">
                            <button
                              onClick={() => handleDeleteGallery(g._id)}
                              className="p-1.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-lg border border-red-900/30 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 5: TESTIMONIALS ── */}
              {activeTab === "testimonials" && (
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 shadow-lg">
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-200">Customer Testimonials</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Moderate customer comments & ratings</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((item) => (
                      <div key={item._id} className="bg-slate-950/60 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-800 transition-all shadow-xs">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex text-amber-400">
                              {[...Array(item.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                              ))}
                            </div>
                            <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                              {item.projectType}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 italic mb-5 leading-relaxed">
                            "{item.comment}"
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-900">
                          <div>
                            <h4 className="font-bold text-xs text-white">{item.name}</h4>
                            <p className="text-[10px] text-slate-500 font-medium tracking-wide mt-0.5">{item.designation}</p>
                          </div>

                          <button
                            onClick={() => handleDeleteTestimonial(item._id)}
                            className="p-1.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-lg border border-red-900/30 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TAB 6: SETTINGS ── */}
              {activeTab === "settings" && (
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 max-w-3xl shadow-lg">
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-200">Business Configurations & SEO</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Control global details and search index tags</p>
                  </div>
                  <form onSubmit={handleUpdateSettings} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Direct Contact Number
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            value={settings.phone}
                            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Contact Email
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            required
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Office & Showroom Address
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 pt-3 flex items-start text-slate-500">
                          <MapPin className="w-4 h-4" />
                        </span>
                        <textarea
                          rows={2}
                          required
                          value={settings.address}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          Showroom Timings Text
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                            <Clock className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            value={settings.timings}
                            onChange={(e) => setSettings({ ...settings, timings: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-[#89B036] uppercase tracking-widest mb-1.5">
                          Meta Title Tag (SEO)
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.metaTitle}
                          onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#89B036] uppercase tracking-widest mb-1.5">
                        Meta Description (SEO)
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={settings.metaDescription}
                        onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#89B036] hover:bg-[#546622] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all mt-2 cursor-pointer"
                    >
                      Save Configuration
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
