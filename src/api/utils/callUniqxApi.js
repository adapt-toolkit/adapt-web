const superagent = require('superagent');
const defaultQuery = {
    market: 'CUSTOM_ADAPT'
};

const callUniqxApi = (url, query) => {
    console.log('UNIQX REQUEST: ', `${process.env.UNIQX_API_PREFIX}${url}`, 'query: ', {...defaultQuery, ...query});

    return superagent.get(`${process.env.UNIQX_API_PREFIX}${url}`)
        .query({...defaultQuery, ...query})
        .then(resp => resp.ok ? resp.body : Promise.reject(resp))
        .catch(e => Promise.reject(e.response.statusCode));
};

module.exports = callUniqxApi;