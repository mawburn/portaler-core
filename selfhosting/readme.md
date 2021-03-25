# Selfhosting Portaler


*Disclaimer: i am a hardware/operations engineer with limited linux experience. I am neither the developer of Portaler nor a developer at all.
Most likely there are better ways to selfhost Portaler but this is what i use. I am not responsible for any damage you do to your system while following this guide.
Oh and English is not my native language, yada yada, you know the drill.*

I tried my best to make this guide as noob-friendly as possible so that should work even for people with basically no Linux experience.
In case you'll encounter an error during installation you can usually google it and find a fix without any problems. Asking on the discord server works too.

## Requirements: 

**If you want to use Portaler locally on your PC**: Any kind of Linux VM on your network where you have root privileges and can access the terminal. The simplest solution is using something like VirtualBox (google how to do that, it is easy)

**If you want to use Portaler publicly (host)**: Same as using it locally but you will also need a public routable (preferably static) ip-address and a domain name you own. You can (and probably should) also use a VPS instead of a VM on your PC for that.


I am using **Debian** as my OS. If you use some other Linux distro you will need to google how to install all the packages by yourself, but otherwise that should not be a problem.

## Steps for both local and public versions:

Register at github.com and get a github access token. You can learn how to get it here: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
You don't need to select any permissions for you token.

When that is done, connect to your server using ssh or, if you can access the gui, launch the terminal.

Root yourself by using `su` (or `sudo -i` if you have sudo installed)

Let's begin by installing some of the necessary packages you will need.

Install git and curl:
```Shell
apt-get update
apt-get install -y git 
apt-get install -y curl 
```
Install nodejs/npm and yarn:
```Shell
curl -sL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs
npm install --global yarn
```
Install docker and docker-compose:
```Shell
apt-get install -y apt-transport-https ca-certificates gnupg lsb-release
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io
curl -L "https://github.com/docker/compose/releases/download/1.28.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```
Now that you have everything you need installed, let's set everything up:

Pick a folder. For this guide i will be using `/usr/local/etc`
```Shell
mkdir /usr/local/etc/docker-portaler
cd /usr/local/etc/docker-portaler
```
Clone the whole portaler repository:
```Shell
git clone https://github.com/Portaler-Zone/portaler-core
```
Install all yarn dependencies:
```Shell
cd /usr/local/etc/docker-portaler/portaler-core
yarn install
```
Now you need to decide if you are going to use it locally or publicly. Local version has no auth and is accessible only from your local network. Public version has discord OAuth and can be accessed by anyone with the right role on your discord server. While you can technically make the local version accessible from the internet that is not advised and will not be covered by this guide.

You don't need to do both options so pick only the one you need.

## Option 1 - Steps for local version:

Edit `docker-compose.yml` and `.env.example`:
```Shell
cd /usr/local/etc/docker-portaler/portaler-core/docker
```
You can use any text editor you like. If you are using Debian you will most likely have `vi` and `nano` installed. If you've never used `vi` before, i suggest you use `nano` instead.
If you dont have anything but `vi` installed - you can either use google-fu and learn how to use it or just `apt-get install -y nano` to have `nano` installed
```Shell
nano .env.example
```
Edit those values:

**ACCESS_TOKEN=** Your github access token you've created in the beginning.

