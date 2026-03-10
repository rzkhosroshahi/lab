Your Assignment
Build a Developer CLI Tool — "DevLog"

The Scenario
You're a developer who constantly switches between projects throughout the day. You want a small command-line tool that helps you track your work sessions, log what you did, and undo mistakes — something you'd actually reach for daily.

What the tool should do
Session Management

Only one active session can exist at a time across the tool
Starting a new session when one is already active should resume it, not create a duplicate

Logging Work

During a session, you can add log entries describing what you worked on
You can undo the last log entry (and keep undoing, step by step)

Output / Export

You can print a session summary to the console
You can also export the summary to either a plain .txt file or a JSON file — your choice at runtime
The export system should be easy to extend later (e.g. add Markdown, PDF, etc.) without touching existing logic

Filtering Logs

You can filter your log entries by a keyword or by severity level (info, warning, error)
The filtering should be chainable — e.g. "give me entries that are warnings AND contain the word 'auth'"

Third-party Time Tracker Integration

Imagine the tool integrates with an external time-tracking library that has a completely different interface than your internal session model
Your code should bridge that gap cleanly without modifying either side


Constraints

Use any language you're comfortable with
No UI needed — plain functions, classes, or modules are fine
Focus on structure and design, not polish
You don't need to build a real CLI with argv parsing — a few driver lines calling your code is enough to demonstrate it works


Deliverable
Share your code and write 2–3 sentences explaining which pattern you used where, and why it felt like a natural fit for that part of the problem.
Good luck! 🚀