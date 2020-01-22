const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.set('views',(path.join(__dirname, '../templates/views')));

app.set('view engine', 'hbs')

app.get('', (req,res)=>{
    res.render('index',{title:'Weather app', name:'Yotam'});
});

app.get('/help', (req,res)=>{
    res.render('help', {title:'Help', helpText: 'bla bl ',name:'Yotam'});
});

app.get('/about', (req, res)=>{
    res.render('about',{title:'about the app', name:'Yotam'});
 });

app.get('/weather', (req,res)=>{
   if(req.query.adress )
   {
  
   const geoCodeCallback =function (error,geoData) {
    const forcastCallback = function (error,data){
        if(error){
            res.send({error})
           }
           else{
            return res.send({
                location: geoData.location,
                forcast: data,
                adress: req.query.adress 
            })
           }
       }


    
       if(error){
        res.send({error})
       }
       else{
        forcast({
            latitude:geoData.latitude,
            longitude: geoData.longitude,
        },forcastCallback)
       }
       forcastCallback.bind(geoCodeCallback)

   } ;
  return geoCode(req.query.adress, geoCodeCallback)
}
    // return res.send({
        // location:'Tel Aviv',
        // forcast:'Nice',
        // adress: req.query.adress 
    // })
  res.send({error:'No adress was provided'})
});

app.get('/help/*', (req,res)=>{
    res.render('404', {title:'404 page',errorMessage:'no help page found',name:'Yotam'});
});
app.get('*', (req,res)=>{
    res.render('404', {title:'404 page',errorMessage:'page not found',name:'Yotam'});
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}!`);
})