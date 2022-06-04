const { Router } = require('express');
const { Country, Activity , Op} = require('../db');
const axios = require('axios');

const router = Router();
/// Tengo q revisar el capital 
router.get('/', (req,res ,next) =>{
    const {name} = req.query;
    const conditions = {};
    if(name){
        conditions.where = {
            name: {
                [Op.iLike]: `%${name}%`, 
            }
        };
    }
    let countries = Country.findAll(conditions);
    if(name){
        countries.then(response =>{
            if(!response[0]){
                res.send(`No existe ningun pais con el nombre ${name}`);
            }else{
                res.json(response);
            }
        }).catch(e => { next (e)});
    }else{
        countries.then(response => {
            if(!response[0]){
                axios.get('https://restcountries.com/v3/all')
                .then(response => response.data)
                .then(response => response.map(country => {
                        return {
                            id: country.cca3,
                            name: country.name.official,
                            image: country.flags[0],
                            continent: country.continents[0],
                            capital: country.continents[0], //////////CAPITAL
                            sub_region: country.subregion,
                            area: country.area,
                            population: country.population,
                        }
                    })
                )
                .then(response => Country.bulkCreate(response))
                .then(response => res.json(response));
            }else{
                res.json(response);
            }
        }).catch(e => { next (e)});
    }
});

// Revisar
router.get('/:idPais', (req,res ,next) =>{
    const {idPais} = req.params;
    const conditions = {};
    if(idPais){
        conditions.where = {
            id: idPais,
        };
        conditions.include = [
            {
                model: Activity,
                exclude: ['country_activity']
            }
        ];
    }
    let countries = Country.findOne(conditions);
    if(idPais){
        countries.then(response =>{
            if(!response){
                res.send(`No existe ningun pais con el id ${idPais}`);
            }else{
                res.json(response);
            }
        }).catch(e => { next (e)});
    }
});

module.exports = router;

