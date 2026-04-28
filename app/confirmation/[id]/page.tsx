"use client";

import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DOWN_PAYMENT } from "@/lib/bookings";

export default function ConfirmationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(false);

  const bookingId = params.id as string;
  const name = searchParams.get("name") || "";
  const service = searchParams.get("service") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const price = parseInt(searchParams.get("price") || "0");

  useEffect(() => {
    setShowConfetti(true);
    const t = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const formattedDate = date
    ? format(new Date(date + "T00:00:00"), "EEEE, MMMM d, yyyy")
    : "";

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Confetti dots */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 40}%`,
                backgroundColor: ["#C9956C", "#F0C0D0", "#EBD0BC", "#E5C4A8", "#D97295"][i % 5],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.5 + Math.random() * 1}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-lg mx-auto w-full px-4 py-8 flex-1 flex flex-col items-center justify-center">
        {/* Success animation */}
        <div className="w-24 h-24 bg-gradient-to-br from-rosegold-light to-rosegold rounded-full flex items-center justify-center mb-6 shadow-glow animate-scale-in">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display text-3xl font-bold text-nude-900 text-center mb-2 animate-fade-up">
          Booking Confirmed! 🎉
        </h1>
        <p className="text-nude-500 text-sm text-center mb-6 animate-fade-up">
          Your slot has been reserved, {name.split(" ")[0]}!
        </p>

        {/* Booking Details Card */}
        <div className="card border border-nude-100 w-full mb-4 animate-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💅</span>
            <h2 className="font-display font-semibold text-nude-800">Appointment Details</h2>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-nude-500 text-sm">Booking ID</span>
              <span className="text-nude-700 text-sm font-mono bg-nude-50 px-2 py-0.5 rounded-lg max-w-[55%] truncate">
                {bookingId}
              </span>
            </div>
            <div className="h-px bg-nude-50" />
            <div className="flex justify-between items-start">
              <span className="text-nude-500 text-sm">Name</span>
              <span className="text-nude-800 font-semibold text-sm">{name}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-nude-500 text-sm">Service</span>
              <span className="text-nude-800 font-semibold text-sm text-right max-w-[55%]">{service}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-nude-500 text-sm">Date</span>
              <span className="text-nude-800 font-semibold text-sm text-right max-w-[55%]">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-nude-500 text-sm">Time</span>
              <span className="text-nude-800 font-semibold text-sm">{time}</span>
            </div>
            <div className="h-px bg-nude-50" />
            <div className="flex justify-between">
              <span className="text-nude-500 text-sm">Total Price</span>
              <span className="text-nude-700 text-sm">₱{price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-nude-500 text-sm">Slot Fee (paid)</span>
              <span className="text-rosegold font-bold text-sm">₱{DOWN_PAYMENT} ✅</span>
            </div>
            <div className="flex justify-between">
              <span className="text-nude-500 text-sm">Balance on day</span>
              <span className="text-nude-800 font-semibold text-sm">₱{price - DOWN_PAYMENT}</span>
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4 animate-fade-up">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">⏳</span>
            <div>
              <p className="text-amber-700 font-semibold text-sm">Pending Review</p>
              <p className="text-amber-600 text-xs">
                Chazi will review your payment and confirm your appointment within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Reminders */}
        <div className="card border border-nude-100 w-full mb-6 animate-fade-up">
          <h3 className="font-semibold text-nude-800 text-sm mb-3">📋 Reminders</h3>
          <ul className="space-y-2 text-xs text-nude-600">
            <li className="flex gap-2">
              <span className="text-rosegold">•</span>
              Please arrive on time for your appointment
            </li>
            <li className="flex gap-2">
              <span className="text-rosegold">•</span>
              Remove old nail polish before coming (unless getting removal service)
            </li>
            <li className="flex gap-2">
              <span className="text-rosegold">•</span>
              Bring your inspo photos for nail designs
            </li>
            <li className="flex gap-2">
              <span className="text-rosegold">•</span>
              Balance of <strong className="text-nude-700">₱{price - DOWN_PAYMENT}</strong> to be paid on your appointment day
            </li>
            <li className="flex gap-2">
              <span className="text-rose-500">•</span>
              <strong>Slot fee of ₱{DOWN_PAYMENT} is non-refundable for no-shows</strong>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full animate-fade-up">
          <Link href="/" className="btn-primary text-center py-4">
            Back to Home 🏠
          </Link>
          <Link href="/book" className="btn-secondary text-center py-4">
            Book Another Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
