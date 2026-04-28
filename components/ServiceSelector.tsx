"use client";

import { SERVICES } from "@/lib/bookings";

interface ServiceSelectorProps {
  selected: string;
  onSelect: (service: string, price: number) => void;
}

export default function ServiceSelector({ selected, onSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-4 animate-fade-up">
      <div className="text-center mb-2">
        <h2 className="font-display text-2xl font-bold text-nude-900 mb-1">
          Choose a Service
        </h2>
        <p className="text-nude-500 text-sm">Select the service that suits you best</p>
      </div>

      {Object.entries(SERVICES).map(([category, info]) => (
        <div key={category}>
          <div className="flex items-center gap-2 mb-2 px-1">
            <span className="text-lg">{info.icon}</span>
            <h3 className="font-display font-semibold text-nude-800">{category}</h3>
            <span className="text-nude-400 text-xs">— {info.description}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {info.variants.map((variant) => {
              const key = `${category} - ${variant.name}`;
              const isSelected = selected === key;
              return (
                <button
                  key={variant.name}
                  onClick={() => onSelect(key, variant.price)}
                  className={`relative p-3 rounded-2xl border-2 text-left transition-all duration-200 active:scale-95
                    ${isSelected
                      ? "border-rosegold bg-petal shadow-glow"
                      : "border-nude-100 bg-white hover:border-rosegold/40 hover:bg-petal/50"
                    }`}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-5 h-5 bg-rosegold rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <div className="text-nude-700 text-sm font-medium mb-1">{variant.name}</div>
                  <div className="text-rosegold font-bold text-base">₱{variant.price}</div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
