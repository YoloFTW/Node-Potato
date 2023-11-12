const {request} = require('../utilities/Request');


test('test request', async () => {

    let data = {
        "apikey":process.env.API_KEY,
        "pollid":802844114
    };

    const response = await request(" https://opinionpotato.com/api/v1/get-poll", "get", data);

    expect(response.data).toHaveProperty('Poll');

})


test('test request error', async () => {

    const error = new Error("Invalid API key");

    let dataReject = {
        "apikey":"0",
        "pollid":802844114
    };

    await expect(

        request(" https://opinionpotato.com/api/v1/get-poll", "get", dataReject)

    ).rejects.toThrow(error)

})
