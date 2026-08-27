import { useState, type ReactNode } from "react";
import { Button, Input, RadioGroup, RadioGroupItem, Label } from "@/components/atoms";

export interface ChoiceOption {
    id: string;
    label: ReactNode;
    correct?: boolean;
    feedback: string;
}

interface ChoiceQuestionProps {
    options: ChoiceOption[];
}

/** Multiple-choice practice with per-option feedback. */
export const ChoiceQuestion = ({ options }: ChoiceQuestionProps) => {
    const [selected, setSelected] = useState<string>("");
    const [checked, setChecked] = useState(false);

    const chosen = options.find((option) => option.id === selected);
    const isCorrect = Boolean(chosen?.correct);

    return (
        <div className="space-y-3">
            <RadioGroup
                value={selected}
                onValueChange={(value) => {
                    setSelected(value);
                    setChecked(false);
                }}
                className="space-y-2"
            >
                {options.map((option) => (
                    <div key={option.id} className="flex items-start gap-2">
                        <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                        <Label htmlFor={option.id} className="font-normal leading-relaxed cursor-pointer">
                            {option.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>

            <Button
                variant="outline"
                size="sm"
                disabled={!selected}
                onClick={() => setChecked(true)}
            >
                Check my answer
            </Button>

            {checked && chosen && (
                <div
                    className={`rounded-md border px-3 py-2 text-sm ${
                        isCorrect
                            ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                            : "border-amber-300 bg-amber-50 text-amber-900"
                    }`}
                >
                    {chosen.feedback}
                </div>
            )}
        </div>
    );
};

interface NumericQuestionProps {
    answer: number;
    tolerance?: number;
    placeholder?: string;
    successFeedback: string;
    /** Shown in order on successive wrong attempts; the last one may reveal the answer. */
    hints: string[];
}

/** Typed-answer practice with progressive hints on repeated wrong attempts. */
export const NumericQuestion = ({
    answer,
    tolerance = 0.001,
    placeholder = "Your answer",
    successFeedback,
    hints,
}: NumericQuestionProps) => {
    const [value, setValue] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [state, setState] = useState<"unanswered" | "correct" | "wrong">("unanswered");

    const check = () => {
        const entered = Number(value);
        if (value.trim() === "" || Number.isNaN(entered)) return;
        if (Math.abs(entered - answer) <= tolerance) {
            setState("correct");
        } else {
            setState("wrong");
            setAttempts((previous) => previous + 1);
        }
    };

    const hint = hints[Math.min(attempts, hints.length) - 1] ?? hints[0];

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <Input
                    value={value}
                    placeholder={placeholder}
                    className="w-40"
                    onChange={(event) => {
                        setValue(event.target.value);
                        setState("unanswered");
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") check();
                    }}
                />
                <Button variant="outline" size="sm" onClick={check}>
                    Check my answer
                </Button>
            </div>

            {state === "correct" && (
                <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                    {successFeedback}
                </div>
            )}
            {state === "wrong" && (
                <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                    {hint}
                </div>
            )}
        </div>
    );
};
