import { NextResponse } from "next/server";

const startTime = Date.now();

export async function GET() {
  const currentTime = Date.now();
  const uptimeMs = currentTime - startTime;
  
  const uptimeSeconds = Math.floor(uptimeMs / 1000);
  const days = Math.floor(uptimeSeconds / 86400);
  const hours = Math.floor((uptimeSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  return NextResponse.json({
    status: "ok",
    uptime: {
      milliseconds: uptimeMs,
      seconds: uptimeSeconds,
      formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
      startTime: new Date(startTime).toISOString()
    },
    timestamp: new Date(currentTime).toISOString()
  });
}