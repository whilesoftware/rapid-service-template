# rapid-service-template
A docker-compose + MEAN template for rapid service development

## live demo
https://while.software/template  

## install
1. git clone
2. ln -s compose/development.yml docker-compose.yml
3. scripts/generate_secret_key.sh
4. docker-compose up -d
5. scripts/init_admin.sh "your_desired_username" "secret_password"
6. add proxy_pass config to system-wide nginx (see below)
7. update angular frontend's definition of your API base route (see node/static/js/main.js line 3)


## system nginx config to route to your app
```
  location /template {
    return 302 /template/;
  }

  location /template/ {
    proxy_pass http://localhost:3333/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Host $server_name;
    proxy_cache_bypass $http_upgrade;
  }
```
