import { DateTime } from "luxon";

export function formatLastOnline(fromEpochSeconds: number, toTimeEpochSeconds: number): string {
    const from = DateTime.fromSeconds(fromEpochSeconds);

    const toTime = DateTime.fromSeconds(toTimeEpochSeconds);
    const diff = toTime.diff(from, ["days", "hours", "minutes", "seconds"]).shiftTo("days", "hours", "minutes", "seconds");

    const parts: string[] = [];

    const days = Math.floor(diff.days);
    const hours = Math.floor(diff.hours);
    const minutes = Math.floor(diff.minutes);
    const seconds = Math.floor(diff.seconds);

    if (days > 0) {
        parts.push(`${days} day${days !== 1 ? "s" : ""}`);
    }
    if (hours > 0 || parts.length > 0) {
        parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    }
    if (minutes > 0 || parts.length > 0) {
        parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    }
    parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);

    return parts.join(" ");
}
