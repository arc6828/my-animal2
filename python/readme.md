# 📚 Thai Zoo Animals Datasets (ชุดข้อมูลสัตว์ในสวนสัตว์ไทยแยกตามประเภท)

ชุดข้อมูลรวบรวมรายชื่อสายพันธุ์สัตว์ที่จัดแสดงและดูแลอยู่ภายในสวนสัตว์และสถานแสดงพันธุ์สัตว์น้ำของประเทศไทย ทั้งของ **องค์การสวนสัตว์แห่งประเทศไทย ในพระบรมราชูปถัมภ์ (ZPOT)**, กรมอุทยานแห่งชาติฯ (DNP), และสวนสัตว์เอกชนชั้นนำ (Safari World, Chiang Mai Night Safari, Oasis Sea World, Chiang Mai Zoo Aquarium)

---

## 📁 ไฟล์ชุดข้อมูลแยกตามประเภท (.csv และ .json)

| ลำดับ | ไฟล์ชุดข้อมูล (.csv) | ไฟล์ JSON (.json) | ประเภทสัตว์ (Class) | จำนวนชนิด | ตัวอย่างชนิดเด่นในสวนสัตว์ไทย |
| :---: | :--- | :--- | :--- | :---: | :--- |
| 1 | [`data/thai_zoo_mammals.csv`](./data/thai_zoo_mammals.csv) | [`data/mammals.json`](./data/mammals.json) | **สัตว์เลี้ยงลูกด้วยนม (Mammalia)** | **250 ชนิด** | ช้างเอเชีย, แพนด้ายักษ์ (ช่วงช่วง-หลินฮุ่ย), ฮิปโปแคระ (หมูเด้ง), ฮิปโปโปเตมัส (แม่มะลิ), ยีราฟ, เสือโคร่งไซบีเรีย, ลิงแมนดริล, ลิงซากิหน้าขาว, ควายแคระอะโนอา, กวางพูดู, แอดดักซ์, เจเรนุค, ชินชิลลา, ตุ่นอิคิดนา, ค้างคาวคุณกิตติ, วาฬนำร่อง |
| 2 | [`data/thai_zoo_birds.csv`](./data/thai_zoo_birds.csv) | [`data/birds.json`](./data/birds.json) | **สัตว์ปีก / นก (Aves)** | **100 ชนิด** | นกเพนกวินฮัมโบลด์ (พาเหรดเพนกวิน), นกฟลามิงโกใหญ่, นกกระจอกเทศ, นกกระเรียนพันธุ์ไทย, นกกก, นกเงือกหัวหงอก, นกแก้วมาคอว์, นกทูแคน, ไก่ฟ้าสีทอง, นกช้อนหอยขาว |
| 3 | [`data/thai_zoo_reptiles.csv`](./data/thai_zoo_reptiles.csv) | [`data/reptiles.json`](./data/reptiles.json) | **สัตว์เลื้อยคลาน (Reptilia)** | **70 ชนิด** | จระเข้น้ำจืดไทย, จระเข้น้ำเค็ม, ตะโขง, ตะเกา, เต่ายักษ์อัลดาบรา, เต่าซูลคาตา, ตะพาบม่านลายไทย, มังกรโคโมโด, กิ้งก่าบาซิลิสก์, งูเหลือม, งูหลามทอง, งูจงอาง, อนาคอนดา |
| 4 | [`data/thai_zoo_amphibians.csv`](./data/thai_zoo_amphibians.csv) | [`data/amphibians.json`](./data/amphibians.json) | **สัตว์สะเทินน้ำสะเทินบก (Amphibia)** | **35 ชนิด** | กบทูดเบตง, กะท่างน้ำดอยช้าง, กะท่างปันไฮ, แอกโซลอตล์, กบลูกศรพิษสีน้ำเงิน/ทอง/สตรอว์เบอร์รี, กบตาหนามแพ็กแมน, กบมะเขือเทศ, ปาดบินวอลเลซ, กบมอสเวียดนาม |
| 5 | [`data/thai_zoo_fishes.csv`](./data/thai_zoo_fishes.csv) | [`data/fishes.json`](./data/fishes.json) | **สัตว์น้ำและปลา (Fishes & Marine)** | **60 ชนิด** | ปลาบึก, ปลากระโห้, ปลาช่อนอเมซอน, ปลากระเบนราหูน้ำจืด, ฉลามเสือดาว, ฉลามหัวบาตร, ปลาการ์ตูน, ปลาบลูแทงก์, ปลาการ์ปิรารูคู, ม้าน้ำ, แมงกะพรุนเรืองแสง, หมึกยักษ์ |
| 🌟 | [`data/thai_zoo_all_animals.csv`](./data/thai_zoo_all_animals.csv) | [`data/all_animals.json`](./data/all_animals.json) | **รวมสัตว์ทุกประเภทในไฟล์เดียว** | **115 ชนิด** | ชุดตัวแทนสัตว์เด่นครบทั้ง 5 คลาสหลัก พร้อมคอลัมน์ Class |
| 📊 | **รวมทั้งหมดในแต่ละหมวด** | | **5 คลาสชีววิทยา** | **515 ชนิด** | **ครอบคลุมชนิดพันธุ์จัดแสดงจริงในสวนสัตว์และอควาเรียมชั้นนำทั่วไทย** |

