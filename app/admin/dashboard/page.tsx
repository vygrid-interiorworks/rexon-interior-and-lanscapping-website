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
  ArrowUp,
  ArrowDown,
  Move,
  Upload,
  Eye,
  Edit,
  Sliders,
  Layout,
  Map,
  Compass,
  DollarSign
} from "lucide-react";
import { apiService } from "@/lib/api";

type Tab =
  | "overview"
  | "hero"
  | "services"
  | "projects"
  | "stats"
  | "enquiries"
  | "quotes"
  | "contact_details"
  | "cta_section"
  | "gallery"
  | "testimonials";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stats Counters State
  const [stats, setStats] = useState({
    enquiries: 0,
    quotes: 0,
    projects: 0,
    galleryItems: 0,
    testimonials: 0,
  });

  // Data States
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  
  // Settings & Banner States
  const [settings, setSettings] = useState<any>({
    phone: "+91 98765 43210",
    email: "info@rexoninteriors.com",
    address: "Rexon Tower, Near NH Bypass, Kochi, Kerala - 682024",
    timings: "9:30 AM - 7:00 PM",
    whatsapp: "919876543210",
    instagram: "https://www.instagram.com/rexon_interiors",
    facebook: "https://facebook.com",
    youtube: "https://www.youtube.com/@rexon_interiors",
    mapsUrl: "",
    
    // Counters
    clientSatisfaction: 98,
    projectCompletion: 120,
    propertiesLandscapes: 320,
    yearsExperience: 12,
    happyClients: 1200,
    interiorsDesigned: 850,
    averageRating: "4.8",

    // Banner CTA
    ctaHeading: "Ready to Transform Your Space?",
    ctaSubtext: "Drop your number and our design expert will call you within 24 hours — completely free, zero obligation.",
    ctaBgType: "gradient",
    ctaBgColor: "from-[#546622] via-[#2E3A1E] to-[#89B036]",
    ctaBgImage: "",
    ctaBtnLabel: "Request Free Callback",
    
    // Hero Slider
    heroSlides: [],
  });

  // Create Form States
  const [newSlide, setNewSlide] = useState({
    image: "",
    title: "",
    highlight: "",
    subtext: "",
    imageFile: null as File | null,
  });

  const [newService, setNewService] = useState({
    title: "",
    icon: "Sofa",
    desc: "",
    color: "#89B036",
    tag: "Interiors",
    showOnHome: true,
  });
  
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const [newProject, setNewProject] = useState({
    title: "",
    category: "Interior",
    description: "",
    featured: false,
    tags: "Premium, Luxury",
    imagesText: "", // Comma-separated list of image URLs
    imageFiles: [] as File[],
  });

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const [newGallery, setNewGallery] = useState({
    title: "",
    category: "Interior",
    image: "",
    imageFile: null as File | null,
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
      
      let rawEnquiries: any[] = [];
      try {
        rawEnquiries = await apiService.getEnquiries();
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

      let servsList: any[] = [];
      try {
        servsList = await apiService.getServices();
      } catch (e) {
        console.warn("Failed fetching services");
      }

      let setts: any = null;
      try {
        setts = await apiService.getSettings();
      } catch (e) {
        console.warn("Failed fetching settings");
      }

      setEnquiries(rawEnquiries || []);
      setProjects(projList || []);
      setGallery(galList || []);
      setTestimonials(testList || []);
      setServices(servsList || []);
      if (setts) setSettings(setts);

      // Split leads list locally
      const contacts = (rawEnquiries || []).filter(
        (e) => !e.source || e.source.toLowerCase().includes("contact") || e.source.toLowerCase().includes("page")
      );
      const quotes = (rawEnquiries || []).filter(
        (e) => e.source && (e.source.toLowerCase().includes("quote") || e.source.toLowerCase().includes("callback"))
      );

      setStats({
        enquiries: contacts.length,
        quotes: quotes.length,
        projects: (projList || []).length,
        galleryItems: (galList || []).length,
        testimonials: (testList || []).length,
      });

    } catch (err) {
      console.error("Dashboard fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper: Simulated Cloudinary Upload (returns local preview URL or pastes preset)
  const uploadSingleFile = async (file: File): Promise<string> => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      // Return a standard premium mock Unsplash URL or preview
      return URL.createObjectURL(file);
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) return URL.createObjectURL(file);
      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      return URL.createObjectURL(file);
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
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      await apiService.deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      alert("Submission deleted successfully.");
    } catch (err) {
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    }
  };

  // --- Services CRUD ---
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title) return;

    try {
      if (editingServiceId) {
        // Edit service
        const updated = await apiService.updateServiceDirect(editingServiceId, newService);
        setServices((prev) => prev.map((s) => (s._id === editingServiceId ? updated : s)));
        alert("Service updated successfully!");
        setEditingServiceId(null);
      } else {
        // Add new service
        const added = await apiService.createServiceDirect(newService);
        setServices((prev) => [added, ...prev]);
        alert("Service added successfully!");
      }
      setNewService({
        title: "",
        icon: "Sofa",
        desc: "",
        color: "#89B036",
        tag: "Interiors",
        showOnHome: true,
      });
    } catch (err) {
      alert("Error saving service!");
    }
  };

  const handleToggleServiceHome = async (id: string, currentVal: boolean) => {
    try {
      const match = services.find((s) => s._id === id);
      if (!match) return;
      const updatedObj = { ...match, showOnHome: !currentVal };
      await apiService.updateServiceDirect(id, updatedObj);
      setServices((prev) => prev.map((s) => (s._id === id ? updatedObj : s)));
    } catch (e) {
      console.warn("Failed toggling service showOnHome");
    }
  };

  const handleEditService = (service: any) => {
    setEditingServiceId(service._id);
    setNewService({
      title: service.title || service.name || "",
      icon: service.icon || "Sofa",
      desc: service.desc || service.description || "",
      color: service.color || "#89B036",
      tag: service.tag || "Interiors",
      showOnHome: service.showOnHome !== false,
    });
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await apiService.deleteService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
      alert("Service deleted.");
    } catch (err) {
      setServices((prev) => prev.filter((s) => s._id !== id));
    }
  };

  // --- Portfolio CRUD ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;

    try {
      // Collate images from text URLs
      let imagesArr = newProject.imagesText
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      // Process uploaded files if any
      if (newProject.imageFiles.length > 0) {
        for (const file of newProject.imageFiles) {
          const uploadedUrl = await uploadSingleFile(file);
          if (uploadedUrl) imagesArr.push(uploadedUrl);
        }
      }

      // Add cover image as the first image
      const primaryImage = imagesArr[0] || "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80";

      const projectData = {
        title: newProject.title,
        category: newProject.category,
        description: newProject.description,
        featured: newProject.featured,
        tags: newProject.tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
        images: imagesArr,
        image: primaryImage,
      };

      if (editingProjectId) {
        const updated = await apiService.updateProjectDirect(editingProjectId, projectData);
        setProjects((prev) => prev.map((p) => (p._id === editingProjectId ? updated : p)));
        alert("Portfolio entry updated!");
        setEditingProjectId(null);
      } else {
        const added = await apiService.createProjectDirect(projectData);
        setProjects((prev) => [added, ...prev]);
        alert("Portfolio entry published!");
      }

      setNewProject({
        title: "",
        category: "Interior",
        description: "",
        featured: false,
        tags: "Premium, Luxury",
        imagesText: "",
        imageFiles: [],
      });
    } catch (err) {
      alert("Error saving project portfolio.");
    }
  };

  const handleEditProject = (proj: any) => {
    setEditingProjectId(proj._id);
    setNewProject({
      title: proj.title || "",
      category: proj.category || "Interior",
      description: proj.description || "",
      featured: proj.featured === true || proj.featured === "true",
      tags: proj.tags ? (Array.isArray(proj.tags) ? proj.tags.join(", ") : proj.tags) : "Premium, Luxury",
      imagesText: proj.images ? (Array.isArray(proj.images) ? proj.images.join(", ") : proj.image || "") : proj.image || "",
      imageFiles: [],
    });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await apiService.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      alert("Project deleted.");
    } catch (err) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
    }
  };

  // --- Hero Banner slideshow CRUD & Reordering ---
  const handleAddHeroSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    let imgUrl = newSlide.image;

    if (newSlide.imageFile) {
      imgUrl = await uploadSingleFile(newSlide.imageFile);
    }

    if (!imgUrl) {
      alert("Please upload a file or paste an Unsplash image URL.");
      return;
    }

    const newSlideObj = {
      image: imgUrl,
      title: newSlide.title || "Premium Transformations",
      highlight: newSlide.highlight || "Rexon Interiors",
      subtext: newSlide.subtext || "Dynamic modern design crafted locally.",
    };

    const updatedSlides = [...(settings.heroSlides || []), newSlideObj];
    const newSettings = { ...settings, heroSlides: updatedSlides };
    
    try {
      await apiService.updateSettings(newSettings);
      setSettings(newSettings);
      alert("Hero slide added successfully!");
      setNewSlide({ image: "", title: "", highlight: "", subtext: "", imageFile: null });
    } catch (err) {
      alert("Error adding hero slide.");
    }
  };

  const handleDeleteHeroSlide = async (index: number) => {
    if (!confirm("Delete this hero banner slide image?")) return;
    const filteredSlides = (settings.heroSlides || []).filter((_: any, i: number) => i !== index);
    const newSettings = { ...settings, heroSlides: filteredSlides };

    try {
      await apiService.updateSettings(newSettings);
      setSettings(newSettings);
      alert("Hero slide removed!");
    } catch (err) {
      alert("Error removing hero slide.");
    }
  };

  const handleReorderHeroSlide = async (index: number, direction: "up" | "down") => {
    const currentSlides = [...(settings.heroSlides || [])];
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === currentSlides.length - 1) return;

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    const temp = currentSlides[index];
    currentSlides[index] = currentSlides[swapIndex];
    currentSlides[swapIndex] = temp;

    const newSettings = { ...settings, heroSlides: currentSlides };
    try {
      await apiService.updateSettings(newSettings);
      setSettings(newSettings);
    } catch (err) {
      console.warn("Failed reordering slides");
    }
  };

  // --- Dynamic Stats Counters CRUD ---
  const handleUpdateStatsSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.updateSettings(settings);
      alert("Dynamic statistics counters updated successfully!");
    } catch (err) {
      alert("Error updating counters.");
    }
  };

  // --- Ready to Transform Section CRUD ---
  const handleUpdateCTASettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.updateSettings(settings);
      alert("Callback section configurations saved successfully!");
    } catch (err) {
      alert("Error updating CTA section.");
    }
  };

  // --- Gallery CRUD ---
  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    let imgUrl = newGallery.image;
    if (newGallery.imageFile) {
      imgUrl = await uploadSingleFile(newGallery.imageFile);
    }
    if (!imgUrl || !newGallery.title) return;

    try {
      const added = await apiService.createGalleryItemDirect({
        title: newGallery.title,
        category: newGallery.category,
        image: imgUrl,
      });
      setGallery((prev) => [added, ...prev]);
      alert("Gallery item published successfully!");
      setNewGallery({ title: "", category: "Interior", image: "", imageFile: null });
    } catch (err) {
      alert("Error adding gallery image.");
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      await apiService.deleteGalleryItem(id);
      setGallery((prev) => prev.filter((g) => g._id !== id));
      alert("Gallery item deleted.");
    } catch (err) {
      setGallery((prev) => prev.filter((g) => g._id !== id));
    }
  };

  // --- Testimonials CRUD ---
  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Delete this customer testimonial review?")) return;
    try {
      await apiService.deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      alert("Testimonial removed.");
    } catch (err) {
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    }
  };

  // --- General Global Business Settings Update ---
  const handleUpdateGeneralSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.updateSettings(settings);
      alert("Business and SEO configurations saved successfully!");
    } catch (err) {
      alert("Failed saving general settings.");
    }
  };

  const navLinks = [
    { id: "overview", label: "Dashboard Overview", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "hero", label: "Hero Banner Management", icon: <Layout className="w-4 h-4" /> },
    { id: "services", label: "Services Manager", icon: <Layers className="w-4 h-4" /> },
    { id: "projects", label: "Portfolio recent work", icon: <FolderOpen className="w-4 h-4" /> },
    { id: "stats", label: "Counters & Metrics", icon: <Sliders className="w-4 h-4" /> },
    { id: "enquiries", label: "Contact Us Messages", icon: <Mail className="w-4 h-4" /> },
    { id: "quotes", label: "Free Quote Requests", icon: <DollarSign className="w-4 h-4" /> },
    { id: "contact_details", label: "Site Settings & Contact", icon: <SettingsIcon className="w-4 h-4" /> },
    { id: "cta_section", label: "CTA Transform Banner", icon: <Sparkles className="w-4 h-4" /> },
    { id: "gallery", label: "Gallery Masonry", icon: <Grid className="w-4 h-4" /> },
    { id: "testimonials", label: "Reviews Manager", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  // Filtering leads into separate channels
  const filteredContactEnquiries = enquiries.filter(
    (e) =>
      (!e.source || e.source.toLowerCase().includes("contact") || e.source.toLowerCase().includes("page")) &&
      (e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.phone.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredQuoteRequests = enquiries.filter(
    (e) =>
      e.source &&
      (e.source.toLowerCase().includes("quote") || e.source.toLowerCase().includes("callback")) &&
      (e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.phone.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Icon options dictionary
  const iconOptions = ["Sofa", "ChefHat", "TreePine", "Paintbrush", "Layers", "Flower2", "Lightbulb", "Hammer", "BrickWall", "Droplets"];

  return (
    <main className="min-h-screen bg-[#F9F8F5] text-[#3A3A3A] flex flex-row overflow-hidden font-sans">
      
      {/* 1. Desktop Persistent Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-[#EBEAE5] min-h-screen flex flex-col justify-between hidden md:flex transition-all duration-300 z-30 flex-shrink-0`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-[#EBEAE5] flex items-center justify-between">
            {sidebarOpen ? (
              <span className="flex items-center gap-2">
                <img
                  src="/rexon-logob.png"
                  alt="Rexon Logo"
                  className="h-8 w-auto object-contain bg-white rounded-lg px-2 py-0.5 shadow-sm border border-[#EBEAE5]"
                />
                <span className="text-[9px] font-bold bg-[#89B036]/15 text-[#89B036] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              </span>
            ) : (
              <ShieldCheck className="w-5 h-5 text-[#89B036] mx-auto animate-pulse" />
            )}
          </div>

          {/* Nav Links list */}
          <nav className="p-4 space-y-1 mt-4">
            {navLinks.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#89B036] text-white shadow-md shadow-[#89B036]/15"
                    : "text-[#545454] hover:text-[#3A3A3A] hover:bg-gray-100/60"
                }`}
              >
                {tab.icon}
                {sidebarOpen && <span>{tab.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout bottom */}
        <div className="p-4 border-t border-[#EBEAE5]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
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
              className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-[#EBEAE5] z-50 p-6 flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-[#EBEAE5]">
                  <span className="flex items-center gap-2">
                    <img
                      src="/rexon-logob.png"
                      alt="Rexon Logo"
                      className="h-8 w-auto object-contain bg-white rounded-lg px-2 py-0.5 shadow-sm border border-[#EBEAE5]"
                    />
                    <span className="text-[9px] font-bold bg-[#89B036]/15 text-[#89B036] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Admin
                    </span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1 mt-6 overflow-y-auto max-h-[70vh] pr-1">
                  {navLinks.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as Tab);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-[#89B036] text-white shadow-md"
                          : "text-[#545454] hover:text-[#3A3A3A] hover:bg-gray-100"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="border-t border-[#EBEAE5] pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main Dashboard Wrapper */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#F9F8F5] overflow-y-auto max-h-screen relative">
        
        {/* Styled Admin Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-[#EBEAE5] py-4 px-6 sm:px-8 flex justify-between items-center sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-gray-400 hover:text-[#3A3A3A] hover:bg-gray-100 rounded-lg hidden md:block cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-gray-400 hover:text-[#3A3A3A] hover:bg-gray-100 rounded-lg block md:hidden cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
            
            <div className="hidden sm:block">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Console</p>
              <h2 className="text-sm font-extrabold text-[#3A3A3A] mt-1 capitalize leading-none tracking-wide">
                {activeTab === "overview" ? "Analytics Dashboard" : `${activeTab.replace("_", " ")} management`}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Live active connection */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-bold uppercase bg-green-500/10 text-green-600 px-3 py-1 rounded-full border border-green-500/20">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              Live Sync
            </span>

            {/* Notification bell */}
            <button className="p-2 bg-gray-550 border border-gray-200 text-[#545454] rounded-full transition-colors relative cursor-pointer hover:bg-gray-100">
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-1 right-1 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
              </span>
            </button>

            {/* Administrator profile avatar */}
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#89B036] to-[#546622] flex items-center justify-center text-white text-xs font-black shadow-sm">
                A
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-[#3A3A3A] leading-none">Administrator</p>
                <p className="text-[8px] font-semibold text-[#89B036] uppercase tracking-widest mt-1">Super User</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Dashboard Tab Content */}
        <div className="p-6 sm:p-8 flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-48">
              <div className="w-8 h-8 border-3 border-[#89B036] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">Syncing Cloud Database...</p>
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
                  {/* Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[
                      { title: "Direct Enquiries", count: stats.enquiries, icon: <Mail className="w-4 h-4 text-[#89B036]" />, color: "#89B036", percentage: 88 },
                      { title: "Quote Wizard Leads", count: stats.quotes, icon: <DollarSign className="w-4 h-4 text-emerald-500" />, color: "#10B981", percentage: 95 },
                      { title: "Portfolio Projects", count: stats.projects, icon: <FolderOpen className="w-4 h-4 text-amber-500" />, color: "#F59E0B", percentage: 90 },
                      { title: "Gallery Masonry", count: stats.galleryItems, icon: <Grid className="w-4 h-4 text-teal-500" />, color: "#14B8A6", percentage: 72 },
                      { title: "Reviews & Ratings", count: stats.testimonials, icon: <MessageSquare className="w-4 h-4 text-violet-500" />, color: "#8B5CF6", percentage: 100 },
                    ].map((card, idx) => (
                      <div key={idx} className="bg-white border border-[#EBEAE5] rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between shadow-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{card.title}</p>
                            <p className="text-2xl font-bold mt-2 text-[#3A3A3A] font-serif">{card.count}</p>
                          </div>
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center border"
                            style={{ backgroundColor: `${card.color}10`, borderColor: `${card.color}25` }}
                          >
                            {card.icon}
                          </div>
                        </div>

                        {/* Interactive mini progress metric */}
                        <div className="mt-4 space-y-1">
                          <div className="flex justify-between text-[8px] font-bold text-gray-400 uppercase tracking-wider">
                            <span>Vibe Target</span>
                            <span style={{ color: card.color }}>{card.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
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

                  {/* System audit log split */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Dynamic Status Activity Logs */}
                    <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 lg:col-span-2 shadow-xs">
                      <h4 className="text-xs font-bold text-[#3A3A3A] mb-5 flex items-center gap-2 uppercase tracking-wider text-gray-400">
                        <Sparkles className="w-4 h-4 text-[#89B036]" />
                        Dynamic Website Quick Status
                      </h4>
                      <div className="space-y-4 text-xs">
                        <div className="p-4 bg-gray-50/50 border border-[#EBEAE5] rounded-2xl flex items-center justify-between">
                          <div>
                            <p className="font-bold text-[#3A3A3A]">Hero Banner Slideshow</p>
                            <p className="text-gray-400 text-[10px] mt-0.5">Custom banner slider currently active on landing pages</p>
                          </div>
                          <span className="text-[10px] font-bold text-[#89B036] bg-[#89B036]/10 px-3 py-1 rounded-lg border border-[#89B036]/15">
                            {settings.heroSlides?.length || 0} Slides Configured
                          </span>
                        </div>
                        <div className="p-4 bg-gray-50/50 border border-[#EBEAE5] rounded-2xl flex items-center justify-between">
                          <div>
                            <p className="font-bold text-[#3A3A3A]">Services Premium Matrix</p>
                            <p className="text-gray-400 text-[10px] mt-0.5">Toggle services to showcase directly on Our Services grid</p>
                          </div>
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                            {services.filter(s => s.showOnHome).length} Featured on Home
                          </span>
                        </div>
                        <div className="p-4 bg-gray-50/50 border border-[#EBEAE5] rounded-2xl flex items-center justify-between">
                          <div>
                            <p className="font-bold text-[#3A3A3A]">Contact details alignment</p>
                            <p className="text-gray-400 text-[10px] mt-0.5">Showroom address and maps link updates live</p>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                            Maps Live Integrated
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick site counter configuration stats review */}
                    <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 lg:col-span-1 shadow-xs">
                      <h4 className="text-xs font-bold text-[#3A3A3A] mb-5 uppercase tracking-wider text-gray-400">
                        Counter Numbers Review
                      </h4>
                      <div className="space-y-4">
                        {[
                          { label: "Interiors designed", value: settings.interiorsDesigned, suffix: "+" },
                          { label: "Satisfaction rate", value: settings.clientSatisfaction, suffix: "%" },
                          { label: "Properties & garden", value: settings.propertiesLandscapes, suffix: "+" },
                          { label: "Years of experience", value: settings.yearsExperience, suffix: " Yrs" },
                        ].map((stat, i) => (
                          <div key={i} className="flex justify-between items-center text-xs pb-3 border-b border-[#EBEAE5]/70 last:border-b-0 last:pb-0">
                            <span className="font-semibold text-gray-500">{stat.label}</span>
                            <span className="font-bold text-[#89B036] font-serif text-sm">
                              {stat.value}
                              {stat.suffix}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent lead previews */}
                  <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 shadow-xs">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-xs font-bold text-[#3A3A3A] uppercase tracking-wider text-gray-400">Latest Free Quote submissions</h3>
                        <p className="text-[10px] text-gray-400 mt-0.5">Interactive quote entries awaiting follow-up call</p>
                      </div>
                      <button
                        onClick={() => setActiveTab("quotes")}
                        className="text-[10px] font-bold text-[#89B036] hover:underline uppercase tracking-wider cursor-pointer"
                      >
                        Quotes Panel &rarr;
                      </button>
                    </div>

                    <div className="space-y-3">
                      {enquiries
                        .filter((e) => e.source && (e.source.toLowerCase().includes("quote") || e.source.toLowerCase().includes("callback")))
                        .slice(0, 3)
                        .map((enq) => (
                          <div key={enq._id} className="bg-gray-50/50 p-4 border border-[#EBEAE5] rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gray-300 transition-all duration-300">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold text-xs text-[#3A3A3A]">{enq.name}</h4>
                                <span className="text-[8px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-emerald-100">
                                  {enq.service}
                                </span>
                              </div>
                              <p className="text-[10px] text-gray-400">📞 {enq.phone} | Source: {enq.source}</p>
                            </div>
                            <span className="text-[9px] font-bold uppercase text-gray-400">
                              {new Date(enq.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      {enquiries.filter((e) => e.source && (e.source.toLowerCase().includes("quote") || e.source.toLowerCase().includes("callback"))).length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-6">No quote submissions available.</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ── TAB 2: HERO BANNER MANAGEMENT ── */}
              {activeTab === "hero" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Add slide form */}
                  <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 lg:col-span-1 h-fit shadow-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#89B036]" />
                      Add Hero Section Slide
                    </h3>
                    <form onSubmit={handleAddHeroSlide} className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Slide Main Title
                        </label>
                        <input
                          type="text"
                          required
                          value={newSlide.title}
                          onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                          placeholder="e.g. Transforming Spaces,"
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Rexon Green Highlight Title
                        </label>
                        <input
                          type="text"
                          required
                          value={newSlide.highlight}
                          onChange={(e) => setNewSlide({ ...newSlide, highlight: e.target.value })}
                          placeholder="e.g. Inside & Out"
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Slide Subtext Details
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={newSlide.subtext}
                          onChange={(e) => setNewSlide({ ...newSlide, subtext: e.target.value })}
                          placeholder="Elegantly stylized luxury home interiors curated for Kerala..."
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Paste slide Image URL
                        </label>
                        <input
                          type="text"
                          value={newSlide.image}
                          onChange={(e) => setNewSlide({ ...newSlide, image: e.target.value })}
                          placeholder="Paste an Unsplash image URL (e.g. https://images.unsplash.com/...)"
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div className="pt-2">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          OR Upload Image File
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewSlide({ ...newSlide, imageFile: e.target.files?.[0] || null })}
                          className="w-full text-[10px] text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[9px] file:font-bold file:uppercase file:tracking-wider file:bg-[#89B036]/10 file:text-[#89B036] file:cursor-pointer"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-[#89B036] hover:bg-[#546622] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all mt-2 cursor-pointer"
                      >
                        Publish Slide banner
                      </button>
                    </form>
                  </div>

                  {/* Reorder and list slide preview */}
                  <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 lg:col-span-2 shadow-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                      Hero banner slideshow images ({(settings.heroSlides || []).length})
                    </h3>

                    <div className="space-y-4">
                      {(settings.heroSlides || []).map((slide: any, idx: number) => (
                        <div key={idx} className="bg-gray-50/50 p-4 border border-[#EBEAE5] rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            {/* Slide thumbnail */}
                            <div className="w-20 h-14 bg-gray-200 rounded-xl overflow-hidden relative border border-[#EBEAE5] flex-shrink-0">
                              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-bold text-xs text-[#3A3A3A] line-clamp-1">
                                {slide.title} <span className="text-[#89B036]">{slide.highlight}</span>
                              </h4>
                              <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                                {slide.subtext}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 justify-end sm:justify-start">
                            {/* Reordering Up/Down controls */}
                            <button
                              disabled={idx === 0}
                              onClick={() => handleReorderHeroSlide(idx, "up")}
                              className="p-2 bg-white hover:bg-gray-100 text-gray-500 rounded-lg border border-[#EBEAE5] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="Move Slide Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={idx === (settings.heroSlides || []).length - 1}
                              onClick={() => handleReorderHeroSlide(idx, "down")}
                              className="p-2 bg-white hover:bg-gray-100 text-gray-500 rounded-lg border border-[#EBEAE5] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="Move Slide Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete slide */}
                            <button
                              onClick={() => handleDeleteHeroSlide(idx)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg border border-red-100 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {(settings.heroSlides || []).length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-8">No banner slides loaded. Add one to begin.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 3: SERVICES MANAGER ── */}
              {activeTab === "services" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Create / Edit Form */}
                  <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 lg:col-span-1 h-fit shadow-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                      {editingServiceId ? <Edit className="w-4 h-4 text-amber-500" /> : <Plus className="w-4 h-4 text-[#89B036]" />}
                      {editingServiceId ? "Modify Existing Service" : "Add Premium Service"}
                    </h3>
                    <form onSubmit={handleSaveService} className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Service Name / Title
                        </label>
                        <input
                          type="text"
                          required
                          value={newService.title}
                          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                          placeholder="e.g. Modular Kitchen"
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Service Category Tag
                        </label>
                        <select
                          value={newService.tag}
                          onChange={(e) => setNewService({ ...newService, tag: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2.5 text-xs text-[#3A3A3A] outline-none"
                        >
                          <option value="Interiors">Interiors</option>
                          <option value="Outdoors">Outdoors</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Select Design Icon
                        </label>
                        <select
                          value={newService.icon}
                          onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2.5 text-xs text-[#3A3A3A] outline-none"
                        >
                          {iconOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt} Icon
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Highlight Hex Color
                        </label>
                        <input
                          type="color"
                          value={newService.color}
                          onChange={(e) => setNewService({ ...newService, color: e.target.value })}
                          className="w-full h-9 p-0 rounded-xl cursor-pointer border border-[#EBEAE5]"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Service Description
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={newService.desc}
                          onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
                          placeholder="Smart, stylish modular kitchens with custom wood styling..."
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-3.5 py-1">
                        <input
                          type="checkbox"
                          id="showHome"
                          checked={newService.showOnHome}
                          onChange={(e) => setNewService({ ...newService, showOnHome: e.target.checked })}
                          className="rounded text-[#89B036] focus:ring-0 bg-gray-50 border-gray-300 w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="showHome" className="text-xs font-semibold text-gray-500 cursor-pointer select-none">
                          Show on Website Home Page
                        </label>
                      </div>

                      <div className="flex gap-3 pt-2">
                        {editingServiceId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingServiceId(null);
                              setNewService({
                                title: "",
                                icon: "Sofa",
                                desc: "",
                                color: "#89B036",
                                tag: "Interiors",
                                showOnHome: true,
                              });
                            }}
                            className="flex-1 px-4 py-2.5 bg-gray-150 hover:bg-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          type="submit"
                          className="flex-2 inline-flex items-center justify-center px-6 py-2.5 bg-[#89B036] hover:bg-[#546622] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer"
                        >
                          {editingServiceId ? "Save Changes" : "Create Service"}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List of services */}
                  <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 lg:col-span-2 shadow-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                      Published website services ({services.length})
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <div key={service._id} className="bg-gray-50/50 p-4 border border-[#EBEAE5] rounded-2xl flex flex-col justify-between hover:border-gray-300 transition-all duration-300">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[8px] bg-white border border-[#EBEAE5] text-gray-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                {service.tag || "Interiors"}
                              </span>
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                                style={{ backgroundColor: `${service.color || "#89B036"}15`, color: service.color || "#89B036" }}
                              >
                                {service.icon?.substring(0, 3)}
                              </div>
                            </div>
                            <h4 className="font-bold text-xs text-[#3A3A3A]">{service.title || service.name}</h4>
                            <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                              {service.desc || service.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#EBEAE5] flex justify-between items-center">
                            {/* Toggle Show Home */}
                            <button
                              onClick={() => handleToggleServiceHome(service._id, service.showOnHome !== false)}
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border ${
                                service.showOnHome !== false
                                  ? "bg-green-50 text-green-600 border-green-100"
                                  : "bg-gray-100 text-gray-400 border-gray-200"
                              }`}
                            >
                              {service.showOnHome !== false ? "🟢 Featured" : "⚪ Hidden"}
                            </button>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditService(service)}
                                className="p-1.5 bg-white hover:bg-gray-100 text-amber-500 rounded-lg border border-[#EBEAE5]"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteService(service._id)}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg border border-red-100"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 4: PORTFOLIO recent work ── */}
              {activeTab === "projects" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Portfolio addition form */}
                  <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 lg:col-span-1 h-fit shadow-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                      {editingProjectId ? <Edit className="w-4 h-4 text-amber-500" /> : <Plus className="w-4 h-4 text-[#89B036]" />}
                      {editingProjectId ? "Modify Portfolio Entry" : "Publish Portfolio Project"}
                    </h3>
                    <form onSubmit={handleSaveProject} className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          required
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          placeholder="e.g. Statuario Marble Living Room"
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Category Type
                          </label>
                          <select
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2.5 text-xs text-[#3A3A3A] outline-none"
                          >
                            <option value="Interior">Interior</option>
                            <option value="Landscaping">Landscaping</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Garden">Garden</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-2.5 pt-4">
                          <input
                            type="checkbox"
                            id="projFeatured"
                            checked={newProject.featured}
                            onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                            className="rounded text-[#89B036] focus:ring-0 bg-gray-50 border-gray-300 w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor="projFeatured" className="text-[10px] font-bold text-gray-500 cursor-pointer select-none">
                            Home Featured
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Project Tags (Comma separated)
                        </label>
                        <input
                          type="text"
                          value={newProject.tags}
                          onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                          placeholder="Teakwood, Statuario, Kochi"
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Portfolio Images URLs (comma separated)
                        </label>
                        <textarea
                          rows={2}
                          value={newProject.imagesText}
                          onChange={(e) => setNewProject({ ...newProject, imagesText: e.target.value })}
                          placeholder="Paste image URLs... (e.g. https://images.unsplash.com/..., https://...)"
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Upload project images file
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            setNewProject({ ...newProject, imageFiles: files });
                          }}
                          className="w-full text-[10px] text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[9px] file:font-bold file:uppercase file:tracking-wider file:bg-[#89B036]/10 file:text-[#89B036] file:cursor-pointer"
                        />
                        <p className="text-[8px] text-gray-400 mt-1">Hold Ctrl to select multiple images</p>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          placeholder="Detailed requirements, teakwood carpentry, finishes, color vibe..."
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        {editingProjectId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProjectId(null);
                              setNewProject({
                                title: "",
                                category: "Interior",
                                description: "",
                                featured: false,
                                tags: "Premium, Luxury",
                                imagesText: "",
                                imageFiles: [],
                              });
                            }}
                            className="flex-1 px-4 py-2.5 bg-gray-150 hover:bg-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          type="submit"
                          className="flex-2 inline-flex items-center justify-center px-6 py-2.5 bg-[#89B036] hover:bg-[#546622] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer"
                        >
                          {editingProjectId ? "Update Portfolio" : "Publish Portfolio"}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List of projects */}
                  <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 lg:col-span-2 shadow-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                      Published Portfolio Projects ({projects.length})
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {projects.map((proj) => (
                        <div key={proj._id} className="bg-gray-50/50 p-4 border border-[#EBEAE5] rounded-2xl flex flex-col justify-between hover:border-gray-300 transition-all duration-300">
                          <div>
                            <div className="flex items-center gap-3">
                              {/* Main image preview */}
                              <div className="w-16 h-12 bg-gray-200 rounded-xl overflow-hidden relative border border-[#EBEAE5] flex-shrink-0 flex items-center justify-center text-[10px] font-black text-[#89B036]">
                                {proj.image ? (
                                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                                ) : (
                                  "IMG"
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold text-xs text-[#3A3A3A] line-clamp-1">{proj.title}</h4>
                                <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">{proj.category}</p>
                              </div>
                            </div>

                            {/* Tags list */}
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {proj.tags && (Array.isArray(proj.tags) ? proj.tags : [proj.tags]).map((tag: string, i: number) => (
                                <span key={i} className="text-[8px] bg-white border border-[#EBEAE5] px-2 py-0.5 rounded-full text-gray-500 font-semibold uppercase">
                                  {tag}
                                </span>
                              ))}
                              {proj.featured && (
                                <span className="text-[8px] bg-[#89B036]/10 border border-[#89B036]/20 px-2 py-0.5 rounded-full text-[#89B036] font-bold uppercase">
                                  Home Featured
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#EBEAE5] flex justify-end gap-2">
                            <button
                              onClick={() => handleEditProject(proj)}
                              className="p-2 bg-white hover:bg-gray-100 text-amber-500 rounded-lg border border-[#EBEAE5] cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj._id)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg border border-red-100 cursor-pointer"
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

              {/* ── TAB 5: COUNTERS & METRICS ── */}
              {activeTab === "stats" && (
                <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 max-w-2xl shadow-xs">
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dynamic Counters Configuration</h3>
                    <p className="text-[10px] text-gray-400 mt-1">Configure counters shown inside the Landing page statistics bars</p>
                  </div>

                  <form onSubmit={handleUpdateStatsSettings} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Client satisfaction rate (%)
                        </label>
                        <input
                          type="number"
                          required
                          value={settings.clientSatisfaction}
                          onChange={(e) => setSettings({ ...settings, clientSatisfaction: Number(e.target.value) })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Average Customer Rating (e.g. 4.8)
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.averageRating}
                          onChange={(e) => setSettings({ ...settings, averageRating: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Project Completion rate
                        </label>
                        <input
                          type="number"
                          required
                          value={settings.projectCompletion}
                          onChange={(e) => setSettings({ ...settings, projectCompletion: Number(e.target.value) })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Properties & Landscapes Created
                        </label>
                        <input
                          type="number"
                          required
                          value={settings.propertiesLandscapes}
                          onChange={(e) => setSettings({ ...settings, propertiesLandscapes: Number(e.target.value) })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Years of Excellence
                        </label>
                        <input
                          type="number"
                          required
                          value={settings.yearsExperience}
                          onChange={(e) => setSettings({ ...settings, yearsExperience: Number(e.target.value) })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Happy Clients count
                        </label>
                        <input
                          type="number"
                          required
                          value={settings.happyClients}
                          onChange={(e) => setSettings({ ...settings, happyClients: Number(e.target.value) })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>
                    </div>

                    <div className="w-1/2">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Interiors Designed
                      </label>
                      <input
                        type="number"
                        required
                        value={settings.interiorsDesigned}
                        onChange={(e) => setSettings({ ...settings, interiorsDesigned: Number(e.target.value) })}
                        className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-[#89B036] hover:bg-[#546622] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all mt-3 cursor-pointer"
                    >
                      Update Stats Configuration
                    </button>
                  </form>
                </div>
              )}

              {/* ── TAB 6: CONTACT MESSAGES (Split Lead Channel 1) ── */}
              {activeTab === "enquiries" && (
                <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Us messages</h3>
                      <p className="text-[10px] text-gray-400 mt-1">Submitted messages from standard Contact Us details pages</p>
                    </div>
                    {/* Search filter */}
                    <div className="relative w-full sm:w-60">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                        <Search className="w-3.5 h-3.5" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search standard enquiries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50/50 border border-[#EBEAE5] rounded-xl text-xs text-[#3A3A3A] outline-none focus:bg-white focus:border-[#89B036] focus:ring-0 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#EBEAE5]">
                    <table className="w-full text-left text-xs text-[#3A3A3A]">
                      <thead className="text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-[#EBEAE5] bg-gray-50/70">
                        <tr>
                          <th className="p-4">Client Detail</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Requirements & Message</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EBEAE5]">
                        {filteredContactEnquiries.map((enq) => (
                          <tr key={enq._id} className="hover:bg-gray-50/40 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-gray-800 text-xs">{enq.name}</div>
                              <div className="text-[#89B036] font-bold text-[10px] mt-1">📞 {enq.phone}</div>
                            </td>
                            <td className="p-4 text-gray-500 font-semibold">{enq.email || "N/A"}</td>
                            <td className="p-4 max-w-sm whitespace-pre-line text-gray-500 leading-relaxed font-semibold">
                              {enq.message}
                            </td>
                            <td className="p-4">
                              <select
                                value={enq.status || "New"}
                                onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                                className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-[#EBEAE5] rounded-lg cursor-pointer focus:outline-none"
                              >
                                <option value="New">🟢 New</option>
                                <option value="In Progress">🔵 Progress</option>
                                <option value="Closed">✅ Closed</option>
                              </select>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleDeleteEnquiry(enq._id)}
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl border border-red-100 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredContactEnquiries.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                              No standard inquiries registered in database.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── TAB 7: FREE QUOTE REQUESTS (Split Lead Channel 2) ── */}
              {activeTab === "quotes" && (
                <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Free Quote & Callback leads</h3>
                      <p className="text-[10px] text-gray-400 mt-1">Submitted files from interactive Quote Wizard and Home Callbacks</p>
                    </div>
                    {/* Search filter */}
                    <div className="relative w-full sm:w-60">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                        <Search className="w-3.5 h-3.5" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search quote leads..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50/50 border border-[#EBEAE5] rounded-xl text-xs text-[#3A3A3A] outline-none focus:bg-white focus:border-[#89B036] focus:ring-0 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-[#EBEAE5]">
                    <table className="w-full text-left text-xs text-[#3A3A3A]">
                      <thead className="text-[9px] font-bold text-gray-400 uppercase tracking-widest border-b border-[#EBEAE5] bg-gray-50/70">
                        <tr>
                          <th className="p-4">Customer info</th>
                          <th className="p-4">Property Type</th>
                          <th className="p-4">Wizard specifications / Message</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EBEAE5]">
                        {filteredQuoteRequests.map((enq) => (
                          <tr key={enq._id} className="hover:bg-gray-50/40 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-gray-800 text-xs">{enq.name}</div>
                              <div className="text-[#89B036] font-bold text-[10px] mt-1">📞 {enq.phone}</div>
                              <div className="text-[9px] text-gray-400 mt-0.5">{enq.email || "No email"}</div>
                            </td>
                            <td className="p-4">
                              <span className="inline-block px-2 py-0.5 bg-[#89B036]/10 text-[#89B036] border border-[#89B036]/15 rounded text-[8px] font-bold uppercase tracking-wider">
                                {enq.service}
                              </span>
                            </td>
                            <td className="p-4 max-w-md whitespace-pre-line text-gray-500 leading-relaxed font-semibold">
                              {enq.message}
                            </td>
                            <td className="p-4">
                              <select
                                value={enq.status || "New"}
                                onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                                className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-[#EBEAE5] rounded-lg cursor-pointer focus:outline-none"
                              >
                                <option value="New">🟢 New</option>
                                <option value="In Progress">🔵 Progress</option>
                                <option value="Closed">✅ Closed</option>
                              </select>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleDeleteEnquiry(enq._id)}
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl border border-red-100 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredQuoteRequests.length === 0 && (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                              No Free Quote requests available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── TAB 8: CONTACT DETAILS & SOCIALS ── */}
              {activeTab === "contact_details" && (
                <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 max-w-2xl shadow-xs">
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Showroom Contacts & Map Info</h3>
                    <p className="text-[10px] text-gray-400 mt-1">Configures phone links, showroom address (updates embedded Google Map), and social profile FAB bubbles</p>
                  </div>

                  <form onSubmit={handleUpdateGeneralSettings} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Showroom Phone number
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Direct Contact email
                        </label>
                        <input
                          type="email"
                          required
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Showroom Timings Text
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.timings}
                          onChange={(e) => setSettings({ ...settings, timings: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          WhatsApp Profile Number (digits only)
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.whatsapp}
                          onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Showroom & Office address (Auto-updates Embedded Google Map)
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Instagram Profile Link
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.instagram}
                          onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Facebook Profile Link
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.facebook}
                          onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          YouTube Channel Link
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.youtube}
                          onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#EBEAE5]">
                      <h4 className="text-[10px] font-bold uppercase text-[#89B036] tracking-wider mb-3">SEO Meta Configurations</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Home Meta Title
                          </label>
                          <input
                            type="text"
                            required
                            value={settings.metaTitle || ""}
                            onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                            className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Home Meta Description
                          </label>
                          <textarea
                            rows={2}
                            required
                            value={settings.metaDescription || ""}
                            onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                            className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-[#89B036] hover:bg-[#546622] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all mt-3 cursor-pointer"
                    >
                      Save Configuration
                    </button>
                  </form>
                </div>
              )}

              {/* ── TAB 9: CTA SECTION MANAGER ── */}
              {activeTab === "cta_section" && (
                <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 max-w-2xl shadow-xs">
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">CTA Transform banner</h3>
                    <p className="text-[10px] text-gray-400 mt-1">Configures heading, subtext, background styling, and callback button text in "Ready to Transform Your Space"</p>
                  </div>

                  <form onSubmit={handleUpdateCTASettings} className="space-y-4">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        CTA Heading Text
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.ctaHeading}
                        onChange={(e) => setSettings({ ...settings, ctaHeading: e.target.value })}
                        className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        CTA Subtext / Copy
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={settings.ctaSubtext}
                        onChange={(e) => setSettings({ ...settings, ctaSubtext: e.target.value })}
                        className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Background Styling Vibe
                        </label>
                        <select
                          value={settings.ctaBgType}
                          onChange={(e) => setSettings({ ...settings, ctaBgType: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2.5 text-xs text-[#3A3A3A] outline-none"
                        >
                          <option value="gradient">Tailor Gradient color</option>
                          <option value="image">Dynamic Background Image</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          CTA Action Button Label
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.ctaBtnLabel}
                          onChange={(e) => setSettings({ ...settings, ctaBtnLabel: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>
                    </div>

                    {settings.ctaBgType === "gradient" ? (
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Tailwind Gradient Classes
                        </label>
                        <input
                          type="text"
                          value={settings.ctaBgColor}
                          onChange={(e) => setSettings({ ...settings, ctaBgColor: e.target.value })}
                          placeholder="from-[#546622] via-[#2E3A1E] to-[#89B036]"
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Background Image URL
                        </label>
                        <input
                          type="text"
                          value={settings.ctaBgImage}
                          onChange={(e) => setSettings({ ...settings, ctaBgImage: e.target.value })}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-[#89B036] hover:bg-[#546622] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all mt-3 cursor-pointer"
                    >
                      Save Callback Banner details
                    </button>
                  </form>
                </div>
              )}

              {/* ── TAB 10: GALLERY MASONRY ── */}
              {activeTab === "gallery" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Add Gallery item */}
                  <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 lg:col-span-1 h-fit shadow-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#89B036]" />
                      Add Gallery Image
                    </h3>
                    <form onSubmit={handleCreateGallery} className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Image Caption
                        </label>
                        <input
                          type="text"
                          required
                          value={newGallery.title}
                          onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                          placeholder="e.g. Statuario Marble Flooring"
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Category
                        </label>
                        <select
                          value={newGallery.category}
                          onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2.5 text-xs text-[#3A3A3A] outline-none"
                        >
                          <option value="Interior">Interior</option>
                          <option value="Landscaping">Landscaping</option>
                          <option value="Kitchen">Kitchen</option>
                          <option value="Outdoor">Outdoor</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Paste Image URL
                        </label>
                        <input
                          type="text"
                          value={newGallery.image}
                          onChange={(e) => setNewGallery({ ...newGallery, image: e.target.value })}
                          placeholder="Paste image URL (e.g. https://...)"
                          className="w-full border-0 border-b-2 border-gray-200 focus:border-[#89B036] focus:ring-0 focus:shadow-sm focus:bg-white transition-all bg-gray-50/50 rounded-t-xl px-3 py-2 text-xs text-[#3A3A3A] outline-none"
                        />
                      </div>

                      <div className="pt-2">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                          OR Upload Image File
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewGallery({ ...newGallery, imageFile: e.target.files?.[0] || null })}
                          className="w-full text-[10px] text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[9px] file:font-bold file:uppercase file:tracking-wider file:bg-[#89B036]/10 file:text-[#89B036] file:cursor-pointer"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-[#89B036] hover:bg-[#546622] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all mt-2 cursor-pointer"
                      >
                        Publish Gallery Image
                      </button>
                    </form>
                  </div>

                  {/* Gallery Items Grid */}
                  <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 lg:col-span-2 shadow-xs">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                      Masonry Gallery Assets ({gallery.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {gallery.map((g) => (
                        <div key={g._id} className="bg-gray-50/50 rounded-2xl overflow-hidden border border-[#EBEAE5] hover:border-gray-300 transition-all p-3 flex flex-col justify-between h-40 shadow-2xs">
                          <div className="flex justify-between items-start">
                            <span className="text-[8px] bg-white border border-[#EBEAE5] text-[#89B036] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              {g.category}
                            </span>
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#EBEAE5]">
                              {g.image && <img src={g.image} alt={g.title} className="w-full h-full object-cover" />}
                            </div>
                          </div>
                          
                          <h4 className="font-bold text-[11px] text-[#3A3A3A] leading-tight mt-2 line-clamp-2">{g.title}</h4>

                          <div className="flex justify-end pt-2 mt-2 border-t border-[#EBEAE5]">
                            <button
                              onClick={() => handleDeleteGallery(g._id)}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg border border-red-100 transition-colors cursor-pointer"
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

              {/* ── TAB 11: TESTIMONIALS MODERATION ── */}
              {activeTab === "testimonials" && (
                <div className="bg-white border border-[#EBEAE5] rounded-3xl p-6 shadow-xs">
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Customer Testimonials Moderation</h3>
                    <p className="text-[10px] text-gray-400 mt-1">Review, moderate, and remove customer experiences and ratings displayed inside testimonials slider</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((item) => (
                      <div key={item._id} className="bg-gray-50/50 border border-[#EBEAE5] p-5 rounded-2xl flex flex-col justify-between hover:border-gray-300 transition-all shadow-2xs">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex text-amber-400">
                              {[...Array(item.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
                              ))}
                            </div>
                            <span className="text-[8px] bg-white border border-[#EBEAE5] text-gray-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                              {item.projectType || "General"}
                            </span>
                          </div>

                          <p className="text-xs text-[#545454] italic mb-4 leading-relaxed font-semibold">
                            "{item.comment}"
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-[#EBEAE5]">
                          <div>
                            <h4 className="font-bold text-xs text-[#3A3A3A]">{item.name}</h4>
                            <p className="text-[9px] text-gray-400 font-semibold tracking-wide mt-0.5">{item.designation || "Home Owner"}</p>
                          </div>

                          <button
                            onClick={() => handleDeleteTestimonial(item._id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg border border-red-100 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {testimonials.length === 0 && (
                      <p className="text-xs text-gray-400 py-6 text-center col-span-2">No testimonials published inside database.</p>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
