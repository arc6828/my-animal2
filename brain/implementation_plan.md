# แผนการพัฒนาระบบจำแนกสัตว์ (Animal Recognition) ผ่านเว็บและ LINE

ระบบนี้จะพัฒนาด้วย **Next.js (App Router)** โดยนำเทคโนโลยี **Gemini API** มาใช้จำแนกสายพันธุ์สัตว์จากรูปภาพ และมีช่องทางการใช้งาน 2 ช่องทางหลัก:
1. **Web Application**: เว็บแอปพลิเคชันรูปแบบพรีเมียม (Premium Dashboard) รองรับการอัปโหลดไฟล์รูปภาพหรือเปิดกล้องถ่ายภาพ มีการแสดงข้อมูลอย่างละเอียด (ชื่อภาษาไทย/อังกฤษ, ชื่อวิทยาศาสตร์, สถานะการอนุรักษ์, ถิ่นที่อยู่อาศัย, อาหารหลัก, อายุขัย) พร้อมการแสดง "Fun Facts" และเก็บบันทึกประวัติการสแกนผ่าน LocalStorage
2. **LINE Bot Integration**: ช่องทาง LINE Chatbot เมื่อผู้ใช้ส่งรูปภาพเข้ามา LINE Webhook จะส่งรูปไปให้ Gemini API เพื่อวิเคราะห์ และตอบกลับข้อมูลสรุปของสัตว์ชนิดนั้นๆ ในรูปแบบภาษาไทยที่อ่านง่ายและจัดแต่งด้วยอิโมจิอย่างสวยงาม

---

## User Review Required

> [!IMPORTANT]
> **API Keys & Configuration**:
> - จำเป็นต้องใช้ **Gemini API Key** (รับฟรีได้จาก Google AI Studio)
> - จำเป็นต้องมี **LINE Developers Account** เพื่อสร้าง Messaging API Channel และนำ **Channel Access Token** กับ **Channel Secret** มาระบุใน `.env.local`
> - การพัฒนาและทดสอบ LINE Bot ในเครื่องคอมพิวเตอร์ Local จะต้องใช้ Tunneling Tool เช่น **ngrok** เพื่อสร้าง Public HTTPS URL ชี้มาที่ `http://localhost:3000/api/line-webhook`

---

## Open Questions

> [!IMPORTANT]
> **1. การเชื่อมต่อ Gemini API (SDK vs Native Fetch)**:
> - เพื่อหลีกเลี่ยงปัญหาความเข้ากันได้ของ SDK และเพื่อความรวดเร็วในการพัฒนา เราขอเสนอให้ใช้ **Native Fetch ของ Next.js** ในการยิงตรงไปยัง Google Gemini API Endpoints ซึ่งมีความมั่นคงและไม่ต้องลงแพ็กเกจเพิ่ม หรือหากคุณยืนยันที่จะลง `@google/genai` ก็สามารถทำได้เช่นกัน คุณมีแนวทางที่อยากให้เลือกใช้เป็นพิเศษหรือไม่?
>
> **2. การทำ HTTPS Tunnel สำหรับ LINE Bot**:
> - คุณเตรียมติดตั้ง **ngrok** หรือช่องทางอื่นในการทำ HTTPS tunnel ในเครื่องแล้วหรือยัง? (หากยังไม่มี เราสามารถเพิ่มคู่มือการเชื่อมต่อแบบง่ายๆ ไว้ในแท็บ LINE Setup บนหน้าเว็บ Dashboard ให้ได้)

---

## Proposed Changes

การสร้างและพัฒนาจะแบ่งออกเป็นส่วนต่างๆ ดังนี้:

### 1. Library & Integration Layer

#### [NEW] [gemini.ts](file:///c:/Users/Home/my-animal2/lib/gemini.ts)
- ฟังก์ชันส่งข้อมูลรูปภาพ (Base64 หรือ Buffer) ไปวิเคราะห์กับ Gemini API
- กำหนด JSON Schema สำหรับการสแกนผ่าน Web (เพื่อให้ตอบข้อมูลที่มีโครงสร้างชัดเจน เช่น Scientific Name, Habitat, Fun Facts, Lifespan, Diet, Conservation Status)
- กำหนด Prompt สำหรับการสแกนผ่าน LINE (เพื่อให้ตอบข้อความสั้นกระชับ จัดหน้าตาด้วยอิโมจิในภาษาไทย)

#### [NEW] [line.ts](file:///c:/Users/Home/my-animal2/lib/line.ts)
- ฟังก์ชันคำนวณและตรวจสอบลายเซ็น `x-line-signature` เพื่อความปลอดภัย (Security Check)
- ฟังก์ชันดาวน์โหลดรูปภาพจาก LINE API Server ด้วย `messageId`
- ฟังก์ชันส่งข้อความตอบกลับ (Reply Message) ไปยัง LINE API

