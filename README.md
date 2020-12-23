# Cloud Buddy

These Runtime Actions do the following;
- SlackHook captures Cloud Manager Pipeline events and notifies via Slack
- Watcher calls the Cloud Manager APIs on request and returns a clean output

## Setup

- Populate the `.env` file in the project root and fill it as shown [below](#env)


## TO DO / Known issues
- Watcher: Clean up auto gen of Token (currently you need to generate a bearer token manually)
- Watcher: Auto lookup Cloud Manager Dev Console url
- Slackhook: Expand output to Slack on status.

## Local Dev

- `aio app run` to start your local Dev server
- App will run on `localhost:9080` by default

By default the UI will be served locally but actions will be deployed and served from Adobe I/O Runtime. To start a
local serverless stack and also run your actions locally use the `aio app run --local` option.


## Deploy & Cleanup

- `aio app deploy` to build and deploy all actions on Runtime and static files to CDN
- `aio app undeploy` to undeploy the app

## Config

### `.env`

```bash
# This file must not be committed to source control

## You MUST provide your Adobe I/O Runtime credentials
# AIO_RUNTIME_AUTH=
# AIO_RUNTIME_NAMESPACE=
# AIO_TOKEN= eg leHAiOjE2MDU2MD....
# AEMCM_ENDPOINTS=  eg "https://dev-console-ns-team-aem-cm-prd-n9405.ethos13-prod-aus5.dev.adobeaemcloud.com/api/releases/ns-team-aem-cm-prd-n9405/status/"
# AEMCM_ENVIRONMENTS= eg "cm-p24xxx-e76xxx,cm-p22xxx..."
```

