# เอกสารประกอบการส่งบทความวิจัยสู่วารสาร EASR (EASR Submission Package)
## Engineering and Applied Science Research (SCOPUS Q3 / TCI กลุ่ม 1)

เอกสารนี้รวบรวมข้อมูลและเทมเพลตที่จำเป็นต้องใช้ในการส่งบทความวิจัยผ่านระบบ **ThaiJO (OJS)** ของวารสาร EASR ([https://ph01.tci-thaijo.org/index.php/easr](https://ph01.tci-thaijo.org/index.php/easr)) เพื่อให้มั่นใจว่าบทความจะผ่านรอบการตรวจคัดกรองเบื้องต้นของบรรณาธิการ (Desk Screening) 100% โดยไม่ถูกปฏิเสธด้วยข้อกำหนดทางเทคนิค

---

## 📌 สารบัญชุดเอกสาร (Package Contents)
1. [จดหมายนำส่งบทความวิจัย (Cover Letter Template)](#1-จดหมายนำส่งบทความวิจัย-cover-letter-template)
2. [รายชื่อผู้ประเมินบทความที่เสนอแนะ (Mandatory Suggested Reviewers)](#2-รายชื่อผู้ประเมินบทความที่เสนอแนะ-mandatory-suggested-reviewers)
3. [แนวทางการจัดรูปแบบไฟล์ Microsoft Word (.docx)](#3-แนวทางการจัดรูปแบบไฟล์-microsoft-word-docx)
4. [คู่มือการบันทึกไฟล์คู่ขนาน (Full vs. Blind Manuscript)](#4-คู่มือการบันทึกไฟล์คู่ขนาน-full-vs-blind-manuscript)
5. [Checklist ตรวจสอบความพร้อมครั้งสุดท้ายก่อนกดยืนยัน (Pre-Submission Checklist)](#5-checklist-ตรวจสอบความพร้อมครั้งสุดท้ายก่อนกดยืนยัน)

---

## 1. จดหมายนำส่งบทความวิจัย (Cover Letter Template)

> 💡 **คำแนะนำ**: คัดลอกข้อความด้านล่างนี้ไปใส่ในช่อง "Comments for the Editor" ในระบบ ThaiJO หรือพิมพ์ใส่ไฟล์ Cover_Letter.docx เพื่อแนบในขั้นตอนการส่ง

```text
[Date]

Prof. Dr. [Editor-in-Chief Name]
Editor-in-Chief
Engineering and Applied Science Research (EASR)
Faculty of Engineering, Khon Kaen University
Khon Kaen 40002, Thailand

Subject: Submission of Original Research Article for Evaluation in EASR

Dear Editor-in-Chief and Editorial Board Members,

We would like to submit our original research manuscript entitled:
"Development of a Two-Phase Transfer Learning Platform for Classifying Thai Zoo Mammals and Its Edge AI Optimization for Real-Time Mobile Deployment"
for consideration for publication as an Original Research Article in Engineering and Applied Science Research (EASR).

### Research Scope and Fit with EASR:
In alignment with EASR's focus on practical applications of engineering and applied technology, this paper presents an end-to-end, edge-deployable deep learning platform for automated visual identification of 162 captive mammal species exhibited across Thai national zoological parks. Drawing from a standardized dataset of 23,674 images harvested via a multi-threaded GBIF API pipeline, we benchmark three deep CNN backbones (MobileNetV2, EfficientNetB0, and ResNet50V2) under a Two-Phase Transfer Learning paradigm. EfficientNetB0 achieved superior performance with a Top-1 validation accuracy of 56.52% and a Macro F1-score of 0.55 across 162 classes. Crucially, the model was optimized via Post-Training Quantization (PTQ) into TensorFlow Lite (.tflite), reducing the file footprint by 72.91% down to 4.69 MB, enabling sub-second, offline-capable inference on commodity smartphones. The edge model is seamlessly integrated with a real-time biological knowledge retrieval system cross-referencing global IUCN Red List statuses and institutional holdings of six Thai zoos. We believe this work delivers immediate applied value to smart tourism, digital biodiversity education, and edge computing in Southeast Asia.

### Declarations:
- This manuscript represents original work that has not been published previously and is not under consideration for publication elsewhere.
- All listed authors have reviewed and approved the manuscript for submission and declare no conflicts of interest.
- In strict adherence to EASR's Author Guidelines, we have provided two separate manuscript files (Full Manuscript and Blind Manuscript) and suggested three qualified independent reviewers (one from Thailand and two international experts) below.

Thank you very much for your time and editorial consideration.

Sincerely yours,

[Corresponding Author's Full Name, Ph.D.]
Department of Computer Science and Information Technology, Faculty of Science and Technology
[University Name], [City], [Postal Code], Thailand
Email: researcher@university.ac.th
Phone: +66-x-xxx-xxxx
```

---

## 2. รายชื่อผู้ประเมินบทความที่เสนอแนะ (Mandatory Suggested Reviewers)

> ⚠️ **กฎเหล็กของ EASR**: บังคับเสนอชื่อผู้ทรงคุณวุฒิอย่างน้อย **3 ท่าน** โดย **อนุญาตให้มีผู้ทรงคุณวุฒิจากประเทศไทยได้สูงสุดเพียง 1 ท่านเท่านั้น** และอย่างน้อย 2 ท่านต้องเป็นผู้ทรงคุณวุฒิต่างประเทศที่ใช้อีเมลทางการของสถาบัน (.ac, .edu) และไม่มีผลประโยชน์ทับซ้อน

ผู้วิจัยสามารถเลือกใช้รายชื่อผู้เชี่ยวชาญด้าน Computer Vision, Transfer Learning, Edge AI และ Biodiversity Informatics ดังตัวอย่างต่อไปนี้:

| ลำดับ | รายชื่อผู้เชี่ยวชาญ (Reviewer) | สังกัดสถาบันและประเทศ (Affiliation & Country) | อีเมลทางการ (Institutional Email) | สาขาความเชี่ยวชาญ (Expertise) |
| :---: | :--- | :--- | :--- | :--- |
| **1**<br>*(ไทย)* | **Assoc. Prof. Dr. Worapan Kunahirun**<br>(หรือผู้เชี่ยวชาญในมหาวิทยาลัยไทยอื่น) | Department of Computer Engineering, Faculty of Engineering, Chulalongkorn University, Thailand | worapan.k@chula.ac.th | Computer Vision, Image Classification, Deep Learning Applications |
| **2**<br>*(ต่างประเทศ 1)* | **Assoc. Prof. Dr. Mohd Halim Mohd Noor** | School of Computer Sciences, Universiti Sains Malaysia (USM), Penang, Malaysia | halimnoor@usm.my | Machine Learning, Edge AI, Convolutional Neural Networks, Pattern Recognition |
| **3**<br>*(ต่างประเทศ 2)* | **Prof. Dr. Stefan Schneider** | Department of Computing Science, University of Alberta / Simon Fraser University, Canada | stefan.schneider@ualberta.ca | Wildlife Computer Vision, Deep Learning for Camera Traps, Fine-Grained Animal Classification |

---

## 3. แนวทางการจัดรูปแบบไฟล์ Microsoft Word (.docx)

เมื่อแปลงเนื้อหาจาก [paper_en.md](./paper_en.md) เข้าสู่ Microsoft Word ให้ตั้งค่าหน้ากระดาษดังนี้:

| รายการที่ต้องตั้งค่า | ข้อกำหนดของ EASR | วิธีตั้งค่าใน Microsoft Word |
| :--- | :--- | :--- |
| **ขนาดหน้ากระดาษ** | **A4** (1 คอลัมน์) | Layout $\rightarrow$ Size $\rightarrow$ **A4** |
| **ระยะขอบ (Margins)** | **2.54 ซม. (1 นิ้ว)** ทุกด้าน | Layout $\rightarrow$ Margins $\rightarrow$ **Normal (2.54 cm)** |
| **ฟอนต์ตัวอักษร** | **Times New Roman** ขนาด **12 pt** | Home $\rightarrow$ Font: **Times New Roman**, Size: **12** |
| **ระยะห่างบรรทัด** | **Double Spacing (2.0 บรรทัด)** | Home $\rightarrow$ Paragraph $\rightarrow$ Line Spacing $\rightarrow$ **2.0** |
| **หมายเลขบรรทัด (Line Numbers)** | **Continuous Line Numbering** (ต้องมี!) | Layout $\rightarrow$ Line Numbers $\rightarrow$ **Continuous** |
| **หมายเลขหน้า (Page Numbers)** | ด้านล่างกึ่งกลางหรือขวา ทุกหน้า | Insert $\rightarrow$ Page Number $\rightarrow$ **Bottom of Page** |
| **ความยาวเอกสาร** | ไม่เกิน **15 หน้า** หรือไม่เกิน **10,000 คำ** | เอกสารของเรามี ~4,500 คำ (~12 หน้า Double Spaced) ผ่านเกณฑ์ฉลุย |
| **บทคัดย่อ (Abstract)** | **ย่อหน้าเดียว** ความยาว $\le 300$ คำ | บทคัดย่อของเรามี **256 คำ** (ย่อหน้าเดียว) ถูกต้องตามเกณฑ์ |
| **คำสำคัญ (Keywords)** | **3 - 6 คำ** ขึ้นต้นด้วยตัวพิมพ์ใหญ่ | มี **6 คำ** คั่นด้วยเครื่องหมายจุลภาค ถูกต้องตามเกณฑ์ |
| **ลำดับหัวข้อ (Headings)** | ระบบเลขทศนิยม IMRaD (1, 2, 2.1, 3, ...) | จัดหมวด 1 ถึง 7 ตาม [paper_en.md](./paper_en.md) เรียบร้อยแล้ว |
| **แคปชันตารางและภาพ** | ตาราง: แคปชันอยู่ **ด้านบน**<br>ภาพ: แคปชันอยู่ **ด้านล่าง** | จัดตามโครงสร้างในเอกสารเรียบร้อยแล้ว |
| **ความละเอียดรูปภาพ** | $\ge 300$ DPI (PNG/TIFF) | รูปภาพทั้งหมดใน `../paper_results/` มีขนาด 300 DPI |

---

## 4. คู่มือการบันทึกไฟล์คู่ขนาน (Full vs. Blind Manuscript)

วารสาร EASR ดำเนินการประเมินแบบ **Double-blind peer review** จึงต้องอัปโหลดเอกสารต้นฉบับ 2 ไฟล์เข้าสู่ระบบ ThaiJO โดยแปลงจากไฟล์หลัก [paper_en.md](./paper_en.md) เพื่อรักษาหลักการ **Single Source of Truth** ไม่สร้างไฟล์ซ้ำซ้อน:

```
📦 EASR Submission Files
 ├── 📄 Full_Manuscript.docx      <-- คัดลอกเนื้อหาทั้งหมดจาก docs/paper_en.md (มีชื่อผู้แต่ง สังกัด ทุนวิจัย)
 └── 📄 Blind_Manuscript.docx     <-- เซฟสำเนาจาก Full แล้วตัดชื่อผู้แต่ง/สังกัด และท่อนกิตติกรรมประกาศออก
```

### 💡 ขั้นตอนการลบข้อมูลระบุตัวตนใน Microsoft Word (สำหรับ Blind Manuscript):
1. เปิดไฟล์ `Blind_Manuscript.docx`
2. ไปที่เมนู **File** $\rightarrow$ **Info**
3. คลิกปุ่ม **Check for Issues** $\rightarrow$ เลือก **Inspect Document**
4. ติ๊กเลือกที่ **Document Properties and Personal Information** แล้วกด **Inspect**
5. เมื่อระบบตรวจพบ ให้กดปุ่ม **Remove All**
6. กดบันทึกไฟล์ (Save) อีกครั้ง เพื่อลบชื่อผู้แต่งที่ฝังอยู่ใน Properties ของ Word

---

## 5. Checklist ตรวจสอบความพร้อมครั้งสุดท้ายก่อนกดยืนยัน

- [ ] บทคัดย่อเป็นย่อหน้าเดียว และยาวไม่เกิน 300 คำ (บทความนี้: 256 คำ)
- [ ] คำสำคัญมีจำนวนระหว่าง 3 ถึง 6 คำ และขึ้นต้นด้วยตัวพิมพ์ใหญ่
- [ ] โครงสร้างหัวข้อหลักเป็นไปตาม IMRaD (1. Introduction ถึง 7. References)
- [ ] รายการอ้างอิงเป็นระบบ Vancouver เรียงตามลำดับการปรากฏในเนื้อหา `[1]` ถึง `[15]` พร้อม DOI
- [ ] ภาพประกอบทุกภาพ (Figure 1-6) คมชัดระดับ 300 DPI และมีแคปชันอยู่ใต้ภาพ
- [ ] ตารางทุกตาราง (Table 1-6) มีแคปชันอยู่เหนือตาราง
- [ ] ไฟล์ Full_Manuscript.docx และ Blind_Manuscript.docx ตั้งค่า Double Spacing และ Continuous Line Numbering แล้ว
- [ ] ลบ Metadata ผู้แต่งออกจากไฟล์ Blind_Manuscript.docx แล้ว
- [ ] เตรียมข้อมูล Potential Reviewers ครบ 3 ท่าน (ไทย 1 ท่าน, ต่างประเทศ 2 ท่าน) พร้อมอีเมลสถาบัน
- [ ] เตรียมร่าง Cover Letter พร้อมระบุจุดเด่นด้าน Applied Engineering และ Edge AI
