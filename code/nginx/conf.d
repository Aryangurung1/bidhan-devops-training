upstream backend1 {
    server backend1-a:3000 weight=2 max_fails=3 fail_timeout=30s;
    server backend1-b:3001 weight=1 max_fails=3 fail_timeout=30s;
}

upstream backend2 {
    server backend2-a:3002 weight=2 max_fails=3 fail_timeout=30s;
    server backend2-b:3003 weight=1 max_fails=3 fail_timeout=30s;
}

upstream frontend {
    server frontend:80;
}

# Redirect HTTP traffic to HTTPS.
server {
    listen 80;
    server_name _;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name _;

    ssl_certificate /etc/nginx/certs/server.crt;
    ssl_certificate_key /etc/nginx/certs/server.key;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_next_upstream error timeout http_502 http_503 http_504;

    # User API goes to backend 1.
    location /api/users {
        proxy_pass http://backend1;
    }

    # Blog and comment APIs go to backend 2.
    location /api/ {
        proxy_pass http://backend2;
    }

    location /comments {
        proxy_pass http://backend2;
    }

    # Everything else goes to the frontend.
    location / {
        proxy_pass http://frontend;
    }
}
