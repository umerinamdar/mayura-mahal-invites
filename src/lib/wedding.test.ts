import { describe, it, expect } from "vitest";
import { WEDDING, timeLeft } from "./wedding";

describe("wedding date", () => {
  it("is 14 Feb 2027 7pm IST, i.e. 13:30 UTC", () => {
    expect(new Date(WEDDING.dateISO).toISOString()).toBe("2027-02-14T13:30:00.000Z");
  });
  it("countdown hits zero at the IST moment, not local midnight", () => {
    expect(timeLeft(WEDDING.dateISO, Date.parse("2027-02-14T13:29:00Z"))).toEqual({ days: 0, hours: 0, minutes: 1, seconds: 0 });
    expect(timeLeft(WEDDING.dateISO, Date.parse("2027-02-15T00:00:00Z")).seconds).toBe(0);
  });
});
