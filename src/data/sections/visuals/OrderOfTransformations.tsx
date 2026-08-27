import { useState } from "react";
import { Button } from "@/components/atoms";

type Matrix = [[number, number], [number, number]];
type Point = [number, number];

/** Quarter turn anticlockwise. */
const TURN: Matrix = [
    [0, -1],
    [1, 0],
];

/** Stretch of 2 in the horizontal direction. */
const STRETCH: Matrix = [
    [2, 0],
    [0, 1],
];

/** An L-shaped flag, chosen because turning and stretching it look different. */
const FLAG: Point[] = [
    [0, 0],
    [1.6, 0],
    [1.6, 0.6],
    [0.6, 0.6],
    [0.6, 2],
    [0, 2],
];

const apply = (matrix: Matrix, [x, y]: Point): Point => [
    matrix[0][0] * x + matrix[0][1] * y,
    matrix[1][0] * x + matrix[1][1] * y,
];

const multiply = (left: Matrix, right: Matrix): Matrix => [
    [
        left[0][0] * right[0][0] + left[0][1] * right[1][0],
        left[0][0] * right[0][1] + left[0][1] * right[1][1],
    ],
    [
        left[1][0] * right[0][0] + left[1][1] * right[1][0],
        left[1][0] * right[0][1] + left[1][1] * right[1][1],
    ],
];

const UNIT = 26;
const RANGE = 4;
const PAD = 26;
const SIZE = 2 * RANGE * UNIT + 2 * PAD;
const toScreen = ([x, y]: Point) => [PAD + (x + RANGE) * UNIT, PAD + (RANGE - y) * UNIT];

interface GridPanelProps {
    title: string;
    subtitle: string;
    shape: Point[];
    accent: string;
    resultLabel: string;
    matrix: Matrix;
}

const GridPanel = ({ title, subtitle, shape, accent, resultLabel, matrix }: GridPanelProps) => {
    const points = shape.map((point) => toScreen(point).join(",")).join(" ");
    const original = FLAG.map((point) => toScreen(point).join(",")).join(" ");
    const ticks = Array.from({ length: 2 * RANGE + 1 }, (_, index) => index - RANGE);

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="text-center">
                <div className="text-sm font-semibold text-slate-700">{title}</div>
                <div className="text-xs text-slate-500">{subtitle}</div>
            </div>
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="rounded-md bg-slate-50">
                {ticks.map((tick) => (
                    <g key={tick}>
                        <line
                            x1={PAD + (tick + RANGE) * UNIT}
                            y1={PAD}
                            x2={PAD + (tick + RANGE) * UNIT}
                            y2={SIZE - PAD}
                            stroke={tick === 0 ? "#94a3b8" : "#e2e8f0"}
                            strokeWidth={tick === 0 ? 1.5 : 1}
                        />
                        <line
                            x1={PAD}
                            y1={PAD + (RANGE - tick) * UNIT}
                            x2={SIZE - PAD}
                            y2={PAD + (RANGE - tick) * UNIT}
                            stroke={tick === 0 ? "#94a3b8" : "#e2e8f0"}
                            strokeWidth={tick === 0 ? 1.5 : 1}
                        />
                    </g>
                ))}
                <polygon points={original} fill="none" stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="4 3" />
                <polygon points={points} fill={accent} fillOpacity={0.28} stroke={accent} strokeWidth={2} />
            </svg>
            <div className="text-center text-xs text-slate-600">
                <div className="font-semibold" style={{ color: accent }}>
                    {resultLabel}
                </div>
                <div className="font-mono">
                    [{matrix[0][0]} {matrix[0][1]}] [{matrix[1][0]} {matrix[1][1]}]
                </div>
            </div>
        </div>
    );
};

export const OrderOfTransformations = () => {
    const [step, setStep] = useState(2);

    const stretchThenTurn = [FLAG, FLAG.map((p) => apply(STRETCH, p)), FLAG.map((p) => apply(multiply(TURN, STRETCH), p))];
    const turnThenStretch = [FLAG, FLAG.map((p) => apply(TURN, p)), FLAG.map((p) => apply(multiply(STRETCH, TURN), p))];

    const stepLabels = ["Start", "After the first step", "After both steps"];

    return (
        <div className="w-full space-y-4 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {stepLabels.map((label, index) => (
                    <Button
                        key={label}
                        size="sm"
                        variant={step === index ? "default" : "outline"}
                        onClick={() => setStep(index)}
                    >
                        {label}
                    </Button>
                ))}
            </div>

            <div className="flex flex-wrap items-start justify-center gap-8">
                <GridPanel
                    title="Stretch first, then turn"
                    subtitle="the product R S"
                    shape={stretchThenTurn[step]}
                    accent="#6366f1"
                    resultLabel={step === 2 ? "R S" : stepLabels[step]}
                    matrix={multiply(TURN, STRETCH)}
                />
                <GridPanel
                    title="Turn first, then stretch"
                    subtitle="the product S R"
                    shape={turnThenStretch[step]}
                    accent="#f43f5e"
                    resultLabel={step === 2 ? "S R" : stepLabels[step]}
                    matrix={multiply(STRETCH, TURN)}
                />
            </div>

            <div className="rounded-md bg-slate-50 px-4 py-2 text-center text-sm text-slate-600">
                R is a quarter turn anticlockwise and S is a stretch of 2 sideways. The dashed
                outline is the starting flag.
            </div>
        </div>
    );
};
