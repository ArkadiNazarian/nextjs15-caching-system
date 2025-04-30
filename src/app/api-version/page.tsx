'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ApiVersion() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    // Reset states
    setFile(uploadedFile);
    setProgress(0);
    setIsProcessing(true);
    setError(null);
    setResult("");

    // Check file size
    if (uploadedFile.size > 50 * 1024 * 1024) { // 50MB limit
      setError("File size exceeds 50MB limit");
      setIsProcessing(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await fetch('/api/slice', {
        method: 'POST',
        body: JSON.stringify({
            fileUrl: 'https://s3.amazonaws.com/minifactory-stl/WALLY_1plate.stl'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process file');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let resultText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Convert the chunk to text and append
        const chunk = new TextDecoder().decode(value);
        resultText += chunk;
        
        // Try to parse the JSON if it's complete
        try {
          const data = JSON.parse(resultText);
          setResult(JSON.stringify(data, null, 2));
        } catch (e) {
          // JSON is not complete yet, continue reading
        }
      }
    } catch (error) {
      console.error("Error processing file:", error);
      setError("Error processing file: " + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold mb-4">API Version</h1>
        <div className="flex flex-col items-center gap-2">
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".stl,.3mf,.amf,.ply,.obj"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
            disabled={isProcessing}
          />

          {file && (
            <p className="text-sm text-gray-600">
              Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}

          {error && (
            <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {isProcessing && (
            <div className="w-full max-w-xs mt-2">
              <div className="bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full animate-pulse"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <p className="text-xs text-center mt-1">Processing file... This may take a few minutes for large files</p>
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <pre className="text-sm overflow-auto max-h-60">
                {result}
              </pre>
            </div>
          )}
        </div>

        <Link href="/" className="mt-4 text-blue-500 hover:text-blue-700">
          Back to Client Version
        </Link>
      </div>
    </div>
  );
} 