/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country , Activity, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: 'ARG',
  name: 'Argentina',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png',
  continent: 'Americas',
  capital: 'Buenor Aires',
  sub_region: 'South America',
  area: 2780400,
  population: 45376763
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  before(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () => 
      agent.get('/countries')
        .then(response => response.toJSON())
        .then(response => expect(response.status).to.equal(200))
    );
    it('Get /countries', () => 
      agent.get('/countries')
        .then(response => response.toJSON())
        .then(response => JSON.parse(response.text))
        .then(response => expect(response.rows[0]).to.deep.equal(country))
    );
  });
  describe('GET /countries?name', () => {
    const name='JHK';
    it('Get /countries?name=arg', () => 
      agent.get('/countries?name=arg')
        .then(response => response.toJSON())
        .then(response => JSON.parse(response.text))
        .then(response => expect(response.rows[0]).to.deep.equal(country))
    );
    it(`Get /countries?name${name}`, () => {
      return agent.get(`/countries?name=${name}`)
        .then(response => response.toJSON())
        .then(response => JSON.parse(response.text))
        .then(response => expect(response.message).to.be.string(`There is no country name: ${name}`))
    });
    it(`Get /countries?name=${name} status 404 - dont exist`, () => 
      agent.get(`/countries?name=${name}`)
        .then(response => response.toJSON())
        .then(response => expect(response.status).to.equal(404))
    );
  });
  describe('GET /countries/:idPais', () => {
    const idPais = 'JHK';
    it('Get /countries/ARG', () => 
      agent.get('/countries/ARG')
        .then(response => response.toJSON())
        .then(response => JSON.parse(response.text))
        .then(response => expect(response).to.have.property('name',country.name))
    );
    it(`Get /countries/${idPais}`, () => 
      agent.get(`/countries/${idPais}`)
        .then(response => response.toJSON())
        .then(response => JSON.parse(response.text))
        .then(response => expect(response.message).to.be.string(`There is no country with the id: ${idPais}`))
    );
    it(`Get /countries/${idPais} status 404 - dont exist`, () => 
      agent.get(`/countries/${idPais}`)
        .then(response => response.toJSON())
        .then(response => expect(response.status).to.equal(404))
    );
  });
});
