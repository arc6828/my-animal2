"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface AnimalAnalysisResult {
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

interface HistoryItem {
  id: string;
  timestamp: number;
  image: string; // Base64 thumbnail or full
  result: AnimalAnalysisResult;
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>("");
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnimalAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"details" | "facts" | "taxonomy">("details");
  const [ngrokUrl, setNgrokUrl] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load history & generate placeholder ngrok / client URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("animal_scan_history");
      const hostUrl = `${window.location.protocol}//${window.location.host}`;
      
      const timer = setTimeout(() => {
        if (savedHistory) {
          try {
            setHistory(JSON.parse(savedHistory));
          } catch (e) {
            console.error("Failed to parse scan history:", e);
          }
        }
        setNgrokUrl(hostUrl);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Save history helper
  const saveToHistory = (newResult: AnimalAnalysisResult, imgBase64: string) => {
    if (!newResult.isAnimal) return;
    
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      image: imgBase64,
      result: newResult,
    };
    const updatedHistory = [newItem, ...history].slice(0, 20); // Keep last 20 items
    setHistory(updatedHistory);
    try {
      localStorage.setItem("animal_scan_history", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to save history to localStorage:", e);
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        try {
          const trimmed = updatedHistory.slice(0, 5);
          setHistory(trimmed);
          localStorage.setItem("animal_scan_history", JSON.stringify(trimmed));
        } catch (innerErr) {
          console.error("Failed to save trimmed history:", innerErr);
        }
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("animal_scan_history");
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("animal_scan_history", JSON.stringify(updatedHistory));
    if (result && !updatedHistory.some(item => item.result.nameEn === result.nameEn)) {
      // Keep result displayed but remove from history list
    }
  };

  // Camera handling
  const startCamera = async () => {
    setError(null);
    setImage(null);
    setResult(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("ไม่สามารถเปิดใช้งานกล้องได้ กรุณาตรวจสอบสิทธิ์และลองใหม่อีกครั้ง");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Set canvas to match video aspect ratio
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw current frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get image base64
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setImage(dataUrl);
        setMimeType("image/jpeg");
        stopCamera();
        
        // Trigger automatic analysis
        analyzeImage(dataUrl, "image/jpeg");
      }
    }
  };

  // File Upload handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const compressAndResizeImage = (base64Str: string, maxDimension = 1000): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.75));
        } else {
          resolve(base64Str);
        }
      };
      img.onerror = () => resolve(base64Str);
    });
  };

  const processFile = (file: File) => {
    setError(null);
    setResult(null);
    
    if (!file.type.startsWith("image/")) {
      setError("กรุณาเลือกเฉพาะไฟล์รูปภาพเท่านั้น");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      
      setAnalyzing(true);
      const compressedBase64 = await compressAndResizeImage(base64Data);
      setAnalyzing(false);

      setImage(compressedBase64);
      setMimeType("image/jpeg");
      
      // Trigger analysis
      analyzeImage(compressedBase64, "image/jpeg");
    };
    reader.onerror = () => {
      setError("เกิดข้อผิดพลาดในการอ่านไฟล์");
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64Image: string, imageMime: string) => {
    setAnalyzing(true);
    setError(null);
    setResult(null);

    let finalMime = imageMime;
    if ((!finalMime || finalMime === "") && base64Image.startsWith("data:")) {
      const match = base64Image.match(/^data:([^;]+);base64,/);
      if (match) {
        finalMime = match[1];
        setMimeType(finalMime);
      }
    }

    try {
      const response = await fetch("/api/recognize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
          mimeType: finalMime,
        }),
      });

      if (!response.ok) {
        let errMsg = "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } else {
          if (response.status === 502 || response.status === 504) {
            errMsg = `เซิร์ฟเวอร์ตอบสนองช้าหรือปิดอยู่ (Status ${response.status})`;
          } else {
            errMsg = `เกิดข้อผิดพลาดในการเชื่อมต่อ (Status ${response.status})`;
          }
        }
        throw new Error(errMsg);
      }

      const data = await response.json();

      setResult(data);
      if (data.isAnimal) {
        saveToHistory(data, base64Image);
        setActiveTab("details");
      } else {
        setError("ไม่สามารถจำแนกสัตว์จากภาพนี้ได้ กรุณาลองใหม่อีกครั้งด้วยรูปที่ชัดเจนกว่าเดิม");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      const errMsg = err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการเชื่อมต่อเพื่อวิเคราะห์ข้อมูล";
      setError(errMsg);
    } finally {
      setAnalyzing(false);
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Map conservation status to display badges
  const getConservationBadge = (status: string) => {
    const text = status.toLowerCase();
    
    // Extinct (EX, EW)
    if (text.includes("ex") || text.includes("ew") || text.includes("สูญพันธุ์")) {
      return {
        label: status,
        bg: "bg-red-50 text-red-600 border border-red-200",
        desc: "สูญพันธุ์แล้ว (Extinct)"
      };
    }
    // Threatened (CR, EN, VU)
    if (text.includes("cr") || text.includes("วิกฤต") || text.includes("เสี่ยงขั้นวิกฤต")) {
      return {
        label: status,
        bg: "bg-orange-50 text-orange-600 border border-orange-200",
        desc: "ใกล้สูญพันธุ์อย่างยิ่งยวด (Critically Endangered)"
      };
    }
    if (text.includes("en") || text.includes("ใกล้สูญพันธุ์")) {
      return {
        label: status,
        bg: "bg-orange-50 text-orange-600 border border-orange-200",
        desc: "ใกล้สูญพันธุ์ (Endangered)"
      };
    }
    if (text.includes("vu") || text.includes("มีแนวโน้มสูญพันธุ์")) {
      return {
        label: status,
        bg: "bg-amber-50 text-amber-700 border border-amber-200",
        desc: "มีแนวโน้มใกล้สูญพันธุ์ (Vulnerable)"
      };
    }
    // Near Threatened (NT)
    if (text.includes("nt") || text.includes("ใกล้ถูกคุกคาม")) {
      return {
        label: status,
        bg: "bg-yellow-50 text-yellow-700 border border-yellow-200",
        desc: "ใกล้ถูกคุกคาม (Near Threatened)"
      };
    }
    // Least Concern / Domesticated (LC, Domestic)
    if (text.includes("lc") || text.includes("ปลอดภัย") || text.includes("กังวลน้อยที่สุด")) {
      return {
        label: status,
        bg: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        desc: "ความเสี่ยงต่ำ / มีความกังวลน้อยที่สุด (Least Concern)"
      };
    }
    if (text.includes("domestic") || text.includes("เลี้ยง") || text.includes("สัตว์บ้าน")) {
      return {
        label: status,
        bg: "bg-sky-50 text-sky-700 border border-sky-200",
        desc: "สัตว์เลี้ยงในครัวเรือน (Domesticated)"
      };
    }

    // Default Fallback
    return {
      label: status,
      bg: "bg-zinc-100 text-zinc-600 border border-zinc-200",
      desc: "ไม่ทราบสถานะแน่ชัด"
    };
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col antialiased">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-emerald-100/40 shadow-sm shadow-emerald-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <span className="text-xl">🐾</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-zinc-800 tracking-tight flex items-center gap-1.5">
                SmartZoo <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200/50 font-medium">v1.0</span>
              </h1>
              <p className="text-[10px] text-zinc-500">AI-Powered Animal Recognition</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 hidden sm:inline-block">วิเคราะห์สายพันธุ์สัตว์ป่าและสัตว์เลี้ยงอย่างรวดเร็ว</span>
            <Link
              href="/about"
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 px-3 py-1.5 rounded-lg border border-emerald-100 transition-colors flex items-center gap-1.5"
            >
              <span>📖</span> เกี่ยวกับโครงการ
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Panel & LINE setup */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Analyzer Container (Upload / Cam Area) */}
            <div className="premium-card p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-emerald-600 flex items-center gap-2">
                  <span>📷</span> เครื่องมือสแกนสัตว์
                </h2>
                <div className="flex gap-1.5 bg-zinc-100 p-1 rounded-lg border border-zinc-200">
                  <button
                    onClick={() => {
                      stopCamera();
                      setImage(null);
                      setResult(null);
                      setError(null);
                    }}
                    className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                      !cameraActive ? "bg-emerald-600 text-white" : "text-zinc-500 hover:text-zinc-800"
                    }`}
                  >
                    อัปโหลดรูป
                  </button>
                  <button
                    onClick={startCamera}
                    className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                      cameraActive ? "bg-emerald-600 text-white" : "text-zinc-500 hover:text-zinc-800"
                    }`}
                  >
                    เปิดกล้องสด
                  </button>
                </div>
              </div>

              {/* Main Scanning Viewport */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative aspect-square w-full rounded-2xl border-2 border-dashed border-emerald-200/60 bg-white/40 overflow-hidden flex flex-col items-center justify-center transition-all group hover:border-emerald-500/30"
              >
                {cameraActive ? (
                  /* Live Camera Preview */
                  <div className="relative w-full h-full flex items-center justify-center bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 flex justify-center w-full z-20">
                      <button
                        onClick={capturePhoto}
                        className="h-16 w-16 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95 border-4 border-emerald-500"
                        title="ถ่ายภาพสัตว์"
                      >
                        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : image ? (
                  /* Display Uploaded/Captured Image */
                  <div className="relative w-full h-full flex items-center justify-center bg-zinc-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt="Animal Preview"
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Running Scanner Line Effect */}
                    {analyzing && (
                      <>
                        <div className="scanner-line"></div>
                        <div className="absolute inset-0 bg-emerald-50/10 backdrop-blur-[1px] flex flex-col items-center justify-center z-10">
                          <div className="analyzing-pulse h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <span className="text-3xl animate-bounce">🔬</span>
                          </div>
                          <p className="mt-4 text-sm font-semibold text-emerald-700 text-glow">กำลังวิเคราะห์สัตว์ในภาพ...</p>
                          <p className="text-[11px] text-zinc-500 mt-1">ใช้เวลาประมาณ 2-4 วินาที</p>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  /* Upload Placeholder State */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer text-center p-6 flex flex-col items-center gap-4 w-full h-full justify-center group-hover:bg-emerald-50/5 transition-all"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-700 group-hover:text-emerald-600 transition-colors">ลากและวางรูปภาพที่นี่</p>
                      <p className="text-xs text-zinc-500 mt-1">หรือคลิกเพื่อเลือกไฟล์รูปภาพจากระบบ</p>
                    </div>
                    <span className="text-[10px] text-zinc-500 border border-zinc-200 bg-zinc-100/60 px-3 py-1 rounded-full">
                      รองรับ JPG, PNG, WEBP
                    </span>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Action bar under image viewport */}
              {image && !analyzing && (
                <div className="flex gap-3 mt-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-xs font-semibold text-zinc-600 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>🔄</span> เลือกภาพใหม่
                  </button>
                  <button
                    onClick={() => analyzeImage(image, mimeType)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-emerald-500/10 transition-all hover:scale-[1.01]"
                  >
                    <span>⚡</span> กดวิเคราะห์ซ้ำ
                  </button>
                </div>
              )}

              {/* Error Alert Box */}
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-start gap-2.5">
                  <span className="text-base leading-none">⚠️</span>
                  <div>
                    <span className="font-semibold block mb-0.5">การทำงานขัดข้อง</span>
                    {error}
                  </div>
                </div>
              )}
            </div>

            {/* LINE Bot Integration Panel */}
            <div className="premium-card p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-emerald-600 flex items-center gap-2">
                  <span>💬</span> LINE Chatbot Integration
                </h2>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200/50 px-2.5 py-0.5 rounded-full font-semibold">
                  @316rmguu
                </span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                คุณสามารถนำระบบจำแนกสัตว์นี้ไปเชื่อมต่อเข้ากับ **LINE Chatbot** หรือทดสอบใช้งานผ่านบอทจำแนกสัตว์ของเราโดยตรงได้ทันที
              </p>

              {/* QR Code and Quick Add Section */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="bg-white p-2 rounded-lg shrink-0 border border-zinc-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://qr-official.line.me/sid/M/316rmguu.png"
                    alt="LINE QR Code @316rmguu"
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs font-bold text-zinc-800">ทดสอบผ่าน LINE จริง</p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    สแกน QR Code หรือแอดไลน์ไอดี เพื่อส่งรูปสัตว์เข้ามาวิเคราะห์ในแชท
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                    <a
                      href="https://line.me/R/ti/p/@316rmguu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-600/10"
                    >
                      <span>➕</span> เพิ่มเพื่อนใน LINE
                    </a>
                    <span className="bg-zinc-100 text-zinc-700 text-[11px] font-mono px-3 py-1.5 rounded-lg border border-zinc-200 flex items-center select-all">
                      @316rmguu
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-200/60 flex flex-col gap-3 text-xs">
                <div className="flex justify-between items-center text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">
                  <span>ขั้นตอนการเชื่อมต่อบอทของคุณเอง</span>
                  <span className="bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded">Local Test</span>
                </div>
                
                <ol className="list-decimal list-inside space-y-2 text-zinc-600">
                  <li>
                    เปิดรันเซิร์ฟเวอร์ในเครื่องคอมพิวเตอร์ของคุณ
                  </li>
                  <li>
                    เปิด HTTPS Tunnel ผ่าน **ngrok**:
                    <code className="block bg-emerald-50 text-emerald-700 px-2 py-1 rounded mt-1 select-all font-mono border border-emerald-100">
                      ngrok http 3000
                    </code>
                  </li>
                  <li>
                    คัดลอก HTTPS URL ที่ได้จาก ngrok ไประบุเป็น Webhook URL ใน LINE Developers:
                    <code className="block bg-zinc-100 text-zinc-700 px-2 py-1 rounded mt-1 select-all break-all font-mono border border-zinc-200">
                      {ngrokUrl ? `${ngrokUrl.includes("localhost") ? ngrokUrl.replace("localhost:3000", "your-subdomain.ngrok-free.app") : ngrokUrl}/api/line-webhook` : "https://smartzoo.ckartisan.com/api/line-webhook"}
                    </code>
                  </li>
                  <li>
                    เปิดสวิตช์ **Use Webhook** ในหน้า LINE Messaging API Console
                  </li>
                </ol>
              </div>
            </div>

          </div>

          {/* Right Column: Animal Result & History */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Empty / Result Panel */}
            <div className="premium-card p-6 flex-1 min-h-[480px] flex flex-col">
              
              {result && result.isAnimal ? (
                /* Beautiful Animal Details View */
                <div className="flex-1 flex flex-col gap-6">
                  
                  {/* Result Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-100">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">{result.nameTh}</h2>
                        <span className="text-sm font-semibold text-zinc-500">({result.nameEn})</span>
                      </div>
                      <p className="text-xs text-emerald-600 font-medium italic mt-1 font-mono">
                        {result.scientificName}
                      </p>
                    </div>

                    {/* Conservation Status Tag */}
                    <div className="flex items-center sm:justify-end">
                      {(() => {
                        const badge = getConservationBadge(result.conservationStatus);
                        return (
                          <div className="flex flex-col items-start sm:items-end">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold tracking-wider ${badge.bg}`}>
                              {badge.label}
                            </span>
                            <span className="text-[10px] text-zinc-500 mt-1.5">{badge.desc}</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="flex border-b border-zinc-200/60 p-0.5 bg-zinc-100/80 rounded-lg">
                    {([
                      { id: "details", label: "📄 ข้อมูลทั่วไป" },
                      { id: "facts", label: "💡 เรื่องน่ารู้ (Facts)" },
                      { id: "taxonomy", label: "🧬 การจำแนกทางวิทยาศาสตร์" },
                    ] as const).map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 text-center text-xs font-semibold rounded-md transition-all ${
                          activeTab === tab.id
                            ? "bg-white text-emerald-600 shadow-sm border border-emerald-100/40"
                            : "text-zinc-500 hover:text-zinc-800"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Contents */}
                  <div className="flex-1">
                    
                    {/* Tab 1: Details & Metrics */}
                    {activeTab === "details" && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider">คำอธิบายสายพันธุ์</h3>
                          <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                            {result.description}
                          </p>
                        </div>

                        {/* Grid Info Boxes */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          
                          <div className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-200/60 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5 text-emerald-600">
                              <span className="text-base">🏡</span>
                              <span className="text-xs font-bold uppercase tracking-wider">ถิ่นอาศัย</span>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed">{result.habitat}</p>
                          </div>

                          <div className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-200/60 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5 text-emerald-600">
                              <span className="text-base">🥩</span>
                              <span className="text-xs font-bold uppercase tracking-wider">พฤติกรรมการกิน</span>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed">{result.diet}</p>
                          </div>

                          <div className="bg-zinc-50/80 p-4 rounded-xl border border-zinc-200/60 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5 text-emerald-600">
                              <span className="text-base">⏳</span>
                              <span className="text-xs font-bold uppercase tracking-wider">อายุขัยเฉลี่ย</span>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed">{result.lifespan}</p>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* Tab 2: Fun Facts */}
                    {activeTab === "facts" && (
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">เรื่องน่าทึ่ง 3 ข้อ</h3>
                        <div className="space-y-3">
                          {result.funFacts.map((fact, i) => (
                            <div
                              key={i}
                              className="p-4 rounded-xl bg-gradient-to-r from-emerald-50/40 to-teal-50/40 border border-emerald-100/50 flex gap-3 items-start"
                            >
                              <span className="h-6 w-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">
                                {i + 1}
                              </span>
                              <p className="text-xs text-zinc-600 leading-relaxed">{fact}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Taxonomy */}
                    {activeTab === "taxonomy" && (
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">โครงสร้างการจำแนกชั้นทางวิทยาศาสตร์</h3>
                        <div className="bg-zinc-50/50 rounded-2xl border border-zinc-100 overflow-hidden text-xs">
                          {[
                            { key: "Kingdom / อาณาจักร", value: result.kingdom || "Animalia" },
                            { key: "Phylum / ไฟลัม", value: result.phylum },
                            { key: "Class / ชั้น", value: result.class },
                            { key: "Order / อันดับ", value: result.order },
                            { key: "Family / วงศ์", value: result.family },
                            { key: "Genus / สกุล", value: result.genus },
                            { key: "Species / ชนิด", value: result.species },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className={`flex justify-between p-3.5 ${
                                idx % 2 === 0 ? "bg-zinc-100/30" : ""
                              } border-b border-zinc-100 last:border-b-0`}
                            >
                              <span className="text-zinc-500 font-medium">{item.key}</span>
                              <span className="text-zinc-800 font-semibold font-mono">{item.value || "ไม่ระบุ"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              ) : (
                /* Empty/Initial Landing State */
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <div className="h-20 w-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl mb-6 shadow-inner animate-pulse">
                    🦄
                  </div>
                  <h3 className="text-lg font-bold text-zinc-800 tracking-tight">พร้อมเริ่มต้นจำแนกสัตว์</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mt-2 leading-relaxed">
                    อัปโหลดรูปภาพสัตว์หรือใช้โหมดเปิดกล้องถ่ายภาพสัตว์ ระบบ AI ของ Gemini จะเริ่มจำแนกและดึงฐานข้อมูลชีววิทยามาให้แสดงที่นี่โดยอัตโนมัติ
                  </p>
                </div>
              )}

            </div>

            {/* Scan History Gallery Panel */}
            <div className="premium-card p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-emerald-600 flex items-center gap-2">
                  <span>⏳</span> ประวัติการจำแนกสัตว์ ({history.length})
                </h2>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-[10px] text-zinc-500 hover:text-red-400 font-semibold uppercase tracking-wider transition-colors"
                  >
                    ล้างประวัติทั้งหมด
                  </button>
                )}
              </div>

              {history.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[220px] overflow-y-auto pr-1">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setResult(item.result);
                        setImage(item.image);
                        setCameraActive(false);
                        if (item.image.startsWith("data:")) {
                          const match = item.image.match(/^data:([^;]+);base64,/);
                          if (match) {
                            setMimeType(match[1]);
                          }
                        }
                      }}
                      className="group cursor-pointer bg-zinc-50/55 border border-zinc-100 hover:border-emerald-200 rounded-xl overflow-hidden flex flex-col relative"
                    >
                      <div className="aspect-square w-full relative bg-zinc-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.result.nameTh}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        {/* Remove item button */}
                        <button
                          onClick={(e) => deleteHistoryItem(item.id, e)}
                          className="absolute top-1.5 right-1.5 h-5 w-5 bg-white/80 backdrop-blur-md rounded-md flex items-center justify-center text-[10px] text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="ลบรายการนี้"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="p-2 flex flex-col gap-0.5 text-[11px] leading-tight">
                        <span className="font-bold text-zinc-800 truncate">{item.result.nameTh}</span>
                        <span className="text-zinc-500 text-[9px] truncate">
                          {new Date(item.timestamp).toLocaleTimeString("th-TH", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-zinc-200 border-dashed rounded-xl p-6 text-center text-xs text-zinc-400">
                  ยังไม่มีประวัติการจำแนก
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 bg-white py-6 text-center text-[11px] text-zinc-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} SmartZoo - พัฒนาด้วย Next.js และ Gemini API. สงวนลิขสิทธิ์ทั้งหมด.</p>
        </div>
      </footer>
      
      {/* Hidden Canvas for Capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
