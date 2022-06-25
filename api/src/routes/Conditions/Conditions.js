const { Activity , Op} = require('../../db.js');

module.exports = function getConditions(data,objectConditions){
    const {name , continents , activities , alphabetically , population ,idPais ,pagination ,country} = data;
    const arrayWhere = [];
    const orders = [];
    if(country){
        objectConditions.attributes = ['name','id'];
        return
    }
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
        arrayWhere.push({continent: {[Op.iLike]: `${continents}`}});
    }
    objectConditions.where = {
        [Op.and]: arrayWhere
    };
    if(activities){
        objectConditions.include = {
            model: Activity,
            where: { name: {[Op.iLike]: `${activities}`} }
        };
    }
    if(alphabetically){
        orders.push(["name",alphabetically]);
    }
    if(population){
        orders.push(["population",population]);
    }
    if(orders.length > 0){
        objectConditions.order = orders;
    }
    objectConditions.offset = (pagination && parseInt(pagination)!= 1) ? ((parseInt(pagination)*10)-11) : 0;
    objectConditions.limit = (pagination && parseInt(pagination)!= 1) ? 10 : 9;
}