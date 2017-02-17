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
bdir="$basedir/.."
cd "$bdir" || die 1 "couldn't switch to expected basedir: $bdir"

# confirm that the app is up and running before going forward
icount=$(docker-compose ps | grep Up | grep -e _db_ -e _web1_ | wc -l)
((icount == 2)) || die 2 "looks like the app isn't currently running"

# generate the secret key and store it in admin/config/secret
echo -n "generating a new secret key..."
scripts/generate_secret_key.sh
echo done

# log into mongodb instance and drop the contents of the users table (if present)
echo -n "dropping any existing users collection..."
docker-compose exec db /script/drop_users_collection.sh
echo done

# log into an admin instance and create a new user entry with the given credentials
echo -n "creating a new user named $1 ..."
docker-compose exec web1 /src/app/src/init_admin_user.sh "$1" "$2"
echo done

echo -n "forcing a reload of the backend (development only)..."
touch node/server.js
echo done

