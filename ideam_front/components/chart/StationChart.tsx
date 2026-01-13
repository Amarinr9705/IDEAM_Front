"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { StationDataPoint } from "@/types/station";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface StationChartProps {
    data: StationDataPoint[];
}

export function StationChart({ data }: StationChartProps) {
    const filteredData = useMemo(() => {
        if (!data || data.length === 0) return [];

        const sorted = [...data].sort(
            (a, b) =>
                new Date(a.fechaobservacion).getTime() -
                new Date(b.fechaobservacion).getTime()
        );

        if (sorted.length === 0) return [];

        return sorted;
    }, [data]);

    return (
        <div className="w-full h-[400px] p-4 bg-white rounded-lg shadow-md">
            {filteredData.length > 0 ? (
                <Plot
                    data={[
                        {
                            x: filteredData.map((d) => d.fechaobservacion),
                            y: filteredData.map((d) => d.valorobservado),
                            type: "scattergl",
                            mode: "markers",
                            marker: { color: "#0077ff" },
                            line: { shape: "spline" },
                        },
                    ]}
                    layout={{
                        autosize: true,
                        title: { text: "Historico de Observaciones" },
                        xaxis: {
                            type: "date",
                            title: { text: "Fecha de Observación" },
                            showgrid: true,
                        },
                        yaxis: {
                            title: { text: "Valor Observado" },
                            showgrid: true,
                        },
                        margin: { t: 40, r: 20, l: 50, b: 50 },
                        showlegend: false,
                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                    config={{ responsive: true }}
                />
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                    No hay datos disponibles para mostrar.
                </div>
            )}
        </div>
    );
}
