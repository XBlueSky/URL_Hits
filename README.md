# URL_Hits

## Install

For Backend you should install the module we use

```console
$ npm install mongoose
```

And in Frontend may have to install these component
```console
$ npm install recharts
$ npm i semantic-ui-react
$ npm i react-calendar
$ npm i react-viewport-slider
```

## Run

#### For Backend 

You should build the mongodb and bind on the PORT 27017 yourself.

We would open PORT 3001 and connect to your mongodb.

```console
$ cd URL_Hits
$ PORT=3001 node bin/www
```

#### For Frontend

We create proxy on PORT 3001 and open PORT 8001 to export outside.

```console
$ cd URL_Hits/client
$ npm start
```

## Result
So you can see the website on ```http://localhost:8080/```.
