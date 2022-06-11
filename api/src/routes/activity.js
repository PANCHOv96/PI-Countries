const { Router } = require('express');
const { Activity ,Op} = require('../db');


const router = Router();
router.post('/', (req,res ,next) => {
    const {name,difficulty,duration,season,idPais} = req.body;
    if(!name || !difficulty || !idPais){
        res.status(400).json({message:'Faltan datos primordiales'});
    }
    const conditions = {};
    conditions.where = {
        [Op.and]: [
            { name },
            { difficulty }
        ]
    }
    conditions.defaults = {
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season
    };
    Activity.findOrCreate(conditions)
    .then(response => {
        if(response[1] === false){
            res.status(404).json({message:'Actividad ya existente'});
        }
        if(Array.isArray(idPais)){
            arregloPais = idPais.map(country => {
                return response[0].addCountries(country);
            });
            return Promise.all(arregloPais);
        }else{
            return response[0].addCountries(idPais);
        }
    })
    .then(response => res.json(response)).catch(e => {next(e)});
});

router.get('/', (req,res,next)=>{
    Activity.findAll({
        attributes: ["name"],
        group: "name",
    })
    .then(response =>{
        res.json(response);
    })
    .catch(e => {next(e)});
});


module.exports = router;
