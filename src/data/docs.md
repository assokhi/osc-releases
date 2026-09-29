## What you need

- Windows 10 or 11, 64-bit.
- A Telegram account, with a private group that has **Topics** turned on. osc uses three topics: *Documents*, *Movies* and *Series*.

## Install

1. Press Start, type **PowerShell**, and open it. You don't need admin.
2. Paste the install line above and press Enter.
3. osc opens on its own. Next time, just type **osc** in the Start menu.

## First run

1. Open Telegram on your phone → Settings → Devices → **Link Desktop Device**, then scan the QR code osc shows you.
2. Pick the group you want osc to use. If none of your groups have Topics turned on yet, osc shows you how to turn it on.

## Uploading files

- Click **Upload** and choose your files. Videos go to Movies or Series; everything else goes to Documents.
- Files up to **2 GB** upload as-is. Anything bigger is split into chunks automatically and stored that way, osc joins them back together when you open it.
- Once Telegram safely has your file, the copy on your PC is removed automatically. You can turn this off.

## Opening and watching

- Click a file to open it, it streams from Telegram instead of downloading and staying on your PC.
- Click a movie or episode to play it in mpv, with seeking and resume from where you left off.

## Updating and removing osc

- **Update:** run the install line again, any time.
- **Remove:** type `osc uninstall` in PowerShell.

## Good to know

Your files are stored as-is in your own Telegram group, not encrypted, so don't upload anything you wouldn't otherwise keep there. osc only runs while its window is open; closing it stops everything, and nothing keeps running in the background.
