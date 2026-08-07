import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, writeBatch, doc, getDocs, serverTimestamp } from "firebase/firestore";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const interiorDir = path.join(process.cwd(), "public", "Interiorrexon");
    const landscapeDir = path.join(process.cwd(), "public", "Landscape rexon");

    const interiorFiles = fs.existsSync(interiorDir)
      ? fs.readdirSync(interiorDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      : [];

    const landscapeFiles = fs.existsSync(landscapeDir)
      ? fs.readdirSync(landscapeDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      : [];

    const interiorUrls = interiorFiles.map(f => `/Interiorrexon/${f}`);
    const landscapeUrls = landscapeFiles.map(f => `/Landscape%20rexon/${f}`);

    const batch = writeBatch(db);

    // 1. Services
    const servicesRef = collection(db, "services");
    const servicesSnap = await getDocs(servicesRef);
    const existingServices = servicesSnap.docs.map(d => ({ id: d.id, ...d.data() as any }));

    let interiorServiceDoc = existingServices.find(s => 
      s.tag === "Interiors" || (s.title && s.title.toLowerCase().includes("interior"))
    );
    let landscapeServiceDoc = existingServices.find(s => 
      s.tag === "Outdoors" || (s.title && s.title.toLowerCase().includes("landscape"))
    );

    if (interiorServiceDoc) {
      batch.set(doc(db, "services", interiorServiceDoc.id), {
        ...interiorServiceDoc,
        tag: "Interiors",
        img: interiorUrls[0] || interiorServiceDoc.img,
        images: interiorUrls,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } else {
      const newRef = doc(collection(db, "services"));
      batch.set(newRef, {
        title: "Interior Design & Execution",
        tag: "Interiors",
        desc: "Comprehensive luxury interior design and turnkey execution across Kerala.",
        tagline: "Spaces that reflect who you are.",
        icon: "Sofa",
        color: "#7CB342",
        img: interiorUrls[0] || "/images/interior-hero.jpg",
        images: interiorUrls,
        features: [
          "Personalised 3D concept renders",
          "Teakwood & veneer carpentry",
          "Modular kitchen & wardrobe solutions",
          "False ceiling & LED cove lighting"
        ],
        showOnHome: true,
        createdAt: serverTimestamp(),
      });
    }

    if (landscapeServiceDoc) {
      batch.set(doc(db, "services", landscapeServiceDoc.id), {
        ...landscapeServiceDoc,
        tag: "Outdoors",
        img: landscapeUrls[0] || landscapeServiceDoc.img,
        images: landscapeUrls,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } else {
      const newRef = doc(collection(db, "services"));
      batch.set(newRef, {
        title: "Landscaping & Architecture",
        tag: "Outdoors",
        desc: "Breathtaking outdoor landscaping, tropical garden retreats, pathways, and water features.",
        tagline: "Transforming land into living art.",
        icon: "TreePine",
        color: "#7CB342",
        img: landscapeUrls[0] || "/images/landscape-hero.jpg",
        images: landscapeUrls,
        features: [
          "Custom tropical landscape design",
          "Koi ponds & waterfall cascades",
          "Stone pathways & outdoor illumination",
          "Native flora & garden maintenance"
        ],
        showOnHome: true,
        createdAt: serverTimestamp(),
      });
    }

    // 2. Clear old gallery & projects using batch delete
    const projectsSnap = await getDocs(collection(db, "projects"));
    for (const d of projectsSnap.docs) {
      batch.delete(doc(db, "projects", d.id));
    }

    const gallerySnap = await getDocs(collection(db, "gallery"));
    for (const d of gallerySnap.docs) {
      batch.delete(doc(db, "gallery", d.id));
    }

    // Add Projects via batch
    const interiorChunkSize = 5;
    for (let i = 0; i < interiorUrls.length; i += interiorChunkSize) {
      const chunk = interiorUrls.slice(i, i + interiorChunkSize);
      const ref = doc(collection(db, "projects"));
      batch.set(ref, {
        title: `Luxury Interior Project #${Math.floor(i / interiorChunkSize) + 1}`,
        category: "Interior",
        location: "Kochi, Kerala",
        description: "Bespoke interior design and turnkey craftsmanship tailored for luxury modern living.",
        image: chunk[0],
        img: chunk[0],
        images: chunk,
        showContent: true,
        featured: i === 0,
        details: {
          client: "Rexon Client",
          area: "3,500 Sq. Ft.",
          duration: "4 Months",
          scope: "Full Interior Design & Execution",
          materials: "Teakwood, Veneer, Italian Marble, Dimmable LEDs"
        },
        createdAt: serverTimestamp(),
      });
    }

    const landscapeChunkSize = 5;
    for (let i = 0; i < landscapeUrls.length; i += landscapeChunkSize) {
      const chunk = landscapeUrls.slice(i, i + landscapeChunkSize);
      const ref = doc(collection(db, "projects"));
      batch.set(ref, {
        title: `Tropical Landscape Project #${Math.floor(i / landscapeChunkSize) + 1}`,
        category: "Landscape",
        location: "Thrissur, Kerala",
        description: "Custom landscape architecture featuring tropical gardens, stone cascades, and outdoor seating.",
        image: chunk[0],
        img: chunk[0],
        images: chunk,
        showContent: true,
        featured: i === 0,
        details: {
          client: "Rexon Client",
          area: "4,200 Sq. Ft. Garden",
          duration: "3 Months",
          scope: "Landscape Architecture & Water Cascades",
          materials: "Natural Laterite Stone, Engineered Decking, Native Flora"
        },
        createdAt: serverTimestamp(),
      });
    }

    // Add Gallery items via batch
    for (let i = 0; i < interiorUrls.length; i++) {
      const ref = doc(collection(db, "gallery"));
      batch.set(ref, {
        title: `Interior Design Showcase #${i + 1}`,
        category: "Interior",
        image: interiorUrls[i],
        createdAt: serverTimestamp(),
      });
    }

    for (let i = 0; i < landscapeUrls.length; i++) {
      const ref = doc(collection(db, "gallery"));
      batch.set(ref, {
        title: `Landscape Architecture Showcase #${i + 1}`,
        category: "Landscape",
        image: landscapeUrls[i],
        createdAt: serverTimestamp(),
      });
    }

    // Commit all operations in one batch request
    await batch.commit();

    return NextResponse.json({
      success: true,
      interiorCount: interiorUrls.length,
      landscapeCount: landscapeUrls.length,
      message: `Successfully seeded ${interiorUrls.length} Interior images and ${landscapeUrls.length} Landscape images into Firestore database in batch!`
    });
  } catch (error: any) {
    console.error("Failed to seed rexon images:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
