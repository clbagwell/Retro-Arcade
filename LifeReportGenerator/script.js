function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function pickUnique(arr, count) {
    const copy = [...arr];
    const results = [];

    for (let i = 0; i < count && copy.length > 0; i++) {
        const index = Math.floor(Math.random() * copy.length);
        results.push(copy[index]);
        copy.splice(index, 1);
    }

    return results;
}

function randomScore() {
    return Math.floor(Math.random() * 101);
}

function generateReport() {

    const today = new Date();

    const currentYear =
        today.getFullYear();
    
    const nextYear =
        currentYear + 1;

    const fiveYearsFromNow =
        currentYear + 5;
    
    const currentDate =
        today.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
    
    const rawName =
    document.getElementById("name").value.trim();

    const rawOccupation =
        document.getElementById("occupation").value.trim();
    
    const rawFood =
        document.getElementById("food").value.trim();
    
    const rawHobby =
        document.getElementById("hobby").value.trim();

    const allFieldsBlank =
        rawName === "" &&
        rawOccupation === "" &&
        rawFood === "" &&
        rawHobby === "";

    const randomOrigins = [
        "generated from a spreadsheet accident",
        "assembled from leftover internet comments",
        "constructed entirely from snack-related data",
        "created during a software malfunction",
        "summoned by an overworked AI",
        "discovered inside a forgotten spreadsheet tab",
        "assembled from rejected superhero applications",
        "accidentally printed by an experimental office printer",
        "created during a heated debate about tacos",
        "generated from the combined hopes of several confused interns",
        "reconstructed from fragments of ancient snack lore",
        "summoned by a malfunctioning vending machine",
        "compiled from decades of questionable decisions",
        "extracted from a parallel universe's employee database",
        "found wandering unsupervised through the internet"
    ];
    
    const nameDefaults = [
        "Anonymous",
        "Mysterious Stranger",
        "Captain Confusion",
        "The Chosen One",
        "An Unexpected Hero",
        "The Last Hope",
        "Agent Placeholder",
        "Sir Reginald Questionmark",
        "The Mysterious Intern",
        "Future Hall Of Famer",
        "The Neighborhood Legend",
        "Count Spreadsheet",
        "Professor Mayhem",
        "Commander Side Quest",
        "The Accidental Celebrity",
        "Agent Pancake",
        "Lord Of Mild Inconveniences",
        "Captain Plot Twist",
        "The Snack Whisperer",
        "Baron Von Improvisation"
    ];

    const occupationDefaults = [
        "Professional Human",
        "Freelance Adventurer",
        "Part-Time Legend",
        "Snack Consultant",
        "Executive Decision Maker",
        "Chief Chaos Officer",
        "Department Of Unfinished Projects",
        "Independent Problem Creator",
        "Senior Vice President Of Snacks",
        "Certified Idea Generator",
        "Director Of Strategic Napping",
        "Professional Button Pusher",
        "Chief Executive Dreamer",
        "Senior Advisor To Nobody",
        "Snack Acquisition Specialist",
        "Part-Time Explorer",
        "Manager Of Unexpected Outcomes",
        "Freelance Hero",
        "Assistant Regional Legend",
        "Lead Investigator Of Weird Stuff"
    ];

    const foodDefaults = [
        "Pizza",
        "Burritos",
        "Nachos",
        "Mystery Casserole",
        "Emergency Donuts",
        "Cosmic Burritos",
        "Legendary Garlic Bread",
        "Questionable Sushi",
        "Champion Mac And Cheese",
        "Forbidden Cupcakes",
        "Intergalactic Nachos",
        "Suspicious Meatballs",
        "Victory Pancakes",
        "Mystery Tacos",
        "Experimental Chili",
        "Quantum Donuts",
        "Supreme Mozzarella Sticks",
        "Emergency Waffles",
        "Ancient Burritos",
        "Maximum Cheese Pizza"
    ];

    const hobbyDefaults = [
        "Looking Suspicious",
        "Collecting Questionable Ideas",
        "Competitive Napping",
        "Avoiding Responsibilities",
        "Advanced Loitering",
        "Practicing Dramatic Entrances",
        "Researching Conspiracy Theories",
        "Accumulating Random Knowledge",
        "Perfecting Excuses",
        "Attempting World Domination",
        "Training Pigeons",
        "Inventing New Holidays",
        "Writing Strongly Worded Emails",
        "Collecting Unnecessary Gadgets",
        "Competitive Daydreaming",
        "Investigating Weird Noises",
        "Escaping Responsibility",
        "Mastering The Art Of Procrastination",
        "Creating Elaborate Plans",
        "Looking For Hidden Treasure"
    ];

    const name =
        rawName ||
        pick(nameDefaults);

    const occupation =
        rawOccupation ||
        pick(occupationDefaults);

    const food =
        rawFood ||
        pick(foodDefaults);

    const hobby =
        rawHobby ||
        pick(hobbyDefaults);

    const easterEgg =
        `${name} ${occupation} ${food} ${hobby}`.toLowerCase();

    const hasBatman =
        easterEgg.includes("batman");

    const hasNinja =
        easterEgg.includes("ninja");

    const hasTaco =
        easterEgg.includes("taco");

    const hasTimeTravel =
        easterEgg.includes("time travel") ||
        easterEgg.includes("timetravel");

    // =====================================
    // BREAKING NEWS
    // =====================================

    const newsHeadline = pick([
        `${name} Causes Widespread Confusion`,
        "Authorities Baffled",
        "Scientists Demand Answers",
        "Experts Deeply Concerned",
        "Neighborhood In Shock",
        `${name} At Center Of Growing Controversy`,
        "International Incident Declared",
        "Situation Escalates Rapidly",
        "Government Issues Statement",
        "Local Residents Confused",
        `${name} Denies All Allegations`,
        "Emergency Meeting Scheduled",
        "United Nations Monitoring Situation",
        "Investigation Officially Underway",
        "Unexpected Turn Of Events Reported",
        `${name} Accidentally Makes History`,
        "Experts Call Situation 'Highly Unusual'",
        "Town Council Requests Clarification",
        "Breaking: Nobody Saw This Coming",
        "Citizens Demand Answers",
        `${name} Declared Local Legend`,
        "Authorities Urge Calm",
        "Researchers Publish Startling Findings",
        "Community Divided By Recent Developments",
        "Emergency Snack Summit Convened",
        `${name} Sparks International Debate`,
        "Historic Levels Of Confusion Reached",
        "Unexpected Hero Emerges",
        "International Observers Taking Notes",
        "Local Incident Gains National Attention",
        `${name} Becomes Unexpected Celebrity`,
        "Officials Refuse To Rule Anything Out",
        "Situation Developing Faster Than Expected",
        "Public Reaction Mixed",
        "Questions Continue To Mount",
        `${name} Linked To Ongoing Investigation`,
        "Experts Remain Deeply Puzzled",
        "Rare Event Captured On Camera",
        "New Records Set Overnight",
        "Authorities Reevaluate Everything",
        `${name} Surprises Experts Again`,
        "Confusion Spreads Across Multiple Departments",
        "Several Meetings Scheduled Immediately",
        "Unexpected Consequences Continue",
        "Citizens React With Cautious Optimism",
        `${name} Reportedly Has A Plan`,
        "Researchers Request Additional Funding",
        "New Details Emerge Hourly",
        "Analysts Struggle To Explain Events",
        "Nobody Is Quite Sure What Happened"
    ]);

    const newsOpenings = [
        "Residents woke up stunned today when",
        "Chaos erupted shortly after sunrise when",
        "Officials were forced to respond after",
        "Reporters rushed to the scene when",
        "Local authorities became concerned after",
        "The situation escalated unexpectedly when",
        "Witnesses immediately called the news when",
        "City officials held an emergency press conference after",
        "Concern spread rapidly throughout the community when",
        "A routine afternoon became historic when",
        "Traffic briefly stopped after",
        "Eyewitnesses began recording videos when",
        "The annual town meeting was interrupted after",
        "Local businesses reported unusual activity when",
        "An otherwise peaceful day changed dramatically when",
        "Multiple experts were consulted after",
        "A chain of unexpected events began when"
    ];

    const newsEvents = [
        `${name} accidentally became the leader of a small cult devoted to ${food}.`,
        `${name} triggered a citywide debate while practicing ${hobby}.`,
        `${name} was spotted carrying ${food} into a highly restricted meeting.`,
        `${name} convinced strangers that ${hobby} should be an Olympic sport.`,
        `${name} caused three emergency meetings and nobody knows why.`,
        `${name} was elected honorary mayor after a dramatic ${hobby} demonstration.`,
        `${name} achieved minor celebrity status through excessive use of ${food}.`,
        `${name} attempted to solve local problems using only ${food}.`,
        `${name} accidentally inspired a documentary series.`,
        `${name} was named Person of the Week by a confused committee.`,
        `${name} attempted to negotiate peace between rival snack factions.`,
        `${name} launched an ambitious plan involving ${food} and optimism.`,
        `${name} accidentally became a social media influencer overnight.`,
        `${name} organized a gathering dedicated entirely to ${hobby}.`,
        `${name} introduced a new theory that confused everyone equally.`,
        `${name} was nominated for an award nobody remembers creating.`,
        `${name} began offering unsolicited advice with alarming confidence.`,
        `${name} inspired a surprisingly successful movement centered on ${food}.`,
        `${name} challenged conventional wisdom during a ${hobby} demonstration.`,
        `${name} accidentally created a holiday in honor of ${food}.`
    ];

    const newsConsequences = [
        "The event has already generated six conspiracy theories.",
        "Several witnesses demanded an explanation.",
        "A committee has been formed to investigate.",
        "Experts remain completely confused.",
        "Three podcasts have already covered the incident.",
        "Nobody can agree on what actually happened.",
        "Local pigeons appear supportive.",
        "Social media remains divided.",
        "The mayor declined to comment.",
        "Several experts immediately retired.",
        "A documentary crew arrived within hours.",
        "Insurance companies are reviewing the situation.",
        "Nobody has successfully explained the incident.",
        "Local schools have added it to their curriculum.",
        "Merchandise is already being sold online.",
        "Public interest remains unusually high.",
        "At least one statue has been proposed.",
        "The event has become a recurring topic at family dinners."
    ];

    const witnessQuote = pick([
        "\"I've never seen anything like it,\" said one witness.",
        "\"This could change everything,\" reported local media.",
        "\"We're just trying to understand what happened.\"",
        "\"Frankly, we're impressed.\"",
        "\"Several pigeons appeared to approve.\"",
        "\"Nobody was prepared for this level of commitment.\"",
        "\"Experts remain cautiously confused.\"",
        "\"The paperwork alone may take years.\"",
        "\"At first we thought it was a joke.\"",
        "\"I have more questions than answers.\"",
        "\"Honestly, this explains a lot.\"",
        "\"We've updated our emergency procedures.\"",
        "\"The pigeons definitely knew something.\"",
        "\"My expectations were low, yet here we are.\"",
        "\"Nobody trained us for this.\"",
        "\"The situation remains strangely inspiring.\"",
        "\"I was hoping someone else would explain it.\"",
        "\"It's surprisingly well organized.\""
    ]);

    // =====================================
    // Breaking News Card
    // =====================================
    
    const newsTemplate = Math.floor(Math.random() * 5);

    let breakingNewsHtml = "";

    if (newsTemplate === 0) {  //Traditional News Report

        breakingNewsHtml = `
            <h2>🚨 BREAKING NEWS</h2>
    
            <h3>${newsHeadline}</h3>
    
            <p>${pick(newsOpenings)} ${name}.</p>
    
            <p>${pick(newsEvents)}</p>
    
            <p>${pick(newsConsequences)}</p>
        `;
    }

    if (newsTemplate === 1) {  //Live Interview

        breakingNewsHtml = `
            <h2>🎤 LIVE INTERVIEW</h2>
    
            <p>
                Reporter: Can you explain what happened?
            </p>
    
            <p>
                ${name}: Not really.
            </p>
    
            <p>
                Reporter: Were tacos involved?
            </p>
    
            <p>
                ${name}: No comment.
            </p>
        `;
    }

    if (newsTemplate === 2) {  //Internal memo

        breakingNewsHtml = `
            <h2>📋 INTERNAL MEMO</h2>
    
            <p>
                SUBJECT: Ongoing ${name} Situation
            </p>
    
            <p>
                Status: Escalating
            </p>
    
            <p>
                Recommended Action:
                Monitor closely.
            </p>
        `;
    }

    if (newsTemplate === 3) {  //Wikipedia Article

        breakingNewsHtml = `
            <h2>📚 WIKIPEDIA ARTICLE</h2>
    
            <p>
                ${name} is best known for
                involvement in several incidents
                involving ${food}.
            </p>
    
            <p>
                Historians remain divided.
            </p>
        `;
    }

    if (newsTemplate === 4) {  //Historical Record
    
        breakingNewsHtml = `
            <h2>🏛 HISTORICAL RECORD</h2>
    
            <p>
                In the year ${currentYear},
                ${name} attempted ${hobby}.
            </p>
    
            <p>
                Civilization was never quite the same.
            </p>
        `;
    }

    // =====================================
    // PERFORMANCE REVIEW
    // =====================================

    //const reviewTemplate = Math.floor(Math.random() * 8);
    
    const strengths = [
        `Exceptional dedication to ${food}`,
        `Advanced ${hobby} capabilities`,
        `Can appear productive with minimal evidence`,
        `Strong confidence during completely avoidable situations`,
        `Maintains enthusiasm under confusing circumstances`,
        `Displays elite snack-management skills`,
        `Creative interpretation of workplace rules`,
        `Shows remarkable persistence`,
        `Excellent emergency improvisation`,
        `Keeps morale high despite the facts`,
        `Maintains composure during completely avoidable crises`,
        `Demonstrates strong leadership in snack-related matters`,
        `Possesses remarkable confidence under scrutiny`,
        `Can motivate others despite limited preparation`,
        `Adapts quickly to unexpected opportunities`,
        `Displays consistent enthusiasm for innovation`,
        `Maintains productivity during unusual circumstances`,
        `Shows excellent commitment to team morale`,
        `Finds creative solutions nobody requested`,
        `Demonstrates impressive dedication to personal branding`
    ];

    const weaknesses = [
        `Attempts to involve ${food} in business decisions`,
        `Frequently distracted by ${hobby}`,
        `Refers to ordinary tasks as "epic quests"`,
        `Maintains suspicious relationships with birds`,
        `Asks difficult questions during easy meetings`,
        `Treats minor inconveniences like movie plots`,
        `Occasionally invents unnecessary procedures`,
        `May overestimate personal expertise`,
        `Uses dramatic narration during routine tasks`,
        `Shows questionable judgment around ${food}`,
        `May become overly enthusiastic about ${food}`,
        `Occasionally confuses confidence with expertise`,
        `Frequently creates unnecessary excitement`,
        `Has difficulty ignoring interesting distractions`,
        `May escalate situations unnecessarily`,
        `Treats brainstorming sessions as competitive sports`,
        `Sometimes volunteers for questionable projects`,
        `Has an unhealthy level of curiosity`,
        `Occasionally misunderstands simple instructions`,
        `Can become emotionally invested in trivial matters`
    ];

    const selectedStrengths = pickUnique(strengths, 3);
    const selectedWeaknesses = pickUnique(weaknesses, 3);

    const reviewRoll = Math.random();

    let reviewTemplate = "";
    
    if (reviewRoll < 0.02) {
    
        reviewTemplate = 99;
    
    } else {
    
        reviewTemplate =
            Math.floor(Math.random() * 8);
    }
    
    if (reviewTemplate === 0) {  //Traditional Performance Review

        reviewHtml = `
            <h2>🤖 AI PERFORMANCE REVIEW</h2>
    
            <p><strong>Employee:</strong> ${name}</p>
    
            <h4>Strengths</h4>
    
            <ul>
                <li>${selectedStrengths[0]}</li>
                <li>${selectedStrengths[1]}</li>
                <li>${selectedStrengths[2]}</li>
            </ul>
    
            <h4>Areas For Improvement</h4>
    
            <ul>
                <li>${selectedWeaknesses[0]}</li>
                <li>${selectedWeaknesses[1]}</li>
                <li>${selectedWeaknesses[2]}</li>
            </ul>
    
            <p>
                Overall Rating:
                ${pick([
                    "Exceeds Expectations",
                    "Technically Employed",
                    "A Mystery To Management",
                    "Needs Adult Supervision",
                    "Unexpectedly Effective"
                ])}
            </p>
        `;
    }

    if (reviewTemplate === 1) {  //Report Card

        reviewHtml = `
            <h2>🎓 REPORT CARD</h2>
    
            <p>Student: ${name}</p>
    
            <p>Snack Management: A+</p>
    
            <p>Decision Making: C-</p>
    
            <p>${hobby}: B+</p>
    
            <p>Professionalism: ${pick(["A", "B", "C", "D"])}</p>
    
            <p>
                Teacher Comment:
                Shows potential but remains unpredictable.
            </p>
        `;
    }

    if (reviewTemplate === 2) {  //AI Evaluation Matrix

        reviewHtml = `
            <h2>🤖 AI EVALUATION MATRIX</h2>
    
            <p>
                Subject:
                ${name}
            </p>
    
            <p>
                Productivity:
                ${randomScore()}%
            </p>
    
            <p>
                Reliability:
                ${randomScore()}%
            </p>
    
            <p>
                Snack Dependency:
                ${randomScore()}%
            </p>
    
            <p>
                Recommendation:
                Continue Monitoring.
            </p>
        `;
    }

    if (reviewTemplate === 3) {  //Fantasy Guild Assessment

        reviewHtml = `
            <h2>⚔️ GUILD MEMBERSHIP REVIEW</h2>
    
            <p>
                Adventurer:
                ${name}
            </p>
    
            <p>
                Class:
                ${occupation}
            </p>
    
            <p>
                Special Skill:
                ${hobby}
            </p>
    
            <p>
                Loot Recovery Rating:
                ${randomScore()}%
            </p>
    
            <p>
                Guild Standing:
                Honorable Chaos Agent
            </p>
        `;
    }

    if (reviewTemplate === 4) {  //Military Evaluation

        reviewHtml = `
            <h2>🎖 OFFICIAL SERVICE REVIEW</h2>
    
            <p>
                Personnel:
                ${name}
            </p>
    
            <p>
                Tactical Awareness:
                ${randomScore()}%
            </p>
    
            <p>
                Mission Focus:
                ${randomScore()}%
            </p>
    
            <p>
                Ability To Follow Instructions:
                ${randomScore()}%
            </p>
    
            <p>
                Command Notes:
                Keep away from ${food}.
            </p>
        `;
    }

    if (reviewTemplate === 5) {  //Sports Scouting Report

        reviewHtml = `
            <h2>🏆 SCOUTING REPORT</h2>
    
            <p>
                Prospect:
                ${name}
            </p>
    
            <p>
                Speed: ${randomScore()}
            </p>
    
            <p>
                Agility: ${randomScore()}
            </p>
    
            <p>
                Coachability: ${randomScore()}
            </p>
    
            <p>
                Potential:
                Hall Of Fame Chaos Candidate
            </p>
        `;
    }

    if (reviewTemplate === 6) {  //Video (RPG) Game Character Sheet

        reviewHtml = `
            <h2>🎮 CHARACTER SHEET</h2>
    
            <p>
                Name:
                ${name}
            </p>
    
            <p>
                Strength:
                ${randomScore()}
            </p>
    
            <p>
                Intelligence:
                ${randomScore()}
            </p>
    
            <p>
                Luck:
                ${randomScore()}
            </p>
    
            <p>
                Special Ability:
                ${food} Mastery
            </p>
        `;
    }

    if (reviewTemplate === 7) {  //Corporate HR Incident Report

        reviewHtml = `
            <h2>📋 HR INCIDENT REPORT</h2>
    
            <p>
                Employee:
                ${name}
            </p>
    
            <p>
                Incident Summary:
                Attempted to improve workplace culture
                using ${food}.
            </p>
    
            <p>
                Outcome:
                Mixed Results.
            </p>
    
            <p>
                Follow-Up Action:
                Additional supervision recommended.
            </p>
    
            <p>
                Employee Response:
                "I'd do it again."
            </p>
        `;
    }

    if (reviewTemplate === 99) {  //Rare Secret Performance Review Template

        reviewHtml = `
            <h2>👑 EMPLOYEE OF THE MULTIVERSE</h2>
    
            <p>
                Congratulations, ${name}.
            </p>
    
            <p>
                After reviewing every known timeline,
                every alternate reality,
                and seventeen parallel dimensions,
                you have been selected as
                Employee Of The Multiverse.
            </p>
    
            <p>
                Achievement unlocked.
            </p>
    
            <p>
                Reward:
                One free ${food}.
            </p>
        `;
    }
    
    // =====================================
    // DATING PROFILE
    // =====================================

    const datingRoll = Math.random();

    let datingTemplate;
    
    if (datingRoll < 0.05) {
    
        datingTemplate = 99;
    
    } else {
    
        datingTemplate =
            Math.floor(Math.random() * 6);
    }
    
    let datingHtml = "";
    
    const datingOpening = pick([
        `Hello, I'm ${name}.`,
        `Greetings, future adventure partner.`,
        `My friends describe me as "legally interesting."`,
        `Hi. I'm ${name}, and this is probably a mistake.`,
        `Nice to meet you.`,
        `Let's skip the small talk and discuss snacks.`,
        `I was told to write something impressive.`,
        `I asked AI to write this for me.`,
        `I've been described as an acquired taste.`,
        `Welcome to my entirely reasonable dating profile.`,
        `Against my better judgment, here we are.`,
        `Let's pretend this is charming.`,
        `I enjoy long walks away from responsibility.`,
        `I was promised there would be snacks.`,
        `This profile contains at least three facts.`,
        `I've prepared for this moment poorly.`,
        `You seem nice enough to continue reading.`
    ]);

    const datingMiddle = pick([
        `I work as a ${occupation} and spend my free time enjoying ${hobby}.`,
        `As a ${occupation}, I've learned many skills. None are useful.`,
        `My passion for ${hobby} is exceeded only by my passion for ${food}.`,
        `People often ask why I enjoy ${hobby}. I change the subject.`,
        `I bring a unique blend of confidence and questionable judgment.`,
        `I've dedicated years to mastering the art of ${hobby}.`,
        `I once considered turning ${hobby} into a career.`,
        `Most of my free time revolves around ${hobby}.`,
        `My relationship with ${food} has been described as serious.`,
        `I once spent an entire weekend focused on ${hobby}.`,
        `Friends regularly ask me for advice they should ignore.`,
        `I enjoy ambitious plans and questionable execution.`,
        `My hobbies include ${hobby} and avoiding accountability.`,
        `I consider myself an expert in at least one made-up field.`,
        `I have strong opinions about things that don't matter.`,
        `My life can best be described as improvisation.`,
        `I bring enthusiasm to situations that don't require it.`
    ]);

    const datingClosing = pick([
        `Ideal date: ${food}, adventure, and poor decisions.`,
        `Looking for someone who won't judge my relationship with ${food}.`,
        `Must tolerate stories involving ${hobby}.`,
        `If you can explain my life choices, please contact me.`,
        `Bonus points if you also enjoy chaos.`,
        `Applications are currently being accepted.`,
        `References available upon request.`,
        `Must appreciate both adventure and snacks.`,
        `If you own a cape, that's a bonus.`,
        `No experience required.`,
        `Let's make questionable memories together.`,
        `Side effects may include laughter.`,
        `Must be comfortable with occasional chaos.`,
        `Applicants should enjoy unexpected plot twists.`,
        `References available from confused acquaintances.`,
        `Please bring your own snacks.`,
        `Let's see what happens.`
    ]);

    if (datingTemplate === 0) {  //Traditional Dating Profile

        datingHtml = `
            <h2>❤️ DATING PROFILE</h2>
    
            <p>${datingOpening}</p>
    
            <p>${datingMiddle}</p>
    
            <p>${datingClosing}</p>
        `;
    }

    if (datingTemplate === 1) {  //Red Flag Assessment

        datingHtml = `
            <h2>🚩 RED FLAG ANALYSIS</h2>
    
            <p>
                Subject:
                ${name}
            </p>
    
            <p>
                Occupation:
                ${occupation}
            </p>
    
            <p>
                Relationship with ${food}:
                Concerning
            </p>
    
            <p>
                Obsession with ${hobby}:
                Documented
            </p>
    
            <p>
                Overall Red Flag Score:
                ${randomScore()}%
            </p>
        `;
    }

    if (datingTemplate === 2) {  //Amazon Product Review

        datingHtml = `
            <h2>📦 PRODUCT REVIEW</h2>
    
            <p>
                Product:
                ${name}
            </p>
    
            <p>
                Rating:
                ⭐⭐⭐⭐☆
            </p>
    
            <p>
                Pros:
                Enjoys ${food}
            </p>
    
            <p>
                Cons:
                Won't stop talking about ${hobby}
            </p>
    
            <p>
                Would date again.
            </p>
        `;
    }

    if (datingTemplate === 3) {  //FBI Behavioral Profile

        datingHtml = `
            <h2>🕵️ FBI BEHAVIORAL PROFILE</h2>

            <p>
                Report Generated: ${currentDate}
            </p>

            <p>
                Subject: ${name}
            </p>
    
            <p>
                Known Activities: ${hobby}
            </p>
    
            <p>
                Primary Motivation:
                Access to ${food}
            </p>
    
            <p>
                Threat Level:
                Mildly Charming
            </p>
    
            <p>
                Recommended Action:
                Observe from a safe distance.
            </p>
        `;
    }

    if (datingTemplate === 4) {  //LinkedIn Connection Request

        datingHtml = `
            <h2>💼 LINKEDIN CONNECTION REQUEST</h2>
    
            <p>
                Hi,
                I'd like to add you to my professional network.
            </p>
    
            <p>
                I see you also enjoy
                ${hobby}.
            </p>
    
            <p>
                Perhaps together we can
                revolutionize ${food}.
            </p>
    
            <p>
                Looking forward to connecting.
            </p>
        `;
    }

    if (datingTemplate === 5) {  //Reality TV Contestant Bio

        datingHtml = `
            <h2>📺 REALITY TV CONTESTANT</h2>
    
            <p>
                Meet ${name},
                a ${occupation}.
            </p>
    
            <p>
                Their strategy is simple:
                rely on confidence and
                large quantities of ${food}.
            </p>
    
            <p>
                When not competing,
                they enjoy ${hobby}.
            </p>
    
            <p>
                Odds of winning:
                Surprisingly High
            </p>
        `;
    }

    if (datingTemplate === 99) {  //Rare Perfect Match Detected

        datingHtml = `
            <h2>🏆 PERFECT MATCH DETECTED</h2>
    
            <p>
                Congratulations.
            </p>
    
            <p>
                After reviewing all available data,
                our systems have determined that
                ${name}
                is statistically compatible with
                absolutely everyone.
            </p>
    
            <p>
                This result should not be trusted.
            </p>
        `;
    }
    
    // =====================================
    // SUPERHERO
    // =====================================
    
    const heroPrefixes = [
        "Captain",
        "Professor",
        "Doctor",
        "Mega",
        "Ultra",
        "Mystery",
        "Shadow",
        "Cosmic",
        "Quantum",
        "Thunder",
        "Iron",
        "Crimson",
        "Titan",
        "Phantom",
        "Turbo",
        "Supreme",
        "Atomic",
        "Midnight",
        "Legendary",
        "Galactic"
    ];
    
    const heroSuffixes = [
        "Crusher",
        "Defender",
        "Guardian",
        "Avenger",
        "Phantom",
        "Sentinel",
        "Champion",
        "Protector",
        "Warden",
        "Ranger",
        "Vindicator",
        "Crusader",
        "Invoker",
        "Enforcer",
        "Trailblazer",
        "Stormbringer",
        "Pathfinder",
        "Outrider",
        "Lightbearer",
        "Nightwatch"
    ];

    const heroDescriptors = [
        "of Justice",
        "of Destiny",
        "of Infinite Snacks",
        "of the Sacred Taco",
        "of Mild Inconvenience",
        "of Unlimited Mondays",
        "of Questionable Decisions",
        "of the Ancient Nachos",
        "of Maximum Effort",
        "of Unnecessary Heroics",
        "of the Lost Coupon",
        "of Dramatic Entrances",
        "of Legendary Appetite",
        "of Suspicious Timing",
        "of the Cosmic Burrito"
    ];
    
    let heroName =
        pick(heroPrefixes) +
        " " +
        pick(heroSuffixes);
    
    if (Math.random() < 0.15) {
    
        heroName +=
            " " +
            pick(heroDescriptors);
    
        // 3% chance for legendary title
    
        if (Math.random() < 0.03) {
    
            heroName +=
                ", First Of Their Name";
        }
    }

    const superPower = pick([
        `the ability to summon unlimited ${food}`,
        `extreme ${hobby} powers`,
        `telepathic communication with pigeons`,
        `the power of dramatic entrances`,
        `advanced snack detection`,
        `unreasonable confidence`,
        `the power to predict snack shortages`,
        `instant mastery of awkward situations`,
        `limited control over probability`,
        `the ability to summon motivational speeches`,
        `superhuman persistence`,
        `advanced bureaucracy resistance`,
        `the ability to detect free food`,
        `mildly inconvenient telekinesis`,
        `the power to attract strange adventures`,
        `extreme luck during unimportant events`
    ]);

    const superheroWeaknesses = [
        `${food}`,
        `basic mathematics`,
        `strongly worded emails`,
        `small ducks`,
        `office meetings`,
        `their own overconfidence`,
        `slow internet`,
        `unexpected paperwork`,
        `folding fitted sheets`,
        `expired coupons`,
        `awkward eye contact`,
        `minor inconveniences`,
        `weekend obligations`,
        `poor parking decisions`,
        `group projects`,
        `their own success`
    ];

    const heroRoll = Math.random();

    let heroTemplate;
    
    let heroHtml = "";
    
    if (heroRoll < 0.02) {
    
        heroTemplate = 99;
    
    } else {
    
        heroTemplate =
            Math.floor(Math.random() * 8);
    }
    
    if (heroTemplate === 0) {  //Classic Origin Story

    heroHtml = `
            <h2>🦸 SUPERHERO ORIGIN STORY</h2>
    
            <p>
                After a bizarre accident involving ${food},
                ${name} became
                <strong>${heroName}</strong>.
            </p>
    
            <p>
                Powers include ${superPower}.
            </p>
    
            <p>
                Weakness:
                ${pick(superheroWeaknesses)}.
            </p>
    
            <p>
                Citizens remain cautiously optimistic.
            </p>
        `;
    }

    if (heroTemplate === 1) {  //Comic Book cover

        heroHtml = `
            <h2>📖 COMIC BOOK COVER</h2>
    
            <h3>
                ${heroName}
            </h3>
    
            <p>
                Issue #${Math.floor(Math.random() * 100) + 1}
            </p>

            <p>
                First published in ${currentYear}
            </p>
            
            <p>
                This month:
            </p>
    
            <p>
                "Attack Of The ${food} Monsters!"
            </p>
    
            <p>
                Can our hero survive?
            </p>
        `;
    }

    if (heroTemplate === 2) {  //Trading Card

        heroHtml = `
            <h2>🃏 HERO TRADING CARD</h2>
    
            <p>
                Name:
                ${heroName}
            </p>
    
            <p>
                Attack:
                ${randomScore()}
            </p>
    
            <p>
                Defense:
                ${randomScore()}
            </p>
    
            <p>
                Snack Power:
                ${randomScore()}
            </p>
    
            <p>
                Rarity:
                ${pick([
                    "Common",
                    "Rare",
                    "Epic",
                    "Legendary"
                ])}
            </p>
        `;
    }

    if (heroTemplate === 3) {  //Intelligence Dossier

        heroHtml = `
            <h2>🕶 SECRET INTELLIGENCE FILE</h2>
    
            <p>
                Codename:
                ${heroName}
            </p>
    
            <p>
                Known Activities:
                ${hobby}
            </p>
    
            <p>
                Threat Level:
                ${pick([
                    "Minimal",
                    "Moderate",
                    "High",
                    "Snack Related"
                ])}
            </p>
    
            <p>
                Agents are advised to proceed carefully.
            </p>
        `;
    }

    if (heroTemplate === 4) {  //Movie Trailer

        heroHtml = `
            <h2>🎬 MOVIE TRAILER</h2>
    
            <p>
                In a world...
            </p>
    
            <p>
                Where nobody was prepared for
                ${food}...
            </p>
    
            <p>
                One hero rises.
            </p>
    
            <p>
                ${heroName}
            </p>
    
            <p>
                Coming this summer.
            </p>
        `;
    }

    if (heroTemplate === 5) {  //Hero Resume

        heroHtml = `
            <h2>📄 SUPERHERO RESUME</h2>
    
            <p>
                Applicant:
                ${heroName}
            </p>
    
            <p>
                Experience:
                7 years fighting unnecessary problems.
            </p>
    
            <p>
                Skills:
                ${superPower}
            </p>
    
            <p>
                References available upon request.
            </p>
        `;
    }

    if (heroTemplate === 6) {  //Newspaper Interview

        heroHtml = `
            <h2>📰 EXCLUSIVE INTERVIEW</h2>
    
            <p>
                Reporter:
                What motivates you?
            </p>
    
            <p>
                ${heroName}:
                Mostly ${food}.
            </p>
    
            <p>
                Reporter:
                Any regrets?
            </p>
    
            <p>
                ${heroName}:
                Several.
            </p>
        `;
    }

    if (heroTemplate === 7) {  //Hero Wiki Page

        heroHtml = `
            <h2>📚 HERO ENCYCLOPEDIA</h2>
    
            <p>
                ${heroName}
                is a fictional superhero
                known for
                ${superPower}.
            </p>
    
            <p>
                First Appearance:
                During a ${food}-related incident.
            </p>
    
            <p>
                Notable Rival:
                The Evil Master Of ${hobby}.
            </p>
        `;
    }

    if (heroTemplate === 99) {  //Rare Secret Template

        heroHtml = `
            <div class="card easterEggCard ultimateEgg">
    
                <h2>👑 LEGENDARY HERO UNLOCKED</h2>
    
                <p>
                    The multiverse has chosen
                    ${heroName}.
                </p>
    
                <p>
                    Power Source:
                    Infinite ${food}
                </p>
    
                <p>
                    Special Ability:
                    ${superPower}
                </p>
    
                <p>
                    Weakness:
                    None detected.
                </p>
    
                <p>
                    Reality itself has become a sidekick.
                </p>
    
            </div>
        `;
    }
    
    // =====================================
    // COURTROOM
    // =====================================

    const courtroomRoll = Math.random();

    let courtroomTemplate;
    
    if (courtroomRoll < 0.02) {
    
        courtroomTemplate = 99;
    
    } else {
    
        courtroomTemplate =
            Math.floor(Math.random() * 8);
    }
    
    let courtroomHtml = "";
    
    const defense = pick([
        `the ${food} made me do it`,
        `I was conducting important research`,
        `nobody specifically told me not to`,
        `it seemed like a good idea at the time`,
        `the pigeons approved`,
        `I misunderstood the assignment`,
        `the evidence lacks sufficient snacks`,
        `nobody objected at the time`,
        `I was following my instincts`,
        `the situation was taken out of context`,
        `everybody seemed supportive`,
        `it was part of a larger strategy`,
        `I was acting in the public interest`,
        `the instructions were unclear`,
        `history will vindicate me`,
        `it was an honest misunderstanding`
    ]);

    const courtroomEvidence = [
        `a suspiciously large amount of ${food}`,
        `a handwritten manifesto about ${hobby}`,
        `four confused witnesses`,
        `an unexplained receipt`,
        `a pigeon that refused to testify`,
        `a series of unfortunate photographs`,
        `an unusually detailed flowchart`,
        `a collection of mysterious notes`,
        `a half-finished presentation`,
        `multiple eyewitness sketches`,
        `a suspiciously enthusiastic recommendation letter`,
        `several unopened emails`,
        `an alarming amount of sticky notes`,
        `a commemorative plaque`,
        `an unauthorized mission statement`,
        `a trophy of unclear origin`
    ];

    if (courtroomTemplate === 0) {  //Traditional Courtroom Defense

        courtroomHtml = `
            <h2>⚖️ COURTROOM DEFENSE</h2>
    
            <p>
                Your Honor, my client ${name},
                a respected ${occupation},
                would like the court to understand that
                "${defense}."
            </p>
    
            <p>
                Evidence submitted includes
                ${pick(courtroomEvidence)}.
            </p>
    
            <p>
                The jury remains unconvinced.
            </p>
        `;
    }

    if (courtroomTemplate === 1) {  //Cross Examination

        courtroomHtml = `
            <h2>🎤 CROSS EXAMINATION</h2>
    
            <p>
                Lawyer: Did you cause the incident?
            </p>
    
            <p>
                ${name}: Define "incident."
            </p>
    
            <p>
                Lawyer: Were ${food} involved?
            </p>
    
            <p>
                ${name}: No comment.
            </p>
    
            <p>
                Judge: That's not helping.
            </p>
        `;
    }

    if (courtroomTemplate === 2) {  //Judge's Notes

        courtroomHtml = `
            <h2>📝 JUDGE'S NOTES</h2>
    
            <p>
                Defendant:
                ${name}
            </p>
    
            <p>
                Occupation:
                ${occupation}
            </p>
    
            <p>
                Main Defense:
                ${defense}
            </p>
    
            <p>
                Credibility:
                Questionable
            </p>
    
            <p>
                Courtroom Behavior:
                Surprisingly Confident
            </p>
        `;
    }

    if (courtroomTemplate === 3) {  //Jury Deliberation

        courtroomHtml = `
            <h2>👥 JURY DELIBERATION</h2>
    
            <p>
                Juror #1:
                I think they're innocent.
            </p>
    
            <p>
                Juror #2:
                They brought ${food} to the scene.
            </p>
    
            <p>
                Juror #3:
                That's not technically illegal.
            </p>
    
            <p>
                Jury Status:
                Confused.
            </p>
        `;
    }

    if (courtroomTemplate === 4) {  //Police Report

        courtroomHtml = `
            <h2>🚓 POLICE INCIDENT REPORT</h2>
    
            <p>
                Suspect:
                ${name}
            </p>
    
            <p>
                Description:
                Engaged in suspicious levels of
                ${hobby}.
            </p>
    
            <p>
                Evidence Collected:
                ${pick(courtroomEvidence)}
            </p>
    
            <p>
                Case Status:
                Ongoing.
            </p>
        `;
    }

    if (courtroomTemplate === 5) {  //Witness Statement

        courtroomHtml = `
            <h2>👀 WITNESS STATEMENT</h2>
    
            <p>
                I personally observed
                ${name}
                carrying
                ${food}.
            </p>
    
            <p>
                Moments later,
                events became difficult to explain.
            </p>
    
            <p>
                I would prefer not to be involved further.
            </p>
        `;
    }

    if (courtroomTemplate === 6) {  //Legal Statement

        courtroomHtml = `
            <h2>🤝 LEGAL SETTLEMENT</h2>
    
            <p>
                The parties have agreed
                to resolve the matter.
            </p>
    
            <p>
                ${name}
                agrees to stop involving
                ${food}
                in official business.
            </p>
    
            <p>
                Both sides deny wrongdoing.
            </p>
        `;
    }

    if (courtroomTemplate === 7) {  //Supreme Court Opinion

        courtroomHtml = `
            <h2>🏛 SUPREME COURT OPINION</h2>
    
            <p>
                The Court has reviewed
                the evidence.
            </p>
    
            <p>
                While the actions of
                ${name}
                were unusual,
                they were not technically prohibited.
            </p>
    
            <p>
                The lower court is reversed.
            </p>
    
            <p>
                The nation remains divided.
            </p>
        `;
    }

    if (courtroomTemplate === 99) {  //Rare Trial of the Century

        courtroomHtml = `
            <div class="card easterEggCard ultimateEgg">
    
                <h2>👑 TRIAL OF THE CENTURY</h2>
    
                <p>
                    The courtroom was filled
                    beyond capacity.
                </p>
    
                <p>
                    Defendant:
                    ${name}
                </p>
    
                <p>
                    Charges:
                    Excessive use of ${food}
                    and reckless application of
                    ${hobby}.
                </p>
    
                <p>
                    After twelve days of testimony,
                    the jury returned a verdict.
                </p>
    
                <p>
                    NOT GUILTY.
                </p>
    
                <p>
                    The judge immediately requested
                    a selfie.
                </p>
    
            </div>
        `;
    }
    
    // =====================================
    // ALIEN REPORT
    // =====================================

    const alienRoll = Math.random();

    let alienTemplate;
    
    if (alienRoll < 0.02) {
    
        alienTemplate = 99;
    
    } else {
    
        alienTemplate =
            Math.floor(Math.random() * 8);
    }
    
    let alienHtml = "";
    
    const alienObservation = pick([
        `Subject displays unusual attachment to ${food}.`,
        `Subject frequently discusses ${hobby}.`,
        `Subject appears harmless but unpredictable.`,
        `Subject possesses advanced snack acquisition skills.`,
        `Subject demonstrates confidence unsupported by evidence.`,
        `Subject may be attempting leadership.`,
        `Subject exhibits unusual optimism.`,
        `Subject frequently initiates unnecessary adventures.`,
        `Subject appears highly adaptable.`,
        `Subject has formed alliances with other humans.`,
        `Subject displays persistent curiosity.`,
        `Subject enjoys unnecessary complexity.`,
        `Subject values snacks above expectations.`,
        `Subject demonstrates unusual resilience.`,
        `Subject seems unaware of personal limitations.`,
        `Subject may accidentally become influential.`
    ]);

    const alienRecommendations = [
        `Continue observation.`,
        `Proceed with caution.`,
        `Offer snacks and observe reaction.`,
        `Avoid discussing taxes.`,
        `Further study required.`,
        `Subject may be important to local customs.`,
        `Recommend diplomatic engagement.`,
        `Further snack-based testing advised.`,
        `Monitor for unexpected leadership activity.`,
        `Avoid direct competition.`,
        `Subject appears valuable to the local ecosystem.`,
        `Maintain safe observation distance.`,
        `Additional cultural analysis required.`,
        `Assign senior researchers to the case.`,
        `Continue collecting data.`,
        `Probability of future incidents remains high.`
    ];

    if (alienTemplate === 0) {  //Classic Alien Field Report

        alienHtml = `
            <h2>👽 ALIEN FIELD REPORT</h2>

            <p>
                Earth Date:
                ${currentDate}
            </p>

            <p>
                Subject:
                ${name}
            </p>
    
            <p>
                Observation:
                ${alienObservation}
            </p>
    
            <p>
                Additional Notes:
                Subject remains interested in ${food}.
            </p>
    
            <p>
                Recommendation:
                ${pick(alienRecommendations)}
            </p>
        `;
    }

    if (alienTemplate === 1) {  //First Contact Log

        alienHtml = `
            <h2>🛸 FIRST CONTACT LOG</h2>
    
            <p>
                Earth Subject:
                ${name}
            </p>
    
            <p>
                Initial Communication Attempt:
                Successful
            </p>
    
            <p>
                Subject immediately began discussing
                ${hobby}.
            </p>
    
            <p>
                Negotiations were temporarily paused
                for ${food}.
            </p>
        `;
    }

    if (alienTemplate === 2) {  //Scientific Research Notes

        alienHtml = `
            <h2>🔬 XENOBIOLOGY RESEARCH NOTES</h2>
    
            <p>
                Specimen:
                ${name}
            </p>
    
            <p>
                Habitat:
                Areas containing ${food}
            </p>
    
            <p>
                Typical Behavior:
                ${hobby}
            </p>
    
            <p>
                Conclusion:
                Further observation required.
            </p>
        `;
    }

    if (alienTemplate === 3) {  //Threat Assessment

        alienHtml = `
            <h2>⚠️ GALACTIC THREAT ASSESSMENT</h2>
    
            <p>
                Subject:
                ${name}
            </p>
    
            <p>
                Influence Rating:
                ${randomScore()}%
            </p>
    
            <p>
                Snack Acquisition Capability:
                ${randomScore()}%
            </p>
    
            <p>
                Probability Of Causing Confusion:
                ${randomScore()}%
            </p>
    
            <p>
                Threat Level:
                ${pick([
                    "Negligible",
                    "Moderate",
                    "Concerning",
                    "Legendary"
                ])}
            </p>
        `;
    }

    if (alienTemplate === 4) {  //Nature Documentary

        alienHtml = `
            <h2>🎥 NATURE DOCUMENTARY</h2>
    
            <p>
                Here we see the rare
                ${name}
                in its natural habitat.
            </p>
    
            <p>
                Notice how it approaches
                ${food}
                with remarkable determination.
            </p>
    
            <p>
                The creature then performs
                a mating ritual known as
                ${hobby}.
            </p>
    
            <p>
                Fascinating.
            </p>
        `;
    }

    if (alienTemplate === 5) {  //Galactic Census

        alienHtml = `
            <h2>📋 GALACTIC CENSUS RECORD</h2>
    
            <p>
                Name:
                ${name}
            </p>
    
            <p>
                Occupation:
                ${occupation}
            </p>
    
            <p>
                Primary Fuel Source:
                ${food}
            </p>
    
            <p>
                Recreational Activity:
                ${hobby}
            </p>
    
            <p>
                Classification:
                Mostly Harmless
            </p>
        `;
    }

    if (alienTemplate === 6) {  //Alien Podcast Transcript

        alienHtml = `
            <h2>🎙 INTERGALACTIC PODCAST</h2>
    
            <p>
                Host:
                Welcome back to
                Strange Humans Weekly.
            </p>
    
            <p>
                Today's topic:
                ${name}.
            </p>
    
            <p>
                Co-Host:
                The one obsessed with
                ${food}?
            </p>
    
            <p>
                Host:
                Exactly.
            </p>
    
            <p>
                Co-Host:
                Incredible guest.
            </p>
        `;
    }

    if (alienTemplate === 7) {  //Conspiracy File

        alienHtml = `
            <h2>🕵️ CLASSIFIED CONSPIRACY FILE</h2>
    
            <p>
                Evidence suggests that
                ${name}
                may already know about
                extraterrestrial activity.
            </p>
    
            <p>
                Suspicious Behavior:
                ${hobby}
            </p>
    
            <p>
                Known Associates:
                Individuals connected to
                ${food}.
            </p>
    
            <p>
                File Status:
                Redacted.
            </p>
        `;
    }

    if (alienTemplate === 99) {  //Rare Secret Template

        alienHtml = `
            <div class="card easterEggCard ultimateEgg">
    
                <h2>🌌 CHOSEN ONE OF THE GALAXY</h2>
    
                <p>
                    Galactic archives have been opened.
                </p>
    
                <p>
                    After reviewing ten million civilizations,
                    the Council has selected
                    ${name}.
                </p>
    
                <p>
                    Primary Qualification:
                    Exceptional commitment to
                    ${food}.
                </p>
    
                <p>
                    Secondary Qualification:
                    Mastery of
                    ${hobby}.
                </p>
    
                <p>
                    Effective immediately,
                    the Milky Way has been placed
                    under your supervision.
                </p>
    
                <p>
                    No pressure.
                </p>
    
            </div>
        `;
    }
    
    // =====================================
    // Special Easter Egg Card
    // =====================================

    let specialCard = "";

    if (allFieldsBlank) {

        specialCard += `
        <div class="card easterEggCard">
    
            <h2>
                <span class="d20badge">20</span>
                RANDOMIZED LIFE DETECTED 🎲 
            </h2>
    
            <p>
                User declined to provide any personal information.
            </p>

            <p>
                Emergency personality generation protocol activated.
            </p>
    
            <p>
                Subject was originally
                ${pick(randomOrigins)}.
            </p>

            <p>
                A completely synthetic citizen has been created:
                <strong>${name}</strong>,
                a ${occupation}
                obsessed with ${food}
                and passionate about ${hobby}.
            </p>
    
            <p>
                Reality has accepted the result.
            </p>
    
        </div>
        `;
    }
    
    if (hasBatman) {

        specialCard += `
        <div class="card easterEggCard">

            <h2>🦇 CLASSIFIED BATMAN FILE</h2>

            <p>
                Authorities have confirmed that
                ${name} has been operating at night.
            </p>

            <p>
                Witnesses report dramatic exits,
                excessive preparation,
                and suspicious access to grappling hooks.
            </p>

            <p>
                Official conclusion:
                Definitely Batman.
            </p>

        </div>
        `;
    }

    if (hasNinja) {

        specialCard += `
        <div class="card easterEggCard">

            <h2>🥷 SECRET NINJA DOSSIER</h2>

            <p>
                Surveillance efforts failed because
                the subject keeps disappearing.
            </p>

            <p>
                Investigators found only a receipt
                for ${food}.
            </p>

            <p>
                Threat Level:
                Surprisingly Sneaky.
            </p>

        </div>
        `;
    }

    if (hasTaco) {

        specialCard += `
        <div class="card easterEggCard">

            <h2>🌮 TACO PROPHECY</h2>

            <p>
                Ancient legends foretold the arrival
                of ${name}.
            </p>

            <p>
                The prophecy stated that unlimited tacos
                would bring balance to the world.
            </p>

            <p>
                Scholars remain divided.
            </p>

        </div>
        `;
    }

    if (hasTimeTravel) {

        specialCard += `
        <div class="card easterEggCard">

            <h2>⏰ TEMPORAL INCIDENT REPORT</h2>

            <p>
                ${name} accidentally traveled
                through time while attempting
                ${hobby}.
            </p>

            <p>
                Historians are now dealing with
                seventeen contradictory timelines.
            </p>

            <p>
                Recommendation:
                Stop touching mysterious buttons.
            </p>

        </div>
        `;
    }

    const hasAllSecrets =
        hasBatman &&
        hasNinja &&
        hasTaco &&
        hasTimeTravel;

    let absurdityScores = {
        mainCharacter: randomScore(),
        villain: randomScore(),
        professionalism: randomScore(),
        birdApproval: randomScore(),
        cultLeader: randomScore(),
        sceneMaking: randomScore(),
        legend: randomScore()
    };

    const absurdityTitle =
    hasAllSecrets
        ? "👑 ABSOLUTE CHAOS ACHIEVED 👑"
        : "📊 ABSURDITY METER";

    if (hasAllSecrets) {

        absurdityScores = {
            mainCharacter: 100,
            villain: 100,
            professionalism: 100,
            birdApproval: 100,
            cultLeader: 100,
            sceneMaking: 100,
            legend: 100
        };
    }
    
    if (hasAllSecrets) {

        specialCard += `
        <div class="card easterEggCard ultimateEgg">

            <h2>🏆 ULTIMATE SECRET ENDING</h2>

            <p>
                You have unlocked the rarest ending.
            </p>

            <p>
                Batman and the Ninjas have joined forces
                to protect the Sacred Taco Timeline.
            </p>

            <p>
                Reality survives another day.
            </p>

        </div>
        `;
    }

    // =====================================
    // OUTPUT
    // =====================================

    document.getElementById("results").innerHTML = `

    <div id="shareArea">

        <div class="card">
            ${breakingNewsHtml}
        </div>

        ${specialCard}

        <div class="card">
            ${reviewHtml}
        </div>

        <div class="card">
            ${datingHtml}
        </div>

        <div class="card">
            ${heroHtml}
        </div>

        <div class="card">
            ${courtroomHtml}
        </div>

        <div class="card">
            ${alienHtml}
        </div>

        <div class="card">
            <h2>${absurdityTitle}</h2>

            <div class="score">Main Character Energy: ${absurdityScores.mainCharacter}%</div>
            <div class="score">Villain Potential: ${absurdityScores.villain}%</div>
            <div class="score">Professionalism: ${absurdityScores.professionalism}%</div>
            <div class="score">Bird Approval Rating: ${absurdityScores.birdApproval}%</div>
            <div class="score">Cult Leader Potential: ${absurdityScores.cultLeader}%</div>
            <div class="score">Likelihood Of Causing A Scene: ${absurdityScores.sceneMaking}%</div>
            <div class="score">Probability Of Becoming A Legend: ${absurdityScores.legend}%</div>
        </div>

    </div>

    <div class="buttonRow">

        <button class="repeatBtn" onclick="generateReport()">
            🎲 Generate Another Version
        </button>

        <button class="shareBtn" onclick="shareImage()">
            📸 Share Image
        </button>

    </div>
    `;
}

function shareImage() {

    const target = document.getElementById("shareArea");

    html2canvas(target, {
        scale: 2
    }).then(canvas => {

        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");

        link.href = image;
        link.download = "life-report.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    });
}
