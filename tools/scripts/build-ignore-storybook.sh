#!/bin/bash
LIB=storybook

ACCEPTED=('***.stories.*' 'libs/storybook/**/**')
IGNORED=(':!libs/storybook/TODO' ':!libs/storybook/README*')

git diff HEAD~1 HEAD --quiet -- ${ACCEPTED[@]} ${IGNORED[@]}

# Store result of the previous command (grep)
IS_AFFECTED=$?


if [ $IS_AFFECTED -eq 0 ]; then
  echo "🛑 $LIB - No file changes detected, build cancelled"
  exit 0
elif [ $IS_AFFECTED -eq 1 ]; then
  echo "✅ $LIB - File changes detected, build can proceed"
  exit 1
fi
