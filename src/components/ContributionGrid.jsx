import React from "react";
import {
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  getDay,
  format,
} from "date-fns";

const YearlyActivityGrid = ({ submissions = [] }) => {
  const currentYear = new Date().getFullYear();
  const startDate = startOfYear(new Date(currentYear, 0, 1));
  const endDate = endOfYear(new Date(currentYear, 11, 31));

  // Get all dates of the year
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Convert to map for quick lookup
  const submissionMap = new Set(
    submissions.map((date) => format(new Date(date), "yyyy-MM-dd"))
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

  return (
    <div className="flex flex-col gap-1 overflow-x-auto p-4 bg-[#2f3136]">
      <div className="relative h-8">
        <div className="border w-20 rounded-md flex justify-end sticky right-2">
        <select name="" id="" className="w-full outline-none cursor-pointer">
          <option value="" className="bg-[#13181c] cursor-pointer">
            2020
          </option>
          <option value="" className="bg-[#13181c] cursor-pointer">
            2020
          </option>
          <option value="" className="bg-[#13181c] cursor-pointer">
            2020
          </option>
          <option value="" className="bg-[#13181c] cursor-pointer">
            2020
          </option>
        </select>
      </div>
      </div>
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
    </div>
  );
};

export default YearlyActivityGrid;
