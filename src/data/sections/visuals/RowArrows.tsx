import { useRef, useState } from "react";
import { useVar, useSetVar } from "@/stores";

const FIRST = "#6366f1";
const SECOND = "#f43f5e";

const RANGE = 4;
const UNIT = 26;
const PAD = 30;
const SIZE = 2 * RANGE * UNIT + 2 * PAD;

const toScreenX = (x: number) => PAD + (x + RANGE) * UNIT;
const toScreenY = (y: number) => PAD + (RANGE - y) * UNIT;
const toMathX = (screenX: number) => (screenX - PAD) / UNIT - RANGE;
const toMathY = (screenY: number) => RANGE - (screenY - PAD) / UNIT;

const snap = (value: number) => {
    const snapped = Math.round(value * 2) / 2;
    return Math.max(-RANGE, Math.min(RANGE, snapped));
};

const format = (value: number) => (Number.isInteger(value) ? String(value) : value.toFixed(1));

export const RowArrows = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [dragging, setDragging] = useState<"first" | "second" | null>(null);
    const setVar = useSetVar();

    const firstX = useVar("firstRowVectorX", 3) as number;
    const firstY = useVar("firstRowVectorY", 1) as number;
    const secondX = useVar("secondRowVectorX", 1) as number;
    const secondY = useVar("secondRowVectorY", 2) as number;

    const determinant = firstX * secondY - firstY * secondX;
    const flattened = Math.abs(determinant) < 1e-9;

    const handleMove = (event: React.PointerEvent<SVGSVGElement>) => {
        if (!dragging || !svgRef.current) return;
        const bounds = svgRef.current.getBoundingClientRect();
        const x = snap(toMathX(((event.clientX - bounds.left) / bounds.width) * SIZE));
        const y = snap(toMathY(((event.clientY - bounds.top) / bounds.height) * SIZE));
        if (dragging === "first") {
            setVar("firstRowVectorX", x);
            setVar("firstRowVectorY", y);
        } else {
            setVar("secondRowVectorX", x);
            setVar("secondRowVectorY", y);
        }
    };

    const ticks = Array.from({ length: 2 * RANGE + 1 }, (_, index) => index - RANGE);

    const parallelogram = [
        [0, 0],
        [firstX, firstY],
        [firstX + secondX, firstY + secondY],
        [secondX, secondY],
    ]
        .map(([x, y]) => `${toScreenX(x)},${toScreenY(y)}`)
        .join(" ");

    return (
        <div className="w-full space-y-4 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex justify-center">
                <svg
                    ref={svgRef}
                    width={SIZE}
                    height={SIZE}
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    className="touch-none rounded-md bg-slate-50"
                    onPointerMove={handleMove}
                    onPointerUp={() => setDragging(null)}
                    onPointerLeave={() => setDragging(null)}
                >
                    {ticks.map((tick) => (
                        <g key={tick}>
                            <line
                                x1={toScreenX(tick)}
                                y1={PAD}
                                x2={toScreenX(tick)}
                                y2={SIZE - PAD}
                                stroke={tick === 0 ? "#94a3b8" : "#e2e8f0"}
                                strokeWidth={tick === 0 ? 1.5 : 1}
                            />
                            <line
                                x1={PAD}
                                y1={toScreenY(tick)}
                                x2={SIZE - PAD}
                                y2={toScreenY(tick)}
                                stroke={tick === 0 ? "#94a3b8" : "#e2e8f0"}
                                strokeWidth={tick === 0 ? 1.5 : 1}
                            />
                        </g>
                    ))}

                    <polygon
                        points={parallelogram}
                        fill={flattened ? "#f59e0b" : "#8b5cf6"}
                        fillOpacity={flattened ? 0.35 : 0.18}
                        stroke={flattened ? "#f59e0b" : "#8b5cf6"}
                        strokeWidth={1.5}
                    />

                    {[
                        { x: firstX, y: firstY, color: FIRST, key: "first" as const, label: "row 1" },
                        { x: secondX, y: secondY, color: SECOND, key: "second" as const, label: "row 2" },
                    ].map((arrow) => (
                        <g key={arrow.key}>
                            <line
                                x1={toScreenX(0)}
                                y1={toScreenY(0)}
                                x2={toScreenX(arrow.x)}
                                y2={toScreenY(arrow.y)}
                                stroke={arrow.color}
                                strokeWidth={3}
                                strokeLinecap="round"
                            />
                            <circle
                                cx={toScreenX(arrow.x)}
                                cy={toScreenY(arrow.y)}
                                r={9}
                                fill="#ffffff"
                                stroke={arrow.color}
                                strokeWidth={3}
                                className="cursor-grab"
                                onPointerDown={() => setDragging(arrow.key)}
                            />
                            <text
                                x={toScreenX(arrow.x)}
                                y={toScreenY(arrow.y) - 14}
                                textAnchor="middle"
                                fontSize={11}
                                fontWeight={600}
                                fill={arrow.color}
                            >
                                {arrow.label}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                <span className="rounded-md bg-indigo-50 px-2 py-1 font-semibold text-indigo-700">
                    row 1 = ({format(firstX)}, {format(firstY)})
                </span>
                <span className="rounded-md bg-rose-50 px-2 py-1 font-semibold text-rose-700">
                    row 2 = ({format(secondX)}, {format(secondY)})
                </span>
                <span
                    className={`rounded-md px-3 py-1 font-semibold ${
                        flattened ? "bg-amber-100 text-amber-900" : "bg-violet-100 text-violet-900"
                    }`}
                >
                    determinant = {format(determinant)}
                </span>
            </div>

            <div
                className={`rounded-md px-4 py-2 text-center text-sm ${
                    flattened
                        ? "border border-amber-300 bg-amber-50 text-amber-900"
                        : "bg-slate-50 text-slate-600"
                }`}
            >
                {flattened
                    ? "Both arrows lie along one line and the shape between them has flattened away. This matrix has no inverse."
                    : "Drag either arrow tip. Try to line the two arrows up along the same direction."}
            </div>
        </div>
    );
};
