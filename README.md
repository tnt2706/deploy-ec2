# Deploy EC2 using Runner on Github and configure NGINX

## How to use

```bash
git clone  https://github.com/tnt2706/deploy-ec2.git
cd deploy-ec2
npm i

# Service run PORT 3000
npm run dev
```

## How to config Git action using `Runner`

### 1. Config runner

  ![image](./images/config-runner.png)

### 2. Install, start svc.sh and install node, pm2 in server ec2

 - **Run runner github with status `ide` in runner github**
  <br>

  ![image](./images/svc.png)

  ```sh
  sudo ./svc.sh install
  # When reboot only cmd below
  sudo ./svc.sh start
  ```

  - **Install**
    <br>

    > <b>Link install nodejs </b>
    > https://github.com/nodesource/distributions

    ```bash
    sudo apt-get install nodejs -y
    sudo npm install pm2@latest -g
    ```

    ```bash
    # Run server in folder below with folder `actions-runner`
    cd _work/{{folder_name_project}}/{{folder_name_project}}

    # With example
    cd _work/deploy-ec2/deploy-ec2
    ```

### 3. Create file yaml to on event to git local

  ```js
  // Create name to server in ec2
  pm2 start server.js --name=shopdev-backend

  // Add new line im folder .github/workflows/node.js.yaml
  pm2 restart shopdev-backend

  // Modify file .yaml
   runs-on: self-hosted

   // Open port 3000 in ec2

  ```

  <br>

## Configuration NGINX

> All run cmd in direct : `/etc/nginx/sites-available`

```bash
cd /etc/nginx/sites-available
```

### 1. Install NGINX sing Reverse Proxy

```bash
# In `actions-runner`
sudo apt-get install -y nginx
run ip, not wokring then htto open secirity
cd /etc/nginx/sites-available

sudo vim default

location /api {
  rewrite ^\/api\/(.*)$ /api /$1 break;
  proxy_pass http://localhost:3000;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

sudo systemctl restart nginx
```

### 2. Add domain to nginx configuration

```bash
server_name shopdev.tinhtran.com www.shopdev.tinhtran.com
location /api {
  rewrite ^\/api\/(.*)$ /api /$1 break;
  proxy_pass http://localhost:3000;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

```

### 3. Add SSL to domain

```bash
  sudo add-apt-repository ppa:certbot/certbot
  sudo apt-get update
  sudo apt-get install python3-certbot-nginx
  # Example : sudo certbot --nginx -d shopdev.anonystick.com
  sudo certbot --nginx -d {{DOMAIN_NAME}}
```

### 4. Auto register extend validity Period

```bash
sudo certbot renew --dry-run

# Check status certbot time
sudo systemctl status certbot.time
```