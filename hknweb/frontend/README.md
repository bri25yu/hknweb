See https://www.valentinog.com/blog/drf/

In order to develop the frontend, we first need to install all of our frontend Node packages through `make provision`. Then, we need to run two servers: one for Node and one for Django. We run the Node server through `make devf`; we run the Django server through `make dev`. 

In summary:
```sh  # in terminal 1
$ make provision    # install Node packages
$ make devf         # start Node server
```
```sh  # in terminal 2
$ make dev          # start Django server
```

open two terminals. In one terminal, `make provision` and `make devf`; in the other, `make dev`!

Hot reloading:
* [example implementation](https://hackernoon.com/how-to-bring-live-reloading-back-to-a-django-and-react-project-ilf3ubm)
* [Vagrant and Webpack specifics](https://webpack.js.org/guides/development-vagrant/)

All of the designs for the course surveys frontend can be found in [this Figma](https://www.figma.com/file/qgqA9eWEZ7Jpm5eOx7EUuh/HKN-Site?node-id=33%3A51).
