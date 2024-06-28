#!/bin/bash

VERSION=""

# get parameters
while getopts v: flag
do
  case "${flag}" in
    v) VERSION=${OPTARG};;
  esac
done

# get highest tag number with the v prefix, and default to v1.0.0 if none found
git fetch --prune --unshallow 2>/dev/null
CURRENT_VERSION=`git describe --abbrev=0 --tags --match "v*" 2>/dev/null | grep -v "^prod-v"`

if [[ $CURRENT_VERSION == '' ]]
then
  CURRENT_VERSION='v1.0.0'
fi
echo "Current Version: $CURRENT_VERSION"

# split version into parts
CURRENT_VERSION_PARTS=(${CURRENT_VERSION//./ })
VNUM1=${CURRENT_VERSION_PARTS[0]#v}
VNUM2=${CURRENT_VERSION_PARTS[1]}
VNUM3=${CURRENT_VERSION_PARTS[2]}

# increment version based on type
case $VERSION in
  'major')
    VNUM1=$((VNUM1+1))
    VNUM2=0
    VNUM3=0
    ;;
  'minor')
    VNUM2=$((VNUM2+1))
    VNUM3=0
    ;;
  'patch')
    VNUM3=$((VNUM3+1))
    ;;
  *)
    echo "No version type (https://semver.org/) or incorrect type specified, try: -v [major, minor, patch]"
    exit 1
    ;;
esac

# assemble new tag
NEW_TAG="v$VNUM1.$VNUM2.$VNUM3"
echo "($VERSION) updating $CURRENT_VERSION to $NEW_TAG"

GIT_COMMIT=`git rev-parse HEAD`
NEEDS_TAG=`git describe --contains $GIT_COMMIT 2>/dev/null`

if [ -z "$NEEDS_TAG" ]; then
  git tag $NEW_TAG
  git push --tags
  git push
else
  echo "Already a tag on this commit"
fi

echo ::set-output name=git-tag::$NEW_TAG

exit 0