server {
    listen 80 default_server;

    root /path/to/code/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
