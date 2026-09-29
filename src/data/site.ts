// All site copy and links live here; components only lay it out.
// Rule: describe what osc does, never how its private source is written (see docs/website.md).

export const site = {
  name: "osc",
  tagline: "A virtual file manager, with Telegram as storage.",
  title: "osc: a virtual file manager, with Telegram as storage",
  description:
    "osc is a Windows file manager whose storage is your own private Telegram group. Browse, open and stream files without keeping them on your PC.",
  releases: "https://github.com/assokhi/osc-releases/releases",
  issues: "https://github.com/assokhi/osc-releases/issues",
  install: "irm https://github.com/assokhi/osc-releases/releases/latest/download/install.ps1 | iex",
};

export const nav = [{ label: "Docs", href: "/docs" }];

export const faq = [
  { q: "What is osc?", a: "A file manager for Windows whose storage is your own private Telegram group. Your PC keeps only a small catalog; files are fetched when you open them." },
  { q: "Does osc need a server?", a: "No. Your Telegram group is the only place your files are kept. osc runs on your PC and stops when you close it." },
  { q: "Are movies downloaded, or streamed?", a: "Streamed. Movies and series play in mpv straight from Telegram, with seeking, the same as scrubbing an online video. Nothing is downloaded in full first." },
  { q: "How fast is it?", a: "As fast as your internet connection and Telegram's own servers, the same limits as any Telegram download. osc keeps a local catalog and cache, so browsing folders and reopening recent files is instant even when nothing is streaming." },
  { q: "Are my files encrypted?", a: "No. Files are stored as they are, in your own private group. That is what lets osc stream them with seeking. Don't upload anything you wouldn't keep in Telegram." },
  { q: "What if I reinstall Windows or use another PC?", a: "Install osc and connect the same group. osc rebuilds its catalog from Telegram, including folders, titles and categories, because they're stored in the message captions." },
  { q: "Is there a size limit?", a: "Files up to 2 GB upload as-is. Bigger files are split into chunks automatically and stored that way, so there's no real limit." },
  { q: "Is there a Mac or Linux version?", a: "No. osc is Windows only for now." },
  { q: "Is the source code available?", a: "No, osc is closed source. This site's repository only hosts the installer and the releases." },
];
