# How to set up from scratch

1. Copy contents of mirror-secrets.sh from iCloud to ~ with the same name
1. `chmod +x ~/mirror-secrets.sh`
1. Clone this repo
1. `cd MagicMirror`
1. `npm i`
1. `cd scripts`
1. `./pullModules.sh`
1. `~/mirror-secrets.sh`
1. `cp mm.sh ~`
1. `pm2 start pm2.json`
