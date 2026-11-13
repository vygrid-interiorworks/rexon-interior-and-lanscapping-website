import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

// Helper: Upload File to Cloudinary
const uploadToCloudinary = async (file: File): Promise<string> => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    console.warn("Cloudinary credentials missing, falling back to empty string.");
    return "";
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url; // Returns the public Cloudinary URL
};

// Helper: Extract images from FormData and upload to Cloudinary
const extractFormData = async (formData: FormData) => {
  const obj: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      obj[key] = await uploadToCloudinary(value);
    } else if (!(value instanceof File)) {
      obj[key] = value;
    }
  }
  return obj;
};

// Helper: Convert Firestore Timestamps to ISO strings for JSON serialization
const serializeDoc = (id: string, data: Record<string, any>): any => ({
  _id: id,
  ...data,
  createdAt:
    data.createdAt instanceof Timestamp
      ? data.createdAt.toDate().toISOString()
      : data.createdAt,
  updatedAt:
    data.updatedAt instanceof Timestamp
      ? data.updatedAt.toDate().toISOString()
      : data.updatedAt,
});

export const apiService = {
  // ─── Auth ────────────────────────────────────────────────────────────────
  login: async (credentials: { email: string; password: string }) => {
    // Simple credential check against a hardcoded admin document or env
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@rexon.com";
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "rexon2026";

    if (
      credentials.email === ADMIN_EMAIL &&
      credentials.password === ADMIN_PASSWORD
    ) {
      return {
        token: `rexon_admin_${Date.now()}`,
        user: { email: ADMIN_EMAIL, role: "admin" },
      };
    }
    throw new Error("Invalid credentials");
  },

  getMe: async () => {
    return { email: "admin@rexon.com", role: "admin" };
  },

  // ─── Services ────────────────────────────────────────────────────────────
  getServices: async () => {
    try {
      const snap = await getDocs(collection(db, "services"));
      if (!snap.empty) {
        const list = snap.docs.map((d) => serializeDoc(d.id, d.data()));
        return list.sort((a: any, b: any) => {
          const tA = a.createdAt?.seconds || (typeof a.createdAt === 'number' ? a.createdAt : 0);
          const tB = b.createdAt?.seconds || (typeof b.createdAt === 'number' ? b.createdAt : 0);
          return tB - tA;
        });
      }

      // Auto-seed default services if Firestore table is empty
      const defaultServicesList = [
        {
          id: "interior-design",
          title: "Interior Design",
          icon: "Sofa",
          tag: "Interiors",
          tagline: "Spaces that reflect who you are.",
          desc: "Our interior design service covers every corner of your home or office — from mood boards and 3D renders to material selection, furniture layout, and final installation. We create spaces that are beautiful, functional, and deeply personal.",
          features: [
            "Personalised 3D concept renders",
            "Material and colour palette curation",
            "Furniture layout planning",
            "False ceiling & lighting integration",
            "End-to-end project management",
            "Post-handover support"
          ],
          img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
          color: "#7CB342",
          showOnHome: true
        },
        {
          id: "modular-kitchen",
          title: "Modular Kitchen",
          icon: "ChefHat",
          tag: "Interiors",
          tagline: "Kitchens crafted for how you live.",
          desc: "From Italian-finish laminates to premium hardware and smart storage solutions, our modular kitchens combine elegance with efficiency. We design for your cooking style, your family, and your aesthetic.",
          features: [
            "Custom cabinet design & finishes",
            "Premium Hettich / Blum hardware",
            "Quartz & granite countertops",
            "Integrated appliance planning",
            "Tall units, islands & breakfast counters",
            "10-year structure warranty"
          ],
          img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
          color: "#2B2C2E",
          showOnHome: true
        },
        {
          id: "landscaping",
          title: "Landscaping & Gardens",
          icon: "TreePine",
          tag: "Outdoors",
          tagline: "Transforming land into living art.",
          desc: "We design and build breathtaking outdoor spaces — from sweeping villa gardens to compact apartment balconies. Our landscape architects combine native flora, stone, water, and light to create retreats that feel timeless.",
          features: [
            "Site analysis & concept design",
            "Native & exotic plant selection",
            "Irrigation & drainage planning",
            "Stone pathways & edging",
            "Outdoor lighting design",
            "Seasonal maintenance plans"
          ],
          img: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
          color: "#7CB342",
          showOnHome: true
        },
        {
          id: "false-ceiling",
          title: "False Ceiling",
          icon: "Layers",
          tag: "Interiors",
          tagline: "Ceilings that define the room.",
          desc: "Our false ceiling solutions use gypsum, POP, and wood-panel systems to add drama, depth, and ambient warmth to any space. We integrate concealed LED coves, spotlights, and chandeliers seamlessly.",
          features: [
            "Gypsum board & POP ceilings",
            "Coffered & tray ceiling designs",
            "Concealed LED cove lighting",
            "Acoustic & moisture-resistant options",
            "Drop ceiling for commercial spaces",
            "Quick 5–7 day installation"
          ],
          img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
          color: "#2B2C2E",
          showOnHome: true
        },
        {
          id: "wallpaper-decor",
          title: "Wallpaper & Wall Décor",
          icon: "Paintbrush",
          tag: "Interiors",
          tagline: "Walls that tell your story.",
          desc: "From luxury wallpapers and textured paints to feature wall panelling and murals, we transform plain walls into statement pieces that set the mood for the entire room.",
          features: [
            "500+ curated wallpaper collections",
            "Textured & Venetian plaster finishes",
            "3D panel & MDF wall art",
            "Hand-painted accent murals",
            "Eco-friendly water-based paints",
            "Professional installation"
          ],
          img: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
          color: "#7CB342",
          showOnHome: true
        },
        {
          id: "garden-maintenance",
          title: "Garden Maintenance",
          icon: "Flower2",
          tag: "Outdoors",
          tagline: "Your garden, always in bloom.",
          desc: "Maintaining a beautiful garden is an ongoing commitment. Our certified horticulturalists offer monthly and annual maintenance plans covering pruning, fertilisation, pest control, and replanting.",
          features: [
            "Weekly or monthly service plans",
            "Pruning, trimming & shaping",
            "Fertilisation & soil enrichment",
            "Pest & disease control",
            "Seasonal flower planting",
            "Irrigation system upkeep"
          ],
          img: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80",
          color: "#2B2C2E",
          showOnHome: false
        },
        {
          id: "lighting-design",
          title: "Lighting Design",
          icon: "Lightbulb",
          tag: "Interiors",
          tagline: "Light that transforms every mood.",
          desc: "Lighting is the invisible ingredient that makes or breaks a space. We design layered lighting systems — ambient, task, and accent — using smart controls, dimmers, and energy-efficient LED technology.",
          features: [
            "Layered ambient & task lighting",
            "Smart home lighting integration",
            "Dimmable LED systems",
            "Cove & strip lighting",
            "Landscape & garden lighting",
            "Energy audit & optimisation"
          ],
          img: "https://images.unsplash.com/photo-1565538810844-1e119df60efc?auto=format&fit=crop&w=800&q=80",
          color: "#7CB342",
          showOnHome: false
        },
        {
          id: "carpentry",
          title: "Carpentry & Woodwork",
          icon: "Hammer",
          tag: "Interiors",
          tagline: "Bespoke woodwork, built to last.",
          desc: "Our in-house carpentry team crafts custom wardrobes, TV units, bookshelves, study desks, and door frames using premium marine ply and solid wood — designed to fit your space perfectly.",
          features: [
            "Custom wardrobes & walk-in closets",
            "TV unit & entertainment panels",
            "Study tables & office furniture",
            "Solid wood & ply construction",
            "Italian laminate & veneer finishes",
            "Anti-termite treatment included"
          ],
          img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
          color: "#2B2C2E",
          showOnHome: false
        },
        {
          id: "stone-tile",
          title: "Stone & Tile Work",
          icon: "BrickWall",
          tag: "Both",
          tagline: "Natural textures, timeless beauty.",
          desc: "We specialise in natural stone cladding, designer floor tiles, mosaic feature walls, and outdoor paving. From polished marble to rustic slate, we source premium materials and install them to perfection.",
          features: [
            "Marble, granite & slate flooring",
            "Designer ceramic & vitrified tiles",
            "Natural stone wall cladding",
            "Outdoor paving & driveway stones",
            "Mosaic & encaustic tile features",
            "Epoxy & sanded grouting"
          ],
          img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
          color: "#7CB342",
          showOnHome: false
        },
        {
          id: "water-features",
          title: "Water Features",
          icon: "Droplets",
          tag: "Outdoors",
          tagline: "The sound of water, the soul of luxury.",
          desc: "Nothing elevates an outdoor space like a custom water feature. We design and build garden ponds, natural waterfalls, koi pools, wall fountains, and infinity pools tailored to your landscape.",
          features: [
            "Koi ponds & natural pools",
            "Garden waterfalls & streams",
            "Wall-mounted water features",
            "Fibre-optic lighting integration",
            "Pump, filter & UV systems",
            "Ongoing maintenance plans"
          ],
          img: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
          color: "#2B2C2E",
          showOnHome: false
        }
      ];

      for (const item of defaultServicesList) {
        await addDoc(collection(db, "services"), {
          ...item,
          createdAt: serverTimestamp(),
        });
      }

      const freshSnap = await getDocs(collection(db, "services"));
      return freshSnap.docs.map((d) => serializeDoc(d.id, d.data()));
    } catch (err) {
      console.error("Error in getServices:", err);
      return [];
    }
  },

  getServiceById: async (id: string) => {
    const snap = await getDoc(doc(db, "services", id));
    if (!snap.exists()) throw new Error("Service not found");
    return serializeDoc(snap.id, snap.data());
  },

  createService: async (formData: FormData) => {
    const data = await extractFormData(formData);
    const ref = await addDoc(collection(db, "services"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { _id: ref.id, ...data };
  },

  updateService: async (id: string, formData: FormData) => {
    const data = await extractFormData(formData);
    await updateDoc(doc(db, "services", id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { _id: id, ...data };
  },

  deleteService: async (id: string) => {
    await deleteDoc(doc(db, "services", id));
    return { success: true };
  },

  // ─── Projects ─────────────────────────────────────────────────────────────
  getProjects: async (params?: { category?: string; featured?: boolean }) => {
    let q = query(collection(db, "projects"), orderBy("createdAt", "desc"));

    if (params?.category && params.category !== "All") {
      q = query(
        collection(db, "projects"),
        where("category", "==", params.category),
        orderBy("createdAt", "desc")
      );
    }
    if (params?.featured) {
      q = query(
        collection(db, "projects"),
        where("featured", "==", true),
        orderBy("createdAt", "desc")
      );
    }

    const snap = await getDocs(q);
    return snap.docs.map((d) => serializeDoc(d.id, d.data()));
  },

  getProjectById: async (id: string) => {
    const snap = await getDoc(doc(db, "projects", id));
    if (!snap.exists()) throw new Error("Project not found");
    return serializeDoc(snap.id, snap.data());
  },

  createProject: async (formData: FormData) => {
    const data = await extractFormData(formData);
    const ref = await addDoc(collection(db, "projects"), {
      ...data,
      featured: data.featured === "true" || data.featured === true,
      createdAt: serverTimestamp(),
    });
    return { _id: ref.id, ...data };
  },

  updateProject: async (id: string, formData: FormData) => {
    const data = await extractFormData(formData);
    await updateDoc(doc(db, "projects", id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { _id: id, ...data };
  },

  deleteProject: async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
    return { success: true };
  },

  // ─── Gallery ──────────────────────────────────────────────────────────────
  getGallery: async (params?: { category?: string }) => {
    let q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));

    if (params?.category && params.category !== "All") {
      q = query(
        collection(db, "gallery"),
        where("category", "==", params.category),
        orderBy("createdAt", "desc")
      );
    }

    const snap = await getDocs(q);
    return snap.docs.map((d) => serializeDoc(d.id, d.data()));
  },

  createGalleryItem: async (formData: FormData) => {
    const data = await extractFormData(formData);
    const ref = await addDoc(collection(db, "gallery"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { _id: ref.id, ...data };
  },

  deleteGalleryItem: async (id: string) => {
    await deleteDoc(doc(db, "gallery", id));
    return { success: true };
  },

  // ─── Testimonials ─────────────────────────────────────────────────────────
  getTestimonials: async (params?: { projectType?: string }) => {
    let q = query(
      collection(db, "testimonials"),
      orderBy("createdAt", "desc")
    );

    if (params?.projectType && params.projectType !== "All") {
      q = query(
        collection(db, "testimonials"),
        where("projectType", "==", params.projectType),
        orderBy("createdAt", "desc")
      );
    }

    const snap = await getDocs(q);
    return snap.docs.map((d) => serializeDoc(d.id, d.data()));
  },

  submitTestimonial: async (testimonial: any) => {
    const ref = await addDoc(collection(db, "testimonials"), {
      ...testimonial,
      rating: Number(testimonial.rating) || 5,
      createdAt: serverTimestamp(),
    });
    return { _id: ref.id, ...testimonial };
  },

  updateTestimonial: async (id: string, testimonial: any) => {
    await updateDoc(doc(db, "testimonials", id), {
      ...testimonial,
      updatedAt: serverTimestamp(),
    });
    return { _id: id, ...testimonial };
  },

  deleteTestimonial: async (id: string) => {
    await deleteDoc(doc(db, "testimonials", id));
    return { success: true };
  },

  // ─── Enquiries ────────────────────────────────────────────────────────────
  getEnquiries: async (params?: { status?: string; source?: string }) => {
    let q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));

    if (params?.status) {
      q = query(
        collection(db, "enquiries"),
        where("status", "==", params.status),
        orderBy("createdAt", "desc")
      );
    }

    const snap = await getDocs(q);
    return snap.docs.map((d) => serializeDoc(d.id, d.data()));
  },

  submitEnquiry: async (enquiry: any) => {
    const ref = await addDoc(collection(db, "enquiries"), {
      ...enquiry,
      status: "New",
      createdAt: serverTimestamp(),
    });
    return { _id: ref.id, ...enquiry, status: "New" };
  },

  updateEnquiryStatus: async (id: string, status: string) => {
    await updateDoc(doc(db, "enquiries", id), {
      status,
      updatedAt: serverTimestamp(),
    });
    return { success: true, status };
  },

  deleteEnquiry: async (id: string) => {
    await deleteDoc(doc(db, "enquiries", id));
    return { success: true };
  },

  // ─── Settings ─────────────────────────────────────────────────────────────
  getSettings: async () => {
    const snap = await getDoc(doc(db, "settings", "global"));
    const defaultSettings = {
      phone: "8848816939",
      email: "interiors.rexon@gmail.com",
      address: "JRVV+JF8 Veiloor, Kerala",
      timings: "9:30 AM - 7:00 PM",
      whatsapp: "8848816939",
      siteUrl: "https://rexoninteriors.com",
      metaTitle: "Rexon Interiors & Landscaping | Premium Design Services in Kerala",
      metaDescription: "Transform your spaces inside & out with Rexon Interiors and Landscaping. Discover premium interior designs, customized modular kitchens, residential & commercial works, and stunning landscape gardening in Kerala.",
      instagram: "https://www.instagram.com/rexon_interiors",
      facebook: "https://facebook.com",
      youtube: "https://www.youtube.com/@rexon_interiors",
      mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.6247346841776!2d76.32185547594977!3d9.965993273616616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d19f5a04595%3A0xe21288c8088009df!2sKochi%20Bypass%2C%20Ernakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1716900000000!5m2!1sen!2sin",
      
      // Dynamic Counters
      clientSatisfaction: 98,
      projectCompletion: 120,
      propertiesLandscapes: 320,
      yearsExperience: 12,
      happyClients: 1200,
      interiorsDesigned: 850,
      averageRating: "4.8",

      // Ready to Transform Banner
      ctaHeading: "Ready to Transform Your Space?",
      ctaSubtext: "Drop your number and our design expert will call you within 24 hours — completely free, zero obligation.",
      ctaBgType: "gradient", // "gradient" or "image"
      ctaBgColor: "from-[#546622] via-[#2E3A1E] to-[#89B036]",
      ctaBgImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      ctaBtnLabel: "Request Free Callback",
      ctaBtnLink: "",
      hideAllProjectContent: false,

      // Hero Banner Slides
      heroSlides: [
        {
          image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
          title: "Transforming Spaces,",
          highlight: "Inside & Out",
          subtext: "Elegantly stylized luxury home interiors curated for standard modern living across Kerala."
        },
        {
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
          title: "Breathtaking Gardens,",
          highlight: "Tailored Landscapes",
          subtext: "State-of-the-art outdoor architecture, pathways, and green retreats designed to wow."
        },
        {
          image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
          title: "Functional Aesthetics,",
          highlight: "Smart Living",
          subtext: "Custom modular kitchens, living zones, and workspaces crafted with premium long-lasting wood."
        }
      ]
    };

    if (!snap.exists()) {
      return { _id: "global", ...defaultSettings };
    }
    
    // Merge database configurations with defaults to ensure new fields are populated
    return { 
      _id: "global", 
      ...defaultSettings,
      ...snap.data()
    };
  },

  updateSettings: async (settings: any) => {
    await setDoc(doc(db, "settings", "global"), {
      ...settings,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  },

  // ─── Direct JSON CRUD Helpers ─────────────────────────────────────────────
  createServiceDirect: async (service: any) => {
    const ref = await addDoc(collection(db, "services"), {
      ...service,
      createdAt: serverTimestamp(),
    });
    return { _id: ref.id, ...service };
  },

  updateServiceDirect: async (id: string, service: any) => {
    await updateDoc(doc(db, "services", id), {
      ...service,
      updatedAt: serverTimestamp(),
    });
    return { _id: id, ...service };
  },

  createProjectDirect: async (project: any) => {
    const ref = await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: serverTimestamp(),
    });
    return { _id: ref.id, ...project };
  },

  updateProjectDirect: async (id: string, project: any) => {
    await updateDoc(doc(db, "projects", id), {
      ...project,
      updatedAt: serverTimestamp(),
    });
    return { _id: id, ...project };
  },

  createGalleryItemDirect: async (item: any) => {
    const ref = await addDoc(collection(db, "gallery"), {
      ...item,
      createdAt: serverTimestamp(),
    });
    return { _id: ref.id, ...item };
  },

  getSeoSettings: async (page: string) => {
    const snap = await getDoc(doc(db, "settings", "global"));
    const data = snap.exists() ? snap.data() : {};
    return { page, ...data };
  },

  // ─── Packages ─────────────────────────────────────────────────────────────
  getPackages: async () => {
    const q = query(collection(db, "packages"), orderBy("createdAt", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => serializeDoc(d.id, d.data()));
  },

  createPackageDirect: async (pkg: any) => {
    const ref = await addDoc(collection(db, "packages"), {
      ...pkg,
      createdAt: serverTimestamp(),
    });
    return { _id: ref.id, ...pkg };
  },

  updatePackageDirect: async (id: string, pkg: any) => {
    await updateDoc(doc(db, "packages", id), {
      ...pkg,
      updatedAt: serverTimestamp(),
    });
    return { _id: id, ...pkg };
  },

  deletePackage: async (id: string) => {
    await deleteDoc(doc(db, "packages", id));
    return { success: true };
  },
};

export default db;
