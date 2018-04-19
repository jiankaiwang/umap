# umap.ai

[![Build Status](https://travis-ci.org/jiankaiwang/umap.svg?branch=master)](https://travis-ci.org/jiankaiwang/umap)

Umap is the open source for GIS framework.

![](./public/img/ui.png)



## Start the service.

### Clone the Reposiroty

```shell
cd ~
git clone https://github.com/jiankaiwang/umap.git
cd ./umap
```



### Deployment

```shell
npm install --save
sudo npm start
```



## Preparation

#### Redis or Express-session

*   Edit the app.js.

```javascript
// the following setting is using origin express-session
app.use(express.cookieParser());
app.use(session({
  secret: wo.getSessionHash(), 
  cookie: {maxAge: 30 * 60 * 1000},	// existing time period : ms
  resave: false,
  saveUninitialized: true
}));
```



