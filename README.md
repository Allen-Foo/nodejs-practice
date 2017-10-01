# nodejs-practice
practice with node js

#### run with `nodemon` to automatically restart server when file changes

since nodemon is installed as dev-dependencies instead of global sources. 
we need to use the following way to access the executable instance of nodemon

```
 ./node_modules/nodemon/bin/nodemon.js app.js
```


#### we use another tool `apidoc` to automatically generate api docs

here is the command to re-generate the api docs after any api changes

```
 ./node_modules/apidoc/bin/apidoc -i routes/ -o apidocs
```

we also use Node.js to host this static documentation at [localhost:3000](http://localhost:3000)