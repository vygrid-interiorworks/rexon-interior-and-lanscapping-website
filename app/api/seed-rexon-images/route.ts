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

    // 1. Update Services Collection
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

    // 2. Clear old projects & gallery docs
    const projectsSnap = await getDocs(collection(db, "projects"));
    for (const d of projectsSnap.docs) {
      batch.delete(doc(db, "projects", d.id));
    }

    const gallerySnap = await getDocs(collection(db, "gallery"));
    for (const d of gallerySnap.docs) {
      batch.delete(doc(db, "gallery", d.id));
    }

    // Add each Interior image separately as a Project & Gallery entry
    for (let i = 0; i < interiorUrls.length; i++) {
      const pRef = doc(collection(db, "projects"));
      batch.set(pRef, {
        title: `Interior Photo #${i + 1}`,
        category: "Interior",
        location: "Kerala, India",
        description: "Interior design craftsmanship",
        image: interiorUrls[i],
        img: interiorUrls[i],
        images: [interiorUrls[i]],
        showContent: false,
        featured: i < 6,
        createdAt: serverTimestamp(),
      });

      const gRef = doc(collection(db, "gallery"));
      batch.set(gRef, {
        title: `Interior Photo #${i + 1}`,
        category: "Interior",
        image: interiorUrls[i],
        createdAt: serverTimestamp(),
      });
    }

    // Add each Landscape image separately as a Project & Gallery entry
    for (let i = 0; i < landscapeUrls.length; i++) {
      const pRef = doc(collection(db, "projects"));
      batch.set(pRef, {
        title: `Landscape Photo #${i + 1}`,
        category: "Landscape",
        location: "Kerala, India",
        description: "Landscape architecture craftsmanship",
        image: landscapeUrls[i],
        img: landscapeUrls[i],
        images: [landscapeUrls[i]],
        showContent: false,
        featured: i < 6,
        createdAt: serverTimestamp(),
      });

      const gRef = doc(collection(db, "gallery"));
      batch.set(gRef, {
        title: `Landscape Photo #${i + 1}`,
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
      message: `Successfully seeded each of the ${interiorUrls.length} Interior images and ${landscapeUrls.length} Landscape images separately into Firestore!`
    });
  } catch (error: any) {
    console.error("Failed to seed rexon images:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
