import { NextResponse } from 'next/server';
import currenciesData from '../../../data/currencies.json';

export async function GET() {
  return NextResponse.json(currenciesData);
}
