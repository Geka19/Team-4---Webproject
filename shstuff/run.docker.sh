set -e

DEFAULT_WD="/home/team4/projectfolder"
COMPOSE_FILE="compose.yaml"

wd="${WD:-$DEFAULT_WD}"

cd "$wd"

docker compose -f "${wd}/${COMPOSE_FILE}" down
docker compose -f "${wd}/${COMPOSE_FILE}" up -d

set +e