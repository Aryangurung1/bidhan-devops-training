server {
    listen 80 default_server;

    location / {
        proxy_pass http://bidhan.com:5173;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
