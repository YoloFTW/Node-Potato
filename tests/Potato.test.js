const { Potato } = require('../classes/potato');

const axios = require('axios');

jest.mock('axios', () => {
    return {
        create: () => {

            const mockResponseGetPoll = {
            
                "pollId": 644304039,
                "question": "private test poll for api wrapper",
                "topic": "science-technology",
                "optionA": "optionA",
                "optionB": "optionB",
                "optionAVotes": 8,
                "optionBVotes": 0,
                "CreatedOn": "2023-11-10T21:11:45.282Z",
                "archived": false,
                "visibility": "Private",
                "pollSlug": "private-test-poll-for-api-wrapper-optiona-or-optionb"
                
            };


            const mockResponseVote = {
                "Message": "Vote applied successfully",
                "optionA": 3,
                "optionB": 0
            };

            const mockResponseCreate = {
                "creation": 767133726
            };

            return {
                request: jest.fn().mockImplementation((config) => {

                    //if get poll
                    if (config.url === 'https://opinionpotato.com/api/v1/get-poll') {

                        //if all polls
                        if(!config.data.pollid){

                            return Promise.resolve({
                                data: {Poll: [mockResponseGetPoll]},
                                status: 200,
                                statusText: 'OK',
                            });
                        
                        //if forcing error
                        }else if(config.data.pollid == 1){

                            return Promise.resolve({
                                data: {Poll: null},
                                status: 200,
                                statusText: 'OK',
                            });

                        }

                        //if normal request
                        return Promise.resolve({
                            data: {
                                Poll: {...mockResponseGetPoll}
                            },
                            status: 200,
                            statusText: 'OK',
                        });
                    
                    //on submit vote
                    }else if(config.url == "https://opinionpotato.com/api/v1/submit-vote"){

                        //if poll id invalid
                        if(config.data.pollid == 0){
                            return Promise.resolve({
                                data: {"Message": "Invalid poll id"},
                                status: 200,
                                statusText: 'OK',
                            });

                        //if vote invalid
                        }else if(config.data.vote == "C"){

                            return Promise.resolve({
                                data: {"Message": "Invalid vote"},
                                status: 200,
                                statusText: 'OK',
                            });
                            
                        }

                        //if normal submit
                        return Promise.resolve({
                            data: mockResponseVote,
                            status: 200,
                            statusText: 'OK',
                        });

                    }else if(config.url == "https://opinionpotato.com/api/v1/create-poll"){

                        if(config.data.topic == "test"){

                            //if invalid topic
                            return Promise.resolve({
                                data: {"creation": "Wrong Topic Applied"},
                                status: 200,
                                statusText: 'OK',
                            });


                        }else if(config.data.question == "dupe"){

                            //if duplicate question
                            return Promise.resolve({
                                data: {"creation": "Poll Already Exists"},
                                status: 200,
                                statusText: 'OK',
                            });

                        }

                        //if normal create
                        return Promise.resolve({
                            data: mockResponseCreate,
                            status: 200,
                            statusText: 'OK',
                        });

                    }

                })
            }
        }
    };
});


let potato = new Potato({apiKey: process.env.API_KEY, apiIdentifier: Number(process.env.APP_IDENTIFIER)})

describe("getPoll", () =>{

    test('test potato.getpoll', async () => {
    
        const response = await potato.getPoll(992659119);
    
        expect(response).toHaveProperty('question');
    })
    
    
    test('test potato.getallpolls', async () => {
    
        const response = await potato.getAllPolls();
    
        expect(response[0]).toHaveProperty('question');
    })


    test('test potato.getPrivatePoll', async () => {
    
        const response = await potato.getPrivatePoll(644304039);
    
        expect(response).toHaveProperty('question');
    })
    
    
    test('test potato.getpoll error', async () => {
        
        const error = new Error("Unknown Error has occured");
    
        await expect(potato.getPoll(1)).rejects.toThrow(error);
    })

})


describe("Vote Poll", () =>{

    test('test potato.submitVote', async () => {
    
        const response = await potato.submitVote(644304039, "A");
    
        expect(response).toHaveProperty('optionA');
    })

    test('test potato.submitVote id error', async () => {

        const error = new Error("Invalid poll id");

        await expect(potato.submitVote(0, "A")).rejects.toThrow(error);
    })
    
    test('test potato.submitVote id error', async () => {

        const error = new Error("Invalid vote");

        await expect(potato.submitVote(644304039, "C")).rejects.toThrow(error);
    })
    

})



describe("create poll", () =>{

    test('potato.createPoll', async () => {

        let options = {

            "question":"Test poll",
            "optionA":"optionA",
            "optionB":"optionB",
            "topic":"science-technology",
            "visibility":"Public"

        }

        const response = await potato.createPoll(options);
    
        expect(response).toHaveProperty('pollId');
    })

    test('potato.createPoll Invalid Topic', async () => {

        let options = {

            "question":"Test poll",
            "optionA":"optionA",
            "optionB":"optionB",
            "topic":"test",
            "visibility":"Public"

        }

        const error = new Error(`Invalid Topic: ${options.topic}`);

        await expect(potato.createPoll(options)).rejects.toThrow(error);
    })
    
    test('potato.createPoll Duplicate Question', async () => {

        let options = {

            "question":"dupe",
            "optionA":"optionA",
            "optionB":"optionB",
            "topic":"science-technology",
            "visibility":"Public"

        }

        const error = new Error(`Poll Already Exists With Question: ${options.question}`)

        await expect(potato.createPoll(options)).rejects.toThrow(error);
    })
    

})




