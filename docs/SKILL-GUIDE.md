# Using the `gym-website-design` skill

## Where it lives

```
.claude/skills/gym-website-design/
├── SKILL.md                      main instructions (always read first)
└── references/
    ├── reference-sites.md        research on the 10 US gym websites
    ├── design-directions.md      Premium / High-Energy / Commercial in detail
    ├── design-system.md          tokens: colour, type, spacing, motion
    ├── components.md             header, hero, schedule, pricing, trainers…
    ├── seo-local.md              SEO and local SEO
    ├── accessibility.md          accessibility and performance budget
    ├── quality-checklist.md      pre-launch checklist
    └── client-intake.md          information to request from the client
```

This is a **project skill** (official Claude Code location: `.claude/skills/<name>/SKILL.md`). There is
no install step: Claude Code finds it automatically whenever you open this repository.

## Using it in this repository

1. Open the repository folder in Claude Code.
2. Type `/` and you'll see `gym-website-design` in the list (or run `/skills`).
3. Either call it directly:
   `/gym-website-design adapt the starter for "Iron Box Braga", a boxing gym. Details: ...`
   or just ask normally ("make a website for this gym…"). Claude loads the skill automatically
   because its description matches.

## Using it in ALL your projects

Copy the folder to your personal skills folder:

- macOS / Linux: `~/.claude/skills/gym-website-design/`
- Windows: `C:\Users\<you>\.claude\skills\gym-website-design\`

If Claude Code is already running and the `skills` folder didn't exist before, run `/reload-skills`.

## Using it on claude.ai (optional)

Zip the `gym-website-design` folder and upload it in claude.ai's skills settings (check
support.claude.com for the current location). The frontmatter only uses `name` and `description`,
which claude.ai accepts.

## Tips for good results

- Give Claude the client's real details (or paste the client-intake answers).
- Name the direction if you already know it ("use the premium direction").
- Ask Claude to finish with the skill's final report: what works, what needs configuration, what the
  client must supply.
