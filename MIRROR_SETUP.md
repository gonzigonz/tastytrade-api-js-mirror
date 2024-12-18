# Mirror Setup Instructions

This document provides instructions for setting up remotes, syncing with upstream, and managing branches for this repository fork.

---

## Setup Remotes

To configure this repository with the correct remotes for syncing:

1. Run the provided setup script:
   ```bash
   ./setup_remotes.sh
   ```

2. Verify the remote configuration:
   ```bash
   git remote -v
   ```

   Expected output:
   ```
   origin    https://github.com/gonzigonz/tastytrade-api-js-mirror.git (fetch)
   origin    https://github.com/gonzigonz/tastytrade-api-js-mirror.git (push)
   upstream  https://github.com/tastytrade/tastytrade-api-js.git (fetch)
   upstream  https://github.com/tastytrade/tastytrade-api-js.git (push)
   ```

---

## Syncing with Upstream

To keep your `gonz/master` branch up-to-date with the upstream `master` branch:

1. **Fetch the Latest Updates**:
   ```bash
   git fetch upstream
   ```

2. **Merge or Rebase Upstream Changes**:
   - To merge:
     ```bash
     git checkout gonz/master
     git merge upstream/master
     ```
   - To rebase:
     ```bash
     git checkout gonz/master
     git rebase upstream/master
     ```

3. **Push Updates to Your Mirror**:
   ```bash
   git push origin gonz/master
   ```

---

## Feature Branch Workflow

For any new changes or features, create a new branch under the `gonz/*` namespace:

1. **Create and Switch to a New Branch**:
   ```bash
   git checkout -b gonz/feature-<name>
   ```

2. **Push Your Branch to the Mirror**:
   ```bash
   git push origin gonz/feature-<name>
   ```

3. **Keep Your Branch Updated**:
   Periodically sync your feature branch with upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/master
   git push origin gonz/feature-<name>
   ```

---

## Notes

- Use `gonz/master` as the main working branch for this mirror.
- Regularly fetch and merge/rebase updates from the upstream repository.
- Push all changes to the `origin` mirror repository.
