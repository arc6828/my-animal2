"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="flex-1 min-h-screen flex flex-col antialiased bg-zinc-50">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-emerald-100/40 shadow-sm shadow-emerald-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <span className="text-xl">🐾</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-zinc-800 tracking-tight flex items-center gap-1.5">
                SmartZoo <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200/50 font-medium">Research</span>
              </h1>
              <p className="text-[10px] text-zinc-500">AI-Powered Animal Recognition</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 px-3.5 py-2 rounded-xl transition-all border border-emerald-200/50 flex items-center gap-1.5 shadow-sm"
            >
              <span>🐾</span> ย้อนกลับหน้าสแกน
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
        
        {/* Academic Header Banner */}
        <section className="bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-emerald-950/10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/5 blur-2xl"></div>
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-wider uppercase bg-white/20 px-3 py-1 rounded-full w-max backdrop-blur-md">
              โครงการวิจัยและนวัตกรรมดิจิทัล
            </span>
            <h1 className="text-xl sm:text-3xl font-bold leading-snug tracking-tight max-w-4xl text-glow-light">
              การพัฒนาแพลตฟอร์มดิจิทัลบูรณาการฐานข้อมูลสัตว์ร่วมกับ LINE Chatbot สำหรับจำแนกสัตว์ในสวนสัตว์โดยใช้ปัญญาประดิษฐ์โครงข่ายประสาทเทียมเชิงลึก
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium font-sans italic opacity-90 border-l-2 border-emerald-300 pl-4 mt-2">
              Development of a Digital Platform Integrating Animal Databases with a LINE Chatbot for Zoo Animal Classification Using Deep Convolutional Neural Networks
            </p>
          </div>
        </section>

        {/* Background and Problem Statement Section */}
        <section className="bg-white rounded-2xl border border-zinc-200/60 p-6 sm:p-10 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100">
            <span className="text-2xl">📝</span>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-800 tracking-tight">ความสำคัญและที่มาของปัญหา</h2>
          </div>
          
          <div className="text-zinc-600 text-sm leading-relaxed space-y-4 font-sans text-justify">
            <p>
              เทคโนโลยีปัญญาประดิษฐ์ (Artificial Intelligence: AI) และโครงข่ายประสาทเทียมเชิงลึก (Deep Neural Networks: DNN) เป็นเรื่องที่ได้รับความสนใจอย่างมากในยุคดิจิทัล เนื่องจากความสามารถในการประมวลผลข้อมูลจำนวนมหาศาลและการเรียนรู้จากข้อมูลเหล่านั้นโดยไม่ต้องพึ่งพากฎเกณฑ์ที่กำหนดไว้ล่วงหน้า (LeCun et al., 2015; Goodfellow et al., 2016) AI มีการประยุกต์ใช้ในหลากหลายสาขา เช่น การแพทย์ การเงิน การศึกษา และการผลิต โดยเฉพาะในด้านการจำแนกและการทำนายผลจากข้อมูลภาพและเสียง โครงข่ายประสาทเทียมเชิงลึก (DNN) ซึ่งเป็นสาขาหนึ่งของ AI ใช้สถาปัตยกรรมที่มีหลายชั้นในการเรียนรู้จากข้อมูลอย่างลึกซึ้ง ช่วยให้สามารถจำแนกข้อมูลที่มีความซับซ้อนสูง เช่น การจำแนกภาพสัตว์ หรือการวิเคราะห์พฤติกรรมต่าง ๆ การใช้เทคโนโลยีเหล่านี้ไม่เพียงแต่ช่วยเพิ่มความแม่นยำในการประมวลผลข้อมูล แต่ยังสามารถปรับปรุงประสิทธิภาพและลดข้อผิดพลาดในกระบวนการตัดสินใจในหลาย ๆ ด้าน ทำให้ AI และ DNN กลายเป็นเครื่องมือสำคัญในการพัฒนาและสร้างนวัตกรรมในหลาย ๆ อุตสาหกรรม
            </p>
            <p>
              ปัจจุบันสวนสัตว์เป็นแหล่งเรียนรู้ที่สำคัญเกี่ยวกับระบบนิเวศและสัตว์ป่า แต่ผู้เยี่ยมชมมักประสบปัญหาในการจดจำและเข้าใจข้อมูลเกี่ยวกับสัตว์ เนื่องจากป้ายข้อมูลที่มีอยู่อาจไม่เพียงพอหรือครอบคลุมรายละเอียดที่ต้องการ นอกจากนี้ การค้นหาข้อมูลด้วยตนเองอาจใช้เวลานาน โดยเฉพาะอย่างยิ่งเมื่อไม่ทราบชื่อของสัตว์ที่ต้องการศึกษา ทำให้ขาดเครื่องมือที่ช่วยให้สามารถเข้าถึงข้อมูลได้ง่ายและรวดเร็ว การใช้ระบบจำแนกสัตว์แบบดั้งเดิมมักอาศัยบุคลากรในการระบุชนิดสัตว์ ซึ่งอาจเกิดข้อผิดพลาดหรือใช้เวลานาน (Goodfellow et al., 2016) การนำ AI มาใช้ในการจำแนกสัตว์จากภาพถ่ายสามารถช่วยให้การจัดการฐานข้อมูลสัตว์มีความแม่นยำและมีประสิทธิภาพมากขึ้น นอกจากนี้การใช้แพลตฟอร์มที่สามารถเข้าถึงได้ง่ายผ่าน LINE Chatbot ยังช่วยให้ประชาชนทั่วไป นักเรียน สามารถเข้าถึงข้อมูลเกี่ยวกับสัตว์ได้สะดวกยิ่งขึ้น
            </p>
            <p>
              ด้วยความก้าวหน้าของปัญญาประดิษฐ์และการรู้จำภาพ ทำให้สามารถนำเทคโนโลยี AI มาประยุกต์ใช้ในการจำแนกสายพันธุ์สัตว์จากภาพถ่ายได้อย่างแม่นยำ อีกทั้ง LINE เป็นแพลตฟอร์มที่ได้รับความนิยมในประเทศไทย จึงเป็นช่องทางที่เหมาะสมสำหรับการพัฒนา Chatbot ที่ช่วยให้ผู้ใช้สามารถส่งภาพสัตว์เพื่อระบุสายพันธุ์และรับข้อมูลได้แบบเรียลไทม์ (Russakovsky et al., 2015) สวนสัตว์หลายแห่งยังคงใช้วิธีการดั้งเดิมในการให้ข้อมูลเกี่ยวกับสัตว์ เช่น ป้ายข้อมูลที่ติดตั้งไว้ตามจุดจัดแสดง ซึ่งอาจมีข้อมูลที่จำกัดและไม่สามารถตอบคำถามหรือโต้ตอบกับผู้เข้าชมได้อย่างมีประสิทธิภาพ แม้ว่าบางแห่งจะเริ่มนำเทคโนโลยีดิจิทัลมาใช้ เช่น ระบบ QR Code เพื่อเชื่อมโยงไปยังเว็บไซต์ข้อมูลสัตว์ หรือแอปพลิเคชันสวนสัตว์ แต่ระบบเหล่านี้ยังไม่สามารถให้ประสบการณ์การเรียนรู้แบบโต้ตอบได้อย่างเต็มที่ นอกจากนี้ การจำแนกสัตว์จากภาพถ่ายยังเป็นปัญหาสำคัญ เนื่องจากสัตว์แต่ละชนิดมีลักษณะเฉพาะที่คล้ายคลึงกัน ทำให้การระบุชนิดสัตว์จากภาพถ่ายด้วยวิธีการแบบดั้งเดิมทำได้ยาก โดยเฉพาะในกรณีที่ภาพถ่ายมีคุณภาพต่ำหรือสัตว์อยู่ในท่าทางที่แตกต่างจากข้อมูลอ้างอิง
            </p>
            <p>
              การวิจัยนี้จึงมุ่งเน้นพัฒนาแพลตฟอร์มที่บูรณาการฐานข้อมูลสัตว์เข้ากับ LINE Chatbot และปัญญาประดิษฐ์โครงข่ายประสาทเทียมเชิงลึก เพื่อให้ผู้ใช้สามารถจำแนกสัตว์และเข้าถึงข้อมูลที่ถูกต้องได้สะดวกยิ่งขึ้น ระบบนี้จะช่วยส่งเสริมการเรียนรู้ในสวนสัตว์ เพิ่มความสะดวกในการรับข้อมูล และสนับสนุนการใช้เทคโนโลยี AI ในการศึกษาและอนุรักษ์สัตว์ป่า ซึ่งสามารถต่อยอดไปสู่การพัฒนาเทคโนโลยีเพื่อการศึกษาด้านสัตววิทยาและสิ่งแวดล้อมในอนาคต นอกจากประโยชน์ต่อการบริหารจัดการสวนสัตว์แล้ว ระบบที่พัฒนาขึ้นยังสามารถนำไปประยุกต์ใช้ในโรงเรียนเพื่อสนับสนุนการเรียนการสอนด้านชีววิทยาและเทคโนโลยีสารสนเทศ นักเรียนสามารถเรียนรู้การจำแนกชนิดสัตว์ผ่าน Chatbot (LeCun, Bengio, & Hinton, 2015) ซึ่งช่วยเพิ่มความสนุกและความน่าสนใจในการศึกษา รวมถึงการพัฒนาแนวคิดด้าน AI และการเรียนรู้เชิงลึก นอกจากนี้ ครูสามารถใช้แพลตฟอร์มดังกล่าวเป็นสื่อการเรียนการสอนที่ช่วยส่งเสริมการเรียนรู้เชิงโต้ตอบ (Interactive Learning) และการศึกษานอกห้องเรียนผ่านการทัศนศึกษาเสมือนจริงได้อีกด้วย ส่งผลให้การเรียนรู้มีความทันสมัยและสอดคล้องกับแนวทางการศึกษาในศตวรรษที่ 21
            </p>
          </div>
        </section>

        {/* Research Objectives & Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Objectives Card */}
          <section className="bg-white rounded-2xl border border-zinc-200/60 p-6 sm:p-8 shadow-sm flex flex-col gap-5">
            <h3 className="text-base font-bold text-emerald-700 flex items-center gap-2 uppercase tracking-wide">
              🎯 วัตถุประสงค์การวิจัย
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center text-xs shrink-0 font-bold">1</span>
                <span>เพื่อสร้างและพัฒนาโครงข่ายประสาทเทียมเชิงลึก (Deep Neural Networks) สำหรับจำแนกสายพันธุ์สัตว์ป่าและสัตว์เลี้ยงจากภาพถ่ายที่มีความแม่นยำสูง</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center text-xs shrink-0 font-bold">2</span>
                <span>เพื่อออกแบบและพัฒนาบริการ LINE Chatbot ที่เชื่อมต่อกับระบบ AI สำหรับตอบกลับข้อมูลชีววิทยาของสัตว์แบบโต้ตอบเรียลไทม์</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center text-xs shrink-0 font-bold">3</span>
                <span>เพื่อสร้างแพลตฟอร์มเว็บแอปพลิเคชันสำหรับบูรณาการข้อมูลความรู้ สถิติ และการจัดการฐานข้อมูลสัตว์ที่สอดคล้องกับมาตรฐานทางธรรมชาติวิทยา</span>
              </li>
            </ul>
          </section>

          {/* Expected Benefits Card */}
          <section className="bg-white rounded-2xl border border-zinc-200/60 p-6 sm:p-8 shadow-sm flex flex-col gap-5">
            <h3 className="text-base font-bold text-emerald-700 flex items-center gap-2 uppercase tracking-wide">
              💎 ประโยชน์ที่คาดว่าจะได้รับ
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
              <li className="flex gap-2.5 items-start">
                <span className="text-lg shrink-0 leading-none">🦁</span>
                <span><strong>ด้านการท่องเที่ยวและการท่องเที่ยวศึกษา (Eco-Tourism):</strong> ช่วยอำนวยความสะดวกให้นักท่องเที่ยวสามารถรับข้อมูลสัตว์ได้รวดเร็วเพียงปลายนิ้วสัมผัส</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-lg shrink-0 leading-none">🏫</span>
                <span><strong>ด้านการศึกษา (Education):</strong> เป็นสื่อการเรียนการสอนเชิงรุกและเครื่องมือนวัตกรรมดิจิทัลสำหรับวิชาชีววิทยาและวิทยาการคำนวณในสถานศึกษา</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-lg shrink-0 leading-none">📊</span>
                <span><strong>ด้านการจัดการและวิเคราะห์เชิงลึก:</strong> สวนสัตว์สามารถวิเคราะห์ประวัติการจำแนกประเภทสัตว์เพื่อใช้วางแผนการท่องเที่ยวและปรับปรุงการบริหารข้อมูลกรงจัดแสดง</span>
              </li>
            </ul>
          </section>

        </div>

        {/* System Architecture Section */}
        <section className="bg-white rounded-2xl border border-zinc-200/60 p-6 sm:p-10 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-1.5 pb-4 border-b border-zinc-100">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-800 tracking-tight flex items-center gap-2.5">
              <span>🌐</span> สถาปัตยกรรมระบบดิจิทัล (System Architecture)
            </h2>
            <p className="text-xs text-zinc-500">แสดงการเชื่อมโยงแพลตฟอร์มดิจิทัล ฐานข้อมูลสัตว์ และระบบปัญญาประดิษฐ์</p>
          </div>
          
          {/* Visual Architecture Flow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4 relative">
            
            {/* Step 1 */}
            <div className="bg-zinc-50/80 p-5 rounded-2xl border border-zinc-200 flex flex-col items-center text-center gap-3 relative group hover:border-emerald-500/20 hover:bg-white transition-all shadow-sm">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-semibold shadow-inner">
                📲
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wide">1. ผู้ใช้งานส่งรูปสัตว์</h4>
                <p className="text-[11px] text-zinc-500 mt-1">อัปโหลดรูปผ่านแอป LINE หรือกล้องถ่ายภาพบนหน้าเว็บ</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-zinc-50/80 p-5 rounded-2xl border border-zinc-200 flex flex-col items-center text-center gap-3 relative group hover:border-emerald-500/20 hover:bg-white transition-all shadow-sm">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-semibold shadow-inner">
                ⚡
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wide">2. Webhook & API Gateway</h4>
                <p className="text-[11px] text-zinc-500 mt-1">รับคำขอและตรวจสอบลายเซ็นความปลอดภัยบนระบบคลาวด์</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-zinc-50/80 p-5 rounded-2xl border border-zinc-200 flex flex-col items-center text-center gap-3 relative group hover:border-emerald-500/20 hover:bg-white transition-all shadow-sm">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-semibold shadow-inner">
                🔬
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wide">3. Deep Learning Engine</h4>
                <p className="text-[11px] text-zinc-500 mt-1">ประมวลผลวิเคราะห์รูปภาพด้วยโมเดลวิเคราะห์ภาพแบบหลายรูปแบบ</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-zinc-50/80 p-5 rounded-2xl border border-zinc-200 flex flex-col items-center text-center gap-3 relative group hover:border-emerald-500/20 hover:bg-white transition-all shadow-sm">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-semibold shadow-inner">
                📊
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wide">4. บูรณาการฐานข้อมูล</h4>
                <p className="text-[11px] text-zinc-500 mt-1">ดึงสเปกชีววิทยา สถานะอนุรักษ์ พร้อมส่งข้อมูล Flex Message กลับ</p>
              </div>
            </div>
            
          </div>
        </section>

        {/* Deep Learning model technology */}
        <section className="bg-white rounded-2xl border border-zinc-200/60 p-6 sm:p-10 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-1.5 pb-4 border-b border-zinc-100">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-800 tracking-tight flex items-center gap-2.5">
              <span>🧠</span> เทคโนโลยีโมเดลปัญญาประดิษฐ์ (Deep Learning Model)
            </h2>
            <p className="text-xs text-zinc-500">นวัตกรรมการเรียนรู้ของโครงข่ายประสาทเทียมและวิธีการทดสอบเชิงลึก</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50 flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">โมเดลประมวลผลหลัก</span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                การจำแนกภาพแบบ Multimodal (ภาพและข้อความ) ด้วยโครงข่ายการเรียนรู้เชิงลึกของ <strong>Gemini 2.5 Flash / Pro</strong> รองรับการระบุลักษณะสัตว์ป่าภายใต้สภาพแวดล้อมที่ท้าทาย
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50 flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">กระบวนการวิเคราะห์</span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                รูปภาพที่ส่งจากผู้ใช้จะถูกแปลงเป็นข้อมูล Base64 และประเมินโครงสร้างภาพผ่าน Vision Transformers เพื่อส่งออกผลลัพธ์ข้อมูลสายพันธุ์ตามพิกัดจำแนกวิทยาศาสตร์ (Taxonomy Schema)
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50 flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">การประเมินผล</span>
              <p className="text-xs text-zinc-600 leading-relaxed">
                โมเดลได้รับการทดสอบความถูกต้องอย่างสม่ำเสมอ ทั้งทางด้านความรวดเร็วในการส่งข้อมูลย้อนกลับ (Inference Time) และความถูกต้องในการแยกแยะสายพันธุ์ที่มีลักษณะเฉพาะใกล้เคียงกัน
              </p>
            </div>
          </div>
        </section>

        {/* Research Team Section */}
        <section className="bg-white rounded-2xl border border-zinc-200/60 p-6 sm:p-10 shadow-sm flex flex-col gap-8">
          <div className="flex flex-col gap-1.5 pb-4 border-b border-zinc-100">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-800 tracking-tight flex items-center gap-2.5">
              <span>👥</span> คณะผู้วิจัย (Research Team)
            </h2>
            <p className="text-xs text-zinc-500">รายนามคณะผู้จัดทำและพัฒนาโครงการวิจัยพร้อมวุฒิการศึกษา</p>
          </div>

          <div className="flex flex-col gap-10">
            {/* Project Leader - Premium Row Layout */}
            <div className="flex flex-col items-center">
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-4 py-1.5 rounded-full border border-emerald-200/50 mb-4 uppercase tracking-wider shadow-sm">
                หัวหน้าโครงการวิจัย
              </span>
              <div className="w-full max-w-2xl bg-gradient-to-br from-emerald-50/40 via-teal-50/20 to-white p-6 sm:p-8 rounded-3xl border border-emerald-100/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="relative h-44 w-32 shrink-0 rounded-2xl overflow-hidden border-4 border-emerald-500/20 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://sci.vru.ac.th/assets/images/people/img_20241128093525000000_1732761325984_edit.jpg"
                    alt="อาจารย์ ดร.ดาวรถา วีระพันธ์"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-2.5 flex-1">
                  <div>
                    <h3 className="font-bold text-zinc-800 text-lg">อาจารย์ ดร.ดาวรถา วีระพันธ์</h3>
                    <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">Project Leader</p>
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed font-sans border-t border-zinc-100 pt-2.5 space-y-1">
                    <p>🎓 <strong>ปร.ด. (วิทยาศาสตรศึกษา)</strong> - มหาวิทยาลัยราชภัฏวไลยอลงกรณ์ในพระบรมราชูปถัมภ์</p>
                    <p>🎓 <strong>ค.อ.ม. (เทคโนโลยีคอมพิวเตอร์)</strong> - สถาบันเทคโนโลยีพระจอมเกล้าพระนครเหนือ</p>
                    <p>🎓 <strong>ค.บ. (คอมพิวเตอร์ศึกษา)</strong> - สถาบันราชภัฏเพชรบุรี</p>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs mt-1 border-t border-zinc-100/50 pt-2.5">
                    <a href="mailto:daorathar@vru.ac.th" className="text-zinc-500 hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                      <span>✉️</span> daorathar@vru.ac.th
                    </a>
                    <span className="text-zinc-300">|</span>
                    <span className="text-zinc-500 flex items-center gap-1.5">
                      <span>📍</span> ห้อง IT101 อาคาร 75 ปีฯ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Co-Researchers Grid */}
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-xs bg-zinc-100 text-zinc-600 font-bold px-4 py-1.5 rounded-full border border-zinc-200/60 uppercase tracking-wider">
                  ผู้ร่วมโครงการวิจัย
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Co-Researcher 1: ผศ.ดร.วิศรุต ขวัญคุ้ม */}
                <div className="bg-zinc-50/50 hover:bg-white p-6 rounded-2xl border border-zinc-200/50 hover:border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center gap-4 text-center">
                  <div className="relative h-36 w-28 rounded-2xl overflow-hidden border-3 border-zinc-200/80 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://sci.vru.ac.th/assets/images/people/img_20260508130321000000_1778220201021_edit.jpg"
                      alt="ผู้ช่วยศาสตราจารย์ ดร.วิศรุต ขวัญคุ้ม"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 w-full">
                    <h4 className="font-bold text-zinc-800 text-sm sm:text-base truncate" title="ผู้ช่วยศาสตราจารย์ ดร.วิศรุต ขวัญคุ้ม">ผศ.ดร.วิศรุต ขวัญคุ้ม</h4>
                    <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Co-Researcher</p>
                    
                    <div className="text-[11px] text-zinc-500 text-left font-sans mt-3 border-t border-zinc-100 pt-3 space-y-1">
                      <p>🎓 <strong>ปร.ด. (วิศวกรรมคอมพิวเตอร์)</strong> - มหาวิทยาลัยนเรศวร</p>
                      <p>🎓 <strong>วท.ม. (วิทยาการคอมพิวเตอร์)</strong> - มหาวิทยาลัยนเรศวร</p>
                    </div>
                  </div>
                  <div className="w-full border-t border-zinc-100 pt-3 text-[11px] flex flex-col gap-1 items-center text-zinc-500 font-sans">
                    <a href="mailto:wisrut@vru.ac.th" className="hover:text-emerald-600 transition-colors">✉️ wisrut@vru.ac.th</a>
                    <span>📍 ห้อง IT201 อาคาร 75 ปีฯ</span>
                  </div>
                </div>

                {/* Co-Researcher 2: อาจารย์ณัฐรดี อนุพงค์ */}
                <div className="bg-zinc-50/50 hover:bg-white p-6 rounded-2xl border border-zinc-200/50 hover:border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center gap-4 text-center">
                  <div className="relative h-36 w-28 rounded-2xl overflow-hidden border-3 border-zinc-200/80 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://sci.vru.ac.th/assets/images/people/img_20241128092522000000_1732760722306_edit.jpg"
                      alt="อาจารย์ณัฐรดี อนุพงค์"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 w-full">
                    <h4 className="font-bold text-zinc-800 text-sm sm:text-base truncate" title="อาจารย์ณัฐรดี อนุพงค์">อาจารย์ณัฐรดี อนุพงค์</h4>
                    <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Co-Researcher</p>
                    
                    <div className="text-[11px] text-zinc-500 text-left font-sans mt-3 border-t border-zinc-100 pt-3 space-y-1">
                      <p>🎓 <strong>วท.ม. (เทคโนโลยีสารสนเทศ)</strong> - มจพ.</p>
                      <p>🎓 <strong>B.Sc. (Applied Computing)</strong> - Northumbria University, UK.</p>
                    </div>
                  </div>
                  <div className="w-full border-t border-zinc-100 pt-3 text-[11px] flex flex-col gap-1 items-center text-zinc-500 font-sans">
                    <a href="mailto:natradee@vru.ac.th" className="hover:text-emerald-600 transition-colors">✉️ natradee@vru.ac.th</a>
                    <span>📍 ห้อง IT102 อาคาร 75 ปีฯ</span>
                  </div>
                </div>

                {/* Co-Researcher 3: อาจารย์ชวลิต โควีระวงศ์ */}
                <div className="bg-zinc-50/50 hover:bg-white p-6 rounded-2xl border border-zinc-200/50 hover:border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center gap-4 text-center">
                  <div className="relative h-36 w-28 rounded-2xl overflow-hidden border-3 border-zinc-200/80 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://sci.vru.ac.th/assets/images/people/img_20241128091606000000_1732760166931_edit.jpg"
                      alt="อาจารย์ชวลิต โควีระวงศ์"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 w-full">
                    <h4 className="font-bold text-zinc-800 text-sm sm:text-base truncate" title="อาจารย์ชวลิต โควีระวงศ์">อาจารย์ชวลิต โควีระวงศ์</h4>
                    <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Co-Researcher</p>
                    
                    <div className="text-[11px] text-zinc-500 text-left font-sans mt-3 border-t border-zinc-100 pt-3 space-y-1">
                      <p>🎓 <strong>M.Eng. (ICT for Embedded Systems)</strong> - SIIT, ม.ธรรมศาสตร์</p>
                      <p>🎓 <strong>B.Sc. (Computer Science)</strong> - SIIT, ม.ธรรมศาสตร์</p>
                    </div>
                  </div>
                  <div className="w-full border-t border-zinc-100 pt-3 text-[11px] flex flex-col gap-1 items-center text-zinc-500 font-sans">
                    <a href="mailto:chavalit@vru.ac.th" className="hover:text-emerald-600 transition-colors">✉️ chavalit@vru.ac.th</a>
                    <span>📍 ห้อง IT201 อาคาร 75 ปีฯ</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Affiliation and Contact Section */}
        <section className="bg-white rounded-2xl border border-zinc-200/60 p-6 sm:p-10 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100">
            <span className="text-2xl">🏫</span>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-800 tracking-tight">หน่วยงานต้นสังกัดและสถานที่ติดต่อ</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between bg-zinc-50/50 p-6 rounded-2xl border border-zinc-100">
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <h3 className="font-bold text-zinc-800 text-base">คณะวิทยาศาสตร์และเทคโนโลยี</h3>
              <p className="text-sm font-semibold text-emerald-700">มหาวิทยาลัยราชภัฏวไลยอลงกรณ์ ในพระบรมราชูปถัมภ์</p>
              <div className="text-xs text-zinc-500 mt-2 font-sans space-y-0.5">
                <p>เลขที่ 1 หมู่ 20 ถนนพหลโยธิน กม.48</p>
                <p>ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี 13180</p>
              </div>
            </div>
            <div className="shrink-0 flex items-center justify-center h-16 w-16 bg-white rounded-2xl border border-zinc-200/60 shadow-sm">
              <span className="text-3xl">🏛️</span>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 bg-white py-6 text-center text-[11px] text-zinc-400 mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} SmartZoo Research - ผลลัพธ์การพัฒนาแพลตฟอร์มบูรณาการฐานข้อมูลสัตว์. สงวนลิขสิทธิ์ทั้งหมด.</p>
        </div>
      </footer>
    </div>
  );
}
