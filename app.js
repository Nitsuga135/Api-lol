const express = require('express');
const app = express();

//middelwares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
const index = require('./src/routes/index');

//links
app.use('/api', index);


//Inicializacion del servidor
app.listen(3000, ()=> {
    console.log(`Server 3000 running`);
});

