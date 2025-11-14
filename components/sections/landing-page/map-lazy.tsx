"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/ui/map"), { ssr: false });

export default function MapLazy() {
  return <Map />;
}
