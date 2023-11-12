const { checkKeys } = require('../utilities/CheckKeys');
const { request } = require('../utilities/Request');


class Potato{

    /**
     * Creates an instance of Potato.
     * 
     * @param {Object} Value
     * @memberof Potato
     */
    constructor(Value){

        //assign all vaules to class
        Object.assign(this, Value)

    }

    /**
     * Get all polls
     *
     * @return {Array} array of all polls
     * @memberof Potato
     */
    async getAllPolls(){

        const data = {
            "apikey":this.apiKey
        }

        let response = await request("https://opinionpotato.com/api/v1/get-poll", "get", data);


        //if poll is in response
        if(response.status === 200 && response.data.Poll){

            return response.data.Poll;

        }else{

            throw new Error('Unknown Error has occured')

        }

    }

    /**
     * Get poll from poll id
     *
     * @param {number} pollId the id of the poll
     * @return {Object} the poll object 
     * @memberof Potato
     */
    async getPoll(pollId){

        const data = {
            "apikey":this.apiKey,
            "pollid":pollId,
        }

        let response = await request("https://opinionpotato.com/api/v1/get-poll", "get", data);

        //if poll is in response
        if(response.status === 200 && response.data.Poll){

            return response.data.Poll;

        }else{

            throw new Error('Unknown Error has occured')

        }

    }

    /**
     * Get poll from poll id
     *
     * @param {number} pollId the id of the poll
     * @return {Object} the poll object 
     * @memberof Potato
     */
        async getPrivatePoll(pollId){

            const data = {
                "apikey":this.apiKey,
                "apiIdentifier":this.apiIdentifier,
                "pollid":pollId
            }

            let response = await request("https://opinionpotato.com/api/v1/get-poll", "get", data);


            //if poll is in response
            if(response.status === 200 && response.data.Poll){
    
                return response.data.Poll;
    
            }else{
    
                throw new Error('Unknown Error has occured')
    
            }
    
        }

    /**
     * Submit a vote for a poll
     *
     * @param {number} pollId the id of the poll
     * @param {string} vote the vote to submit. either A or B
     * @return {Object} the poll object 
     * @memberof Potato
     */
    async submitVote(pollId, vote){

        const data = {
            "apikey":this.apiKey,
            "pollid": pollId,
            vote
        }

        let response = await request("https://opinionpotato.com/api/v1/submit-vote", "post", data);
        
        //throw error if API key is invalid
        if(response.status === 401){
            throw new Error('Invalid API key');
        }
        
        //if poll is in response
        if(response.status === 200 && response.data.optionA){

            //return data
            return response.data;

        }else if(response.data.Message){

            throw new Error(response.data.Message);

        }else{

            throw new Error('Unknown Error has occured');

        }

    }

    /**
     * Get poll from poll id
     *
     * @param {Object} options the options for the poll
     * @return {Number} the poll id
     * @memberof Potato
     */
    async createPoll(options){

        const requiredOptions = ['question', 'optionA', 'optionB', 'topic', 'visibility'];

        //check options for all keys needed
        checkKeys(options, requiredOptions);

        const data = {
            "apikey":this.apiKey,
            ...options
        }

        let response = await request("https://opinionpotato.com/api/v1/create-poll", "post", data);
        
        //throw error if API key is invalid
        if(response.status === 401){
            throw new Error('Invalid API key');
        }
        
        //if poll is in response
        if(response.status === 200 && response.data.creation){

            //error handling
            if(response.data.creation === 'Wrong Topic Applied'){
                throw new Error(`Invalid Topic: ${data.topic}`);
            
            }else if(response.data.creation === 'Poll Already Exists'){
                throw new Error(`Poll Already Exists With Question: ${data.question}`);

            }

            //return data
            return {pollId: response.data.creation};

        }else{

            throw new Error('Unknown Error has occured');

        }

    }
    
}


module.exports.Potato = Potato