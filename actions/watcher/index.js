const fetch = require('node-fetch');
const { Core } = require('@adobe/aio-sdk');
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils');


async function getCloudStatus(environment,index, token, aemcmEndpoint) {
  
  var cloudstatus = "unsure";
  var apiEndpoint = aemcmEndpoint + environment;
  
  try {   
    //fetch content from external api endpoint
    const res = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    if (!res.ok) {
     throw new Error('request to ' + apiEndpoint + ' failed with status code ' + res.status);
    //  return apiEndpoint
    }

    cloudstatus = await res.json();
    //cloudstatus = apiEndpoint  
    
  } catch (error) {
    // log any server errors
    logger.error(error);
    cloudstatus = error;
  }

  return cloudstatus;

}

// main function that will be executed by Adobe I/O Runtime
async function main (params) {

  const aemcmEndpointList = params.AEMCM_ENDPOINTS;
  const token = params.AIO_TOKEN;
  const cloudenvironmentlist = params.AEMCM_ENVIRONMENTS;
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' });
  
  var bodyresponse = {};
  cloudenvironments = cloudenvironmentlist.split(',');
  aemcmendpoints = aemcmEndpointList.split(',');

  let index = 0;
  for(cloudenvironment of cloudenvironments) {
    aemcmEndpoint = aemcmendpoints[index];
    bodyresponse[cloudenvironment] = await getCloudStatus(cloudenvironment, index, token, aemcmEndpoint);
    index += 1;
  }

  return response = {
    statusCode: 200,
    body: bodyresponse
  }
}

exports.main = main;