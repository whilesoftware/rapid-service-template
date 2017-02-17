#!/bin/bash

# move to the appropriate basedir
bash_source="${BASH_SOURCE[0]}"
basedir=$(dirname "$bash_source")
bdir="$basedir/.."
cd "$bdir" || die 1 "couldn't switch to expected basedir: $bdir"

os_type=$(uname -s)
case "${os_type}" in
  Linux)
    uuidgen -r > node/config/secret
    ;;
  Darwin)
    uuidgen > node/config/secret
    ;;
esac

