import { DateTime } from "luxon";

export function formatJoinedDate(epochSeconds: number): string {
    const now = DateTime.now();
    const inputTime = DateTime.fromSeconds(epochSeconds);
    const diffInHours = now.diff(inputTime, "hours").hours;

    if (diffInHours < 48) {
        const hours = Math.floor(diffInHours);
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    const diffInYears = now.diff(inputTime, "years").years;
    if (diffInYears < 2) {
        const days = Math.floor(now.diff(inputTime, "days").days);
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    const yearsInt = Math.floor(diffInYears);
    const datePlusYears = inputTime.plus({ years: yearsInt });
    const days = Math.floor(now.diff(datePlusYears, "days").days);

    return `${yearsInt} year${yearsInt !== 1 ? "s" : ""} and ${days} day${days !== 1 ? "s" : ""} ago`;
}
