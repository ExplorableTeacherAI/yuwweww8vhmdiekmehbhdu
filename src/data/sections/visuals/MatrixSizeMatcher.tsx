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
}

const MatrixShape = ({ rows, columns, accent, background, title }: MatrixShapeProps) => (
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
        <div className="text-sm font-semibold" style={{ color: accent }}>
            {rows} x {columns}
        </div>
    </div>
);

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
                />
            </div>

            {/* The joined shape */}
            <div className="flex flex-col items-center gap-2 border-t border-slate-100 pt-4">
                {fits ? (
                    <>
                        <MatrixShape
                            rows={firstRows}
                            columns={secondColumns}
                            accent="#8b5cf6"
                            background="#f5f3ff"
                            title="The answer"
                        />
                        <div className="text-sm text-slate-600">
                            Outer edges kept: {firstRows} rows from the first, {secondColumns} columns
                            from the second.
                        </div>
                    </>
                ) : (
                    <div className="text-sm text-amber-700">
                        The edges do not match, so these two matrices cannot be multiplied at all.
                    </div>
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
