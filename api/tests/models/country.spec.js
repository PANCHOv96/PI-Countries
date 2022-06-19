const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    it('should throw an error if id is null', (done) => {
      Country.create({})
        .catch((err) => {
          expect(err.message).to.be.string("Country.id cannot be null");
          done()
        });
    });
    it('should throw an error if name is null', (done) => {
      Country.create({})
        .catch((err) => {
          expect(err.message).to.be.string("Country.name cannot be null");
          done()
        });
    });
    it('should throw an error if image is null', (done) => {
      Country.create({})
        .catch((err) => {
          expect(err.message).to.be.string("Country.image cannot be null");
          done()
        });
    });
    it('should throw an error if continent is null', (done) => {
      Country.create({})
        .catch((err) => {
          expect(err.message).to.be.string("Country.continent cannot be null");
          done()
        });
    });
    it('should throw an error if capital is null', (done) => {
      Country.create({})
        .catch((err) => {
          expect(err.message).to.be.string("Country.capital cannot be null");
          done()
        });
    });
  });
  describe('Create', () => {
    const country = {
      id: 'ARG',
      name: "Argentina",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png',
      continent: 'Americas',
      capital: 'Buenor Aires',
      sub_region: 'South America',
      area: 2780400,
      population: 45376763
    };
    it('new country', () => {
      return Country.create(country)
        .then(response => {
          expect(response.dataValues).to.have.property('capital', country.capital);
        })
    });
  });
});



