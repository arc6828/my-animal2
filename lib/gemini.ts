export interface AnimalAnalysisResult {
  isAnimal: boolean;
  nameTh: string;
  nameEn: string;
  scientificName: string;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
  conservationStatus: string;
  description: string;
  habitat: string;
  diet: string;
  lifespan: string;
  funFacts: string[];
}

/**
 * Analyzes an animal image using Google Gemini API (v1beta API with JSON Schema)
 * @param imageBase64 Base64 string of the image (without the data:image/...;base64 prefix)
 * @param mimeType MIME type of the image (e.g. image/jpeg, image/png)
 */
export async function analyzeAnimal(
  imageBase64: string,
  mimeType: string
): Promise<AnimalAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: "Identify the animal in the provided image. If it is an animal, return its details according to the schema. If it is not a recognizable animal, set isAnimal to false."
          },
          {
            inlineData: {
              mimeType: mimeType,
              data: imageBase64
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          isAnimal: {
            type: "BOOLEAN",
            description: "True if an animal is recognized in the image, false otherwise."
          },
          nameTh: {
            type: "STRING",
            description: "Common name in Thai, e.g. สิงโต, แมวเปอร์เซีย"
          },
          nameEn: {
            type: "STRING",
            description: "Common name in English, e.g. Lion, Persian Cat"
          },
          scientificName: {
            type: "STRING",
            description: "Scientific name, e.g. Panthera leo"
          },
          kingdom: { type: "STRING", description: "Kingdom (อาณาจักร)" },
          phylum: { type: "STRING", description: "Phylum (ไฟลัม)" },
          class: { type: "STRING", description: "Class (ชั้น)" },
          order: { type: "STRING", description: "Order (อันดับ)" },
          family: { type: "STRING", description: "Family (วงศ์)" },
          genus: { type: "STRING", description: "Genus (สกุล)" },
          species: { type: "STRING", description: "Species (ชนิด)" },
          conservationStatus: {
            type: "STRING",
            description: "Conservation status (e.g. Least Concern (LC), Vulnerable (VU), Endangered (EN), Critically Endangered (CR), Domesticated, or Thai equivalent)"
          },
          description: {
            type: "STRING",
            description: "Brief summary description of the animal in Thai (2-3 sentences)."
          },
          habitat: {
            type: "STRING",
            description: "Natural habitat described in Thai, e.g. ทุ่งหญ้าสะวันนาในทวีปแอฟริกา"
          },
          diet: {
            type: "STRING",
            description: "Primary diet type and feeding behavior in Thai, e.g. สัตว์กินเนื้อ ล่าสัตว์กีบขนาดใหญ่เป็นอาหาร"
          },
          lifespan: {
            type: "STRING",
            description: "Average lifespan in wild/captivity in Thai, e.g. 10-14 ปี"
          },
          funFacts: {
            type: "ARRAY",
            items: { type: "STRING" },
            description: "3 interesting or surprising fun facts about this animal in Thai."
          }
        },
        required: [
          "isAnimal",
          "nameTh",
          "nameEn",
          "scientificName",
          "conservationStatus",
          "description",
          "habitat",
          "diet",
          "lifespan",
          "funFacts"
        ]
      }
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errText}`);
  }

  const responseData = await response.json();
  
  try {
    const textResult = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResult) {
      throw new Error("Empty response received from Gemini API.");
    }
    
    const parsedResult = JSON.parse(textResult) as AnimalAnalysisResult;
    return parsedResult;
  } catch (error) {
    console.error("Failed to parse Gemini JSON output:", error, responseData);
    throw new Error("Failed to parse Gemini analysis. Please try again with a clearer image.");
  }
}

/**
 * Formats an AnimalAnalysisResult into a beautiful Thai text message for LINE Bot.
 */
export function formatAnimalResultForLine(result: AnimalAnalysisResult): string {
  if (!result.isAnimal) {
    return "❌ ขออภัยครับ บอทไม่สามารถจำแนกสัตว์จากภาพนี้ได้ กรุณาส่งรูปภาพสัตว์ที่เห็นได้ชัดเจนอีกครั้งนะครับ 🦁🐯";
  }

  const lines = [
    `🐾 ผลการจำแนกสัตว์ 🐾`,
    `----------------------`,
    `🏷️ ชื่อไทย: ${result.nameTh}`,
    `🌍 ชื่ออังกฤษ: ${result.nameEn}`,
    `🧬 ชื่อวิทยาศาสตร์: *${result.scientificName}*`,
    `🛡️ สถานะการอนุรักษ์: ${result.conservationStatus}`,
    `----------------------`,
    `📖 ข้อมูลทั่วไป:`,
    `${result.description}`,
    ``,
    `🏡 ถิ่นที่อยู่อาศัย: ${result.habitat}`,
    `🥩 อาหาร: ${result.diet}`,
    `⏳ อายุขัยเฉลี่ย: ${result.lifespan}`,
    `----------------------`,
    `💡 เรื่องน่ารู้ (Fun Facts):`,
    ...result.funFacts.map((fact, index) => `${index + 1}. ${fact}`),
    `----------------------`,
    `💚 ขอบคุณที่ใช้บริการครับ! 💚`
  ];

  return lines.join("\n");
}