---

### 2. API Routes (Server Side)

#### [NEW] [route.ts (Recognize API)](file:///c:/Users/Home/my-animal2/app/api/recognize/route.ts)
- Endpoint `POST /api/recognize`
- รับรูปภาพแบบ FormData หรือ Base64 จากหน้าเว็บ
- ส่งรูปไปให้ Gemini API และรับค่ากลับมาเป็น JSON ตาม Schema ที่กำหนด
- ส่งคืนผลลัพธ์พร้อม Metadata ให้หน้าเว็บ

#### [NEW] [route.ts (LINE Webhook)](file:///c:/Users/Home/my-animal2/app/api/line-webhook/route.ts)
- Endpoint `POST /api/line-webhook`
- ตรวจสอบความถูกต้องของ Signature
- ตรวจสอบประเภทข้อความ (Message Event) ถ้าเป็นภาพ:
  1. ดาวน์โหลดรูปภาพเก็บใน Memory Buffer
  2. ส่งให้ Gemini API ช่วยวิเคราะห์ (ระบุ Prompt ให้เขียนคำตอบเป็นภาษาไทยพร้อมจัด Format สวยงาม)
  3. นำคำตอบที่ได้มาส่งกลับไปยังผู้ใช้ทาง LINE
- รองรับ Event ข้อความทักทาย (เช่น "ช่วยบอกวิธีใช้งานหน่อย" หรือส่งข้อความสั้นๆ)

---

### 3. User Interface (Web App)

#### [NEW] [.env.template](file:///c:/Users/Home/my-animal2/.env.template)
- ตัวอย่างไฟล์ตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variables)
  - `GEMINI_API_KEY`
  - `LINE_CHANNEL_SECRET`
  - `LINE_CHANNEL_ACCESS_TOKEN`

#### [MODIFY] [page.tsx](file:///c:/Users/Home/my-animal2/app/page.tsx)
- หน้าเว็บแดชบอร์ดหลักที่ได้รับการออกแบบอย่างพรีเมียม (Premium UX/UI):
  - โหมดสแกนสดจากกล้อง (Camera Mode) หรืออัปโหลดไฟล์รูปภาพ (Upload Mode)
  - แอนิเมชันตอนกำลังวิเคราะห์ภาพ (Analysis State) ที่นุ่มนวลและดูทันสมัย
  - หน้าการแสดงผลข้อมูลจำแนกสัตว์:
    - ชื่อภาษาไทยและภาษาอังกฤษ
    - ชื่อวิทยาศาสตร์ (ตัวเอียง)
    - สถานะการอนุรักษ์ (Conservation Status - เลเบลสีตามความวิกฤต เช่น พืชพันธุ์เสี่ยงสูญพันธุ์จะใช้สีแดงอ่อน/ส้ม)
    - ส่วนรายละเอียดสัตว์, ถิ่นที่อยู่อาศัย, อาหารหลัก, อายุขัย
    - แท็บย่อยแสดง "Fun Facts" (ข้อเท็จจริงน่าทึ่ง)
  - แท็บแผงควบคุม LINE Bot (LINE Bot Setup Card) สำหรับแนะนำวิธีการเชื่อมต่อและ QR Code เพื่อทดสอบ
  - ระบบประวัติการสแกน (Scan History Gallery) ที่จัดเก็บไว้ใน LocalStorage สามารถคลิกมาดูข้อมูลเก่าย้อนหลังได้

---

## Verification Plan

### การทดสอบแบบอัตโนมัติและแบบจำลอง (Manual / Dev Verification)
1. **การจำลองส่งคำขอ (Mock Test)**:
   - ทดสอบจำแนกรูปภาพสัตว์ผ่าน API `POST /api/recognize` ด้วยโปรแกรมหรือสคริปต์ เพื่อตรวจความถูกต้องของ JSON Schema ที่ได้จาก Gemini
2. **หน้าเว็บแอปพลิเคชัน**:
   - ตรวจสอบความสวยงาม การตอบสนอง (Responsive Design) บนมือถือและเดสก์ท็อป
   - ทดสอบการกดถ่ายภาพจากกล้องและการอัปโหลดภาพสัตว์ชนิดต่างๆ เช่น สุนัข แมว นก ช้าง เสือ เพื่อดูความแม่นยำของคำตอบและข้อมูลเสริม
3. **การทดสอบ LINE Webhook**:
   - จำลองส่ง Webhook Event (ภาพและข้อความ) เพื่อตรวจสอบว่าสามารถตอบกลับข้อความที่ถูกต้องกลับไปได้สำเร็จ
