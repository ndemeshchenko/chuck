# chuck
slack bot with custom redmine integration

example of docker-compose.yml

chuck:
#  image: chuck_bot
  build: .
  external_links:
    - redmine_redmine_1:redmine
  environment:
    - FOO=bar
    - REDMINE_PROTOCOL=http
    - REDMINE_ACCESS_TOKEN=
    - REDMINE_HOST=
    - REDMINE_PORT=80
    - REDMINE_PUBLIC_HOST=
    - REDMINE_PUBLIC_PORT=
    - SLACK_ACCESS_TOKEN=

