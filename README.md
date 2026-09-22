# KEPLER

**Knowledge Ecosystem Promoting Literacy and Economic Resurgence**

> An AI-driven learning-to-opportunity ecosystem that connects **Education → Skills → Projects → Opportunities**.

KEPLER is designed to address a common learning problem: learners have access to large amounts of educational content, but may still struggle to identify **what they need right now, how to apply it, and where the resulting capability can create value**.

## 🌐 Live Prototype

**Deployed frontend:** https://project-kepler.vercel.app/

**Open-source repository:** https://github.com/coolbatsy/Project-Kepler

The current release is a **frontend prototype**. The planned next stage adds a Python/Flask backend, Google Gemini API integration, and MySQL database support.

---

## 1. The Problem

KEPLER focuses on four connected gaps:

- **Information Overload:** large libraries of tutorials, courses, and documentation make it difficult to identify what is immediately relevant.
- **Long Learning Paths:** a learner may need one specific concept while a conventional curriculum contains much more surrounding material.
- **Theory → Application Gap:** completing a course does not necessarily answer *“What should I build with this skill?”*
- **Skill → Opportunity Gap:** learners may not know how to translate a skill into projects, open-source work, freelance tasks, or other real-world opportunities.

**KEPLER is designed as a navigation and application layer around learning.**

---

## 2. How KEPLER Solves It

The proposed learning-to-opportunity pipeline is:

```text
Learner Goal
    ↓
Skill / Capability Analysis
    ↓
Micro-Skill Decomposition
    ↓
Focused Learning Resources
    ↓
Practical Project
    ↓
Real-World Application
    ↓
Potential Opportunity
```

Instead of asking only **“What should I learn?”**, KEPLER asks:

> **“What do I need to learn right now, how can I apply it, and where can it create value?”**

---

## 3. Why KEPLER Alongside Existing Course Platforms?

Platforms such as [Coursera](https://www.coursera.org/), [Udemy](https://www.udemy.com/), [LinkedIn Learning](https://www.linkedin.com/learning/), and [Pluralsight](https://www.pluralsight.com/) provide extensive, structured learning. KEPLER targets a different problem: **goal-specific navigation through that knowledge and movement toward practical application**.

For example:

- [Coursera — Introduction to Git and GitHub](https://www.coursera.org/learn/introduction-git-github) is a structured 4-module course covering Git, GitHub, version control, branching, remotes, and collaboration.
- [Udemy — Git Complete](https://www.udemy.com/course/git-complete/) provides a broader Git curriculum covering the workflow, GitHub, branching, and merge conflicts.
- [Pluralsight — Git Fundamentals](https://www.pluralsight.com/courses/fundamentals-git) teaches Git fundamentals, local/remote workflows, and collaboration.

These resources remain useful; **KEPLER is intended to help learners identify the subset of knowledge most relevant to their immediate objective.**

---

## 4. Example: Learning Git Through KEPLER

### 🎯 Goal

> **“I want to make my first open-source contribution.”**

A comprehensive Git/GitHub course may cover many concepts, including repositories, commits, branches, merging, remotes, collaboration, pull requests, and conflict handling.

KEPLER would instead decompose the goal into the immediate capabilities required:

```text
Goal: First Open-Source Contribution
                    ↓
             Required Skills
                    ↓
      Clone → Branch → Commit
                    ↓
       Push → Pull Request
                    ↓
       Basic Conflict Handling
                    ↓
          Focused Resources
                    ↓
          Practical Contribution
                    ↓
   Open Source / Portfolio / Work
```

For example, a learner could be guided to:

1. Fork or clone a small repository.
2. Create a feature branch.
3. Make a documentation or UI improvement.
4. Commit and push the change.
5. Open a pull request.

The idea is **not to replace the full course**. It is to help the learner determine **what to learn now in order to accomplish the stated goal**.

---

## 5. KEPLER Method

**01 — DISCOVER** — Understand the learner's goal.

**02 — DECOMPOSE** — Break the goal into required micro-skills.

**03 — CURATE** — Find focused, relevant resources.

**04 — APPLY** — Turn knowledge into a practical project.

**05 — LOCALIZE** — Identify real-world or community applications.

**06 — OPPORTUNITY** — Connect capability with potential economic or social value.

---

## 6. AI Integration

The planned AI layer uses the **Google Gemini API** as a learning navigator.

It is intended to assist with:

- Goal and intent understanding
- Skill / capability decomposition
- Personalized learning pathways
- Context-aware resource recommendations
- Practical project suggestions
- Skill-to-opportunity mapping
- Simple visual explanations of learning pathways

### Proposed flow

```text
User Goal / Skill / Interest
            ↓
      Python + Flask API
            ↓
         Gemini API
            ↓
      Goal Understanding
            ↓
     Micro-Skill Mapping
            ↓
   Focused Learning Resources
            ↓
       Project Suggestions
            ↓
      Opportunity Pathway
```

The current **AI Skill-to-Gig Mapper** is part of the frontend prototype; the dynamic Gemini-powered backend is planned.

---

## 7. Technology Stack

### Current Prototype

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Deployment:** Vercel

### Planned Backend & AI

- **Backend:** Python + Flask
- **AI:** Google Gemini API
- **Database:** MySQL

### Future Extensions

- User authentication and profiles
- Learning-progress tracking
- Personalized recommendations
- Caching layer
- Analytics and persistent skill/project/opportunity data

---

## 8. SDG Alignment

KEPLER's framework is aligned with five Sustainable Development Goals:

| SDG | KEPLER Implementation |
|---|---|
| **SDG 4 — Quality Education** | AI-curated micro-learning and focused resources |
| **SDG 8 — Decent Work & Economic Growth** | Skill → Project → Opportunity pathways |
| **SDG 9 — Industry, Innovation & Infrastructure** | Accessible digital skill development |
| **SDG 10 — Reduced Inequalities** | Open resources and reduced access barriers |
| **SDG 16 — Peace, Justice & Strong Institutions** | Digital literacy and community-oriented capability |

The objective is to connect each SDG with an identifiable part of the platform rather than using SDG labels only as decoration.

---

## 9. Open Source

KEPLER is developed as a **public, open-source project** so others can inspect the implementation, learn from the code, experiment with the prototype, contribute improvements, and build new use cases on top of it.

The repository is intended to function as both a project submission and a **public learning resource for students and developers**.

---

## 10. Project Status

**Current:** Frontend prototype deployed on Vercel and publicly available on GitHub.

**Next:** Python/Flask backend + Gemini integration + MySQL database.

**Future:** Persistent user profiles, progress tracking, caching, advanced personalization, analytics, and broader opportunity integrations.

---

## 11. Vision

> **Learn → Build → Create Value**

KEPLER aims to move learners from consuming information toward developing capabilities they can apply in real-world contexts.

**KEPLER — Turning human potential into local opportunity.**

---

## References

- [Coursera — Introduction to Git and GitHub](https://www.coursera.org/learn/introduction-git-github)
- [Udemy — Git Complete](https://www.udemy.com/course/git-complete/)
- [LinkedIn Learning — Complete Guide to Git](https://www.linkedin.com/learning/complete-guide-to-git)
- [Pluralsight — Git Fundamentals](https://www.pluralsight.com/courses/fundamentals-git)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Documentation](https://docs.github.com/)
