# University of Colorado Advancement Unit Theme platform for unit site

This repository contains all configuration and code customization of the CU Advancement theme platform.

## Master Branch and Commits

The master primary branch is implied to contain the current state of configuration of the CU Advancement theme platform production environment. This branch is protected and no commits should ever be made to this branch. Changes to the master branch should be developed in a stand-alone branch (with associated issue) and merged into the Master branch after going through code review.

## Issues Branches and Naming Convention
Code and/or configuration intended to be merged into the Master branch should be developed in a separate branch with an associated feature: /feature/issue.

# Composer-enabled Drupal template
The theme is manage via composer inside the Drupal composer.json file.

"repositories": [
{
"type": "composer",
    "type": "vcs",
    "url": "https://github.com/CUCentralAdvancement/cua-theme"
    }
],

"require": {
"cu/cua_theme": "^1.0",
}

# Theme issues are assigned and handle via the Github Issue Q.