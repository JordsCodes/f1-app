import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

interface PositionPoint {
  lap: number;
  position: number;
}

interface Driver {
  driverDetails: {
    broadcast_name: string;
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

function getDriversUntilPosition(drivers: Driver[], position: number) {
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
      label: d.driverDetails.broadcast_name,
      data: [
        ...fillLapGaps(
          d.positions.map((p) => ({ x: p.lap, y: p.position })),
          lapCount,
        ),
        { x: lapCount, y: d.positions[d.positions.length - 1]?.position },
      ],
    }));

    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: getLapLabels(lapCount),
        datasets: driverLapData,
      },
      options: {
        scales: {
          y: {
            reverse: true,
            title: {
              display: true,
              text: "Position",
            },
            min: 1,
            ticks: {
              stepSize: 1,
            },
          },
          x: {
            title: {
              display: true,
              text: "Lap",
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
}
