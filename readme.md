# Decipher Survey Sync

## Overview

Decipher Survey Sync is a command line tool built by Epiphany with the purpose of improving the scripting workflow on Decipher projects by allowing developers to download and update a project’s survey xml while working locally. The tool eliminates the need for manually copy-pasting code from text/code editors into the Decipher web XML Editor.


## Prerequisites

In order to use the tool, you need to have Node.js version 10 or newer installed on your machine. You can find it on https://nodejs.org

In order to get to tool, you just need to install [Git for Windows](https://git-scm.com/download/win) or [Git for Mac](https://git-scm.com/download/mac)


## Getting started with the tool

1. Open your command prompt / terminal.

   * On Windows

     Press the following keys: `[ Windows ]` + `[ R ]`, type `cmd` and press `[ Enter ]`.

   * On macOS

     Press the following keys: `[ Command ]` + `[ Space ]`, type `terminal` and press `[ Enter ]`.

2. To download the application, run the following command in the command prompt / terminal.

   ```
   git clone https://github.com/glorious-conversation-design/decipher-survey-sync.git
   ```

   If the application is already installed, continue to the next step.

3. In command prompt / terminal, navigate to your local copy of the decipher-survey-sync repository by typing the command:

   ```
   cd decipher-survey-sync
   ```

4. Start the Decipher Survey Sync by executing the following command in the terminal (from the `decipher-survey-sync/` directory):

   * On Windows

     ```
     start.cmd
     ```

   * On macOS / Linux

     ```
     ./start.sh
     ```

   This will automatically update the Decipher Survey Sync application and install its dependencies.

5. On first run, paste your API key in the terminal prompt and press `[ Enter ]` (this step will only be performed once).

   ```
   =====================================
   Welcome to Decipher Survey Sync 1.0.0
   =====================================
   (C) Epiphany RBC B.V. (NL) 2020

   ? Please provide the API key: █
   ```

   ```
   =====================================
   Welcome to Decipher Survey Sync 1.0.0
   =====================================
   (C) Epiphany RBC B.V. (NL) 2020

   ? Please provide the API key: dc5bcbf7f9372ccc9aedb581fe88edfe█
   ```

6. Select `New project`, press `[ Enter ]` and type the project number of the survey that you want to work on – later, you will be able to select one of the projects you've already worked on.

   ```
   =====================================
   Welcome to Decipher Survey Sync 1.0.0
   =====================================
   (C) Epiphany RBC B.V. (NL) 2020

   ? Please provide the API key: dc5bcbf7f9372ccc9aedb581fe88edfe
   ? Please choose a project... (Use arrow keys)
   > New project
   ```

   ```
   =====================================
   Welcome to Decipher Survey Sync 1.0.0
   =====================================
   (C) Epiphany RBC B.V. (NL) 2020

   ? Please provide the API key: dc5bcbf7f9372ccc9aedb581fe88edfe
   ? Please choose a project... New project
   ? Please enter project number: 190001█
   ```

7. In your file browser (Finder on Mac - Explorer on Windows), navigate to the folder. Open the directory with the same name as the project and open the `survey.xml` file in your preferred code editor.

   ```
   ? Please provide the API key: dc5bcbf7f9372ccc9aedb581fe88edfe
   ? Please choose a project... New project
   ? Please enter project number: 190001

   XML sync started using survey file `project/190001/survey.xml`.
   Editing this file will automatically upload it to Decipher.

   ? Action: (Use arrow keys)
   > Switch project
     Quit
   ```

8. Edit the `survey.xml` in your editor. The tool will try to update the online XML for you every time you save the file.

   If everything is correct, the online survey will be updated.

   ```
   XML sync started using survey file `project/190001/survey.xml`.
   Editing this file will automatically upload it to Decipher.

   ? Action: (Use arrow keys)

   File change detected. Uploading `survey.xml` to Decipher.. Done.
   Archived backup `project/190001/backup/survey.2020-01-10-130000.xml`.
   ```

   If Decipher detects an error in your code, the tool will show you the error.

   ```
   XML sync started using survey file `project/190001/survey.xml`.
   Editing this file will automatically upload it to Decipher.

   ? Action: (Use arrow keys)

   File change detected. Uploading `survey.xml` to Decipher.. FAILED!

   Error at line 86. That label name ('ch8') has already been used.
   ```
