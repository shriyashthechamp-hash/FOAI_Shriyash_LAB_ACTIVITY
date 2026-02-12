"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 181;
const IMAGES_DIR = "/images/huracan-sequence/ezgif-frame-";

export default function HuracanCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const { scrollYProgress } = useScroll();

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imagePromises: Promise<void>[] = [];

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Pad standard numbering: 001, 002, ... 181
                    const frameNumber = i.toString().padStart(3, "0");
                    img.src = `${IMAGES_DIR}${frameNumber}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img; // store at correct index
                        resolve();
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load frame ${i}`, e);
                        // Even if fail, resolve to not block everything (or handle better in prod)
                        resolve();
                    };
                });
                imagePromises.push(promise);
            }

            await Promise.all(imagePromises);
            setImages(loadedImages);
            setLoaded(true);
        };

        loadImages();
    }, []);

    // Draw frame
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];

        // High DPI scaling
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);

        // Image Contain/Cover Logic
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let renderWidth, renderHeight, offsetX, offsetY;

        // "Cover" effect
        if (canvasRatio > imgRatio) {
            renderWidth = canvasWidth;
            renderHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - renderHeight) / 2;
        } else {
            renderWidth = canvasHeight * imgRatio;
            renderHeight = canvasHeight;
            offsetX = (canvasWidth - renderWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    // Initial render when loaded
    useEffect(() => {
        if (loaded && images.length > 0) {
            // Draw first frame immediately
            requestAnimationFrame(() => renderFrame(0));
        }
    }, [loaded, images]);

    // Update on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!loaded || images.length === 0) return;

        // Map 0-1 progress to 0-(FRAME_COUNT-1)
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 bg-black">
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-2 border-lambo-carbon border-t-lambo-gold rounded-full animate-spin"></div>
                        <p className="font-rajdhani text-lambo-gold tracking-widest text-sm animate-pulse">INITIALIZING SYSTEMS</p>
                    </div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
            />
            {/* Cinematic Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/80 z-[1]" />
        </div>
    );
}
