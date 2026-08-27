import { useState } from "react";

const ITEMS = ["Rolls", "Juices", "Samosas"];
const DAYS = ["Monday", "Tuesday"];
const COLUMNS = ["Price (Rs)", "Cost (Rs)"];

/** Sales matrix: rows are days, columns are items. */
const SALES = [
    [20, 15, 8],
    [26, 10, 12],
];

/** Price matrix: rows are items, columns are price and cost. */
const PRICES = [
    [30, 18],
    [25, 14],
    [40, 26],
];

const productEntry = (row: number, column: number) =>
    SALES[row].reduce((total, quantity, index) => total + quantity * PRICES[index][column], 0);

const cellBase =
    "w-14 h-11 flex items-center justify-center rounded-md border text-sm font-medium transition-colors";

export const RowColumnProduct = () => {
    const [selected, setSelected] = useState({ row: 0, column: 0 });

    const rowValues = SALES[selected.row];
    const columnValues = PRICES.map((priceRow) => priceRow[selected.column]);
    const total = productEntry(selected.row, selected.column);

    return (
        <div className="w-full space-y-5 rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-start justify-center gap-8">
                {/* Sales matrix */}
                <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Sales (days x items)
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col justify-end gap-2 pr-1">
                            {DAYS.map((day) => (
                                <div key={day} className="h-11 flex items-center text-xs text-slate-500">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex gap-2 pb-1">
                                {ITEMS.map((item) => (
                                    <div key={item} className="w-14 text-center text-[11px] text-slate-500">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                {SALES.map((salesRow, rowIndex) => (
                                    <div key={DAYS[rowIndex]} className="flex gap-2">
                                        {salesRow.map((quantity, itemIndex) => (
                                            <div
                                                key={ITEMS[itemIndex]}
                                                className={`${cellBase} ${
                                                    rowIndex === selected.row
                                                        ? "border-indigo-400 bg-indigo-50 text-indigo-900"
                                                        : "border-slate-200 bg-slate-50 text-slate-400"
                                                }`}
                                            >
                                                {quantity}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price matrix */}
                <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Prices (items x money)
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2 pt-[22px] pr-1">
                            {ITEMS.map((item) => (
                                <div key={item} className="h-11 flex items-center text-xs text-slate-500">
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex gap-2 pb-1">
                                {COLUMNS.map((column) => (
                                    <div key={column} className="w-14 text-center text-[11px] text-slate-500">
                                        {column}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                {PRICES.map((priceRow, itemIndex) => (
                                    <div key={ITEMS[itemIndex]} className="flex gap-2">
                                        {priceRow.map((money, columnIndex) => (
                                            <div
                                                key={COLUMNS[columnIndex]}
                                                className={`${cellBase} ${
                                                    columnIndex === selected.column
                                                        ? "border-rose-400 bg-rose-50 text-rose-900"
                                                        : "border-slate-200 bg-slate-50 text-slate-400"
                                                }`}
                                            >
                                                {money}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product matrix */}
                <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Answer (click an entry)
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2 pt-[22px] pr-1">
                            {DAYS.map((day) => (
                                <div key={day} className="h-11 flex items-center text-xs text-slate-500">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex gap-2 pb-1">
                                {COLUMNS.map((column) => (
                                    <div key={column} className="w-16 text-center text-[11px] text-slate-500">
                                        {column}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                {DAYS.map((day, rowIndex) => (
                                    <div key={day} className="flex gap-2">
                                        {COLUMNS.map((column, columnIndex) => {
                                            const isSelected =
                                                rowIndex === selected.row && columnIndex === selected.column;
                                            return (
                                                <button
                                                    key={column}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelected({ row: rowIndex, column: columnIndex })
                                                    }
                                                    className={`w-16 h-11 rounded-md border text-sm font-semibold transition-colors ${
                                                        isSelected
                                                            ? "border-violet-500 bg-violet-100 text-violet-900"
                                                            : "border-slate-200 bg-white text-slate-500 hover:border-violet-300"
                                                    }`}
                                                >
                                                    {productEntry(rowIndex, columnIndex)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Working for the selected entry */}
            <div className="rounded-md bg-slate-50 px-4 py-3 text-center">
                <div className="text-xs text-slate-500">
                    {DAYS[selected.row]} row against the {COLUMNS[selected.column].toLowerCase()} column
                </div>
                <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
                    {rowValues.map((quantity, index) => (
                        <span key={ITEMS[index]} className="flex items-center gap-1">
                            {index > 0 && <span className="text-slate-400">+</span>}
                            <span className="font-semibold text-indigo-700">{quantity}</span>
                            <span className="text-slate-400">x</span>
                            <span className="font-semibold text-rose-700">{columnValues[index]}</span>
                        </span>
                    ))}
                    <span className="text-slate-400">=</span>
                    <span className="rounded bg-violet-100 px-2 py-0.5 font-semibold text-violet-900">
                        {total}
                    </span>
                </div>
            </div>
        </div>
    );
};
