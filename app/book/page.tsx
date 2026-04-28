"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import StepIndicator from "@/components/StepIndicator";
import ServiceSelector from "@/components/ServiceSelector";
import DateTimePicker from "@/components/DateTimePicker";
import ContactForm from "@/components/ContactForm";
import PaymentUpload from "@/components/PaymentUpload";
import { saveBooking, uploadReceipt, DOWN_PAYMENT } from "@/lib/bookings";

const STEPS = [
  { number: 1, label: "Service" },
  { number: 2, label: "Schedule" },
  { number: 3, label: "Details" },
  { number: 4, label: "Payment" },
];

export default function BookPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [service, setService] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);

  const canProceed = () => {
    if (step === 1) return !!service;
    if (step === 2) return !!date && !!time;
    if (step === 3) return name.trim().length >= 2 && phone.trim().length >= 10;
    if (step === 4) return !!receipt;
    return false;
  };

  const handleNext = () => {
    if (!canProceed()) {
      const messages: Record<number, string> = {
        1: "Please select a service first.",
        2: "Please pick both a date and time.",
        3: "Please fill in your name and phone number.",
        4: "Please upload your GCash receipt.",
      };
      toast.error(messages[step]);
      return;
    }
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    if (!receipt) return;
    setIsSubmitting(true);

    try {
      const tempId = `temp_${Date.now()}`;
      const receiptURL = await uploadReceipt(receipt, tempId);

      const bookingId = await saveBooking({
        name: name.trim(),
        phone: phone.trim(),
        service,
        serviceCategory: service.split(" - ")[0],
        date,
        time,
        totalPrice: price,
        downPayment: DOWN_PAYMENT,
        receiptURL,
        status: "pending",
        notes: notes.trim(),
      });

      router.push(`/confirmation/${bookingId}?name=${encodeURIComponent(name)}&service=${encodeURIComponent(service)}&date=${date}&time=${encodeURIComponent(time)}&price=${price}`);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    const titles: Record<number, string> = {
      1: "Select Service",
      2: "Pick Schedule",
      3: "Your Details",
      4: "Confirm & Pay",
    };
    return titles[step];
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-nude-100 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-nude-50 transition-colors"
          >
            <svg className="w-5 h-5 text-nude-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="font-display text-base font-semibold text-nude-900 italic">
              Book an Appointment
            </h1>
            <p className="text-nude-500 text-xs">{getStepTitle()}</p>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b border-nude-50">
        <div className="max-w-lg mx-auto">
          <StepIndicator steps={STEPS} currentStep={step} />
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-lg mx-auto px-4 py-6 pb-32">
        {step === 1 && (
          <ServiceSelector
            selected={service}
            onSelect={(s, p) => { setService(s); setPrice(p); }}
          />
        )}
        {step === 2 && (
          <DateTimePicker
            selectedDate={date}
            selectedTime={time}
            onDateChange={setDate}
            onTimeChange={setTime}
          />
        )}
        {step === 3 && (
          <ContactForm
            name={name}
            phone={phone}
            notes={notes}
            onNameChange={setName}
            onPhoneChange={setPhone}
            onNotesChange={setNotes}
          />
        )}
        {step === 4 && (
          <PaymentUpload
            service={service}
            totalPrice={price}
            downPayment={DOWN_PAYMENT}
            receipt={receipt}
            onReceiptChange={setReceipt}
          />
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-nude-100 px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-lg mx-auto flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              disabled={isSubmitting}
              className="flex-none px-5 py-4 rounded-2xl border-2 border-nude-200 text-nude-600 font-semibold
                         transition-all duration-200 active:scale-95 hover:border-nude-300 disabled:opacity-50"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className={`flex-1 py-4 rounded-2xl font-semibold text-base transition-all duration-200 active:scale-95
              shadow-soft flex items-center justify-center gap-2
              ${canProceed()
                ? "bg-rosegold text-white hover:bg-rosegold-dark shadow-glow"
                : "bg-nude-100 text-nude-400 cursor-default"
              } disabled:opacity-70`}
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </>
            ) : step === 4 ? (
              "Confirm Booking 💅"
            ) : (
              <>
                {step === 1 && service ? `${service.split(" - ")[1]} — ₱${price}` : ""}
                {step > 1 ? "Continue" : !service ? "Select a Service" : ""}
                {step < 4 && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </>
            )}
          </button>
        </div>

        {step === 4 && (
          <p className="text-center text-nude-400 text-xs mt-2 max-w-lg mx-auto">
            By confirming, you agree that the ₱{DOWN_PAYMENT} slot fee is non-refundable.
          </p>
        )}
      </div>
    </div>
  );
}
