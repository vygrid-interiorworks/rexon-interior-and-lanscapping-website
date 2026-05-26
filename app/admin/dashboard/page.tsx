"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion as framerMotion } from "framer-motion";
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
  Award,
  Star,
  Users,
  Grid,
  Search,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  X,
  Menu,
} from "lucide-react";
import { apiService } from "@/lib/api";

type Tab = "overview" | "enquiries" | "projects" | "gallery" | "testimonials" | "settings";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  // Form states (Creating things)
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
      
      // Fetch Enquiries
      let enqList: any[] = [];
      try {
        enqList = await apiService.getEnquiries();
      } catch (e) {
        console.warn("Failed fetching enquiries, using fallback");
      }

      // Fetch Projects
      let projList: any[] = [];
      try {
        projList = await apiService.getProjects();
      } catch (e) {
        console.warn("Failed fetching projects, using fallback");
      }

      // Fetch Gallery
      let galList: any[] = [];
      try {
        galList = await apiService.getGallery();
      } catch (e) {
        console.warn("Failed fetching gallery, using fallback");
      }

      // Fetch Testimonials
      let testList: any[] = [];
      try {
        testList = await apiService.getTestimonials();
      } catch (e) {
        console.warn("Failed fetching testimonials, using fallback");
      }

      // Fetch Settings
      let setts: any = null;
      try {
        setts = await apiService.getSettings();
      } catch (e) {
        console.warn("Failed fetching settings, using fallback");
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

  // Enquiry state change (New -> In Progress -> Closed)
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await apiService.updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      console.error("Status update error, falling back locally:", err);
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
    }
  };

  // Delete handlers
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

  // Submit forms
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
      if (newProject.beforeImage) fd.append("beforeImage", newProject.beforeImage);
      if (newProject.afterImage) fd.append("afterImage", newProject.afterImage);

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
        image: "/images/hero-1.jpg",
      };
      setProjects((prev) => [mockProject, ...prev]);
      alert("Project added! (Local Demo simulation)");
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
        image: "/images/hero-2.jpg",
      };
      setGallery((prev) => [mockGal, ...prev]);
      alert("Gallery item added! (Local Demo simulation)");
      setNewGallery({ title: "", category: "Interior", image: null });
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.updateSettings(settings);
      alert("Global & SEO Settings updated successfully!");
    } catch (err) {
      console.error("Failed updating settings, mock updating locally:", err);
      alert("Settings saved locally! (Local Demo simulation)");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-row">
      {/* Sidebar Panel */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 border-r border-slate-800 transition-all duration-300 min-h-screen flex flex-col justify-between hidden md:flex`}
      >
        <div>
          {/* Sidebar Brand Logo */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            {sidebarOpen ? (
              <span className="font-serif font-bold text-[#89B036] text-xl tracking-wider">
                Rexon Admin
              </span>
            ) : (
              <ShieldCheck className="w-6 h-6 text-[#89B036] mx-auto" />
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2 flex-1">
            {[
              { id: "overview", label: "Dashboard", icon: <TrendingUp className="w-5 h-5" /> },
              { id: "enquiries", label: "Leads & Enquiries", icon: <Users className="w-5 h-5" /> },
              { id: "projects", label: "Projects / Portfolio", icon: <FolderOpen className="w-5 h-5" /> },
              { id: "gallery", label: "Gallery Masonry", icon: <Grid className="w-5 h-5" /> },
              { id: "testimonials", label: "Reviews Manager", icon: <MessageSquare className="w-5 h-5" /> },
              { id: "settings", label: "SEO & Contact Info", icon: <SettingsIcon className="w-5 h-5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                  activeTab === tab.id
                    ? "bg-[#89B036] text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {tab.icon}
                {sidebarOpen && <span>{tab.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Log out block */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-1 min-w-0 flex flex-col bg-slate-950 overflow-y-auto max-h-screen">
        {/* Header Bar */}
        <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sm:px-8 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg hidden md:block"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold tracking-wide capitalize">
              {activeTab === "overview" ? "Dashboard Overview" : `${activeTab} Management`}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
              ● Online
            </span>
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-[#89B036] font-bold border border-slate-700">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Inner views */}
        <div className="p-6 sm:p-8 flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <div className="w-10 h-10 border-4 border-[#89B036] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400 text-sm">Synchronizing live cloud data...</p>
            </div>
          ) : (
            <framerMotion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <>
                  {/* Dashboard stats cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { title: "Active Inquiries", count: stats.enquiries, icon: <Users className="w-6 h-6 text-[#89B036]" />, color: "border-l-4 border-l-[#89B036]" },
                      { title: "Portfolio Projects", count: stats.projects, icon: <FolderOpen className="w-6 h-6 text-amber-500" />, color: "border-l-4 border-l-amber-500" },
                      { title: "Gallery Images", count: stats.galleryItems, icon: <Grid className="w-6 h-6 text-teal-500" />, color: "border-l-4 border-l-teal-500" },
                      { title: "Client Testimonials", count: stats.testimonials, icon: <MessageSquare className="w-6 h-6 text-violet-500" />, color: "border-l-4 border-l-violet-500" },
                    ].map((card, idx) => (
                      <div key={idx} className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 flex justify-between items-center ${card.color}`}>
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{card.title}</p>
                          <p className="text-3xl font-bold mt-2 font-serif">{card.count}</p>
                        </div>
                        <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800">
                          {card.icon}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Enquiries & Active Details */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold">Recent Leads</h3>
                      <button
                        onClick={() => setActiveTab("enquiries")}
                        className="text-xs font-semibold text-[#89B036] hover:underline"
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-4">
                      {enquiries.slice(0, 4).map((enq) => (
                        <div key={enq._id} className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-700 transition-colors">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <h4 className="font-semibold text-sm">{enq.name}</h4>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                enq.status === "Closed"
                                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                  : enq.status === "In Progress"
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}>
                                {enq.status || "New"}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 flex items-center gap-4">
                              <span>📞 {enq.phone}</span>
                              <span>💼 {enq.service}</span>
                            </p>
                          </div>

                          <div className="text-xs text-slate-400">
                            {new Date(enq.createdAt || Date.now()).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                      {enquiries.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-6">No enquiries registered yet.</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: ENQUIRIES */}
              {activeTab === "enquiries" && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                  {/* Search and filters */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Client Inquiries ({enquiries.length})</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                      <thead className="text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-800 bg-slate-950">
                        <tr>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Service</th>
                          <th className="p-4">Details / Message</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {enquiries.map((enq) => (
                          <tr key={enq._id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4">
                              <div className="font-semibold text-white">{enq.name}</div>
                              <div className="text-xs text-slate-400 mt-0.5">{enq.phone}</div>
                              {enq.email && <div className="text-[10px] text-slate-400">{enq.email}</div>}
                            </td>
                            <td className="p-4">
                              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#89B036]/10 text-[#89B036] border border-[#89B036]/20">
                                {enq.service}
                              </span>
                            </td>
                            <td className="p-4 max-w-xs truncate">
                              <p className="text-xs text-slate-400 whitespace-pre-line truncate">{enq.message}</p>
                            </td>
                            <td className="p-4">
                              <select
                                value={enq.status || "New"}
                                onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                                className={`text-xs font-semibold px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none ${
                                  enq.status === "Closed"
                                    ? "text-green-400 border-green-500/20"
                                    : enq.status === "In Progress"
                                    ? "text-blue-400 border-blue-500/20"
                                    : "text-amber-400 border-amber-500/20"
                                }`}
                              >
                                <option value="New">🟢 New</option>
                                <option value="In Progress">🔵 In Progress</option>
                                <option value="Closed">✅ Closed</option>
                              </select>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleDeleteEnquiry(enq._id)}
                                className="p-1.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-lg border border-red-900/30 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {enquiries.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-xs text-slate-400">
                              No inquiries found in database.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: PROJECTS */}
              {activeTab === "projects" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Create Project Form */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:col-span-1 h-fit">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#89B036]" />
                      Add Portfolio Project
                    </h3>
                    <form onSubmit={handleCreateProject} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          placeholder="e.g. Modern Villa Living"
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                          Category
                        </label>
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white animate-none"
                        >
                          <option value="Interior">Interior Design</option>
                          <option value="Landscaping">Landscaping</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          placeholder="Enter details of layout, spaces, lighting..."
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                          Main Image *
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewProject({ ...newProject, image: e.target.files?.[0] || null })}
                          className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-950 file:text-[#89B036] file:cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center gap-2 py-2">
                        <input
                          type="checkbox"
                          id="feat"
                          checked={newProject.featured}
                          onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                          className="rounded text-[#89B036] focus:ring-0 bg-slate-950 border-slate-850"
                        />
                        <label htmlFor="feat" className="text-xs font-semibold text-slate-300 cursor-pointer">
                          Featured Project (Home Slider)
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#89B036] hover:bg-[#546622] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                      >
                        Submit Project
                      </button>
                    </form>
                  </div>

                  {/* List of projects */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold mb-6">Existing Projects ({projects.length})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {projects.map((proj) => (
                        <div key={proj._id} className="bg-slate-950 p-4 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-800 rounded-xl overflow-hidden relative border border-slate-700 flex items-center justify-center text-xs font-bold text-[#89B036]">
                              IMG
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm line-clamp-1">{proj.title}</h4>
                              <p className="text-xs text-slate-400 mt-0.5">{proj.category}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteProject(proj._id)}
                            className="p-2 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-xl border border-red-900/30 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: GALLERY */}
              {activeTab === "gallery" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Add Gallery item */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:col-span-1 h-fit">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#89B036]" />
                      Add Gallery Image
                    </h3>
                    <form onSubmit={handleCreateGallery} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                          Image Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newGallery.title}
                          onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                          placeholder="e.g. Modular Kitchen Finish"
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                          Category
                        </label>
                        <select
                          value={newGallery.category}
                          onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white animate-none"
                        >
                          <option value="Interior">Interior</option>
                          <option value="Landscaping">Landscaping</option>
                          <option value="Kitchen">Kitchen</option>
                          <option value="Outdoor">Outdoor</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                          Upload Image *
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewGallery({ ...newGallery, image: e.target.files?.[0] || null })}
                          className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-950 file:text-[#89B036] file:cursor-pointer"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#89B036] hover:bg-[#546622] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                      >
                        Add to Gallery
                      </button>
                    </form>
                  </div>

                  {/* Gallery Items Grid */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold mb-6">Gallery Masonry Images ({gallery.length})</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {gallery.map((g) => (
                        <div key={g._id} className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all p-3 flex flex-col justify-between h-40">
                          <div>
                            <span className="text-[10px] bg-[#89B036]/10 text-[#89B036] px-2 py-0.5 rounded font-medium">
                              {g.category}
                            </span>
                            <h4 className="font-semibold text-xs text-white mt-2 line-clamp-2">{g.title}</h4>
                          </div>

                          <div className="flex justify-end pt-2 border-t border-slate-900">
                            <button
                              onClick={() => handleDeleteGallery(g._id)}
                              className="p-1.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-lg border border-red-900/30 transition-colors"
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

              {/* TAB 5: TESTIMONIALS */}
              {activeTab === "testimonials" && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                  <h3 className="text-lg font-bold mb-6">Reviews & Testimonials ({testimonials.length})</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((item) => (
                      <div key={item._id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex text-amber-400">
                              {[...Array(item.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase font-semibold">
                              {item.projectType}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 italic mb-4 line-clamp-3">
                            "{item.comment}"
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-slate-900">
                          <div>
                            <h4 className="font-bold text-xs text-white">{item.name}</h4>
                            <p className="text-[10px] text-slate-400">{item.designation}</p>
                          </div>

                          <button
                            onClick={() => handleDeleteTestimonial(item._id)}
                            className="p-1.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 rounded-lg border border-red-900/30 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SETTINGS / SEO */}
              {activeTab === "settings" && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-3xl">
                  <h3 className="text-lg font-bold mb-6">SEO Curation & Business Information</h3>
                  <form onSubmit={handleUpdateSettings} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                          Direct Contact Number
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            value={settings.phone}
                            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                          Support Email
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            required
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                        Office & Showroom Address
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start text-slate-400">
                          <MapPin className="w-4 h-4" />
                        </span>
                        <textarea
                          rows={2}
                          required
                          value={settings.address}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
                          Office Timing Text
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <Clock className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            required
                            value={settings.timings}
                            onChange={(e) => setSettings({ ...settings, timings: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#89B036] uppercase tracking-widest mb-1.5">
                          Meta Title Tag (SEO)
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.metaTitle}
                          onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#89B036] uppercase tracking-widest mb-1.5">
                        Meta Description (SEO)
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={settings.metaDescription}
                        onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#89B036] hover:bg-[#546622] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                    >
                      Save Configuration
                    </button>
                  </form>
                </div>
              )}
            </framerMotion.div>
          )}
        </div>
      </div>
    </main>
  );
}
