const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')
const { WebClient } = require('@slack/web-api');

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  const web = new WebClient(params.SLACK_TOKEN); 
  const channelId = params.SLACK_CHANNEL_ID;
 
  const STARTED = "https://ns.adobe.com/experience/cloudmanager/event/started";
  const WAITING = "https://ns.adobe.com/experience/cloudmanager/event/waiting";
  const ENDED = "https://ns.adobe.com/experience/cloudmanager/event/ended";
  const EXECUTION = "https://ns.adobe.com/experience/cloudmanager/pipeline-execution";
  const STEPSTATE = "https://ns.adobe.com/experience/cloudmanager/execution-step-state";


  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
  try {
    // 'info' is the default level if not set
    logger.info('Cloud Manager Event' + JSON.stringify(params.event))
    
    let message = 'Cloud Manager Pipeline ' + 'Event received.. ' + JSON.stringify(params.event)
    
    // Start Pipeline
    if (
      STARTED === params.event["@type"] &&
      EXECUTION === params.event["xdmEventEnvelope:objectType"]
    ) {
      console.log("Cloud Manager Pipeline : Execution Started");
      message = "Pipeline Execution Started"
    }

    // Start Execution Step
    if (
      STARTED === params.event["@type"] &&
      STEPSTATE === params.event["xdmEventEnvelope:objectType"]
    ) {
      console.log("Cloud Manager Pipeline : Execution Step");
      message = "Pipeline Execution Step Started"
    }

    // End Execution Step
    if (
      ENDED === params.event["@type"] &&
      STEPSTATE === params.event["xdmEventEnvelope:objectType"]
    ) {
      console.log("Cloud Manager Pipeline : Execution Step Completed");
      message = "Pipeline Execution Step Completed"
    }

    // Execution Step Waiting
    if (
      WAITING === params.event["@type"] &&
      STEPSTATE === params.event["xdmEventEnvelope:objectType"]
    ) {
      console.log("Cloud Manager Pipeline : Execution Step Waiting");
      message = "Pipeline Execution Step Waiting ***"
    }

    // End Pipeline
    if (
      ENDED === params.event["@type"] &&
      EXECUTION === params.event["xdmEventEnvelope:objectType"]
    ) {
      console.log("Cloud Manager Pipeline : Execution  Complete");
      message = "Pipeline Execution Complete"
    }


    const res = await web.chat.postMessage({ channel: channelId, text: message });
    const response = {
      statusCode: 200,
      body: {success: 'yes'}
    }
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}
exports.main = main