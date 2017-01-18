/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;

//quotes for alexa and basic skill information
const languageStrings = {    
    'de-DE': {
        translation: {
            FACTS: [
                'Der Ball ist rund und das Spiel dauert 90 Minuten. Sepp Herberger',
                'Das Runde muss ins Eckige. Sepp Herberger',
                'Die Spieler waren schwach wie eine Flasche leer. Giovanni Trappatoni',
                'Es gibt nur eine Möglichkeit: Sieg, Unentschieden oder Niederlage. Franz Beckenbauer',
                'Man darf jetzt nicht alles so schlecht reden, wie es war. Fredi Bobic',
                'Ich brauche keinen Butler. Ich habe eine junge Frau! Thomas Doll',
                'Schiedsrichter kommt für mich nicht in Frage, schon eher etwas, das mit Fußball zu tun hat. Lothar Matthäus',
                'Ich bin abends mit der alten Dame Juve ins Bett gegangen und morgens wieder aufgestanden, weil ich perfekt informiert sein wollte. Jupp Heynckes',
                'Sie spielen taktisch gut, obwohl sie ohne Taktik spielen. Udo Lattek',
                'Schlimm ist dieses Gejammer. Tut hier weh, tut da weh. Aber solange Sie das Handy halten können, muss ja noch genug Kraft da sein. Werner Lorant',
                'Mailand oder Madrid - Hauptsache Italien. Andreas Möller',
                'Mal verliert man und mal gewinnen die anderen. Otto Rehagel'
                
            ],
            SKILL_NAME: 'Fussballer Zitate',
            GET_FACT_MESSAGE: 'Ein Fussballer Zitat wäre: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir ein Fussballer Zitat“, oder du kannst „Abpfiff“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Abpfiff!',
        },
    },
};

//entry point for registering the handlers
exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//all needed handlers
const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};


