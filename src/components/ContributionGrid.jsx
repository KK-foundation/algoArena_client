import React, { useEffect, useState } from "react";
import {
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  getDay,
  format,
} from "date-fns";
import { useYearlyGrid } from "../store/useYearlyGrid";
import { Loader } from "lucide-react";

const YearlyActivityGrid = () => {
  const {
    getContributions,
    getYears,
    years,
    contributions,
    isContributionGetting,
  } = useYearlyGrid();
  const [year, setYear] = useState(new Date().getFullYear());

  // const currentYear = new Date().getFullYear();
  const startDate = startOfYear(new Date(year, 0, 1));
  const endDate = endOfYear(new Date(year, 11, 31));

  // Get all dates of the year
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Convert to map for quick lookup
  const submissionMap = new Set(
    contributions.map((date) => format(new Date(date), "yyyy-MM-dd"))
  );

  // Group by week (GitHub style)
  const weeks = [];
  let week = [];

  days.forEach((day, idx) => {
    if (getDay(day) === 0 && week.length) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  });
  if (week.length) weeks.push(week);

  useEffect(() => {
    getContributions(year);
    getYears();
  }, [getContributions, year, getYears]);

  return (
    <div className="flex flex-col gap-1 overflow-x-auto p-4 bg-[#2f3136]">
      <div className="relative h-8">
        <div className="border w-20 rounded-md flex justify-end sticky right-2">
          <select
            className="w-full outline-none cursor-pointer"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years &&
              years.map((year) => (
                <option
                  value={year}
                  className="bg-[#13181c] cursor-pointer"
                  key={year}
                >
                  {year}
                </option>
              ))}
          </select>
        </div>
      </div>
      {isContributionGetting ? (
        <Loader className="animate-spin" />
      ) : (
        <div className="flex gap-1">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1 cursor-pointer">
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const day = week[dayIdx];
                const formatted = day ? format(day, "yyyy-MM-dd") : null;
                const isSubmitted = submissionMap.has(formatted);

                return (
                  <div
                    key={dayIdx}
                    title={formatted || ""}
                    className={`w-3 h-3 rounded-sm ${
                      day
                        ? isSubmitted
                          ? "bg-green-500"
                          : "bg-gray-300"
                        : "invisible"
                    }`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearlyActivityGrid;
