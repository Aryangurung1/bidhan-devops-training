Design an Nginx load balancer with weighted distribution among backend servers (Use same application as created in previous assignments)

Serve the frontend(static build) from /

Serve both the backends through any other directory, Run two instances A & B of each backend server & route it through nginx through two specific location or routes. Assign specific weight to each instance of the server within the backend Server A has a weight of 2 Server B has a weight of 1 e.g: Route /api should have two running backends of the same application & another Route /admin should have two running backends of the same application. Each of these should be load balanced. Implement health checks to ensure that only healthy backend servers receive traffic

Simulate a server failure and verify load balance Configure Nginx to handle both HTTP and HTTPS traffic (http redirected to https)