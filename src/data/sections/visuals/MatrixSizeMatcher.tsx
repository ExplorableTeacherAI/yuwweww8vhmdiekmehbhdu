import { Slider } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";

const CELL = 22;

interface SizeSliderProps {
    label: string;
    variableName: string;
    value: number;
    accent: string;
}

const SizeSlider = ({ label, variableName, value, accent }: SizeSliderProps) => {
    const setVar = useSetVar();
    return (
        <div className="w-40 space-y-1">
            <div className="flex justify-between text-xs text-slate-500">
                <span>{label}</span>
                <span className="font-semibold" style={{ color: accent }}>
                    {value}
                </span>
            </div>
            <Slider
                value={[value]}
                min={1}
                max={4}
                step={1}
                onValueChange={([next]) => setVar(variableName, next)}
            />
        </div>
    );
};

interface MatrixShapeProps {
    rows: number;
    columns: number;
    accent: string;
    background: string;
    title: string;
    rowsColor: string;
    columnsColor: string;
}

const MatrixShape = ({
    rows,
    columns,
    accent,
    background,
    title,
    rowsColor,
    columnsColor,
}: MatrixShapeProps) => (
    <div className="flex flex-col items-center gap-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</div>
        <div
            className="grid gap-[3px] rounded-md p-[3px]"
            style={{
                gridTemplateColumns: `repeat(${columns}, ${CELL}px)`,
                border: `2px solid ${accent}`,
                background,
            }}
        >
            {Array.from({ length: rows * columns }, (_, index) => (
                <div
                    key={index}
                    style={{ width: CELL, height: CELL, background: accent, opacity: 0.35 }}
                    className="rounded-[3px]"
                />
            ))}
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold">
            <span
                className="rounded px-1.5 py-0.5"
                style={{ color: rowsColor, background: `${rowsColor}1f` }}
            >
                {rows}
            </span>
            <span className="text-slate-400">x</span>
            <span
                className="rounded px-1.5 py-0.5"
                style={{ color: columnsColor, background: `${columnsColor}1f` }}
            >
                {columns}
            </span>
        </div>
    </div>
);

const INNER_MATCH = "#10b981";
const INNER_CLASH = "#f59e0b";
const OUTER = "#8b5cf6";

interface SizeSentenceProps {
    firstRows: number;
    firstColumns: number;
    secondRows: number;
    secondColumns: number;
    fits: boolean;
}

/** Annotated reading of the two sizes: inner pair must match, outer pair becomes the answer. */
const SizeSentence = ({
    firstRows,
    firstColumns,
    secondRows,
    secondColumns,
    fits,
}: SizeSentenceProps) => {
    const innerColor = fits ? INNER_MATCH : INNER_CLASH;
    const width = 480;
    const height = 168;
    const baseline = 62;

    const numbers = [
        { x: 110, value: firstRows, color: OUTER },
        { x: 160, value: firstColumns, color: innerColor },
        { x: 320, value: secondRows, color: innerColor },
        { x: 370, value: secondColumns, color: OUTER },
    ];

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="max-w-full">
            {/* inner pair */}
            <text x={240} y={16} textAnchor="middle" fontSize={12} fontWeight={600} fill={innerColor}>
                {fits ? "inner pair matches, so you may multiply" : "inner pair does not match, so you may not multiply"}
            </text>
            <path
                d={`M 160 ${baseline - 22} Q 240 ${baseline - 46} 320 ${baseline - 22}`}
                fill="none"
                stroke={innerColor}
                strokeWidth={2}
                strokeDasharray={fits ? "0" : "5 4"}
            />

            {/* the two sizes */}
            <text x={135} y={baseline} textAnchor="middle" fontSize={16} fill="#94a3b8">
                x
            </text>
            <text x={345} y={baseline} textAnchor="middle" fontSize={16} fill="#94a3b8">
                x
            </text>
            <text x={240} y={baseline} textAnchor="middle" fontSize={14} fill="#64748b">
                times
            </text>
            {numbers.map((number) => (
                <g key={number.x}>
                    <rect
                        x={number.x - 15}
                        y={baseline - 20}
                        width={30}
                        height={28}
                        rx={6}
                        fill={number.color}
                        fillOpacity={0.14}
                        stroke={number.color}
                        strokeWidth={1.5}
                    />
                    <text
                        x={number.x}
                        y={baseline}
                        textAnchor="middle"
                        fontSize={17}
                        fontWeight={700}
                        fill={number.color}
                    >
                        {number.value}
                    </text>
                </g>
            ))}

            {/* outer pair travelling into the answer */}
            {fits && (
                <>
                    <path
                        d={`M 110 ${baseline + 14} Q 130 ${baseline + 60} 205 ${baseline + 66}`}
                        fill="none"
                        stroke={OUTER}
                        strokeWidth={2}
                    />
                    <path
                        d={`M 370 ${baseline + 14} Q 350 ${baseline + 60} 275 ${baseline + 66}`}
                        fill="none"
                        stroke={OUTER}
                        strokeWidth={2}
                    />
                    <text
                        x={240}
                        y={baseline + 76}
                        textAnchor="middle"
                        fontSize={14}
                        fontWeight={700}
                        fill={OUTER}
                    >
                        answer is {firstRows} x {secondColumns}
                    </text>
                    <text x={240} y={baseline + 96} textAnchor="middle" fontSize={12} fill="#64748b">
                        outer pair: rows from the first, columns from the second
                    </text>
                </>
            )}
            {!fits && (
                <text x={240} y={baseline + 60} textAnchor="middle" fontSize={13} fill={INNER_CLASH}>
                    no product exists, so there is no answer size to read off
                </text>
            )}
        </svg>
    );
};

