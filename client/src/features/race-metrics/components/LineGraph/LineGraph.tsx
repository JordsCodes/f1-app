import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

interface PositionPoint {
  lap: number;
  position: number;
}

interface Driver {
  driverDetails: {
    broadcast_name: string;
    team_colour: string;
    team_name: string;
  };
  positions: PositionPoint[];
}

interface LineGraphProps {
  data: {
    lapCount: number;
    drivers: Record<string, Driver>;
  };
}

const DEFAULT_POSITIONS = 10;

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

function getDriversUntilPosition(
  drivers: Record<string, Driver>,
  position: number,
) {
  const topDrivers = [];
  for (const key in drivers) {
    console.log({ driver: drivers[key] });
    const finishingPosition = drivers[key].positions.at(-1).position;
    if (finishingPosition <= position) topDrivers.push(drivers[key]);
  }
  return topDrivers;
}

export default function LineGraph({ data }: LineGraphProps) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const lapCount = data.lapCount;
    const driverLapData = Object.values(
      getDriversUntilPosition(data.drivers, DEFAULT_POSITIONS),
    ).map((d) => ({
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
          padding: { right: 300, top: 50 },
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
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
}
