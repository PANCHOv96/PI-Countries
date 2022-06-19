const { Router } = require('express');
const { Country } = require('../db');
const axios = require('axios');
const getConditions = require('./Conditions/Conditions.js');
const { signedCookie } = require('cookie-parser');
const router = Router();

router.get('/', (req,res ,next) =>{
    const {name} = req.query;
    const conditions = {};
    getConditions(req.query,conditions);
    let countries = Country.findAndCountAll(conditions);
    if(name){
        countries.then(response =>{
            if(!response.rows[0]){
                res.status(404).json({message:`There is no country name: ${name}`});
            }else{
                res.json(response);
            }
        }).catch(e => { next (e)});
    }else{
        countries.then(response => {
            if(!response.rows[0]){
                axios.get('https://restcountries.com/v3/all')
                .then(response => response.data)
                .then(response => response.map(country => {
                        return {
                            id: country.cca3,
                            name: country.name.common,
                            image: country.flags[0],
                            continent: country.region,
                            capital: country.capital ? country.capital[0] : 'Dont Have', 
                            sub_region: country.subregion,
                            area: country.area,
                            population: country.population,
                        }
                    })
                )
                .then(response => Country.bulkCreate(response))
                .then(response => res.json({
                    count: response.length,
                    rows: response.slice(0,9),
                }));
            }else{
                res.json(response);
            }
        }).catch(e => { next (e)});
    }
});

router.get('/:idPais', (req,res ,next) =>{
    const {idPais} = req.params;
    const conditions = {};
    getConditions(req.params,conditions)
    console.log('GET-ID',conditions)
    let countries = Country.findOne(conditions);
    if(idPais){
        countries.then(response =>{
            if(!response){
                res.status(404).json({message:`There is no country with the id: ${idPais}`});
            }else{
                res.json(response);
            }
        }).catch(e => { next (e)});
    }
});

router.post('/prueba', (req,res,next) =>{

    Country.create(req.body)
    .then(resp => {
        res.send(resp)
        console.log('Res',resp.dataValues)
    })
    .catch(err => {
        console.log(err.message)
        res.send(err)
    });
});

module.exports = router;

