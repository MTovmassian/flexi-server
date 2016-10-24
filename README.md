# Flexi-Server

Flexi-Server is a lightweight web-server powered by [Node.js] and dedicated to static webiste.

    Author: Martin TOVMASSIAN <martin.tovmassian@gmail.com>
## Set up
Clone Flexi-Server repository.
```sh
$ git clone https://github.com/MTovmassian/flexi-server.git
```
Go into the flexi-server directory.
```sh
$ cd flexi-server/
```
Follow the example of the application **app/** already created and copy-paste it under a new name. Here it will be **newApp/**.
```sh
$ cp -r app/ newApp/
```
Go into your new application directory.
```sh
$ cd newApp/
```
Put your web application code inside the dedicated directories: **css/**, **html/**, **img/**, **js/**, **vendor/**. If you don't rely on them you can also delete all the default files already in there.

Edit the application file **app.js** to fit your project settings.
- Replace the *app.DEFAULT_PORT* attribute value with your application port.
    ```javascript
    app.DEFAULT_PORT = myDefaultPort;
    ```
- Insert the urls and the related html file paths of your application into the *app.myWepPages* object.
    ```javascript
    app.myWebPages = {
        "/my-first-page":{"file":"html/my-first-page.html"},

        "/my-second-page":{"file":"html/my-second-page.html"},
        
        "/my-third-page":{"file":"html/my-third-page.html"}
    };
    ```

Start the web server by running the application file **app.js**.
```sh
$ node app.js
```