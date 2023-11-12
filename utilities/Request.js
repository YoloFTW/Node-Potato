const axios = require('axios');

const validateStatus = (status) => {
    //remove status code validation
    return status;
};

const api = axios.create({
    validateStatus,
});

module.exports = {


    /**
     * send axios request
     * @param {String} url
     * @param {String} method
     * @param {Object} data
     * @returns {AxiosResponse}
     */

    request: async (url, method, data) => {


        const config = {
            method: method,
            maxBodyLength: Infinity,
            url: url,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };


        let response = await api.request(config);

        //throw error if API key is invalid
        if(response.status === 401){
            throw new Error('Invalid API key');
        }

        return response;

    }


}