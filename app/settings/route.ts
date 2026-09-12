// app/api/settings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const settings = await prisma.activitySetting.findMany();
  return NextResponse.json(settings);
}

export async function POST(request: NextRequest) {
  try {
    const { gameType, difficulty, maxGuesses } = await request.json();
    if (!gameType || !difficulty || !maxGuesses) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const newSetting = await prisma.activitySetting.create({
      data: { gameType, difficulty, maxGuesses: parseInt(maxGuesses) },
    });
    return NextResponse.json(newSetting, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    
    await prisma.activitySetting.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'Setting deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}