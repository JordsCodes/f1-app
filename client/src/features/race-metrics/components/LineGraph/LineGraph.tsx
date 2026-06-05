import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import LineGraphControls from "./LineGraphControls";
import { DriverLapPositions } from "../../types";
interface LineGraphProps {
  data: Record<string, DriverLapPositions>;
  lapCount: number;
  filterTopDrivers: (topDrivers: number) => void;
}

const getLapLabels = (lapCount: number) => {
  let i = 0;
  const lapLabels = [];
  while (i < lapCount) {
    i += 1;
    lapLabels.push(i);
  }
  return lapLabels;
};

function fillLapGaps(positions: { x: number; y: number }[], totalLaps: number) {
  const filled = [];
  for (let lap = 1; lap <= totalLaps; lap++) {
    const latest = positions
      .filter((p) => p.x <= lap)
      .sort((a, b) => b.x - a.x)[0];
    if (latest) filled.push({ x: lap, y: latest.y });
  }
  return filled;
}

export default function LineGraph({
  data,
  lapCount,
  filterTopDrivers,
}: LineGraphProps) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const driverLapData = Object.values(data).map((d) => ({
      label: `${d.driverDetails.broadcast_name} (${d.driverDetails.team_name})`,
      data: [
        ...fillLapGaps(
          d.positions.map((p) => ({
            x: p.lap,
            y: p.position,
          })),
          lapCount,
        ),
      ],
      backgroundColor: `#${d.driverDetails.team_colour}`,
      borderColor: `#${d.driverDetails.team_colour}`,
    }));
    Chart.register(ChartDataLabels);
    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: getLapLabels(lapCount),
        datasets: driverLapData,
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              title: (items) => `Lap ${items[0].label}`,
              label: (context) =>
                `${context.dataset.label} — P${context.parsed.y}`,
            },
          },
          datalabels: {
            align: "right",
            clip: false,
            formatter: function (_value, context) {
              const isLast =
                context.dataIndex + 1 === context.dataset.data.length;

              if (isLast) return context.dataset.label;
              return null;
            },
            font: {
              size: 12,
            },
          },
          legend: {
            display: false,
          },
        },
        layout: {
          padding: { right: 300, top: 20 },
        },
        scales: {
          y: {
            reverse: true,
            title: {
              display: true,
              text: "Position",
              font: {
                size: 16,
              },
            },
            ticks: {
              stepSize: 1,
              callback: (value) => {
                return value === 0 ? "" : value;
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Lap",
              font: {
                size: 16,
              },
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [data, lapCount]);

  return (
    <>
      <LineGraphControls
        onClick={(topDrivers: number) => filterTopDrivers(topDrivers)}
      />
      <canvas ref={canvasRef} />
    </>
  );
}
