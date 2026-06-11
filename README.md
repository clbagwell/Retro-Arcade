# Life Report Generator

## Overview

Life Report Generator is a humorous one-page web application that transforms a few simple user inputs into a completely absurd personalized report.

Users provide up to four pieces of information:

* Name
* Occupation
* Favorite Food
* Favorite Hobby

The application then generates a collection of comedic cards that reinterpret those inputs through multiple fictional lenses, including breaking news reports, AI performance reviews, dating profiles, superhero origin stories, courtroom defenses, and alien field reports.

The result is a unique, shareable, and often ridiculous "life report" that feels different every time it is generated.

---

## Why This Project Exists

Many web generators rely on a single joke template with a few random substitutions. After a handful of uses, the output becomes predictable.

Life Report Generator was designed around a different philosophy:

**Variety comes from changing the entire storytelling format, not just swapping words.**

Instead of producing one fixed report structure, each card contains multiple independent templates. A dating profile may become an FBI behavioral report, an Amazon review, or a reality TV contestant bio. A superhero origin story may become a comic book cover, trading card, movie trailer, or encyclopedia entry.

This approach dramatically increases replayability while keeping the code simple and maintainable.

---

## Features

### Personalized Reports

Generate humorous reports based on user-provided inputs.

### Multiple Card Types

Each report contains several independent cards.

### Template-Based Variety

Each card randomly selects from multiple completely different layouts.

### Hidden Easter Eggs

Special keywords unlock unique report variants.

Examples include:

* Batman
* Ninja
* Taco
* Time Travel

### Secret Rare Events

Certain templates appear only a small percentage of the time.

### Generate Another Version

Users can repeatedly generate new reports using the same inputs.

### Shareable Results

Reports can be exported as an image and shared.

### Evergreen Date Support

Templates can automatically include the current year and date.

---

# Application Architecture

```text
+------------------------------------------------+
|                LIFE REPORT GENERATOR           |
+------------------------------------------------+
                        |
                        v
              User Input Collection
                        |
                        |
        +---------------+---------------+
        |               |               |
        v               v               v
      Name        Occupation         Food
                        |
                        v
                     Hobby
                        |
                        v
             Report Generation Engine
                        |
                        v
+------------------------------------------------+
|                CARD GENERATION                 |
+------------------------------------------------+
        |               |               |
        |               |               |
        v               v               v

 Breaking News    Performance Review    Dating Profile
       |                  |                  |
       v                  v                  v

   5 Templates       8 Templates        6 Templates

       |
       |
       +--------------------------------------+
                                              |
                                              v

         Superhero Origin Story (8 Templates)

                                              |
                                              v

           Courtroom Defense (8 Templates)

                                              |
                                              v

             Alien Field Report (8 Templates)

                                              |
                                              v

                Easter Egg Processing

                                              |
                                              v

                  Final Report HTML
```

---

# Card Template System

## Breaking News

```text
Breaking News
├── Traditional News Report
├── Live Interview
├── Government Memo
├── Wikipedia Article
└── Historical Record
```

## AI Performance Review

```text
Performance Review
├── Traditional Review
├── Report Card
├── AI Evaluation Matrix
├── Fantasy Guild Assessment
├── Military Evaluation
├── Sports Scouting Report
├── Video Game Character Sheet
└── HR Incident Report
```

## Dating Profile

```text
Dating Profile
├── Traditional Dating Profile
├── Red Flag Assessment
├── Amazon Product Review
├── FBI Behavioral Profile
├── LinkedIn Connection Request
└── Reality TV Contestant Bio
```

## Superhero Origin Story

```text
Superhero Origin Story
├── Origin Story
├── Comic Book Cover
├── Trading Card
├── Intelligence Dossier
├── Movie Trailer
├── Hero Resume
├── Newspaper Interview
└── Encyclopedia Entry
```

## Courtroom Defense

```text
Courtroom Defense
├── Traditional Defense
├── Cross Examination
├── Judge's Notes
├── Jury Deliberation
├── Police Report
├── Witness Statement
├── Legal Settlement
└── Supreme Court Opinion
```

## Alien Field Report

```text
Alien Field Report
├── Standard Observation
├── First Contact Log
├── Xenobiology Research Notes
├── Threat Assessment
├── Nature Documentary
├── Galactic Census
├── Alien Podcast Transcript
└── Conspiracy File
```

---

# Easter Egg System

Special hidden templates are activated when specific input combinations are detected.

```text
User Input
    |
    +--> Batman
    |
    +--> Ninja
    |
    +--> Taco
    |
    +--> Time Travel
    |
    +--> All Blank Fields
    |
    +--> Special Combination Matches
```

These can unlock:

* Unique card styling
* Custom backgrounds
* Special borders
* Secret narratives
* 100% Absurdity Meter ratings
* Rare hidden content

---

# Randomization Strategy

The application uses layered randomization:

```text
User Inputs
      |
      v
Default Values (if blank)
      |
      v
Card Template Selection
      |
      v
Sentence Fragment Selection
      |
      v
Rare Event Checks
      |
      v
Easter Egg Checks
      |
      v
Final Report
```

This creates thousands of possible combinations while keeping the code easy to expand.

---

# Future Ideas

Potential future enhancements:

* Villain Origin Stories
* Time Traveler Incident Reports
* Corporate Mission Statements
* AI Therapy Sessions
* Fantasy Quest Logs
* Dungeons & Dragons Character Sheets
* Presidential Press Briefings
* Medieval Town Crier Reports
* Pirate Captain Evaluations
* Interdimensional Travel Warnings

---

# Technology

* HTML5
* CSS3
* Vanilla JavaScript

No frameworks. No backend. No database.

The entire application runs in the browser and can be hosted as a simple static website.

---

# License

This project is intended for entertainment, experimentation, and learning purposes.

Use responsibly. Side effects may include excessive laughter, questionable superhero identities, and increased appreciation for tacos.

