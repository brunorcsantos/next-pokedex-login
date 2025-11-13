"use client";

import React from "react";

interface Stat {
  base_stat: number;
  stat: { name: string };
}

interface ProgressBarProps {
  stats: Stat[];
}

const ProgressBar = ({ stats }: ProgressBarProps) => {
  
  const minStat = (base: number, name: string) => {
    if (name === "hp") {
      return Math.floor(((2 * base + 0 + 0) * 100) / 100 + 100 + 10);
    } else return Math.floor((((2 * base + 0 + 0) * 100) / 100 + 5) * 0.9);
  };

  const maxStat = (base: number, name: string) => {
    if (name === "hp") {
      return Math.floor(((2 * base + 31 + 252 / 4) * 100) / 100 + 100 + 10);
    } else
      return Math.floor((((2 * base + 31 + 252 / 4) * 100) / 100 + 5) * 1.1);
  };

  const getStatColor = (value: number) => {
    if (value <= 50) return "fraco"; // fraco
    if (value <= 100) return "medio"; // médio
    if (value <= 150) return "bom"; // bom
    if (value <= 200) return "otimo"; // ótimo
    return "excelente"; // excelente
  };

  const showStats = (baseStat: number) => {
    const maxBaseStat = 255; // maior valor possível em qualquer stat

    const normalizedStat = (baseStat / maxBaseStat) * 100;
    return normalizedStat;
  };

  

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <div className="flex items-center gap-2 w-full">
        <span className="w-32 text-right font-semibold capitalize text-gray-700 whitespace-nowrap"></span>
        <div className="flex-1 h-4 bg-transparent rounded-full overflow-hidden"></div>
        <span className="w-12  text-gray-600">Base</span>
        <span className="w-14  text-gray-500 text-xs">Min</span>
        <span className="w-14  text-gray-500 text-xs">Max</span>
      </div>
      {stats.map((s) => (
        <div key={s.stat.name} className="flex items-center gap-2 w-full">
          <span className="w-32 text-right font-semibold capitalize text-gray-700 whitespace-nowrap">
            {s.stat.name}
          </span>
          <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-4 rounded-full"
              style={{
                width: `${showStats(s.base_stat)}%`,
                backgroundColor: `var(--${getStatColor(s.base_stat)})`,
              }}
            />
          </div>
          <span className="w-12  text-gray-600">{s.base_stat}</span>
          <span className="w-14  text-gray-500 text-xs">
            {minStat(s.base_stat, s.stat.name)}
          </span>
          <span className="w-14  text-gray-500 text-xs">
            {maxStat(s.base_stat, s.stat.name)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
