import { NextRequest, NextResponse } from 'next/server';
import { parseSTL } from '@amandaghassaei/stl-parser';

function triangleVolume(a: number[], b: number[], c: number[]): number {
  return (
    (1.0 / 6.0) *
    (
      a[0] * (b[1] * c[2] - b[2] * c[1]) -
      a[1] * (b[0] * c[2] - b[2] * c[0]) +
      a[2] * (b[0] * c[1] - b[1] * c[0])
    )
  );
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const mesh = parseSTL(buffer);

  let totalVolume = 0;
  const vertices = mesh.vertices;

  for (let i = 0; i < vertices.length; i += 9) {
    const a = [vertices[i], vertices[i + 1], vertices[i + 2]];
    const b = [vertices[i + 3], vertices[i + 4], vertices[i + 5]];
    const c = [vertices[i + 6], vertices[i + 7], vertices[i + 8]];
    totalVolume += triangleVolume(a, b, c);
  }

  const volumeCm3 = Math.abs(totalVolume) / 1000;
  const density = 1.24; // g/cm³ for PLA
  const weight = volumeCm3 * density;

  return NextResponse.json({
    volumeCm3: volumeCm3.toFixed(2),
    weightGrams: weight.toFixed(2),
  });
}
