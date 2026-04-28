"use client";

import { useState, useRef } from "react";

interface PaymentUploadProps {
  service: string;
  totalPrice: number;
  downPayment: number;
  receipt: File | null;
  onReceiptChange: (file: File | null) => void;
}

export default function PaymentUpload({
  service,
  totalPrice,
  downPayment,
  receipt,
  onReceiptChange,
}: PaymentUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    onReceiptChange(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const removeReceipt = () => {
    setPreview(null);
    onReceiptChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="text-center mb-2">
        <h2 className="font-display text-2xl font-bold text-nude-900 mb-1">
          GCash Payment
        </h2>
        <p className="text-nude-500 text-sm">Send ₱{downPayment} slot fee to secure your booking</p>
      </div>

      {/* Policy Banners */}
      <div className="space-y-2">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-4 py-2.5 rounded-xl text-center">
          ⚠️ NO PAYMENT = NO RESERVED SLOT
        </div>
        <div className="bg-nude-50 border border-nude-200 text-nude-600 text-xs px-4 py-2.5 rounded-xl text-center">
          🚫 Slot fee of ₱{downPayment} is STRICTLY NON-REFUNDABLE for no-shows
        </div>
      </div>

      {/* Booking Summary */}
      <div className="card border border-nude-100">
        <h3 className="font-semibold text-nude-800 text-sm mb-3">📋 Booking Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-nude-500">Service</span>
            <span className="text-nude-800 font-medium text-right max-w-[60%]">{service}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-nude-500">Total Price</span>
            <span className="text-nude-800 font-medium">₱{totalPrice}</span>
          </div>
          <div className="h-px bg-nude-100 my-1" />
          <div className="flex justify-between">
            <span className="text-rosegold font-semibold text-sm">Slot Fee (to pay now)</span>
            <span className="text-rosegold font-bold">₱{downPayment}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-nude-500">Remaining (on appointment day)</span>
            <span className="text-nude-700 font-medium">₱{totalPrice - downPayment}</span>
          </div>
        </div>
      </div>

      {/* GCash QR Code */}
      <div className="card border border-nude-100 text-center">
        <h3 className="font-semibold text-nude-800 text-sm mb-3">💚 GCash Payment Details</h3>

        {/* QR Code placeholder */}
        <div className="flex justify-center mb-3">
          <div className="w-44 h-44 bg-gradient-to-br from-nude-50 to-petal rounded-2xl border-2 border-dashed border-nude-200 flex flex-col items-center justify-center shadow-soft">
            <div className="grid grid-cols-3 gap-1 mb-2">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-sm ${i % 2 === 0 ? "bg-nude-400" : "bg-nude-200"}`}
                />
              ))}
            </div>
            <p className="text-nude-400 text-xs mt-1 font-medium">GCash QR Code</p>
            <p className="text-nude-300 text-[10px]">Replace with actual QR</p>
          </div>
        </div>

        <div className="bg-petal rounded-xl p-3 space-y-1">
          <p className="text-nude-600 text-xs">GCash Number</p>
          <p className="text-nude-900 font-bold text-lg tracking-wider">0917 XXX XXXX</p>
          <p className="text-nude-600 text-xs">Account Name</p>
          <p className="text-nude-800 font-semibold">CHAZI M.</p>
        </div>

        <div className="mt-3 space-y-1 text-left">
          <p className="text-nude-700 text-xs font-semibold">How to pay:</p>
          <ol className="text-nude-500 text-xs space-y-1 list-none">
            <li className="flex gap-2"><span className="text-rosegold font-bold">1.</span> Open your GCash app</li>
            <li className="flex gap-2"><span className="text-rosegold font-bold">2.</span> Scan the QR code above OR send to the number</li>
            <li className="flex gap-2"><span className="text-rosegold font-bold">3.</span> Enter amount: <strong className="text-nude-700">₱{downPayment}</strong></li>
            <li className="flex gap-2"><span className="text-rosegold font-bold">4.</span> Take a screenshot of your receipt</li>
            <li className="flex gap-2"><span className="text-rosegold font-bold">5.</span> Upload the screenshot below</li>
          </ol>
        </div>
      </div>

      {/* Receipt Upload */}
      <div className="card border border-nude-100">
        <h3 className="font-semibold text-nude-800 text-sm mb-3">📸 Upload GCash Receipt</h3>

        {!receipt ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
              ${isDragging ? "border-rosegold bg-petal" : "border-nude-200 hover:border-rosegold/50 hover:bg-petal/30"}`}
          >
            <div className="text-3xl mb-2">📱</div>
            <p className="text-nude-700 font-medium text-sm mb-1">Tap to upload screenshot</p>
            <p className="text-nude-400 text-xs">PNG, JPG up to 10MB</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleInputChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden border-2 border-rosegold">
              {preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="GCash receipt preview"
                  className="w-full max-h-64 object-contain bg-nude-50"
                />
              )}
            </div>
            <div className="flex items-center justify-between mt-2 px-1">
              <span className="text-rosegold text-xs font-semibold flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Receipt uploaded!
              </span>
              <button
                onClick={removeReceipt}
                className="text-nude-400 text-xs hover:text-rose-500 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
