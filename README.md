# Line Change Player Timer (Google Apps Script Web App)

## Description

A simple web application built entirely within Google Apps Script, using AngularJS (v1.x) on the client-side. This app allows a user (like a coach or parent) to track the playing time for individual players during a game. It features a Material Design-inspired dark theme.

The list of players is configured via Google Apps Script's Script Properties.

## Features

* Loads player list dynamically from Script Properties.
* Displays an interactive circle for each player.
* Tracks two timers per player:
    * **Current Session Time:** Time elapsed since the player was last activated *while the game is running*.
    * **Total Game Time:** Cumulative time the player has been active during the current game (since the last Reset).
* Game Controls:
    * **Start Game:** Starts/resumes the timers for all currently active players.
    * **Pause Game:** Pauses the timers for all active players and adds their current session time to their total time.
    * **Reset Game:** Clears all timers (session and total) for all players and deactivates everyone.
* Click player circles to activate/deactivate them, simulating substitutions.
* Responsive layout for control buttons on mobile devices.
* Material Design-inspired dark theme for the user interface.

## Technology Stack

* **Backend & Hosting:** Google Apps Script (`Code.gs`)
* **Frontend Structure:** HTML (`Index.html`)
* **Frontend Logic:** JavaScript (`JavaScript.html`) with AngularJS (v1.8.x)
* **Styling:** CSS (`Stylesheet.html`)

## Setup and Installation

1.  **Create Project:** Go to [script.google.com](https://script.google.com) and create a new Apps Script project.
2.  **Create Files:**
    * Keep the default `Code.gs` file.
    * Create three new HTML files using `File -> New -> HTML file`:
        * `Index.html`
        * `JavaScript.html`
        * `Stylesheet.html`
3.  **Copy Code:** Copy the contents of the provided code files into the corresponding files in your Apps Script editor.
4.  **Configure Players:**
    * In the Apps Script editor, click on `Project Settings` (the gear icon ⚙️ on the left sidebar).
    * Scroll down to the **Script Properties** section and click `Edit script properties`.
    * Click `Add script property`.
    * Enter the Property name: `playerNames`
    * Enter the Value: A comma-separated list of player first names (e.g., `Leo,Cris,Ney,Kylian,Erling`). **Important:** Do not add spaces immediately after the commas unless you want spaces in the player names.
    * Click `Save script properties`.
5.  **Deploy:**
    * Click the `Deploy` button (top right) -> `New deployment`.
    * Select Type: Click the gear icon ⚙️ next to "Select type" and choose `Web app`.
    * Configure the deployment:
        * Description: (Optional, e.g., "Soccer Timer v1.0")
        * Execute as: `Me` (Your Google Account)
        * Who has access: `Anyone` (Easiest for testing) or choose a more restrictive option if needed.
    * Click `Deploy`.
    * **Authorize:** You will likely be asked to authorize the script. Click `Review permissions`, choose your Google account, click `Advanced`, then `Go to [Your Project Name] (unsafe)`, and finally `Allow`.
    * Copy the **Web app URL** provided. This is the link to your running application.

## Usage

1.  **Open the App:** Navigate to the Web app URL obtained after deployment.
2.  **Select Starters:** Click on the circles of the players who are starting the game. Their circles will highlight, marking them as active.
3.  **Start Game:** When the match begins, click the `Start Game` button. The timers for the active players will begin counting up.
4.  **Substitutions:**
    * To sub a player **off**: Click their highlighted circle. They become inactive, their *current session* timer stops and resets, and the time from that session is added to their *total game time*.
    * To sub a player **on**: Click their non-highlighted circle. They become active. If the game is running (`Start` has been pressed and not `Pause`), their *current session* timer starts immediately.
5.  **Pause:** Click `Pause Game` (e.g., for halftime or injuries). All active timers stop, and their current session time is added to their total time.
6.  **Resume:** Click `Start Game` again to resume timers for players who are currently active.
7.  **Reset:** Click `Reset Game` at the end of the match or to start fresh. This stops all timers, resets both current and total times to zero for all players, and deactivates everyone.

## Files Overview

* `Code.gs`: Server-side script that serves the HTML, fetches player names from Script Properties, and includes other HTML files.
* `Index.html`: The main HTML page structure. It includes the CSS and JavaScript files and sets up the basic Angular application structure (`ng-app`, `ng-controller`).
* `JavaScript.html`: Contains the client-side AngularJS controller code. Manages player data, timer logic (`$interval`), button actions, and time formatting.
* `Stylesheet.html`: Contains all the CSS rules for styling the application, including the layout, player circles, buttons, and the dark theme.