*(มีสำเนาของทุกไฟล์ทั้ง .csv และ .json อยู่ที่โฟลเดอร์ `data/species/` และ `public/data/` สำหรับนำไปใช้ใน Next.js ได้โดยตรง)*

---

## 🏷️ รูปแบบการอ้างอิง (Citation Formats)

### 1. APA Style (7th Edition)
```text
SmartZoo Project. (2026). Thai Zoo Animals Datasets: A Multi-Taxa Catalog of Species in Thai Zoological Parks and Aquariums (Version 1.1.0) [Data set]. GitHub. https://github.com/arc6828/my-animal2
```

### 2. BibTeX (สำหรับงานวิจัยและ LaTeX)
```bibtex
@dataset{thai_zoo_animals_2026,
  author       = {{SmartZoo Project}},
  title        = {Thai Zoo Animals Datasets: A Multi-Taxa Catalog of Species in Thai Zoological Parks and Aquariums},
  year         = {2026},
  version      = {1.1.0},
  publisher    = {GitHub Repository},
  howpublished = {\url{https://github.com/arc6828/my-animal2}},
  note         = {Pre-trained biodiversity knowledge cross-referenced with ZPOT, DNP Thailand, and GBIF}
}
```

---

## 📋 คำอธิบายฟิลด์ข้อมูล (Data Schema)

ทุกไฟล์ใช้โครงสร้างคอลัมน์มาตรฐานเดียวกัน เพื่อให้ง่ายต่อการนำไปวิเคราะห์หรือรวมข้อมูลด้วย `pandas.concat()`:

| ฟิลด์ข้อมูล | ชนิดข้อมูล | คำอธิบาย | ตัวอย่างค่า |
| :--- | :--- | :--- | :--- |
| `id` | Integer | รหัสลำดับที่ของสัตว์ในไฟล์ | `1`, `2` |
| `thai_name` | String | ชื่อสามัญภาษาไทย | `นกเพนกวินฮัมโบลด์`, `จระเข้น้ำจืดพันธุ์ไทย` |
| `english_name` | String | ชื่อสามัญภาษาอังกฤษ | `Humboldt Penguin`, `Siamese Crocodile` |
| `scientific_name` | String | ชื่อวิทยาศาสตร์ตามหลักทวินาม | `Spheniscus humboldti`, `Crocodylus siamensis` |
| `order` | String | อันดับทางอนุกรมวิธาน (Order) | `Sphenisciformes`, `Crocodilia` |
| `family` | String | วงศ์ (Family) | `Spheniscidae`, `Crocodylidae` |
| `category` | String | หมวดหมู่ภาษาไทย | `สัตว์ปีก (นก)`, `สัตว์เลื้อยคลาน`, `สัตว์น้ำและปลา` |
| `origin_type` | String | ถิ่นกำเนิด | `สัตว์ประจำถิ่นไทย (Native)` / `สัตว์ต่างถิ่นนำเข้า (Exotic)` |
| `iucn_status` | String | สถานะการอนุรักษ์ตาม IUCN Red List | `CR`, `EN`, `VU`, `NT`, `LC` |
| `thai_zoos` | String | สวนสัตว์/อควาเรียมในไทยที่จัดแสดง | `สวนสัตว์เปิดเขาเขียว, สวนสัตว์เชียงใหม่` |
| `highlight_notes` | String | จุดเด่น บุคคลเด่น พฤติกรรมสำคัญ | `ดาวเด่นโชว์พาเหรดเพนกวินเดินเตาะแตะ` |

---

## 📄 สัญญาอนุญาตการใช้งาน (License)

Creative Commons Attribution 4.0 International (**CC BY 4.0**)
