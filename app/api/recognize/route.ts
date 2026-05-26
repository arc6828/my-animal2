import { NextRequest, NextResponse } from "next/server";
import { analyzeAnimal } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON body. Please send a JSON object with 'image' and 'mimeType' fields." },
        { status: 400 }
      );
    }

    const { image, mimeType } = body;

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: "Missing 'image' (base64 string) or 'mimeType' field in request body." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set. Please add GEMINI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    // Clean base64 string if it contains the data:image prefix
    let cleanBase64 = image;
    if (image.includes(";base64,")) {
      cleanBase64 = image.split(";base64,").pop() || "";
    }

    const result = await analyzeAnimal(cleanBase64, mimeType);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in recognize API:", error);
    const errMessage = error instanceof Error ? error.message : "An unexpected error occurred during recognition.";
    return NextResponse.json(
      { error: errMessage },
      { status: 500 }
    );
  }
}
