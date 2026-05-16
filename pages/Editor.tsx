import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TOOLS } from '../constants';
import { UserPlan } from '../types';
import { processImageWithGemini } from '../services/geminiService';
import ImageCompare from '../components/ImageCompare';
import DownloadDropdown from '../components/DownloadDropdown';
import UpgradeModal from '../components/UpgradeModal';
import { useUser } from '../contexts/UserContext';
import { ArrowLeft, Upload, Share2, Sparkles, AlertCircle, RefreshCw, SlidersHorizontal, Crop, UserCheck } from 'lucide-react';
import { getPremiumStatus, setPremiumStatus, checkPremiumAccess, checkUserPremium } from '@/src/lib/premium';
import { canUseFeature, increaseUsage, getUsageLeft } from '@/src/lib/usage';

const Editor: React.FC = () => {
  const TEST_MODE = false; // Toggle for testing without calling Gemini API
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const tool = TOOLS.find(t => t.id === toolId);
  const { user, upgradeToPremium, incrementEditCount } = useUser();
  const isPremium = getPremiumStatus();
  const isFreeUser = !isPremium;

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [usageLeft, setUsageLeft] = useState<number>(5);

  useEffect(() => {
    const fetchUsage = async () => {
      const left = await getUsageLeft();
      setUsageLeft(left);
    };
    fetchUsage();
  }, []);
  useEffect(() => {
    let userId = localStorage.getItem("userId");

    if (!userId) {
      userId = "user_" + Math.random().toString(36).slice(2, 11);
      localStorage.setItem("userId", userId)
      console.log("✅ New User ID Created:", userId);
    } else {
      console.log("✅ Existing User ID:", userId);
    }
  }, []);

  // Dynamic tool options
  const [toolOptions, setToolOptions] = useState<Record<string, string>>({});

  // Reset state when tool changes
  useEffect(() => {
    if (tool) {
      setCustomPrompt(tool.promptTemplate);

      // Set default options based on tool
      if (tool.id === 'selfie-glow') {
        setToolOptions({ strength: "50" });
      } else if (tool.id === 'bridal-glam') {
        setToolOptions({ style: "Soft Bridal", intensity: "75" });
      } else if (tool.id === 'linkedin-profile') {
        setToolOptions({ blur: "false", crop: "true" });
      } else if (tool.id === 'outfit-changer') {
        setToolOptions({ style: "Casual", color: "Blue" });
      } else if (tool.id === 'tattoo-try-on') {
        setToolOptions({ placement: "Arm", style: "Minimal" });
      } else if (tool.id === 'age-filter') {
        setToolOptions({ direction: "Older", intensity: "75" });
      } else if (tool.id === 'profile-picture') {
        setToolOptions({ background: "clean studio" });
      } else {
        setToolOptions({});
      }

      setError(null);
      setProcessedImage(null);
      // Keep original image if navigating between tools
    }
  }, [toolId]);

  // Update prompt based on specific tool options
  useEffect(() => {
    if (!tool) return;

    if (tool.id === 'hair-color' && toolOptions.hairColor) {
      setCustomPrompt(`Change the hair color of the person in this image to ${toolOptions.hairColor}. Keep the rest of the image unchanged and realistic.`);
    } else if (tool.id === 'eye-color' && toolOptions.eyeColor) {
      setCustomPrompt(`Change the eye color of the person in this image to ${toolOptions.eyeColor}, maintaining realistic reflections and lighting.`);
    } else if (tool.id === 'beauty-filters' && toolOptions.filter) {
      setCustomPrompt(`Apply a ${toolOptions.filter} beauty filter to this photo. Enhance skin tone, lighting, and give it a ${toolOptions.filter} style.`);
    } else if (tool.id === 'profile-picture' && toolOptions.background) {
      setCustomPrompt(`Transform this image into a professional profile picture. Replace the background with a ${toolOptions.background} setting and enhance lighting on the face.`);
    } else if (tool.id === 'body-shape' && toolOptions.shape) {
      setCustomPrompt(`Subtly retouch the body shape in this image to look ${toolOptions.shape}, without distorting the background.`);
    } else if (tool.id === 'selfie-glow') {
      const strength = toolOptions.strength || "50";
      setCustomPrompt(`Enhance this selfie with a natural glow. Smooth the skin, remove blemishes, whiten teeth slightly, and brighten the eyes. Effect strength: ${strength}%. Keep texture realistic.`);
    } else if (tool.id === 'bridal-glam') {
      const style = toolOptions.style || "Soft Bridal";
      const intensity = toolOptions.intensity || "75";
      setCustomPrompt(`Apply a ${style} makeup look to the person in this photo. Enhance eyes, lips, and skin for a wedding event. Makeup Intensity: ${intensity}%.`);
    } else if (tool.id === 'linkedin-profile') {
      const blur = toolOptions.blur === 'true';
      const crop = toolOptions.crop === 'true';
      setCustomPrompt(`Transform this image into a professional LinkedIn profile photo. ${crop ? 'Crop to a 1:1 square centered on the face.' : ''} Apply light skin smoothing and brightness. ${blur ? 'Blur the background softly.' : 'Keep the background clean and professional.'}`);
    } else if (tool.id === 'outfit-changer') {
      setCustomPrompt(`Change the outfit of the person in this photo to a ${toolOptions.style} style in ${toolOptions.color} color. Keep the face, pose, and background exactly the same.`);
    } else if (tool.id === 'tattoo-try-on') {
      setCustomPrompt(`Add a realistic ${toolOptions.style} style tattoo on the ${toolOptions.placement} of the person. Ensure it blends naturally with skin texture and lighting.`);
    } else if (tool.id === 'age-filter') {
      setCustomPrompt(`Transform the face of the person in this image to look ${toolOptions.direction}. Intensity: ${toolOptions.intensity}%. Maintain identity and realism.`);
    }
  }, [toolOptions, tool]);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Tool Not Found</h2>
        <Link to="/tools" className="text-indigo-600 hover:underline">Return to Directory</Link>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setProcessedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePayment = async () => {
    if (!(window as any).Razorpay) {
      console.error("Razorpay SDK not loaded");
      alert("Payment system is currently unavailable. Please try again later.");
      return;
    }

    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      console.error("VITE_RAZORPAY_KEY_ID is not defined");
      alert("Payment configuration error. Please contact support.");
      return;
    }

    setIsPaymentLoading(true);
    localStorage.setItem("pendingPayment", "true");

    try {
      // 1. Create Order
      let orderRes;
      const maxRetries = 3;
      for (let i = 0; i < maxRetries; i++) {
        try {
          orderRes = await fetch('https://glamora-backend-y0bf.onrender.com/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 99 }),
          });
          if (orderRes.ok) break;
        } catch (networkError) {
          console.error(`Network error on attempt ${i + 1}:`, networkError);
          if (i === maxRetries - 1) throw new Error("Backend is unreachable. Please check your internet connection or try again later.");
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
      }

      if (!orderRes || !orderRes.ok) {
        const errorData = orderRes ? await orderRes.json().catch(() => ({})) : {};
        console.error("Order creation failed:", errorData);
        throw new Error(errorData.message || "Failed to create order");
      }
      const orderData = await orderRes.json();

      if (!orderData || !orderData.id) {
        throw new Error("Invalid order data received from server. Please check your payment configuration.");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount * 100,
        currency: "INR",
        name: "Glamora AI",
        description: "Monthly Subscription",
        order_id: orderData.id,

        handler: async function (response: any) {
          console.log("🔥 HANDLER STARTED");
          console.log("Response object:", response);
          console.log("✅ PAYMENT SUCCESS:", response);

          try {
            // 👇 FIXED USER ID (safe)
            let userId = localStorage.getItem("userId");

            if (!userId) {
              userId = "user_" + Date.now();
              localStorage.setItem("userId", userId);
            }

            console.log("🔥 Using userId:", userId);

            // 👇 SEND TO BACKEND
            console.log("🚀 Calling VERIFY API...");
            const res = await fetch("https://glamora-backend-ybdf.onrender.com/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: options.order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: userId,
              }),
            });

            let data: any = {};

            try {
              data = await res.json();
            } catch (e) {
              console.error("JSON parse error:", e);
            }

            console.log("VERIFY RESPONSE:", data);
            console.log("RAW RESPONSE STATUS:", res.status);
            console.log("VERIFY RESPONSE:", data);

            if (data.success) {
              alert("✅ Payment Verified! Premium Activated 🎉");

              // 👇 SAVE PREMIUM STATUS
              setPremiumStatus(true);

            } else {
              alert("❌ Payment Verification Failed");
            }

          } catch (err) {
            console.error("❌ ERROR:", err);
            alert("Something went wrong");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      alert("An error occurred while initiating payment. Please try again.");
      localStorage.removeItem("pendingPayment");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const handleProcess = async () => {
    if (!originalImage) return;

    if (false) {
  alert("Daily limit reached! Upgrade to Premium 🚀");
  window.location.href = "/#/pricing";
  return;
}

    setIsProcessing(true);
    setProcessedImage(null);
    setError(null);

    try {
      let result: string;

      if (TEST_MODE) {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        result = originalImage; // Dummy result: same as original
      } else {
        result = await processImageWithGemini(originalImage, customPrompt);
      }

      setProcessedImage(result);
      await increaseUsage();
      const left = await getUsageLeft();
      setUsageLeft(left);
    } catch (err) {
      setError("Failed to process image. Please try again. " + (err instanceof Error ? err.message : ''));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async (quality: '720' | '1080' | '4k') => {
    if (!processedImage) return;

    // Premium check for 1080p and 4K
    if ((quality === '1080' || quality === '4k') && !checkUserPremium()) {
      alert(`${quality === '1080' ? '1080p' : '4K'} download is a Premium feature 🚀`);
      navigate("/pricing");
      return;
    }

    try {
      // Load the image
      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = processedImage;
      });

      // Calculate dimensions based on quality
      let targetWidth = 1280; // 720p default
      if (quality === '1080') targetWidth = 1920;
      if (quality === '4k') targetWidth = 3840;

      const scale = targetWidth / img.width;
      const targetHeight = img.height * scale;

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error("Could not get canvas context");

      // Draw resized image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      console.log("Final Size:", canvas.width, canvas.height);

      // Add watermark for free users
      if (!checkUserPremium()) {
        ctx.save();
        
        const watermarkText = user?.email ? `Glamora AI • ${user.email}` : "Glamora AI • Free User";

        // 1. Repeated Diagonal Watermark (Pattern)
        const step = 280;
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        
        for (let x = -canvas.width; x < canvas.width * 2; x += step) {
          for (let y = -canvas.height; y < canvas.height * 2; y += step) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-28 * Math.PI / 180);
            
            // Stroke for visibility on any background
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.strokeText(watermarkText, 0, 0);
            
            // Fill
            ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.fillText(watermarkText, 0, 0);
            ctx.restore();
          }
        }

        // 2. Large Center Watermark
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-20 * Math.PI / 180);
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        
        // Stroke
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.strokeText(watermarkText, 0, 0);
        
        // Fill
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillText(watermarkText, 0, 0);
        ctx.restore();

        // 3. Corner Branding Watermark
        ctx.font = 'bold 22px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        
        // Shadow for corner branding
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        const padding = 24;
        ctx.fillText('Glamora AI', canvas.width - padding, canvas.height - padding);
        
        ctx.restore();
      }

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) throw new Error("Could not create blob");

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `glamora-ai-${quality}p-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 'image/png');

    } catch (err) {
      console.error("Download failed:", err);
      setError("Failed to process image for download. Please try again.");
    }
  };

  const renderToolControls = () => {
    // Tool: Selfie Glow
    if (tool.id === 'selfie-glow') {
      return (
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2"><Sparkles size={16} /> Glow Strength</span>
            <span className="text-slate-500 text-xs">{toolOptions.strength || 50}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            value={toolOptions.strength || 50}
            onChange={(e) => setToolOptions({ ...toolOptions, strength: e.target.value })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      );
    }

    // Tool: Bridal Glam
    if (tool.id === 'bridal-glam') {
      return (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Makeup Style
            </label>
            <select
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setToolOptions({ ...toolOptions, style: e.target.value })}
              value={toolOptions.style || "Soft Bridal"}
            >
              <option value="Soft Bridal">Soft Bridal</option>
              <option value="Full Glam">Full Glam</option>
              <option value="Sangeet Look">Sangeet Look</option>
              <option value="Classic Elegance">Classic Elegance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center justify-between">
              <span>Intensity</span>
              <span className="text-slate-500 text-xs">{toolOptions.intensity || 75}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={toolOptions.intensity || 75}
              onChange={(e) => setToolOptions({ ...toolOptions, intensity: e.target.value })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      );
    }

    // Tool: LinkedIn Profile
    if (tool.id === 'linkedin-profile') {
      return (
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2 cursor-pointer">
              <UserCheck size={16} /> Soft Background Blur
            </label>
            <input
              type="checkbox"
              checked={toolOptions.blur === 'true'}
              onChange={(e) => setToolOptions({ ...toolOptions, blur: e.target.checked ? 'true' : 'false' })}
              className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2 cursor-pointer">
              <Crop size={16} /> Auto-Crop to 1:1
            </label>
            <input
              type="checkbox"
              checked={toolOptions.crop === 'true'}
              onChange={(e) => setToolOptions({ ...toolOptions, crop: e.target.checked ? 'true' : 'false' })}
              className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
        </div>
      );
    }

    // Tool: Outfit Changer
    if (tool.id === 'outfit-changer') {
      return (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Outfit Style
            </label>
            <select
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setToolOptions({ ...toolOptions, style: e.target.value })}
              value={toolOptions.style || "Casual"}
            >
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
              <option value="Business">Business</option>
              <option value="Party">Party</option>
              <option value="Sporty">Sporty</option>
              <option value="Streetwear">Streetwear</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Sparkles size={16} /> Color / Pattern
            </label>
            <select
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setToolOptions({ ...toolOptions, color: e.target.value })}
              value={toolOptions.color || "Blue"}
            >
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Floral">Floral Pattern</option>
              <option value="Striped">Striped</option>
            </select>
          </div>
        </div>
      );
    }

    // Tool: Tattoo Try-On
    if (tool.id === 'tattoo-try-on') {
      return (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Placement
            </label>
            <select
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setToolOptions({ ...toolOptions, placement: e.target.value })}
              value={toolOptions.placement || "Arm"}
            >
              <option value="Arm">Arm</option>
              <option value="Neck">Neck</option>
              <option value="Hand">Hand</option>
              <option value="Wrist">Wrist</option>
              <option value="Shoulder">Shoulder</option>
              <option value="Chest">Chest</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Sparkles size={16} /> Tattoo Style
            </label>
            <select
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setToolOptions({ ...toolOptions, style: e.target.value })}
              value={toolOptions.style || "Minimal"}
            >
              <option value="Minimal">Minimal Line Art</option>
              <option value="Bold">Bold / Traditional</option>
              <option value="Tribal">Tribal</option>
              <option value="Traditional">Traditional</option>
              <option value="Floral">Floral / Botanical</option>
              <option value="Geometric">Geometric</option>
              <option value="Watercolor">Watercolor</option>
            </select>
          </div>
        </div>
      );
    }

    // Tool: Age Filter
    if (tool.id === 'age-filter') {
      return (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Age Direction
            </label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {['Younger', 'Older'].map((dir) => (
                <button
                  key={dir}
                  onClick={() => setToolOptions({ ...toolOptions, direction: dir })}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${toolOptions.direction === dir
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center justify-between">
              <span>Intensity</span>
              <span className="text-slate-500 text-xs">{toolOptions.intensity || 75}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={toolOptions.intensity || 75}
              onChange={(e) => setToolOptions({ ...toolOptions, intensity: e.target.value })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      );
    }

    if (tool.id === 'hair-color') {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <SlidersHorizontal size={16} /> Select Hair Color
          </label>
          <select
            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setToolOptions({ ...toolOptions, hairColor: e.target.value })}
            defaultValue=""
          >
            <option value="" disabled>Choose a color...</option>
            <option value="Blonde">Blonde</option>
            <option value="Brunette">Brunette</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
            <option value="Auburn">Auburn</option>
            <option value="Silver Grey">Silver / Grey</option>
            <option value="Pastel Pink">Pastel Pink</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
      );
    }

    if (tool.id === 'eye-color') {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <SlidersHorizontal size={16} /> Select Eye Color
          </label>
          <select
            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setToolOptions({ ...toolOptions, eyeColor: e.target.value })}
            defaultValue=""
          >
            <option value="" disabled>Choose a color...</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Hazel">Hazel</option>
            <option value="Brown">Brown</option>
            <option value="Grey">Grey</option>
            <option value="Amber">Amber</option>
            <option value="Violet">Violet</option>
          </select>
        </div>
      );
    }

    if (tool.id === 'beauty-filters') {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <SlidersHorizontal size={16} /> Select Filter Style
          </label>
          <select
            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setToolOptions({ ...toolOptions, filter: e.target.value })}
            defaultValue=""
          >
            <option value="" disabled>Choose a filter...</option>
            <option value="Natural">Natural Glow</option>
            <option value="Glamour">Soft Glamour</option>
            <option value="Bollywood">Bollywood Vibrant</option>
            <option value="Cinematic">Cinematic Teal & Orange</option>
            <option value="Matte">Matte Portrait</option>
            <option value="B&W">Classic Black & White</option>
          </select>
        </div>
      );
    }

    if (tool.id === 'profile-picture') {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <SlidersHorizontal size={16} /> Background Style
          </label>
          <select
            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setToolOptions({ ...toolOptions, background: e.target.value })}
            value={toolOptions.background || "clean studio"}
          >
            <option value="clean studio">Clean Studio</option>
            <option value="gradient">Modern Gradient</option>
            <option value="nature bokeh">Nature Bokeh</option>
            <option value="urban">Urban / City</option>
            <option value="professional office">Professional Office</option>
            <option value="solid grey">Solid Grey</option>
            <option value="solid white">Solid White</option>
          </select>
        </div>
      );
    }

    if (tool.id === 'body-shape') {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <SlidersHorizontal size={16} /> Retouch Goal
          </label>
          <select
            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setToolOptions({ ...toolOptions, shape: e.target.value })}
            defaultValue=""
          >
            <option value="" disabled>Choose an effect...</option>
            <option value="naturally slim">Subtly Slim</option>
            <option value="fit and athletic">Fit & Athletic</option>
            <option value="curvy and balanced">Curvy & Balanced</option>
          </select>
        </div>
      );
    }

    return null;
  };

  const getButtonText = () => {
    if (tool.id === 'selfie-glow') return "Apply Glow";
    if (tool.id === 'bridal-glam') return "Apply Bridal Look";
    if (tool.id === 'linkedin-profile') return "Make it Professional";
    if (tool.id === 'outfit-changer') return "Change Outfit";
    if (tool.id === 'tattoo-try-on') return "Ink It";
    if (tool.id === 'age-filter') return "Apply Age Filter";
    return "Generate";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-16 z-40">
        <div className="flex items-center gap-4">
          <Link to="/tools" className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              {tool.name}
              <span className="text-xs font-normal px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">{tool.category}</span>
            </h1>
          </div>
        </div>
        <div className="flex gap-3">
          {processedImage && (
            <>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors">
                <Share2 size={16} /> Share
              </button>
              <DownloadDropdown onDownload={handleDownload} />
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden">
        {/* Sidebar Controls */}
        <div className="w-full lg:w-80 bg-white border-r border-slate-200 p-6 flex-shrink-0 overflow-y-auto">
          <div className="space-y-6">

            {/* Upload Area */}
            {!originalImage && (
              <label className="block border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Upload Photo</h3>
                <p className="text-sm text-slate-500">Drag & drop or click to browse</p>
              </label>
            )}

            {/* Controls */}
            {originalImage && (
              <>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Input Image</span>
                    <button onClick={() => { setOriginalImage(null); setProcessedImage(null) }} className="text-xs text-red-500 hover:text-red-700">Change</button>
                  </div>
                  <div className="w-full h-32 bg-slate-200 rounded-md overflow-hidden flex items-center justify-center p-2">
                    <img src={originalImage} alt="Thumbnail" className="max-w-full max-h-full object-contain" />
                  </div>
                </div>

                {/* Dynamic Specific Controls */}
                {renderToolControls()}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    AI Prompt (Refine if needed)
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm min-h-[100px]"
                    placeholder="Describe how you want to edit the image..."
                  />
                </div>

                {(!checkUserPremium()) && (
                  <div style={{
                    marginBottom: "10px",
                    fontSize: "14px",
                    color: "#555"
                  }}>
                    Free uses left: {usageLeft} / 5
                  </div>
                )}

                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    isProcessing
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="animate-spin" size={20} /> Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} /> 
                      {usageLeft === 0 && !isPremium ? "Upgrade to Continue 🚀" : getButtonText()}
                    </>
                  )}
                </button>

                {!isPremium && (
                  <button
                    onClick={handlePayment}
                    disabled={isPaymentLoading}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all mt-2 ${isPaymentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isPaymentLoading ? 'Processing...' : 'Buy Premium ₹99'}
                  </button>
                )}

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-start gap-2">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </>
            )}

            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Tips</h4>
              <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4">
                <li>Higher resolution images take longer to process.</li>
                <li>Be specific in the prompt for best results.</li>
                <li>The AI will generate a new variation based on your image.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Preview Area */}
        <div className="flex-1 bg-slate-200/50 p-4 lg:p-8 flex items-center justify-center overflow-auto relative">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>

          {!originalImage ? (
            <div className="text-center text-slate-400 z-10">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={32} />
              </div>
              <p className="text-lg font-medium">Upload an image to start editing</p>
            </div>
          ) : (
            <div className="w-full max-w-4xl flex items-center justify-center z-10 py-4">
              {processedImage ? (
                <div className="w-full shadow-2xl rounded-3xl overflow-hidden bg-slate-900">
                  <ImageCompare beforeImage={originalImage} afterImage={processedImage} />
                </div>
              ) : (
                <div className="relative shadow-2xl rounded-3xl overflow-hidden bg-slate-900 p-1">
                  <img src={originalImage} alt="Original" className="max-h-[75vh] w-auto max-w-full object-contain block mx-auto" />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-3xl shadow-2xl flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
                        <span className="font-bold text-slate-900 tracking-tight">AI is working...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={() => {
          upgradeToPremium();
          setIsUpgradeModalOpen(false);
        }}
      />
    </div>
  );
};

export default Editor;
