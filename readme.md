# Decipher Survey Sync

## Overview

Decipher Survey Sync is a command line tool built by Epiphany with the purpose of improving the scripting workflow on Decipher projects by allowing developers to download and update a project’s survey xml while working locally. The tool eliminates the need for manually copy-pasting code from text/code editors into the Decipher web XML Editor.

## Pre-requirements

In order to use the tool, you need to have Node.js version 10 or newer installed on your machine. You can find it on https://nodejs.org

In order to get to tool, you just need to install [Git for windows](https://git-scm.com/download/win) or [Git for Mac](https://git-scm.com/download/mac) and run the following command in the command line / terminal.  
```
git clone git@github.com:glorious-conversation-design/decipher-survey-sync.git
```

## Getting started with the tool

1. Create a new folder and extract the contents of `dss.zip` in it.

2. Open in terminal / command prompt

   **Mac / Linux users**
   Open your terminal app and navigate to the folder where you've extracted the tool.
   Example:
   ```
   cd ~/dss
   ```

   **Windows users**

   Open your command prompt by typing cmd and pressing enter in the start menu and navigate to the folder where you've extracted the tool.
   ```
   cd c:\dss
   ```

3. In the terminal / command prompt window, type `npm install` and wait for the dependencies to be downloaded.

4. In terminal / command prompt, start the tool by typing npm start.

5. Paste your API key in the terminal prompt and press Enter. (this step will only be performed once)

   ```
   =====================================
   Welcome to Decipher Survey Sync 0.0.0
   =====================================
   (C) Epiphany RBC B.V. (NL) 2020

   ? Please provide the API key: █
   ```

   ```
   =====================================
   Welcome to Decipher Survey Sync 0.0.0
   =====================================
   (C) Epiphany RBC B.V. (NL) 2020

   ? Please provide the API key: dc5bcbf7f9372ccc9aedb581fe88edfe█
   ```

6. Select `New project`, press Enter and type the project number of the survey that you want to work on – later, you will be able to select one of the projects you’ve already worked on.

   ```
   =====================================
   Welcome to Decipher Survey Sync 0.0.0
   =====================================
   (C) Epiphany RBC B.V. (NL) 2020

   ? Please provide the API key: dc5bcbf7f9372ccc9aedb581fe88edfe
   ? Please choose a project... (Use arrow keys)
   > New project
   ```

   ```
   =====================================
   Welcome to Decipher Survey Sync 0.0.0
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
