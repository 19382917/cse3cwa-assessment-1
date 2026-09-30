// app/api/metrics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all metrics for the dashboard
export async function GET() {
  try {
    // Get total counts
    const totalWords = await prisma.word.count();
    const totalSettings = await prisma.activitySetting.count();
    const totalMetrics = await prisma.metric.count();

    // Get success/fail counts
    const successfulGens = await prisma.metric.count({ where: { status: 'Success' } });
    const failedGens = await prisma.metric.count({ where: { status: 'Failed' } });

    // Get most used game type
    const wordleCount = await prisma.metric.count({ where: { gameType: 'Wordle' } });
    const wordSearchCount = await prisma.metric.count({ where: { gameType: 'WordSearch' } });
    const mostUsed = wordleCount > wordSearchCount ? 'Wordle' : 'Word Search';

    return NextResponse.json({
      totalWords,
      totalSettings,
      totalActivitiesGenerated: totalMetrics,
      successfulGenerations: successfulGens,
      failedGenerations: failedGens,
      mostUsedActivityType: mostUsed,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}

// POST - Log a new metric when a game is generated
export async function POST(request: NextRequest) {
  try {
    const { gameType, status } = await request.json();
    
    // Validation: check for missing fields
    if (!gameType || !status) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    const newMetric = await prisma.metric.create({
      data: { gameType, status },
    });
    
    return NextResponse.json(newMetric, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}