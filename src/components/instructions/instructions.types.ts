export interface InstructionStep {
id: string;
stepNumber: number;
description: string;
imageUrl?: string;
imageAlt?: string;
isCompleted?: boolean;
}
export interface InstructionsData {
steps: InstructionStep[];
}
