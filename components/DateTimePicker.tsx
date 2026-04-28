"use client";

import { TIME_SLOTS } from "@/lib/bookings";
import { format, addDays, startOfDay } from "date-fns";

interface DateTimePickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const today = startOfDay(new Date());
  const minDate = format(addDays(today, 1), "yyyy-MM-dd");
  const maxDate = format(addDays(today, 60), "yyyy-MM-dd");

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="text-center mb-2">
        <h2 className="font-display text-2xl font-bold text-nude-900 mb-1">
          Pick a Date & Time
        </h2>
        <p className="text-nude-500 text-sm">Select your preferred schedule</p>
      </div>

      {/* Date Picker */}
      <div className="card border border-nude-100">
        <label className="block text-nude-700 text-sm font-semibold mb-2">
          📅 Select Date
        </label>
        <input
          type="date"
          min={minDate}
          max={maxDate}
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="input-field"
        />
        <p className="text-nude-400 text-xs mt-2">
          Bookings available from tomorrow onwards
        </p>
      </div>

      {/* Time Slots */}
      <div className="card border border-nude-100">
        <label className="block text-nude-700 text-sm font-semibold mb-3">
          🕐 Select Time Slot
        </label>
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((time) => (
            <button
              key={time}
              onClick={() => onTimeChange(time)}
              className={`py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95
                ${selectedTime === time
                  ? "bg-rosegold text-white shadow-soft"
                  : "bg-nude-50 text-nude-700 border border-nude-100 hover:border-rosegold/40 hover:bg-petal/50"
                }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div className="bg-petal border border-blush-200 rounded-2xl p-4 animate-scale-in">
          <p className="text-rosegold font-semibold text-sm text-center">
            ✅ Selected: {format(new Date(selectedDate + "T00:00:00"), "MMMM d, yyyy")} at {selectedTime}
          </p>
        </div>
      )}
    </div>
  );
}
