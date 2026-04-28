"use client";

interface ContactFormProps {
  name: string;
  phone: string;
  notes: string;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onNotesChange: (v: string) => void;
}

export default function ContactForm({
  name,
  phone,
  notes,
  onNameChange,
  onPhoneChange,
  onNotesChange,
}: ContactFormProps) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9+]/g, "");
    onPhoneChange(value);
  };

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="text-center mb-2">
        <h2 className="font-display text-2xl font-bold text-nude-900 mb-1">
          Your Details
        </h2>
        <p className="text-nude-500 text-sm">So we know who to expect!</p>
      </div>

      <div className="card border border-nude-100 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-nude-700 text-sm font-semibold mb-1.5">
            👤 Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Maria Santos"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="input-field"
            autoComplete="name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-nude-700 text-sm font-semibold mb-1.5">
            📱 Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. 09123456789"
            value={phone}
            onChange={handlePhoneChange}
            className="input-field"
            autoComplete="tel"
            inputMode="numeric"
            maxLength={13}
          />
          <p className="text-nude-400 text-xs mt-1">
            We&apos;ll use this for appointment reminders
          </p>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-nude-700 text-sm font-semibold mb-1.5">
            📝 Special Requests{" "}
            <span className="text-nude-400 font-normal">(optional)</span>
          </label>
          <textarea
            placeholder="e.g. nail shape preference, design inspo, allergies..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="input-field resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="bg-nude-50 border border-nude-100 rounded-2xl p-4">
        <p className="text-nude-600 text-xs text-center">
          🔒 Your information is kept private and used only for your booking.
        </p>
      </div>
    </div>
  );
}
