const { Router } = require('express');
const { Activity } = require('../db');


const router = Router();
//// Utilizar findOrCreate parala la creacion de la actividad
router.post('/', (req,res ,next) => {
    const {name,difficulty,duration,season,idPais} = req.body;
    if(!name || !difficulty || !idPais){
        res.json('Faltan datos primordiales');
    }
    Activity.create({
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season
    }).then(response => {
        if(Array.isArray(idPais)){
            arregloPais = idPais.map(country => {
                return response.setCountries(country);
            });
            return Promise.all(arregloPais);
        }else{
            return response.setCountries(idPais);
        }
    })
    .then(response => res.json(response)).catch(e => {next(e)});
});


module.exports = router;
