
const express 		 = require('express');
const expressLayouts = require('express-ejs-layouts')
const bodyPars 		 = require('body-parser');
const cookieParser 	 = require('cookie-parser');
const exSession 	 = require('express-session');
const exUpload 		 = require('express-fileupload');
const login 		 = require('./controller/login');
const home 			 = require('./controller/home');
const logout 		 = require('./controller/logout');
const main 			 = require('./controller/main');
const user			 = require('./controller/user');
const app 			 = express();

const userModels = require('./models/userModels');
const userModel = require.main.require('./models/userModels');

app.set('view engine', 'ejs');

app.set('layout', './layouts/main');

app.use(exUpload());
app.use(expressLayouts);
app.use('/assets', express.static('assets'));

app.use(bodyPars.urlencoded({extended : false}));
app.use(exSession({secret : 'my secret value', saveUninitialized : true, resave : false}));
app.use(cookieParser());

app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);
app.use('/user', user);
app.use('/main', main)


app.get('/', (req, res)=>{
	res.render('/user/farmer/landing-Page/index');
})

app.get('/getUser', (req, res)=>{
	userModel.getAllcategories(function(results){
		data = JSON.stringify(results);
		console.log(data);
		res.json(data);
	})
})

app.get('/getSellers', (req, res)=>{
	userModel.getAllsellers(function(results){
		data = JSON.stringify(results);
		console.log(data);
		res.json(data);
	})
})

app.get('/getFarmers', (req, res)=>{
	userModel.getAllfarmers(function(results){
		data = JSON.stringify(results);
		console.log(data);
		res.json(data);
	})
})

app.get('/setSellers', (req, res)=>{
	
	console.log(req);
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server starts at ${PORT}`));