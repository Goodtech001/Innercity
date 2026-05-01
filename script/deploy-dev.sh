#!/bin/bash


# SERVER_IP="${SERVER_IP:-161.35.237.229}"
SERVER_IP="${SERVER_IP:-165.232.138.221}"
SSH_USER="${SSH_USER:-forge}"
  APP_DIRECTORY="${APP_DIRECTORY:-/src/app/servers}"


  
function run_application(){
    echo "Starting application"
    ssh -t "${SSH_USER}@${SERVER_IP}" bash -c "'
        cd ${APP_DIRECTORY}
        docker compose up -d --force-recreate --remove-orphans
    '"
}


while [[ $# > 0 ]]
do
case "${1}" in
  -r|--run-app)
  run_application
  shift
  ;;
  -h|--help)
  help_menu
  shift
  ;;
#   -h|--help)
#   help_menu
#   shift
#   ;;
  *)
  echo "${1} is not a valid flag, try running: ${0} --help"
  ;;
esac
shift
done
