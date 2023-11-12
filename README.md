<h3 align="center">Node Potato</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/YoloFTW/Node-Potato.svg)](https://github.com/YoloFTW/Node-Potato/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/YoloFTW/Node-Potato.svg)](https://github.com/YoloFTW/Node-Potato/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## Table of Contents

- [About](#about)

- [Usage](#usage)
    - [Create Potato](#Create-Potato)
    - [Get Poll](#get-poll)
        - [Get All Polls](#Get-All-Polls)
        - [Get Private Poll](#Get-Private-Polls)
    - [Vote Poll](#Vote-Poll)
    - [Create Poll](#Create-Poll)

- [Authors](#authors)

</br>

## About <a name = "about"></a>

Node Potato is a JavaScript API wrapper for Opinion Potato. It provides a simple and easy-to-use interface for interacting with the Opinion Potato API, allowing you to easily add Opinion Potato functionality to your own applications.

An API key and API identifier is required to use this API wrapper. To obtain an API Key, you must first contact: [application@opinionpotato.com](mailto:application@opinionpotato.com) asking for a key, stating what you will use it for, and how you will interact with it.

If your application is successful, an API key and API identifier key will be sent to you via email.

**API Key** = This is your secure key for authenticating with the API. You should never share this
with anyone. If you need a new key, contact [api-keys@opinionpotato.com](mailto:api-keys@opinionpotato.com)

**API Identifier** = This is a unique number assigned to you which will allow you to query your own
polls separately from the public list. This is mainly used when interacting with Private polls that
you have created

</br>

## Installing

For Installation With NPM

```shell
npm i node-potato
```
</br>

## Usage <a name="usage"></a>

Below is the basic usage of Node Potato
</br>


## Create Potato <a name="Create-Potato"></a>
Creating the potato object

```js
const { potato } = require("node-potato");

//Creates a new potato object
let Potato = new potato({apiKey: "API_KEY", apiIdentifier: API_IDENTIFIER});
```

Note: API_IDENTIFIER must be passed as an int
</br>

## Get Poll <a name="get-poll"></a>

Get a poll

```js
//Get an opinion potato poll with the Id 626288817
Potato.getPoll(626288817).then((value) =>{

    console.log(value);

});

/*expected output:{
  pollId: 626288817,
  question: 'Which political system do you believe in',
  topic: 'politics',
  optionA: 'Democracy',
  optionB: 'Socialism',
  optionAVotes: 2,
  optionBVotes: 141,
  CreatedOn: '2023-07-30T23:19:39.228Z',
  archived: false,
  visibility: 'Public',
  pollSlug: 'which-political-system-do-you-believe-in-democracy-or-socialism'
}*/
```
</br>

## Get All Polls <a name="Get-All-Polls"></a>

Gets all public polls listed on opinion potato

```js
//Gets all public polls
Potato.getAllPolls().then((value) =>{

    console.log(value);

});

/*expected output:[
    {
        pollId: 626288817,
        question: 'Which political system do you believe in',
        topic: 'politics',
        optionA: 'Democracy',
        optionB: 'Socialism',
        optionAVotes: 2,
        optionBVotes: 141,
        CreatedOn: '2023-07-30T23:19:39.228Z',
        archived: false,
        visibility: 'Public',
        pollSlug: 'which-political-system-do-you-believe-in-democracy-or-socialism'
    },
    ...
]*/
```
</br>

## Get Private Poll <a name="Get-Private-Poll"></a>

Get a poll you have created that is private

```js
//Gets the private poll with the Id 644304039
Potato.getPrivatePoll(644304039).then((value) =>{

    console.log(value);

});

/*expected output:{
        pollId: 626288817,
        question: 'Which political system do you believe in',
        topic: 'politics',
        optionA: 'Democracy',
        optionB: 'Socialism',
        optionAVotes: 2,
        optionBVotes: 141,
        CreatedOn: '2023-07-30T23:19:39.228Z',
        archived: false,
        visibility: 'Private',
        pollSlug: 'which-political-system-do-you-believe-in-democracy-or-socialism'
    }*/
```
</br>

## Vote Poll <a name="Vote-Poll"></a>

Vote on a poll

```js
//Votes on the poll with and Id of 992659119 option A
Potato.submitVote(992659119, "A").then((value) =>{

    console.log(value);
    
});
//expected output: { Message: 'Vote applied successfully', optionA: 5, optionB: 0 }


//Votes on the poll with and Id of 992659119 option B
Potato.submitVote(992659119, "B").then((value) =>{

    console.log(value);
    
});
//expected output: { Message: 'Vote applied successfully', optionA: 5, optionB: 1 }
```
</br>

## Create Poll <a name="Create-Poll"></a>

Creates a public poll on Opinion Potato

```js
//Create the options for the poll
const options = {
    "question":"test poll for the api wrapper",
    "optionA":"optionA",
    "optionB":"optionB",
    "topic":"science-technology",
    "visibility":"Public"
}

//Submit poll to Opinion Potato
Potato.createPoll(options).then((value) =>{

    console.log(value)

})

//expected output: { pollId: 133486009 }


//Create the options for the poll
const options = {
    "question":"test private poll for the api wrapper",
    "optionA":"optionA",
    "optionB":"optionB",
    "topic":"science-technology",
    "visibility":"Private"
}

//Submit a private poll to Opinion Potato
Potato.createPoll(options).then((value) =>{

    console.log(value)

})

//expected output: { pollId: 133486036 }
```

Note:
- The question should **not** include a question mark (?)
- A poll must not already exist with the same question and answer combination
- Topic must include one of the following:
    - music 
    - arts-crafts 
    - religion 
    - politics
    - sport
    - food-drink
    - literature
    - science-technology
    - education
    - nature-environment
    - fashion
    - history
    - lifestyle
    - climate
    - celebrities
    - society
    - health
    - countries
    - war
    - space
    - culture
    - travel
    - beliefs
    - gaming
    - money
</br>


## Authors <a name = "authors"></a>

- [@YoloFTW](https://github.com/YoloFTW)



