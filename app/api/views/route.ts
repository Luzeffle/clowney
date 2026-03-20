import { createClient } from 'redis';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();

    // Changed the key so it doesn't overlap with your old site
    const views = await redis.get("clowney_views"); 
    
    await redis.disconnect();

    return NextResponse.json({ views: views ? parseInt(views) : 0 });
  } catch (error) {
    console.error("DATABASE GET ERROR:", error);
    return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();

    // Changed the key here as well
    const newViews = await redis.incr("clowney_views");
    
    await redis.disconnect();

    return NextResponse.json({ views: newViews });
  } catch (error) {
    console.error("DATABASE POST ERROR:", error);
    return NextResponse.json({ error: "Failed to add +1 to database" }, { status: 500 });
  }
}