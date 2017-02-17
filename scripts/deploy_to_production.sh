#!/bin/bash

NORMAL="\033[0m"
GOOD="\e[32;01m"
WARN="\e[33;01m"
BAD="\e[31;01m"
BOLD="\033[1m"

function echo_bold() {
  echo -e "${BOLD}${@}${NORMAL}"
}
function echo_good() {
  echo -e "${GOOD}${@}${NORMAL}"
}
function echo_bad() {
  echo -e "${BAD}${@}${NORMAL}"
}
function echo_warn() {
  echo -e "${WARN}${@}${NORMAL}"
}

function die() {
  echo_bad $@
  exit 1
}

# move to basedir
bash_source="${BASH_SOURCE[0]}"
basedir="$(dirname "$bash_source")/.."

# ensure that docker is down
c_count=$(docker-compose ps | wc -l)

if (( c_count > 2 )); then
  die "echo this script expects the docker-compose session to be idle when it is run. exiting now"
fi

function find_and_remove_deployment() {
  deployname=$1
  deploydir="$basedir/production/$deployname"
  if [ -d "$deploydir" ]; then
    echo_bold "found a deployment for $deployname"
    rm -rf "$deploydir" || die "failed to remove $deployname"
  fi
  echo_good "deployment removed: $deployname"
}

function deploy_to() {
  deployname=$1
  deploydir="$basedir/production/$deployname"
  sourcedir="$basedir/node"

  echo_bold "deploying to: $deployname"
  cp -a "$sourcedir" "$deploydir" || die "failed to deploy to $deployname"
  echo_good "deployment complete: $deployname"
}

find_and_remove_deployment web1
find_and_remove_deployment web2

deploy_to web1
deploy_to web2

echo_good "all done"
