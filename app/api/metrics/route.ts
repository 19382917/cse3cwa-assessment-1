// app/api/metrics/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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