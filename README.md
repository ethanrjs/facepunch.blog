# facepunch.blog

This is a joke website, mocking some of the seemingly absurd upcoming Rust changes. The purpose is to make a
semi-realistic looking website that looks like it's from Facepunch, but is full of phony changelogs and nonsensical
editions to Rust.

## How to run

1. Install [Node.js](https://nodejs.org/en/)
2. Clone this repository
3. Run `npm install` in the repository directory
4. Run `node app` in the repository directory
5. Open `localhost:3000` in your browser

## .chlog format

.chlog is a custom format created specifically for this project with the intentions of creating custom designed
changelogs with ease. To get started, do the following:

1. Create a new file with the extension `.chlog` in the `blogs` directory
2. Write a changelog with the following format:

```plaintext
TITLE=Clever Title Update Name
TAGLINE=Month Year
[FEATURES]
Feature 1
Feature 2
Feature 3
[IMPROVEMENTS]
Improvement 1
Improvement 2
Improvement 3
[FIXES]
Fix 1
Fix 2
Fix 3
```

One change per line.

3. Save the file and reload the page
