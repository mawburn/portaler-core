# Adding Multiple Discord Servers

This guide builds upon the [selfhosting](selfhosting.md) docs to allow multiple discord servers to use a single portaler instance.

**Note:** This guide was written using Ubuntu 20.04 LTS instead of Debian 9. \
 The steps should be similar for debian and close enough for other linux distros.

<br>

## Multiple Discord Servers

Information about how operating portaler in multiple discord servers works:

- Each discord server is associated to it's own subdomain.
- Portaler does not share portal information between discord servers/subdomains.
- Portaler only allows discord users to log into the subdomain associated with their discord server.

<br>

## Adding Additional Discord Servers

While this guide outlines how to add your second discord server and builds upon the selfhosting guide's initial first server, these steps may be repeated for adding one or more discord servers into portaler. 

To add a third, fourth, fifth, or beyond number of discord servers/subdomains, simply repeat the steps in this guide.

<br>

## How To Setup Multiple Discord Servers

1) Point an additional subdomain
2) Add subdomain to Nginx config
3) Add Portaler & Assign Roles
4) Add the new server to the API
5) Test

<br>

### Step 1: Add an additional subdomain

Pick a subdomain for the new discord server you wish to integrate portaler into. For sake of example this guide will use the subdomain `test`. Point `test.yourdomain.com` to your portaler server. Follow the same steps you took to point your original subdomain.

When the new subdomain is pointed you should be able to visit `http://test.yourdomain.com` and the portaler page should render.

<br>

### Step 2: Add subdomain to your nginx config

While this step isn't mandatory it's good practice and will enable you to use certbot in the future should you want to add https encryption to your site.

Edit your nginx `portaler.conf` file with a text editor like `vim` or `nano`. This guide uses `vim`.

```
vim /etc/nginx/conf.d/portaler.conf
```


Add the new `test.yourdomain.com` subdomain to the `server_name` directive at the top of the `portaler.conf` file. Be sure to save your file.

```
server {
  server_name firstsubdomain.yourdomain.com test.yourdomain.com;

  location /api/ {
    ...
```

Validate your nginx config. The output should be similar to what is shown below. If Nginx reports a configuration or syntax error, refer to the previous step and correct any  errors. Test your configuration again using the below command.

```
sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Restart nginx

```
sudo service nginx restart
```

Now test your new subdomain and all of your previous subdomains to make sure you haven't broken anything by visting the subdomains in your browser.

<br>

### Step 3: Add Portaler and Assign Roles

Follow the [selfhosting](selfhosting.md) guide's instructions for inviting the portaler discord bot into your _new_ discord server.

Now that portaler is in your new discord server, follow the same steps as you did previously for assigning users the `portaler` role or whatever role you've set in the `.env.example.`

<br>

### Step 4: Add New Discord Server to Portaler

Now we need to let Portaler know that we've added a new discord server and associate it with the new subdomain. To do this we will follow the same steps we previously used to add our first discord sever form the [selfhosting](selfhosting.md) guide.
 
**First we'll find the ID of the server**

```
curl -H "Authorization: Bearer youradminkey" http://localhost:7777/api/admin/list

[
  {
    "id": 1,
    "discordId": "...",
    "discordName": "...",
    "subdomain": "firstSubdomain",
    "createdOn": "..."
  },
  {
    "id": 2,
    "discordId": "...",
    "discordName": "...",
    "subdomain": null,
    "createdOn": "..."
  }
]
```

You should now see two discord servers returned in this array. The first server with `"id": 1` is your already existing discord server configured with your first subdomain. Note the Id of the second server that has a `null` subdomain and a name that matches your new discord server. It's most likely going to be `"id": 2`. We will use this Id in the next API call to associate the discord server with our new subdomain.

**Associate the new subdomain with the new discord server.**

```
curl -H "Authorization: Bearer youradminkey" -H "Content-Type: application/json" --request POST --data '{"id": <id from previous step>, "subdomain": "<your new subdomain from step 1>" }' http://localhost:7777/api/admin/addSubdomain

{
  "id": 3,
  "discordId": "...",
  "discordName": "...",
  "subdomain": "test",
  "createdOn": "...",
  "isPublic": false,
  "discordUrl": null,
  "roles": [
    {
      "id": 2,
      "discordRoleId": "...",
      "lastUpdated": "..."
    }
  ]
}
```

At this point you are done, now we need to test!

<br>

### Step 5: Testing

Log in to your portaler server by opening the new subdomain you have configured in your browser. That would be `test.domain.com` in our case. 

Log in with a discord account that has the `portaler` role in the server you have just invited your portaler bot to.

You should now be able to log in and start using portaler.
