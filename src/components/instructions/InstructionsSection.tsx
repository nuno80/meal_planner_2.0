"use client"; // Added "use client"
import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { InstructionsData, InstructionStep } from './instructions.types';

interface InstructionsSectionProps {
data: InstructionsData;
}

export const InstructionsSection: React.FC<InstructionsSectionProps> = ({ data }) => {
  const [steps, setSteps] = useState<InstructionStep[]>(
    data.steps.map(step => ({ ...step, isCompleted: step.isCompleted || false }))
  );

  const handleStepToggle = (id: string) => {
    setSteps(prev =>
      prev.map(step =>
        step.id === id ? { ...step, isCompleted: !step.isCompleted } : step
      )
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
      <ol className="space-y-6">
        {steps.map(step => (
          <li key={step.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex flex-col items-center">
              <span className={\`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${step.isCompleted ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}\`}>
                {step.stepNumber}
              </span>
            </div>
            <div className="flex-grow">
              <p className={\`text-sm text-gray-700 ${step.isCompleted ? 'line-through text-gray-500' : ''}\`}>
                {step.description}
              </p>
              {step.imageUrl && (
                <img
                  src={step.imageUrl}
                  alt={step.imageAlt || \`Instruction step ${step.stepNumber}\`}
                  className="mt-3 rounded-lg shadow-sm w-full max-w-md object-cover aspect-video"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop if placeholder also fails
                    target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Error&font=lora";
                    // Removed: target.style.display = 'none';
                  }}
                />
              )}
            </div>
            <button
              onClick={() => handleStepToggle(step.id)}
              className="p-1 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded self-start"
              aria-pressed={step.isCompleted}
              aria-label={\`Mark step ${step.stepNumber} as ${step.isCompleted ? 'incomplete' : 'complete'}\`}
            >
              {step.isCompleted ? (
                <CheckSquare size={20} className="text-pink-600" />
              ) : (
                <Square size={20} className="text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
