"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 181;
const IMAGES_DIR = "/images/huracan-sequence/ezgif-frame-";

interface HuracanCanvasProps {
    scrollYProgress: MotionValue<number>;
}

export default function HuracanCanvas({ scrollYProgress }: HuracanCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Store images in a ref to avoid re-renders
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Physics state for smooth scrolling
    const scrollState = useRef({
        current: 0,
        target: 0,
        lastFrame: -1
    });

    // 1. PRELOAD ALL FRAMES
    useEffect(() => {
        let isMounted = true;
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            const promises = Array.from({ length: FRAME_COUNT }, (_, i) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameNumber = (i + 1).toString().padStart(3, "0");
                    img.src = `${IMAGES_DIR}${frameNumber}.jpg`;

                    img.onload = () => {
                        if (!isMounted) return;
                        loadedImages[i] = img;
                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                        resolve();
                    };

                    img.onerror = () => {
                        console.error(`Failed frame ${i + 1}`);
                        resolve(); // Resolve anyway to continue
                    };
                });
            });

            await Promise.all(promises);

            if (isMounted) {
                imagesRef.current = loadedImages;
                setLoaded(true);
            }
        };

        loadImages();
        return () => { isMounted = false; };
    }, []);

    // 2. RETINA / 4K CANVAS SETUP
    const setupCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // Normalize coordinate system to use css pixels
        ctx.scale(dpr, dpr);

        // 5. IMAGE QUALITY SETTINGS
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        return { width: rect.width, height: rect.height };
    };

    // Render a specific frame
    const renderFrame = (frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for no transparency
        if (!ctx) return;

        const img = imagesRef.current[frameIndex];
        if (!img) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const neededWidth = rect.width * dpr;
        const neededHeight = rect.height * dpr;

        if (canvas.width !== neededWidth || canvas.height !== neededHeight) {
            canvas.width = neededWidth;
            canvas.height = neededHeight;
            ctx.scale(dpr, dpr);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
        }

        const canvasWidth = rect.width;
        const canvasHeight = rect.height;

        // Helper to simulate "object-fit: cover"
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let renderWidth, renderHeight, offsetX, offsetY;

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

        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    // Update target based on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        scrollState.current.target = latest;
    });

    // 3 & 4. SMOOTH SCROLL LOOP via RequestAnimationFrame
    useEffect(() => {
        if (!loaded) return;

        let animationFrameId: number;

        const loop = () => {
            // 3. LERP SMOOTHING
            // smooth = smooth + (target - smooth) * 0.08
            const state = scrollState.current;
            const diff = state.target - state.current;
            const delta = diff * 0.08; // Ease factor

            state.current += delta;

            // 4. DRAW ONLY WHEN FRAME CHANGES substantially
            // Map 0-1 to 0-(totalFrames-1)
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.round(state.current * (FRAME_COUNT - 1)))
            );

            // Only draw if frame changed OR if we are getting close to target (refinement)
            if (frameIndex !== state.lastFrame) {
                renderFrame(frameIndex);
                state.lastFrame = frameIndex;
            }

            // Continue loop
            animationFrameId = requestAnimationFrame(loop);
        };

        // Kick off loop
        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [loaded]);

    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 bg-black">
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-lambo-gold to-lambo-gold-bright transition-all duration-300 ease-out"
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                        <div className="text-lambo-gold font-orbitron tracking-widest text-xs">
                            INITIALIZING SYSTEMS... {loadingProgress}%
                        </div>
                    </div>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
            />

            {/* Cinematic Gradients */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/80 z-[1]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/50 via-transparent to-black/50 z-[1]" />
        </div>
    );
}