Uncomment **DISABLE_AUTH=true** (that means delete the # before this line)

Leave everything else as is.

`ctrl-x` to exit the editor, dont forget to save your changes.
```Shell
nano docker-compose.yml
```
Delete everything related to the discord bot container. That means everything beginning with **discord_bot** and ending before **api_server** 
<img src="https://i.imgur.com/6gU6uVn.png" width="250px" alt="screenshot" />
<<This is the part you need to delete.

`ctrl-x` to exit, dont forget to save your changes.

When you are done editing the files - start the containers:
```Shell
docker-compose up -d
```
If you realized that you've done something wrong you can simply edit `.env.example` or `docker-compose.yml` and `docker-compose up -d` again.

After the process is done wait for a couple of minutes and check that all containers are up and running:
```Shell
docker ps -a
```
In this list look for **container id** of the container with bin_etl (most likely will be the first one in the list) and restart it. That should populate the DB with zone info.
```Shell
docker restart your_bin_etl_containerid
```
Make all containers autostart if you reboot your VM:
```Shell
docker update --restart unless-stopped $(docker ps -q)
```
Switch to the folder containing frontend files:
```Shell
cd /usr/local/etc/docker-portaler/portaler-core/packages/frontend
```
Rename `.env.example` to `.env`:
```Shell
mv .env.example .env
```
Install pm2 and make it autostart your webserver:
```Shell
npm install pm2 -g
pm2 start --name=portaler npm -- start
pm2 startup 
pm2 save
```
Wait some time for the webserver to start. Now you can open your browser and go to http://yourserverip:3000 to use Portaler.

## Option 2 - Steps for public version:

### Explanation about domain names structure:
Due to how Portaler is made you can't just use "yourdomain.com" for your domain name. You need to have a subdomain.
That means portaler needs to be accessible with yoursubdomain.yourdomain.com instead.
To create a subdomain, go to the DNS server provider you use (i use cloudflare for example) and add a CNAME record with your subdomain pointing to your domain. 

You can either do it like this:

<img src="https://i.imgur.com/v5MKyO1.png" width="350px" alt="screenshot" />

Or you can do it like this: 

<img src="https://i.imgur.com/9awWAkf.png" width="350px" alt="screenshot" />

In the steps to follow i'll be using "yoursubdomain" and "yourdomain" as substitutes for the domain and subdomain names you own. The following part of the guide assumes you know already how hosting a website and stuff like DNS work and realize what domain/subdomain names are.

Now that we have this settled lets build our frontend:
```Shell
cd /usr/local/etc/docker-portaler/portaler-core
yarn build:front
```
You are going to use Nginx to serve the webpage, so you need to install it first:
```Shell
apt-get install -y nginx
```
Edit Nginx configuration  files. You can use any text editor you like. If you are using Debian you will most likely have `vi` and `nano` installed. If you've never used `vi` before, i suggest you use `nano` instead.
If you dont have anything but `vi` installed - you can either use google-fu and learn how to use it or just `apt-get install nano` to have `nano` installed.
```Shell
nano /etc/nginx/conf.d/portaler.conf
```
Paste this config into the file:
```
server {
  listen 80;

  location /api/ {
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host           $http_host;
    proxy_pass      http://localhost:7777/api/;
  }

  location / {
    root   /usr/local/etc/docker-portaler/portaler-core/packages/frontend/build/;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  error_page   500 502 503 504  /50x.html;

  location = /50x.html {
    root   /usr/share/nginx/html;
  }
}
```
`ctrl-x` to exit the editor, dont forget to save your changes.

Delete the default configuration and restart nginx:
```Shell
rm /etc/nginx/sites-enabled/default
systemctl restart nginx
```
You should be able to access the website now in your browser (nothing will work however without the backend)

### Everything discord bot related:
You will need to create an application using discord developer portal (https://discord.com/developers/applications). You can name it however you want.

Go to the "Bot" page and press Add Bot, check **Presence Intent** and **ServerMember Intent**.
On the OAuth2 page press "Add Redirrect" and put there http://yoursubdomain.yourdomain:80/api/auth/callback. Dont forget to save changes.

You will need **ClientID**, **ClientSecret**, **PublicKey** from the "General Information" page and **Token** from the "Bot" page for the next step.

Now that you have those values you can set-up your docker containers:
```Shell
cd /usr/local/etc/docker-portaler/portaler-core/docker
nano .env.example
```
You need to edit those values:

**HOST=** to your domain name (ex. myserver.com and NOT yousubdomain.myserver.com)

**ADMIN_KEY=** to a random string.

**ACCESS_TOKEN=** to your github access token you've created in the beginning.

**DISCORD_REDIRECT_URI=** http://yoursubdomain.yourdomain:80/api/auth/callback (same stuff you've put into the Discord OAuth page)

**DISCORD_BOT_TOKEN=** Token from "Bot" page.

**DISCORD_PUBLIC_TOKEN**= PublicKey from "General Information" page.

**DISCORD_CLIENT_TOKEN**= ClientID from "General Information" page.

**DISCORD_SECRET_TOKEN**= ClientSecret from "General Information" page.

Leave everything else as is.

`ctrl-x` to exit, dont forget to save your changes.

**Important: do NOT invite your bot to your server before you are done setting up docker containers. The bot has to join you discord server with api already running. If your bot is already on your server - kick it.**

When you are done editing the file - start the containers
```Shell
docker-compose up -d
```
If you realized that you've done something wrong you can simply edit `.env.example` and ``docker-compose up -d`` again.

After the process is done wait for a couple of minutes and check that all containers are up and running:
```Shell
docker ps -a
```
In this list look for **container id** of the container with bin_etl (most likely will be the first one in the list) and restart it. That should populate the DB with zone info.
```Shell
docker restart your_bin_etl_containerid
```
Make all containers autostart if you reboot your VM:
```Shell
docker update --restart unless-stopped $(docker ps -q)
```
Now you can invite your bot to your server:

Go to https://discordapi.com/permissions.html#0

Tick "manage roles" and insert your bots **ClientID** (the one you used while editing the `.env.example` file). Click on the generated link below and add the bot to your server (dont forget that you need to have permissions to do that).

The bot should've created a new role called **portaler** or whatever you've set in your `.env.example.` Grant this role to yourself.

Open your web-browser and go to http://yoursubdomain.yourdomain:80
Try logging in using discord OAuth - you will most likelly get an error while you try that. In order to fix that error you need to add your subdomain to the subdomain list. To do that you first need to get the id of your server:
```Shell
curl -H "Authorization: Bearer youradminkey" http://localhost/api/admin/list
```
"youradminkey" is the **ADMIN_KEY** you've set up in your `.env.example`.

Look for `"id":number`. Most likelly your id wil be 1.

Now you can add your server to the list:
```Shell
curl -H "Authorization: Bearer youradminkey" -H "Content-Type: application/json" --request POST --data '{"id": yourid, "subdomain": "yoursubdomain" }' http://localhost/api/admin/addSubdomain
```
Do `curl -H "Authorization: Bearer youradminkey" http://localhost/api/admin/list` again and look for `"subdomain"` - it should be `"subdomain":"yoursubdomain"` now.

Try logging in again. This time everything should be working fine.

The next step would be to enable SSL but i'll leave this up to you - plenty of guides on the internet how to do that using certbot.
