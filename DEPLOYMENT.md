Deploys are done with heroku automatically when new code is pushed to main in https://github.com/ckleint/Reversi/tree/main. 

To create a new deployment, a couple manual steps are needed:
- Create the heroku app (`heroku create`)
- Add heroku postgres plugin to the heroku app (ui)
- Set `IS_DEPLOYED` environment variable to true for Heroku

Steps:
- install deps for both ui and backend packages
- build ui package
- copy build artifacts (static js/html) into server directory in dist/ folder
- start the server, and allow it to serve static assets and apis