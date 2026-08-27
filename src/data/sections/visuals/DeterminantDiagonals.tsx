import { Slider } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";

const MAIN = "#6366f1";
const ANTI = "#f43f5e";

const WIDTH = 320;
const HEIGHT = 210;
const CELL_WIDTH = 84;
const CELL_HEIGHT = 62;
const LEFT = 68;
const TOP = 38;

const centre = (column: number, row: number) => ({
    x: LEFT + column * CELL_WIDTH + CELL_WIDTH / 2,
    y: TOP + row * CELL_HEIGHT + CELL_HEIGHT / 2,
});

interface EntrySliderProps {
    label: string;
    variableName: string;
    value: number;
    accent: string;
}

const EntrySlider = ({ label, variableName, value, accent }: EntrySliderProps) => {
    const setVar = useSetVar();
    return (
        <div className="w-36 space-y-1">
            <div className="flex justify-between text-xs text-slate-500">
                <span>{label}</span>
                <span className="font-semibold" style={{ color: accent }}>
                    {value}
                </span>
            </div>
            <Slider
                value={[value]}
                min={-5}
                max={5}
                step={1}
                onValueChange={([next]) => setVar(variableName, next)}
            />
        </div>
    );
};

export const DeterminantDiagonals = () => {
    const a = useVar("determinantEntryTopLeft", 3) as number;
    const b = useVar("determinantEntryTopRight", 4) as number;
    const c = useVar("determinantEntryBottomLeft", 1) as number;
    const d = useVar("determinantEntryBottomRight", 2) as number;

    const mainProduct = a * d;
    const antiProduct = b * c;
    const determinant = mainProduct - antiProduct;

    const topLeft = centre(0, 0);
    const topRight = centre(1, 0);
    const bottomLeft = centre(0, 1);
    const bottomRight = centre(1, 1);

    const entries: { value: number; x: number; y: number; accent: string }[] = [
        { value: a, ...topLeft, accent: MAIN },
        { value: b, ...topRight, accent: ANTI },
        { value: c, ...bottomLeft, accent: ANTI },
        { value: d, ...bottomRight, accent: MAIN },
    ];

    return (
        <div className="w-full space-y-4 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex justify-center">
                <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
                    {/* Brackets */}
                    <path
                        d={`M ${LEFT - 14} ${TOP - 10} h -10 v ${2 * CELL_HEIGHT + 20} h 10`}
                        fill="none"
                        stroke="#334155"
                        strokeWidth={2.5}
                    />
                    <path
                        d={`M ${LEFT + 2 * CELL_WIDTH + 14} ${TOP - 10} h 10 v ${2 * CELL_HEIGHT + 20} h -10`}
                        fill="none"
                        stroke="#334155"
                        strokeWidth={2.5}
                    />

                    {/* Diagonals */}
                    <line
                        x1={topLeft.x}
                        y1={topLeft.y}
                        x2={bottomRight.x}
                        y2={bottomRight.y}
                        stroke={MAIN}
                        strokeWidth={3}
                        strokeLinecap="round"
                        opacity={0.65}
                    />
                    <line
                        x1={topRight.x}
                        y1={topRight.y}
                        x2={bottomLeft.x}
                        y2={bottomLeft.y}
                        stroke={ANTI}
                        strokeWidth={3}
                        strokeLinecap="round"
                        opacity={0.65}
                        strokeDasharray="6 4"
                    />

                    {/* Entries */}
                    {entries.map((entry) => (
                        <g key={`${entry.x}-${entry.y}`}>
                            <circle cx={entry.x} cy={entry.y} r={19} fill="#ffffff" />
                            <circle
                                cx={entry.x}
                                cy={entry.y}
                                r={19}
                                fill={entry.accent}
                                fillOpacity={0.14}
                                stroke={entry.accent}
                                strokeWidth={1.5}
                            />
                            <text
                                x={entry.x}
                                y={entry.y + 5}
                                textAnchor="middle"
                                fontSize={16}
                                fontWeight={600}
                                fill={entry.accent}
                            >
                                {entry.value}
                            </text>
                        </g>
                    ))}

                    <text x={WIDTH / 2} y={HEIGHT - 12} textAnchor="middle" fontSize={12} fill="#64748b">
                        solid diagonal minus dashed diagonal
                    </text>
                </svg>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                <span className="rounded-md px-2 py-1 font-semibold" style={{ background: "#eef2ff", color: MAIN }}>
                    {a} x {d} = {mainProduct}
                </span>
                <span className="text-slate-400">minus</span>
                <span className="rounded-md px-2 py-1 font-semibold" style={{ background: "#fff1f2", color: ANTI }}>
                    {b} x {c} = {antiProduct}
                </span>
                <span className="text-slate-400">gives</span>
                <span
                    className={`rounded-md px-3 py-1 font-semibold ${
                        determinant === 0
                            ? "bg-amber-100 text-amber-900"
                            : "bg-violet-100 text-violet-900"
                    }`}
                >
                    determinant = {determinant}
                </span>
            </div>

            {determinant === 0 && (
                <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-center text-sm text-amber-900">
                    The two products are equal, so the determinant is zero. Keep this matrix in mind.
                </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 border-t border-slate-100 pt-4">
                <EntrySlider label="a (top left)" variableName="determinantEntryTopLeft" value={a} accent={MAIN} />
                <EntrySlider label="b (top right)" variableName="determinantEntryTopRight" value={b} accent={ANTI} />
                <EntrySlider label="c (bottom left)" variableName="determinantEntryBottomLeft" value={c} accent={ANTI} />
                <EntrySlider label="d (bottom right)" variableName="determinantEntryBottomRight" value={d} accent={MAIN} />
            </div>
        </div>
    );
};
