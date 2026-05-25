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
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => serializeDoc(d.id, d.data()));
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
    if (!snap.exists()) {
      // Return sensible defaults if not configured yet
      return {
        phone: "+91 98765 43210",
        email: "info@rexon.com",
        address: "Rexon Studio, 100 Feet Road, Indiranagar, Bangalore - 560038",
        timings: "9:30 AM - 7:00 PM",
        metaTitle: "Rexon Interiors & Landscaping | Premium Space Transformations",
        metaDescription:
          "Expert modular kitchen, false ceiling, living interiors and customized outdoor garden styling.",
      };
    }
    return { _id: "global", ...snap.data() };
  },

  updateSettings: async (settings: any) => {
    await setDoc(doc(db, "settings", "global"), {
      ...settings,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  },

  getSeoSettings: async (page: string) => {
    const snap = await getDoc(doc(db, "settings", "global"));
    const data = snap.exists() ? snap.data() : {};
    return { page, ...data };
  },
};

export default db;
