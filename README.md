# Smart Water Reminder

A pocket-sized micro:bit V2 that sounds a reminder after 30 minutes without a logged drink. Press A to record a drink and B to check progress on the LED display.

![Smart Water Reminder in its handmade enclosure](assets/prototype.jpg)

## Controls

| Input | Action |
| --- | --- |
| A | Log one drink, up to the target of eight |
| B | Display the count, target and progress bar |
| A + B | Display the target |
| Touch the logo | Reset the count and timer |
| Shake | Play an encouragement sound and show an animation |

Each drink is logged manually. The count stays in memory until reset or restart, and reminders continue after the target is reached.

## Run on a micro:bit V2

1. Create a project in [MakeCode for micro:bit](https://makecode.microbit.org/) and switch to JavaScript.
2. Replace the starter code with [main.ts](main.ts). The reminder interval is `1800000` milliseconds. For a short simulator run, set `remindTime` to `10000`.
3. Connect a micro:bit V2 by USB and download the program. A battery pack powers the device away from USB.

The source was recovered from the original build report. A MakeCode export and compiled firmware were unavailable. The recovered copy has yet to be retested on hardware.

## Enclosure

The foam-board enclosure holds the micro:bit and battery pack while leaving the buttons, LED matrix and touch logo accessible. [Assembly photo](assets/assembly.jpg) · [Casing photo](assets/casing-build.jpg)
