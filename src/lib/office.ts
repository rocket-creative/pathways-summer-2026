import type { Office } from "@prisma/client";

export function streetLine(office: Office): string {
  return office.suite
    ? `${office.addressLine}, ${office.suite}`
    : office.addressLine;
}

export function cityLine(office: Office): string {
  return `${office.city}, ${office.state} ${office.zip}`;
}

export function mapsUrl(office: Office): string {
  const query = encodeURIComponent(
    `${streetLine(office)}, ${cityLine(office)}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
