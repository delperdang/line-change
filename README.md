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

## Setup and Installation (using `clasp`)

This guide uses `clasp`, the command-line tool for Google Apps Script, to manage and deploy the project.

**Prerequisites:**

1.  **Node.js and npm:** Ensure you have Node.js (which includes npm) installed. Download from [nodejs.org](https://nodejs.org/).
2.  **Google Account:** You need a Google account.
3.  **`clasp`:** Install `clasp` globally via npm:
    ```bash
    npm install -g @google/clasp
    ```
4.  **Login to `clasp`:** Authenticate `clasp` with your Google account:
    ```bash
    clasp login
    ```
    Follow the prompts to log in via your browser.
5.  **Enable Apps Script API:** You need to enable the Google Apps Script API for your Google account. Visit [script.google.com/home/usersettings](https://script.google.com/home/usersettings) and ensure "Google Apps Script API" is turned **On**.

**Installation Steps:**

1.  **Get the Code:** Clone or download the project repository to your local machine.
2.  **Navigate to Project Root:** Open your terminal or command prompt and navigate into the main project directory (the one containing this `README.md` and the `project/` subfolder).
    ```bash
    cd path/to/line-change
    ```
3.  **Create Google Apps Script Project:** Run the following `clasp` command to create a new standalone Apps Script project online, linked to this local directory. It specifically tells `clasp` that your code resides in the `project/` subdirectory.
    ```bash
    clasp create --type standalone --title "Line Change Timer" --rootDir ./project
    ```
    This command will create a `.clasp.json` file and an `appsscript.json` file inside the `project/` directory if one doesn't exist.
4.  **Configure Players (Manual Step):** `clasp` cannot directly set script properties. You need to do this manually in the web editor:
    * Open the newly created Apps Script project in your browser:
        ```bash
        clasp open
        ```
    * In the Apps Script editor, click on `Project Settings` (the gear icon ⚙️ on the left sidebar).
    * Scroll down to the **Script Properties** section and click `Edit script properties`.
    * Click `Add script property`.
    * Enter the Property name: `playerNames`
    * Enter the Value: A comma-separated list of player first names (e.g., `Wayne,Mario,Sidney,Alex,Connor`). **Important:** Do not add spaces immediately after the commas unless you want spaces in the player names.
    * Click `Save script properties`.
    * You can close the web editor tab now.
5.  **Push Files:** Upload the local code from your `project/` folder to the online Apps Script project:
    ```bash
    clasp push
    ```
    *(Use `clasp push --force` if you encounter conflicts after making changes in the web editor, though it's best practice to pull changes first if collaborating or editing online).*
6.  **Deploy as Web App:** Create a deployment to make the project accessible as a web app:
    ```bash
    clasp deploy --description "Initial deployment"
    ```
    * This command creates a new, versioned deployment.
    * `clasp` will output the **Deployment ID** and the **Web App URL** (usually ending in `/exec`).
    * Copy the **Web App URL** - this is the link to your running application.

    * **Note:** To update the deployment with new code changes later, first `clasp push` your changes, then run `clasp deploy` again. You can create a new deployment or update an existing one using its ID (`clasp deploy -i <DeploymentID> -d "Updated description"`).

Your "Line Change Timer" web app is now set up and deployed! Access it using the URL provided by the `clasp deploy` command.

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