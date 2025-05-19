# Automatapedia: Commit Message Guidelines

This document outlines the best practices for writing commit messages for the Automatapedia project. Following these guidelines will help maintain a clear and organized version history, making it easier to understand changes and collaborate effectively.

## General Principles

- **Clarity:** Write messages that are easy to understand, even for someone unfamiliar with the specific changes.
- **Conciseness:** Keep messages brief and to the point.
- **Consistency:** Follow the format and conventions described below.

## Commit Message Format

We will follow a convention similar to [Conventional Commits](https://www.conventionalcommits.org/). Each commit message consists of a **header**, an optional **body**, and an optional **footer**.

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### 1. Header

The header is mandatory and should be a single line summarizing the change.

- **`<type>`:** Describes the kind of change. Allowed types are:

  - `feat`: A new feature or enhancement (e.g., adding a new sequence generator, improving visualization).
  - `fix`: A bug fix (e.g., correcting a calculation error, fixing a UI glitch).
  - `docs`: Documentation changes only (e.g., updating README, adding comments, updating this guide).
  - `style`: Changes that do not affect the meaning of the code (e.g., white-space, formatting, missing semi-colons, CSS styling).
  - `refactor`: A code change that neither fixes a bug nor adds a feature (e.g., restructuring code, improving performance without changing functionality).
  - `test`: Adding missing tests or correcting existing tests.
  - `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation (e.g., updating dependencies, configuring build tools).
  - `ui`: Changes related to the user interface and user experience, not covered by `feat` or `fix` (e.g., theme adjustments, layout changes).
  - `content`: Changes to the informational content of the application (e.g., updating sequence descriptions, mathematical formulas).

- **`(<scope>)`:** Optional. Specifies the part of the project affected by the change. Examples:

  - `collatz`, `euclidean`, `fibonacci`, `pascal` (for specific sequences)
  - `visualization`, `input`, `info-display` (for core features)
  - `styling`, `routing`, `state` (for technical aspects)
  - `build`, `deps` (for chores)
  - If the change is global or hard to pinpoint, the scope can be omitted.

- **`<subject>`:** A concise description of the change.
  - Use the imperative mood (e.g., "add Collatz sequence" not "added Collatz sequence" or "adds Collatz sequence").
  - Do not capitalize the first letter.
  - Do not end with a period.
  - Keep it under 50 characters if possible.

### 2. Body (Optional)

The body provides additional context or details about the commit.

- Use it to explain _what_ and _why_ vs. _how_.
- Separate the subject from the body with a blank line.
- Wrap lines at 72 characters.

### 3. Footer (Optional)

The footer is used for referencing issue tracker IDs or indicating breaking changes.

- **Breaking Changes:** Start with `BREAKING CHANGE:` followed by a description of the change, justification, and migration notes.
- **Issue Tracking:** If the commit relates to an issue, reference it here (e.g., `Closes #123`, `Fixes #456`).

## Examples

**Simple fix:**

```
fix(collatz): correct off-by-one error in sequence generation
```

**New feature with scope and body:**

```
feat(visualization): add interactive highlighting for Pascal's triangle rows

Users can now click on a row number to highlight the entire row,
making it easier to study specific patterns within the triangle.
```

**Refactor with breaking change:**

```
refactor(state): overhaul sequence parameter handling

BREAKING CHANGE: The way sequence parameters are passed to components
has been changed. Components consuming sequence data will need to be
updated to use the new `params` prop instead of individual props.
This change simplifies the data flow and improves maintainability.
```

**Documentation update:**

```
docs: update ai_guidelines with new animation details
```

**Chore:**

```
chore(deps): update react-router to latest version
```

## Guidelines for Good Commit Messages

- **One Logical Change Per Commit:** Keep commits focused on a single, atomic change. If you've made multiple unrelated changes, split them into separate commits.
- **Explain the "Why":** While the code shows _what_ changed, the commit message should explain _why_ the change was made. This is especially important for non-obvious changes.
- **Write for Your Future Self (and Others):** A clear commit history is invaluable for debugging, understanding past decisions, and onboarding new team members.
- **Check Before Committing:** Review your changes and your commit message before finalizing the commit.

By adhering to these guidelines, we can build a more maintainable and understandable codebase for Automatapedia.
