import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    // 1. Seed Projects
    const projectsRef = collection(db, "projects");
    
    await addDoc(projectsRef, {
      title: "Modern Minimalist Villa",
      category: "Interior",
      description: "A complete interior revamp of a 4-bedroom villa featuring minimal aesthetics and smart lighting.",
      featured: true,
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await addDoc(projectsRef, {
      title: "Zen Garden Oasis",
      category: "Landscaping",
      description: "Custom landscaping project featuring a koi pond, bamboo fencing, and a zen meditation area.",
      featured: true,
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&q=80&w=800",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    await addDoc(projectsRef, {
      title: "Luxury Commercial Office",
      category: "Commercial",
      description: "Premium workspace design with ergonomic furniture and acoustic treatments.",
      featured: false,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // 2. Seed Gallery
    const galleryRef = collection(db, "gallery");
    const galleryItems = [
      { title: "Living Room Setup", category: "Interior", image: "https://images.unsplash.com/photo-1583847268964-b28ce8f52859?auto=format&fit=crop&q=80&w=800" },
      { title: "Kitchen Island", category: "Kitchen", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" },
      { title: "Backyard Patio", category: "Outdoor", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800" },
      { title: "Bedroom Wardrobe", category: "Interior", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800" },
      { title: "Vertical Garden", category: "Landscaping", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" }
    ];

    for (const item of galleryItems) {
      await addDoc(galleryRef, {
        ...item,
        createdAt: serverTimestamp(),
      });
    }

    return NextResponse.json({ success: true, message: "Unsplash dummy data seeded successfully!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
