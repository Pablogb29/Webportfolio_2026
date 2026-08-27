/**
 * HTB portfolio stats derived from the generated JSON.
 * Import this instead of hardcoding machine counts in copy or metadata.
 */
import solvedMachines from "@/public/htb/solved-machines.json";

type RawMachine = {
  difficulty?: string;
  hasWriteup?: boolean;
  os?: string;
  status?: string;
};

const machines = (solvedMachines.machines || []) as RawMachine[];

function countBy(field: keyof RawMachine, value: string): number {
  return machines.filter((machine) => machine[field] === value).length;
}

export const htbStats = {
  total: machines.length,
  easy: countBy("difficulty", "Easy"),
  medium: countBy("difficulty", "Medium"),
  hard: countBy("difficulty", "Hard"),
  insane: countBy("difficulty", "Insane"),
  writeups: machines.filter((machine) => machine.hasWriteup === true).length,
  linux: countBy("os", "Linux"),
  windows: countBy("os", "Windows"),
  active: countBy("status", "Active"),
  retired: countBy("status", "Retired"),
};

const difficultySummary = [
  `${htbStats.easy} Easy`,
  `${htbStats.medium} Medium`,
  htbStats.hard > 0 ? `${htbStats.hard} Hard` : null,
  htbStats.insane > 0 ? `${htbStats.insane} Insane` : null,
]
  .filter(Boolean)
  .join(", ");

export const htbCopy = {
  difficultySummary,
  aboutPractice: `Hack The Box (${htbStats.total} machines solved, ${htbStats.writeups} with OSCP-oriented write-ups)`,
  labsIntro: `I maintain an active practice in offensive security through Hack The Box labs, having completed ${htbStats.total} machines (${difficultySummary}) with a focus on Windows and Linux environments. ${htbStats.writeups} OSCP-oriented write-ups document methodologies, tool usage, and mitigation strategies without exposing flags or detailed exploitation steps.`,
  projectDescription: `Repository of OSCP-oriented Hack The Box write-ups: methodology, tooling, and mitigations, without exposing flags. Documents ${htbStats.writeups} machines. Overall HTB progress is ${htbStats.total} solved (${difficultySummary}).`,
  projectResult: `${htbStats.total} machines solved on Hack The Box (${difficultySummary}), with ${htbStats.writeups} published OSCP-oriented write-ups`,
  siteDescription: `Cybersecurity Engineer actively transitioning to Pentester/Red Team. AD security, IAM automation, AWS security design, HTB practice (${htbStats.total} machines), and OSCP preparation.`,
  ctfDescription: `Hack The Box machines solved by Pablo Gutiérrez. ${htbStats.total} machines (${difficultySummary}), ${htbStats.writeups} with OSCP-oriented writeups covering Windows, Linux, Active Directory, and web exploitation.`,
};
