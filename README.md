# CSSItical
A simple tool for calculating the [critical css](https://web.dev/extract-critical-css/) of a url from the full css. Specially designed for applications where webpack cannot parse the html (perhaps because they are dynamically generated from another technology).

Based on [Penthouse](https://github.com/pocketjoso/penthouse) and [Puppeteer](https://pptr.dev)

# Run
## Docker
The easiest way to use the software is via docker. You have a ready-to-use image in Dockerhub. Create a container with the following command:
```
docker run -d --rm --name cssitical -p 3000:3000 junisan/cssitical
```
This will create a container with connectivity through port 3000 of your host, so you can use the application with a browser. Feel free to change your host port if you don't want or can't use port 3000. Now, access with a browser  `http://localhost:3000` (or the port you specified when creating the container) and you should be able to see the application interface.

You can leave the container running indefinitely, but if for any reason you want to stop the container, simply send the following command via the shell
```
docker stop cssitical
```
This will stop the container and remove it. The next time you want to use it, you will have to send the first command with docker run.

## Downloading source code
If you prefer to download the source code of the project, you can do it using git `git clone https://github.com/junisan/cssitical.git`. This will clone the repository on your machine and you can run it or modify the source code to work according to your needs.

Once cloned, access the repository folder and run `npm install` (you will need Node and NPM to make it work). After that, it starts up the server with `node bin/www` and using a browser, access `http://localhost:3000` and you should be able to see the application interface. You can change the application port in the `bin/www` file, line 15.

## Zip File 😲
If you live in the previous century and have not heard of git, you can also download the source code in a [zip file](https://github.com/junisan/cssitical/archive/master.zip).  Once unzipped, run `npm install` to install the dependencies and run the project with `node bin/www`.
