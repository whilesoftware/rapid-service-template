# rapid-service-template
A docker-compose + MEAN template for rapid service development

## install
1. git clone
2. ln -s compose/development.yml docker-compose.yml
3. scripts/generate_secret_key.sh
4. docker-compose up -d
5. scripts/init_admin.sh "your_desired_username" "secret_password"
