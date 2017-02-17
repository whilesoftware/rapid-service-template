#!/bin/bash

function die() {
  ecode=$1
  shift
  if [ "$1" != "" ]; then
    echo "$@" 1>&2
  fi

  exit $ecode
}

# move to the appropriate basedir
bash_source="${BASH_SOURCE[0]}"
basedir=$(dirname "$bash_source")
cd "$basedir" || die 1 "couldn't switch to expected basedir: $basedir"

node console_admin.js "$1" "$2"

