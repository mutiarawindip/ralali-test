const assert = require('chai').expect;

const page = require('../page/movie-list-page.js');

const testCase = {
 "positive" : {
    "getList" : "I should get the movie list properly based on the keyword search",
    "resetSearch" : "I should get empty result and empty field(s) everytime 'Reset' button is used"
 },
 "negative" : {
    "noList" : "Users should get error message when they send request without key of search",
    "invalidApiKey" : "Users should get error 401 when they send request with invalid API Key"
    // "invalidApiLink" : "Users should get error 404 when they send request with invalid API Link",
 }
}

describe('OMDB Movie List API test', () => {
 const apiKey = '1646c2b7';
 const invalidApiKey = 'asdfghjk';
 const keySearch = 'lord';

 it('@get ${testCase.positive.getList}', async() => {
  const response = await page.getMovieList(apiKey, keySearch);
  assert(response.status).to.equal(200);
 }),

 it('@get ${testCase.positive.resetSearch}', async() => {
  const response = await page.getMovieList(apiKey, keySearch);
  assert(response.status).to.equal(200);
 }),

 it('@get ${testCase.negative.noSearch}', async() => {
  const response = await page.getMovieList(apiKey, '');
  assert(response.status).to.equal(200, response.body.Error);
  assert(response.body.Response).to.equal('False');
  assert(response.body.Error).to.equal('Something went wrong.');
 }),

 it('@get ${testCase.negative.invalidApiKey}', async() => {
   const response = await page.getMovieList(invalidApiKey, keySearch);
   assert(response.status).to.equal(401, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Invalid API key!');
  })

 /*it('@get ${testCase.negative.invalidApiLink}', async() => {
   const response = await page.getMovieList(invalidApiLink, keySearch);
   assert(response.status).to.equal(404, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Invalid API Link!');
  })*/
}) 