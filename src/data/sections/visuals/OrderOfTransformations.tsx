import { useEffect, useRef, useState } from "react";
import { Button, Slider } from "@/components/atoms";

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

const IDENTITY: Matrix = [
    [1, 0],
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

const blend = (from: Matrix, to: Matrix, t: number): Matrix => [
    [from[0][0] + (to[0][0] - from[0][0]) * t, from[0][1] + (to[0][1] - from[0][1]) * t],
    [from[1][0] + (to[1][0] - from[1][0]) * t, from[1][1] + (to[1][1] - from[1][1]) * t],
];

/** The matrix in force at a point of the walkthrough, 0 to 100. */
const stageMatrix = (first: Matrix, second: Matrix, progress: number): Matrix => {
    const combined = multiply(second, first);
    if (progress <= 50) return blend(IDENTITY, first, progress / 50);
    return blend(first, combined, (progress - 50) / 50);
};

const UNIT = 26;
const RANGE = 4;
const PAD = 26;
const SIZE = 2 * RANGE * UNIT + 2 * PAD;
const toScreen = ([x, y]: Point) => [PAD + (x + RANGE) * UNIT, PAD + (RANGE - y) * UNIT];
const show = (value: number) => (Math.round(value * 100) / 100).toFixed(1);

const STAGES = [
    { at: 0, label: "Start", note: "the flag as it is" },
    { at: 50, label: "After the first move", note: "one matrix applied" },
    { at: 100, label: "After both moves", note: "both matrices applied" },
];

interface GridPanelProps {
    title: string;
    subtitle: string;
    matrix: Matrix;
    accent: string;
    caption: string;
}

const GridPanel = ({ title, subtitle, matrix, accent, caption }: GridPanelProps) => {
    const shape = FLAG.map((point) => apply(matrix, point));
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
            <div className="text-center text-xs">
                <div className="font-semibold" style={{ color: accent }}>
                    {caption}
                </div>
                <div className="font-mono text-slate-500">
                    [{show(matrix[0][0])} {show(matrix[0][1])}] [{show(matrix[1][0])} {show(matrix[1][1])}]
                </div>
            </div>
        </div>
    );
};

export const OrderOfTransformations = () => {
    const [progress, setProgress] = useState(100);
    const [playing, setPlaying] = useState(false);
    const frame = useRef<number | null>(null);

    useEffect(() => {
        if (!playing) return;
        const tick = () => {
            setProgress((current) => {
                if (current >= 100) {
                    setPlaying(false);
                    return 100;
                }
                return Math.min(100, current + 1);
            });
            frame.current = requestAnimationFrame(tick);
        };
        frame.current = requestAnimationFrame(tick);
        return () => {
            if (frame.current !== null) cancelAnimationFrame(frame.current);
        };
    }, [playing]);

    const stretchThenTurn = stageMatrix(STRETCH, TURN, progress);
    const turnThenStretch = stageMatrix(TURN, STRETCH, progress);

    const stageNote =
        progress === 0
            ? "The flag has not moved yet."
            : progress < 50
              ? "The first move is under way in each panel, and they are already different moves."
              : progress === 50
                ? "One move done. On the left the flag has been stretched; on the right it has been turned."
                : progress < 100
                  ? "The second move is under way in each panel."
                  : "Both moves done. Compare where the two flags have landed.";

    return (
        <div className="w-full space-y-4 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {STAGES.map((stage) => (
                    <Button
                        key={stage.label}
                        size="sm"
                        variant={progress === stage.at ? "default" : "outline"}
                        onClick={() => {
                            setPlaying(false);
                            setProgress(stage.at);
                        }}
                    >
                        {stage.label}
                    </Button>
                ))}
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                        if (playing) {
                            setPlaying(false);
                            return;
                        }
                        setProgress(0);
                        setPlaying(true);
                    }}
                >
                    {playing ? "Pause" : "Play both moves"}
                </Button>
            </div>

            <div className="mx-auto w-full max-w-md space-y-1">
                <Slider
                    value={[progress]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={([next]) => {
                        setPlaying(false);
                        setProgress(next);
                    }}
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                    {STAGES.map((stage) => (
                        <span key={stage.label}>{stage.note}</span>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-start justify-center gap-8">
                <GridPanel
                    title="Stretch first, then turn"
                    subtitle="the product R S"
                    matrix={stretchThenTurn}
                    accent="#6366f1"
                    caption={progress === 100 ? "R S" : "part way through"}
                />
                <GridPanel
                    title="Turn first, then stretch"
                    subtitle="the product S R"
                    matrix={turnThenStretch}
                    accent="#f43f5e"
                    caption={progress === 100 ? "S R" : "part way through"}
                />
            </div>

            <div className="rounded-md bg-slate-50 px-4 py-2 text-center text-sm text-slate-600">
                {stageNote}
            </div>

            <div className="text-center text-xs text-slate-500">
                R is a quarter turn anticlockwise and S is a stretch of 2 sideways. The dashed outline is
                the starting flag.
            </div>
        </div>
    );
};
