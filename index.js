const core = require('@actions/core');
//const core = require('./mocked-core');
const https = require('node:https');

try {
  const projectId = core.getInput('project_id');
  const secret = core.getInput('secret');
  const secretHeader = core.getInput('secret_header');
  const baseURL = core.getInput('base_url');

  const url = new URL(`${baseURL}/projects/${projectId}/reload`);

  core.info(`Reloading project ${projectId} at ${url}`);

  const req = https.request(
    {
      method: 'POST',
      hostname: url.hostname,
      path: url.pathname,
      headers: {
        [secretHeader]: secret,
      },
    }, 

    (res) => {
      const statusCode = res.statusCode;
      if (statusCode === 200) {
        core.setOutput('status', statusCode);
      } else {
        core.setFailed(`Request failed with status code ${statusCode}`);
      }
    },
  );

  req.on(
    'error', 
    (error) => { 
      core.setFailed(error.message);
    },
  )

  req.end();
} catch (error) {
  core.setFailed(error.message);
}
