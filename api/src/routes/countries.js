const { Router } = require('express');
const { Country, Activity , Op} = require('../db');
const axios = require('axios');

const router = Router();

function getConditions(data,objectConditions){
    const {name , continents , activities , alphabetically , population ,idPais} = data;
    const arrayWhere = [];
    const orders = [];
    if(idPais){
        objectConditions.where = {
            id: idPais,
        };
        objectConditions.include = {
            model: Activity
        };
        return 
    }
    if(name){
        arrayWhere.push({name: {[Op.iLike]: `%${name}%`}});
    }
    if(continents){
        arrayWhere.push({continent: continents});
    }
    objectConditions.where = {
        [Op.and]: arrayWhere
    };
    /////
    if(activities){
        objectConditions.include = {
            model: Activity,
            where: { name: activities }
        };
    }
    /////
    if(alphabetically){
        orders.push(["name",alphabetically]);
    }
    if(population){
        orders.push(["population",population]);
    }
    if(orders.length > 0){
        objectConditions.order = orders;
    }
    console.log('objetoCondicion',objectConditions);
}
/// Tengo q revisar el capital 
router.get('/', (req,res ,next) =>{
    const {name} = req.query;
    const {pagination} = req.query;
    const conditions = {};
    getConditions(req.query,conditions);
    //console.log("Condiciones",conditions)
    conditions.offset = (pagination && parseInt(pagination)!= 1) ? ((parseInt(pagination)*10)-11) : 0;
    conditions.limit = (pagination && parseInt(pagination)!= 1) ? 10 : 9;
    let countries = Country.findAndCountAll(conditions);
    if(name){
        countries.then(response =>{
            if(!response.rows[0]){
                res.send(`No existe ningun pais con el nombre ${name}`);
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
                            capital: country.capital ? country.capital[0] : 'NoTiene', //////////CAPITAL
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
                res.send(`No existe ningun pais con el id ${idPais}`);
            }else{
                res.json(response);
            }
        }).catch(e => { next (e)});
    }
});

module.exports = router;

