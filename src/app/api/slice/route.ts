import { NextRequest, NextResponse } from 'next/server';
const { CuraWASM } = require('cura-wasm-tkml');
const { resolveDefinition } = require('cura-wasm-definitions');

export const maxDuration = 60; // 5 minutes
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { fileUrl } = await request.json();
    
    // if (!fileUrl) {
    //   return NextResponse.json({ error: 'No file URL provided' }, { status: 400 });
    // }

    // Download the file
    const response = await fetch('https://vkuds1czth.ufs.sh/f/lHCc2CnhRfHbDCACn4iyZpTVg98qYb3si1nQGCaKhUBRJ4OM');
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to download file: ${response.statusText}` },
        { status: response.status }
      );
    }

    const fileContent = await response.arrayBuffer();
    const fileName = fileUrl.split('/').pop() || 'model.stl';
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || 'stl';

    // Check file size
    if (fileContent.byteLength > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 50MB limit' },
        { status: 413 }
      );
    }

    // Validate file extension
    const supportedExtensions = ['stl', '3mf', 'obj'];
    if (!supportedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: `Unsupported file extension: ${fileExtension}` },
        { status: 400 }
      );
    }

    console.log('File content size:', fileContent.byteLength);
    console.log('File extension:', fileExtension);

    // Create a new slicer with configuration
    const slicer = new CuraWASM({
      verbose: true,
      command: `slice -j definitions/fdmprinter.def.json -o Model.gcode -s layer_height=0.06 -l Model.${fileExtension}`,
      definition: resolveDefinition('fdmprinter'),
      transfer: true,
    });

    console.log('Slicer initialized:', slicer);

    // Set up progress tracking
    slicer.on('progress', (percent: number) => {
      console.log(`Progress: ${percent}%`);
    });
    
    // Slice the model
    console.log('Starting slice operation...');
    const { gcode, metadata } = await slicer.slice(fileContent, fileExtension);
    console.log('Slice operation completed.');
    console.log('Gcode size:', gcode.byteLength);
    console.log('Metadata:', metadata);

    // Return the response
    return NextResponse.json({
      metadata,
      gcodeSize: gcode.byteLength,
      gcodePreview: new TextDecoder().decode(gcode.slice(0, 1000)) + '...',
    });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: `Error processing file: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}