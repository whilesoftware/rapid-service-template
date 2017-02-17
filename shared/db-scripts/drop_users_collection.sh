#!/bin/bash

dbname=rapid

has_collection=$(echo -e "use ${dbname}\nshow collections" | mongo | grep -A 9999 "switched to db ${dbname}" | grep users | wc -l)

if [ "$has_collection" == "1" ]; then
    echo -e "use ${dbname}\ndb.users.drop()\n" | mongo >/dev/null 2>&1
fi

