#!/bin/bash
#
# This script deploys the application to your Heroku instance.
#
# You can pass 1 parameter to the script in order to be able to deploy
# the application to multiple environments.
#
# ex.
# ./scripts/deploy.sh staging
#
# Possible environments are:
#  - development
#  - production
#
# Now let's deploy like a baws. ðŸ¤“
#

# exit 1 on errors
set -e

# Set the following variables for deployment:
#  - heroku project
#  - deployment branch
deploy_environment=$1
if [[ "$deploy_environment" == "development" ]]
then
  echo "Deploying to development"
  heroku_project='icapps-_OLLIE_NAME_KEBAB_CASE_-dev'
  deployment_branch='origin/develop'
elif [ "$deploy_environment" == "staging" ]
then
  echo "Deploying to staging"
  heroku_project='icapps-_OLLIE_NAME_KEBAB_CASE_-staging'
  deployment_branch='origin/staging'
elif [ "$deploy_environment" == "production" ]
then
  echo "Deploying to production"
  heroku_project='icapps-_OLLIE_NAME_KEBAB_CASE_'
  deployment_branch='origin/master'
else
  exit "You passed the incorrect environment argument. One of theses (staging or production) should be given."
fi

# Log the shell command in the console and run it afterwards.
function run {
  echo $1
  $1
}

# Setup it the git remote exists. If not create the remote for the
# correct environment.
echo "Checking if remote exists..."
if ! git ls-remote $deploy_environment; then
  echo "Adding $deploy_environment..."
  run "git remote add $deploy_environment git@heroku.com:$heroku_project.git"
fi

# Keep track of the previous Heroku build number.
previous_heroku_build_version=`/usr/local/bin/heroku releases | sed -n 2p | awk '{print $1}'`

# push only origin/master to heroku/master - will do nothing if
# master doesn't change. We perform a force push so that our Bitbucket
# branch always matches the Heroku master branch.
echo "Updating $deploy_environment master branch..."
run "git push $deploy_environment $deployment_branch:master --force"

# Fetch the new build version number.
heroku_build_version=`/usr/local/bin/heroku releases | sed -n 2p | awk '{print $1}'`

# Only tag the current commit when the build version is different from the previous one.
if [[ "$previous_heroku_build_version" != $heroku_build_version ]]
then
  # Tag the current commit with the Heroku deploy version.
  echo "Tagging the current commit..."
  run "git tag -a $deploy_environment/$heroku_build_version -m Build"
  run "git push -f origin $deploy_environment/$heroku_build_version"
fi
