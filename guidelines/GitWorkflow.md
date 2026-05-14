# Git Workflow

## Branch Policy

- `develop` is the default integration branch.
- Do not commit directly to `develop`.
- All work must start from a new branch based on the latest `develop`.
- Changes are merged into `develop` through pull requests.

## Branch Naming

Use a short type prefix followed by a slash and a clear kebab-case name.

```text
feat/branch-name
refactor/branch-name
fix/branch-name
chore/branch-name
docs/branch-name
```

Examples:

```text
feat/auth-email-verification
refactor/app-viewport
fix/splash-full-height
docs/git-workflow
```

## Pull Request Flow

1. Update local `develop`.
2. Create a new branch from `develop`.
3. Commit changes on that branch.
4. Push the branch to GitHub.
5. Open a pull request into `develop`.
6. Merge only after review or visual confirmation.

## Commit Guidelines

- Keep commits scoped to one logical change.
- Use concise messages that describe the outcome.
- Prefer prefixes when helpful:

```text
feat: add email verification screen
fix: make splash fill viewport
refactor: extract app viewport shell
docs: add git workflow
chore: update deployment workflow
```
