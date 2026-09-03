// app/api/words/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all words or a specific word by ID (?id=1)
export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (id) {
      const word = await prisma.word.findUnique({
        where: { id: parseInt(id) },
      });
      if (!word) {
        return NextResponse.json({ error: 'Word not found' }, { status: 404 });
      }
      return NextResponse.json(word);
    }

    const words = await prisma.word.findMany();
    return NextResponse.json(words);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST - Create a new word
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { englishWord, phonemes } = body;

    // Validation: Check for missing data
    if (!englishWord || !phonemes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate length based on comma-separated phonemes
    const phonemeArray = phonemes.split(',').map((p: string) => p.trim());
    const length = phonemeArray.length;

    const newWord = await prisma.word.create({
      data: {
        englishWord,
        phonemes,
        length,
      },
    });

    return NextResponse.json(newWord, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// PATCH - Update a word by ID (?id=1)
export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const body = await request.json();
    const { englishWord, phonemes } = body;

    // Build the data object dynamically
    const data: { englishWord?: string; phonemes?: string; length?: number } = {};
    if (englishWord) data.englishWord = englishWord;
    if (phonemes) {
      data.phonemes = phonemes;
      data.length = phonemes.split(',').map((p: string) => p.trim()).length;
    }

    const updatedWord = await prisma.word.update({
      where: { id: parseInt(id) },
      data: data,
    });

    return NextResponse.json(updatedWord);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// DELETE - Delete a word by ID (?id=1)
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    await prisma.word.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Word deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}