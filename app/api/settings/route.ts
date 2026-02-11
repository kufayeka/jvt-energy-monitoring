import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DEFAULT_SETTINGS = {
  tariff1PerKwh: 0,
  tariff1StartTime: "00:00",
  tariff1EndTime: "00:00",
  tariff2PerKwh: 0,
  powerFactor: 0,
  chiller1RunningHoursResetInterval: 0,
  chiller2RunningHoursResetInterval: 0,
  chiller3RunningHoursResetInterval: 0,
  inletPump1RunningHoursResetInterval: 0,
  inletPump2RunningHoursResetInterval: 0,
  outletPump1RunningHoursResetInterval: 0,
  outletPump2RunningHoursResetInterval: 0,
};

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_PATH = path.join(DATA_DIR, "settings.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(SETTINGS_PATH);
  } catch {
    await fs.writeFile(SETTINGS_PATH, JSON.stringify(DEFAULT_SETTINGS, null, 2));
  }
}

async function readSettings() {
  await ensureFile();
  const raw = await fs.readFile(SETTINGS_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json(settings, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  const nextSettings = { ...DEFAULT_SETTINGS, ...body };
  await ensureFile();
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(nextSettings, null, 2));
  return NextResponse.json(nextSettings, { status: 200 });
}