export const MatrixSizeMatcher = () => {
    const firstRows = useVar("firstMatrixRows", 2) as number;
    const firstColumns = useVar("firstMatrixColumns", 3) as number;
    const secondRows = useVar("secondMatrixRows", 3) as number;
    const secondColumns = useVar("secondMatrixColumns", 4) as number;

    const fits = firstColumns === secondRows;
    const teeth = Math.max(firstColumns, secondRows);

    return (
        <div className="w-full space-y-5 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
                <MatrixShape
                    rows={firstRows}
                    columns={firstColumns}
                    accent="#6366f1"
                    background="#eef2ff"
                    title="First matrix"
                    rowsColor={OUTER}
                    columnsColor={fits ? INNER_MATCH : INNER_CLASH}
                />

                {/* Touching edges: columns of the first against rows of the second */}
                <div className="flex flex-col items-center gap-2">
                    <div className="text-[11px] uppercase tracking-wide text-slate-500">
                        Touching edges
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="flex flex-col gap-[3px]">
                            {Array.from({ length: teeth }, (_, index) => (
                                <div
                                    key={`first-${index}`}
                                    style={{ width: CELL, height: CELL }}
                                    className={`rounded-[3px] ${
                                        index < firstColumns
                                            ? "bg-indigo-400"
                                            : "border border-dashed border-slate-300"
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-[3px]">
                            {Array.from({ length: teeth }, (_, index) => (
                                <div
                                    key={`link-${index}`}
                                    style={{ height: CELL }}
                                    className={`w-5 ${
                                        index < firstColumns && index < secondRows
                                            ? "border-t-2 border-b-2 border-emerald-400"
                                            : ""
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-[3px]">
                            {Array.from({ length: teeth }, (_, index) => (
                                <div
                                    key={`second-${index}`}
                                    style={{ width: CELL, height: CELL }}
                                    className={`rounded-[3px] ${
                                        index < secondRows
                                            ? "bg-rose-400"
                                            : "border border-dashed border-slate-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                    <div
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            fits
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                        }`}
                    >
                        {fits ? `${firstColumns} meets ${secondRows}` : `${firstColumns} against ${secondRows}: gap`}
                    </div>
                </div>

                <MatrixShape
                    rows={secondRows}
                    columns={secondColumns}
                    accent="#f43f5e"
                    background="#fff1f2"
                    title="Second matrix"
                    rowsColor={fits ? INNER_MATCH : INNER_CLASH}
                    columnsColor={OUTER}
                />
            </div>

            {/* The joined shape */}
            <div className="flex flex-col items-center gap-2 border-t border-slate-100 pt-4">
                <SizeSentence
                    firstRows={firstRows}
                    firstColumns={firstColumns}
                    secondRows={secondRows}
                    secondColumns={secondColumns}
                    fits={fits}
                />
                {fits && (
                    <MatrixShape
                        rows={firstRows}
                        columns={secondColumns}
                        accent="#8b5cf6"
                        background="#f5f3ff"
                        title="The answer"
                        rowsColor={OUTER}
                        columnsColor={OUTER}
                    />
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 border-t border-slate-100 pt-4">
                <SizeSlider
                    label="First: rows"
                    variableName="firstMatrixRows"
                    value={firstRows}
                    accent="#6366f1"
                />
                <SizeSlider
                    label="First: columns"
                    variableName="firstMatrixColumns"
                    value={firstColumns}
                    accent="#6366f1"
                />
                <SizeSlider
                    label="Second: rows"
                    variableName="secondMatrixRows"
                    value={secondRows}
                    accent="#f43f5e"
                />
                <SizeSlider
                    label="Second: columns"
                    variableName="secondMatrixColumns"
                    value={secondColumns}
                    accent="#f43f5e"
                />
            </div>
        </div>
    );
};
