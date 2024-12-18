#!/bin/bash

# Set up remotes for mirror logic
echo "Configuring remotes..."

# Add the mirror repository as 'origin'
git remote remove origin 2>/dev/null
git remote add origin https://github.com/gonzigonz/tastytrade-api-js-mirror.git
echo "Configured 'origin' to mirror repository."

# Add the original repository as 'upstream'
git remote remove upstream 2>/dev/null
git remote add upstream https://github.com/tastytrade/tastytrade-api-js.git
echo "Configured 'upstream' to original repository."

echo "Remote setup complete. Run 'git remote -v' to verify."
