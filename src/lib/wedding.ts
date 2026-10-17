// All event times anchored to India Standard Time (+05:30).
export const WEDDING = {
  bride: "Anaya",
  groom: "Aarav",
  initials: "A · A",
  dateISO: "2027-02-14T19:00:00+05:30",
  dateLabel: "Sunday, 14 February 2027",
  timeLabel: "7:00 PM IST",
  venue: "The Grand Pavilion",
  venueAddress: "Lake Palace Road, Udaipur, Rajasthan",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Grand+Pavilion+Udaipur",
};

export const EVENTS = [
  { name: "Mehendi", iso: "2027-02-12T16:00:00+05:30", day: "Friday, 12 February", time: "4:00 PM", dress: "Greens & yellows, festive casual", place: "Jasmine Courtyard" },
  { name: "Sangeet", iso: "2027-02-13T19:30:00+05:30", day: "Saturday, 13 February", time: "7:30 PM", dress: "Indo-western glamour", place: "Moonlit Terrace" },
  { name: "Wedding", iso: "2027-02-14T19:00:00+05:30", day: "Sunday, 14 February", time: "7:00 PM", dress: "Traditional — teal, ivory & gold", place: "The Grand Pavilion" },
  { name: "Reception", iso: "2027-02-15T20:00:00+05:30", day: "Monday, 15 February", time: "8:00 PM", dress: "Black tie / formal Indian", place: "Lotus Ballroom" },
];

export function timeLeft(targetISO: string, now: number) {
  const ms = Math.max(0, new Date(targetISO).getTime() - now);
  const s = Math.floor(ms / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}
