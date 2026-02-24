import { NextResponse } from 'next/server';
import languagesData from '../../../data/languages.json';

export async function GET() {
  return NextResponse.json(languagesData);
}
