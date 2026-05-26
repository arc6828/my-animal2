import { NextRequest, NextResponse } from "next/server";
import { verifySignature, downloadLineMessageContent, sendLineReply } from "@/lib/line";
import { analyzeAnimal, formatAnimalResultForLine } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    // 1. Read raw body as text for signature verification
    const rawBody = await request.text();
    
    // 2. Retrieve signature from headers
    const signature = request.headers.get("x-line-signature") || "";
    
    // 3. Verify signature (Skip signature check if secrets are not configured to ease initial dev setup, but print a warning)
    const channelSecret = process.env.LINE_CHANNEL_SECRET;
    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!channelSecret || !channelAccessToken || !geminiApiKey) {
      console.warn("LINE Bot or Gemini API is not fully configured in environment variables.");
      // If not configured, we return 200 to LINE so it doesn't retry, but we log the issue.
      return NextResponse.json({ message: "System not fully configured" }, { status: 200 });
    }

    if (!verifySignature(rawBody, signature)) {
      console.error("Invalid LINE signature");
      return new Response("Invalid signature", { status: 401 });
    }

    // 4. Parse request body
    const body = JSON.parse(rawBody);
    const events = body.events || [];

    for (const event of events) {
      if (event.type !== "message") continue;

      const replyToken = event.replyToken;
      const message = event.message;

      if (!replyToken) continue;

      if (message.type === "image") {
        try {
          // Tell user we are analyzing (optional, but since LINE replyToken can only be used once, we should do the work and reply)
          // 1. Download image
          const imageBuffer = await downloadLineMessageContent(message.id);
          const imageBase64 = imageBuffer.toString("base64");
          
          // 2. Analyze with Gemini
          const analysisResult = await analyzeAnimal(imageBase64, "image/jpeg");
          
          // 3. Format response
          const replyText = formatAnimalResultForLine(analysisResult);
          
          // 4. Send reply
          await sendLineReply(replyToken, replyText);
        } catch (err) {
          console.error(`Failed to process image event:`, err);
          const errMsg = err instanceof Error ? err.message : "กรุณาลองใหม่อีกครั้งครับ";
          const errorMessage = `❌ เกิดข้อผิดพลาดในการวิเคราะห์รูปภาพของคุณ: ${errMsg}`;
          await sendLineReply(replyToken, errorMessage).catch(e => console.error("Failed to send error reply:", e));
        }
      } else if (message.type === "text") {
        const userText = (message.text || "").trim().toLowerCase();
        
        // Handle greetings or help requests
        const isHelp = ["สวัสดี", "hello", "hi", "help", "ช่วยเหลือ", "ใช้งาน", "ทำอะไรได้บ้าง", "บอท"].some(kw => userText.includes(kw));
        
        if (isHelp) {
          const welcomeMessage = 
            `สวัสดีครับ! ยินดีต้อนรับสู่บอทจำแนกสายพันธุ์สัตว์ 🦁🐯\n\n` +
            `วิธีการใช้งานง่ายๆ:\n` +
            `เพียงส่งรูปภาพสัตว์เข้ามาในแชทนี้ บอทจะวิเคราะห์รูปภาพและตอบกลับข้อมูลสายพันธุ์ ชื่อวิทยาศาสตร์ สถานะการอนุรักษ์ ถิ่นที่อยู่อาศัย และเรื่องน่ารู้ (Fun Facts) ให้คุณทราบทันทีครับ! 🐾💚`;
          await sendLineReply(replyToken, welcomeMessage);
        } else {
          const defaultReply = `บอทจำแนกสัตว์พร้อมให้บริการครับ! กรุณาส่ง 'รูปภาพสัตว์' เข้ามาในแชทเพื่อเริ่มวิเคราะห์ หรือพิมพ์ 'ช่วยเหลือ' เพื่อดูวิธีการใช้งานครับ 🐼📸`;
          await sendLineReply(replyToken, defaultReply);
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Error in LINE webhook route:", error);
    const errMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    // Always return 200 to LINE endpoint to avoid webhook retry loops
    return NextResponse.json({ error: errMessage }, { status: 200 });
  }
}
