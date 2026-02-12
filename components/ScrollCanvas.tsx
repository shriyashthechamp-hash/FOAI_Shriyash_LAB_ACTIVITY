"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollCanvasProps {
    scrollProgress: number;
}

export default function ScrollCanvas({ scrollProgress }: ScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const frameCount = 181;

    // Preload all images
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises: Promise<HTMLImageElement>[] = [];

            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, "0");
                img.src = `/images/huracan-sequence/ezgif-frame-${frameNumber}.jpg`;

                const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });

                imagePromises.push(promise);
            }

            try {
                const loadedImages = await Promise.all(imagePromises);
                setImages(loadedImages);
                setIsLoading(false);
            } catch (error) {
                console.error("Error loading images:", error);
            }
        };

        loadImages();
    }, []);

    // Handle canvas rendering
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size to viewport
        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };

        setCanvasSize();

        // Calculate current frame based on scroll progress
        const frameIndex = Math.min(
            Math.floor(scrollProgress * frameCount),
            frameCount - 1
        );

        const img = images[frameIndex];
        if (!img) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate scaling to cover viewport while maintaining aspect ratio
        const canvasAspect = window.innerWidth / window.innerHeight;
        const imgAspect = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
            // Canvas is wider than image
            drawWidth = window.innerWidth;
            drawHeight = drawWidth / imgAspect;
            offsetX = 0;
            offsetY = (window.innerHeight - drawHeight) / 2;
        } else {
            // Canvas is taller than image
            drawHeight = window.innerHeight;
            drawWidth = drawHeight * imgAspect;
            offsetX = (window.innerWidth - drawWidth) / 2;
            offsetY = 0;
        }

        // Draw image
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // Handle window resize
        const handleResize = () => {
            setCanvasSize();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [scrollProgress, images]);

    return (
        <div className="canvas-container">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center">
                        <div className="luxury-heading text-lambo-gold text-2xl mb-4 animate-pulse">
                            LOADING EXPERIENCE
                        </div>
                        <div className="w-64 h-1 bg-lambo-carbon rounded-full overflow-hidden">
                            <div className="h-full bg-lambo-gold animate-pulse"></div>
                        </div>
                    </div>
                </div>
            )}
            <canvas ref={canvasRef} className="block" />
        </div>
    );
}
