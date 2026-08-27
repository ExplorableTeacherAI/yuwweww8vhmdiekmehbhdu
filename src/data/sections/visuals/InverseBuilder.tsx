import { useState } from "react";
import { Button, Slider } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";

const SWAP_COLOR = "#6366f1";
const SIGN_COLOR = "#f59e0b";
const DIVIDE_COLOR = "#8b5cf6";

const STEPS = [
    { label: "Start", note: "The matrix you want to undo." },
    { label: "1. Swap", note: "Swap the two entries on the main diagonal: a and d change places." },
    { label: "2. Negate", note: "Change the sign of the other two entries: b and c." },
    { label: "3. Divide", note: "Divide every entry by the determinant. Skipping this step leaves the answer wrong." },
];

interface MatrixCellsProps {
    values: number[];
    highlight: number[];
    accent: string;
}

const MatrixCells = ({ values, highlight, accent }: MatrixCellsProps) => (
    <div className="flex items-stretch gap-1">
        <div className="w-2 rounded-l-sm border-y-2 border-l-2 border-slate-600" />
        <div className="grid grid-cols-2 gap-2 py-1">
            {values.map((value, index) => {
                const isHighlighted = highlight.includes(index);
                return (
                    <div
                        key={index}
                        className="flex h-11 w-16 items-center justify-center rounded-md border text-sm font-semibold transition-colors"
                        style={{
                            borderColor: isHighlighted ? accent : "#e2e8f0",
                            background: isHighlighted ? `${accent}1f` : "#f8fafc",
                            color: isHighlighted ? accent : "#334155",
                        }}
                    >
                        {value}
                    </div>
                );
            })}
        </div>
        <div className="w-2 rounded-r-sm border-y-2 border-r-2 border-slate-600" />
    </div>
);

interface EntrySliderProps {
    label: string;
    variableName: string;
    value: number;
}

const EntrySlider = ({ label, variableName, value }: EntrySliderProps) => {
    const setVar = useSetVar();
    return (
        <div className="w-36 space-y-1">
            <div className="flex justify-between text-xs text-slate-500">
                <span>{label}</span>
                <span className="font-semibold text-slate-700">{value}</span>
            </div>
            <Slider
                value={[value]}
                min={-6}
                max={6}
                step={1}
                onValueChange={([next]) => setVar(variableName, next)}
            />
        </div>
    );
};

const round = (value: number) => Math.round(value * 1000) / 1000;

export const InverseBuilder = () => {
    const [step, setStep] = useState(0);

    const a = useVar("inverseEntryTopLeft", 4) as number;
    const b = useVar("inverseEntryTopRight", 7) as number;
    const c = useVar("inverseEntryBottomLeft", 2) as number;
    const d = useVar("inverseEntryBottomRight", 6) as number;

    const determinant = a * d - b * c;
    const invertible = determinant !== 0;

    const stages = [
        { values: [a, b, c, d], highlight: [] as number[], accent: SWAP_COLOR },
        { values: [d, b, c, a], highlight: [0, 3], accent: SWAP_COLOR },
        { values: [d, -b, -c, a], highlight: [1, 2], accent: SIGN_COLOR },
        {
            values: invertible ? [round(d / determinant), round(-b / determinant), round(-c / determinant), round(a / determinant)] : [d, -b, -c, a],
            highlight: invertible ? [0, 1, 2, 3] : [],
            accent: DIVIDE_COLOR,
        },
    ];

    const stage = stages[step];

    return (
        <div className="w-full space-y-4 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {STEPS.map((entry, index) => (
                    <Button
                        key={entry.label}
                        size="sm"
                        variant={step === index ? "default" : "outline"}
                        onClick={() => setStep(index)}
                    >
                        {entry.label}
                    </Button>
                ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="flex flex-col items-center gap-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        The original matrix
                    </div>
                    <MatrixCells values={[a, b, c, d]} highlight={[]} accent={SWAP_COLOR} />
                    <div className="text-xs text-slate-500">
                        determinant = {a} x {d} - {b} x {c} ={" "}
                        <span className={determinant === 0 ? "font-semibold text-amber-700" : "font-semibold text-slate-700"}>
                            {determinant}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Working copy
                    </div>
                    <div className="flex items-center gap-2">
                        {step === 3 && invertible && (
                            <div className="text-center text-sm font-semibold" style={{ color: DIVIDE_COLOR }}>
                                <div className="border-b border-current px-1">1</div>
                                <div className="px-1">{determinant}</div>
                            </div>
                        )}
                        <MatrixCells values={stage.values} highlight={stage.highlight} accent={stage.accent} />
                    </div>
                    <div className="text-xs text-slate-500">
                        {step === 3 && invertible ? "This is the inverse." : STEPS[step].label}
                    </div>
                </div>
            </div>

            <div className="rounded-md bg-slate-50 px-4 py-2 text-center text-sm text-slate-600">
                {STEPS[step].note}
            </div>

            {step === 3 && !invertible && (
                <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-center text-sm text-amber-900">
                    The determinant is zero, so this step asks you to divide by zero. This matrix has no
                    inverse.
                </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 border-t border-slate-100 pt-4">
                <EntrySlider label="a (top left)" variableName="inverseEntryTopLeft" value={a} />
                <EntrySlider label="b (top right)" variableName="inverseEntryTopRight" value={b} />
                <EntrySlider label="c (bottom left)" variableName="inverseEntryBottomLeft" value={c} />
                <EntrySlider label="d (bottom right)" variableName="inverseEntryBottomRight" value={d} />
            </div>
        </div>
    );
};
