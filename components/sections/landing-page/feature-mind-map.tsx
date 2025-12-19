"use client";

import React from "react";
import { motion } from "framer-motion";

const CENTER_TEXT = "Things you\ncan do";

// Animation Constants
const PATH_DURATION = 1; // Time for one line to draw
const INITIAL_DELAY = 0.5; // Wait for center circle before starting lines

const cleanNodes = [
  { text: "Record daily journal", x: 50, y: 8 },
  { text: "Save Memories", x: 72, y: 15 },
  { text: "Create Your Diary", x: 88, y: 35 },
  { text: "Write daily journal", x: 92, y: 60 },
  { text: "Sync across devices", x: 80, y: 85 },
  { text: "Work offline", x: 50, y: 92 },
  { text: "Add photo attachments", x: 20, y: 85 },
  { text: "Search past entries", x: 8, y: 60 },
  { text: "Use markdown formatting", x: 12, y: 35 },
  { text: "View calendar history", x: 28, y: 15 },
];

const MindMapSection = () => {
  return (
    <section className="max-md:hidden relative w-full h-screen-navbar flex items-center justify-center overflow-hidden py-20 font-serif">
      
      <div className="relative w-full max-w-[900px] aspect-square md:aspect-auto md:h-[700px] select-none">
        
        {/* --- SVG Layer (Lines) --- */}
        <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
        >
            {cleanNodes.map((node, i) => {
                const startX = 50;
                const startY = 50;
                const endX = node.x;
                const endY = node.y;

                // Curve Calculation
                const midX = (startX + endX) / 2;
                const midY = (startY + endY) / 2;

                let bendX = 0;
                let bendY = 0;
                const bendFactor = 15;

                if (node.x < 50 && node.y <= 50) { // Top-Left
                    bendX = -bendFactor; bendY = -bendFactor/1.5;
                } else if (node.x >= 50 && node.y < 50) { // Top-Right
                    bendX = bendFactor; bendY = -bendFactor/1.5;
                } else if (node.x > 50 && node.y >= 50) { // Bottom-Right
                    bendX = bendFactor; bendY = bendFactor/1.5;
                } else { // Bottom-Left
                    bendX = -bendFactor; bendY = bendFactor/1.5;
                }
                
                const qCpX = midX + bendX;
                const qCpY = midY + bendY;

                // Calculate exact delay for this specific node
                // It waits for all previous nodes (i * duration) + initial wait
                const myDelay = INITIAL_DELAY + (i * PATH_DURATION);

                return (
                    <motion.path
                        key={i}
                        d={`M ${startX} ${startY} Q ${qCpX} ${qCpY} ${endX} ${endY}`}
                        fill="transparent"
                        stroke="#f4f4f5" // zinc-400 (Lighter/Subtle)
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ 
                            duration: PATH_DURATION, 
                            delay: myDelay, 
                            ease: "easeInOut" 
                        }}
                        viewport={{ once: true }}
                    />
                );
            })}
        </svg>

        {/* --- Center Circle --- */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{  opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
            <div className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 border bg-zinc-50 border-zinc-100 rounded-full p-4">
                <h2 className="md:text-lg font-bold text-black text-center leading-tight whitespace-pre-line">
                    {CENTER_TEXT}
                </h2>
            </div>
        </motion.div>

        {/* --- Text Nodes --- */}
        {cleanNodes.map((node, i) => {
             const myDelay = INITIAL_DELAY + (i * PATH_DURATION);

             return (
                <motion.div
                    key={i}
                    className="absolute border border-zinc-100 rounded-lg transform -translate-x-1/2 -translate-y-1/2 z-10 w-48 text-center pointer-events-none"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    initial={{ opacity: 0}}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: myDelay, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block bg-white p-4 max-md:text-sm">
                        {node.text}
                    </span>
                </motion.div>
             )
        })}

      </div>
    </section>
  );
};

export default MindMapSection;