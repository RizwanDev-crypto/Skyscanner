import { NextResponse } from 'next/server';
import destinationsData from '../../../data/destinations.json';

export async function GET() {
  return NextResponse.json(destinationsData);
}
