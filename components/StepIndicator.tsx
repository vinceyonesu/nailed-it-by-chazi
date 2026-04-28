"use client";

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full px-4 py-4">
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`step-indicator w-9 h-9 text-sm font-bold transition-all duration-300
                  ${currentStep === step.number
                    ? "bg-rosegold text-white shadow-glow scale-110"
                    : currentStep > step.number
                    ? "bg-rosegold/20 text-rosegold border-2 border-rosegold"
                    : "bg-nude-100 text-nude-400 border-2 border-nude-200"
                  }`}
              >
                {currentStep > step.number ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-xs mt-1 font-medium transition-colors duration-300 text-center leading-tight
                  ${currentStep === step.number ? "text-rosegold" : currentStep > step.number ? "text-rosegold/70" : "text-nude-400"}`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-5 rounded-full bg-nude-200 overflow-hidden">
                <div
                  className="h-full bg-rosegold rounded-full transition-all duration-500"
                  style={{ width: currentStep > step.number ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
