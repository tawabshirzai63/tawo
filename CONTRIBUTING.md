# Contributing Guidelines

Thank you for contributing to this project! To maintain a high level of code quality, clear history, and seamless collaboration, we adhere to the following standards and processes.

---

## 1. Branch Naming Conventions

All branches must be created from the latest `main` branch. Use descriptive names prefixed with the type of work being performed:

- **`feature/`** or **`feat/`**: For new features (e.g., `feature/customer-portal-ui`, `feat/auth-integration`).
- **`bugfix/`** or **`fix/`**: For bug fixes (e.g., `fix/calendar-sync-tz`, `bugfix/input-validation`).
- **`chore/`**: For routine maintenance, config changes, or dependency updates (e.g., `chore/typescript-setup`, `chore/define-standards`).
- **`docs/`**: For documentation-only changes (e.g., `docs/api-endpoints`).
- **`test/`**: For adding or updating tests only (e.g., `test/receptionist-unit-tests`).
- **`refactor/`**: For code changes that neither fix a bug nor add a feature, but improve code structure (e.g., `refactor/express-routing`).

*Format:* `<type>/<brief-description-or-task-id>` (e.g., `feat/db7b30ca-define-standards`).

---

## 2. Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This keeps our commit logs readable, structured, and easy to parse.

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- **`feat`**: A new feature for the user or system.
- **`fix`**: A bug fix.
- **`chore`**: Maintenance, config, builds, auxiliary tools, or library upgrades.
- **`docs`**: Documentation changes.
- **`style`**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).
- **`refactor`**: A code change that neither fixes a bug nor adds a feature.
- **`perf`**: A code change that improves performance.
- **`test`**: Adding missing tests or correcting existing tests.

### Examples
- `feat(ui): add booking form to receptionist engine`
- `fix(backend): resolve calendar sync timezone offset`
- `chore(deps): upgrade express to version 5.2.1`

---

## 3. Pull Request Process

We practice strict code review to ensure that our value proposition of "clean architecture and code review" is consistently met.

### Lifecycle of a Pull Request
1. **Sync with Main:** Before starting or completing your work, make sure your branch is rebased or merged with the latest changes from `main`.
   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git merge main
   ```
2. **Push Branch:** Push your branch to the remote repository.
   ```bash
   git push origin your-branch
   ```
3. **Open Pull Request:** Open a PR on GitHub targeting the `main` branch.
4. **Use Template:** The pull request description is automatically populated by our `PULL_REQUEST_TEMPLATE.md`. You **must** fill out all sections:
   - **Description:** Summary of changes and why they were made.
   - **Type of Change:** Select the change type (Feature, Fix, Chore, etc.).
   - **Verification:** Detail how changes were verified (unit tests, integration tests, manual testing).
   - **Screenshots/Logs:** Provide visual evidence (for UI changes) or console/server log snippets (for backend/QA changes).
   - **Checklist:** Check off tests, linting, and documentation items.
5. **Code Owners & Reviews:** GitHub will automatically notify the appropriate reviewers based on the `.github/CODEOWNERS` rules.
6. **Address Feedback:** Resolve all review comments. Push additional commits to your branch if changes are requested.
7. **Merge:** Once all required checks pass, test coverage is verified, and the Technical Lead approves, the PR will be merged using **Squash and Merge** to maintain a clean git history.
