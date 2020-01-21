#!/usr/bin/env bash

# Determine script directory and make sure we're in it.
#script_directory="$(realpath ${0%/*})/"
script_directory="$(dirname "$0"})/"

"${script_directory}install.sh"

# Make the `nvm` command available to use.
. ~/.nvm/nvm.sh

#nvm exec 10 gulp $@
nvm run ${nodejs_version} ./node_modules/eslint/bin/eslint.js --quiet *.js asset/**/*.js $@
