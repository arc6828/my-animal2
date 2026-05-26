import crypto from "crypto";

/**
 * Verifies if the request payload signature matches LINE's signature.
 * @param body Raw request body string
 * @param signature Value of 'x-line-signature' header
 */
export function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.LINE_CHANNEL_SECRET;
  if (!secret) {
    console.error("Missing LINE_CHANNEL_SECRET environment variable");
    return false;
  }
  
  const hash = crypto
    .createHmac("SHA256", secret)
    .update(body)
    .digest("base64");
    
  return hash === signature;
}

/**
 * Downloads image/content sent by the user from LINE API server.
 * @param messageId ID of the message containing the media
 * @returns Buffer containing the image file bytes
 */
export async function downloadLineMessageContent(messageId: string): Promise<Buffer> {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Missing LINE_CHANNEL_ACCESS_TOKEN environment variable.");
  }

  const url = `https://api-data.line.me/v2/bot/message/${messageId}/content`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to download LINE message content: ${response.status} - ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Sends a reply text message back to the user via LINE Messaging API.
 * @param replyToken Reply token received from the webhook event
 * @param text Text message to send
 */
export async function sendLineReply(replyToken: string, text: string): Promise<void> {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Missing LINE_CHANNEL_ACCESS_TOKEN environment variable.");
  }

  const url = "https://api.line.me/v2/bot/message/reply";
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      replyToken,
      messages: [
        {
          type: "text",
          text
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error sending LINE reply:", errorText);
    throw new Error(`Failed to send LINE reply: ${response.status} - ${errorText}`);
  }
}
