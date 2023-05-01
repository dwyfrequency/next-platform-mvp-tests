const https = require('https');

/**
 * Sends result of E2E Next test to JSCore chat.
 */
async function notifyTestResults() {
  // JSCore chat webhook URL.
  if (!process.env.WEBHOOK_URL) {
    console.log(`Couldn't find WEBHOOK_URL env variable.`);
    return;
  }

  // URL of this workflow run.
  const workflowUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
  let status = 'did not log a status correctly';
  if (process.argv.includes('fail')) {
    status = 'failed';
  }
  if (process.argv.includes('success')) {
    status = 'succeeded';
  }

  const canaryVersion = process.env.FIREBASE_CANARY_VERSION;
  const message = `Next.js Build tests ${status} for Canary version: ${canaryVersion}. ${workflowUrl}`;

  const chatPromise = new Promise((resolve, reject) => {
    console.log(`Sending message to chat: ${message}`);
    const req = https.request(
      process.env.WEBHOOK_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      (res) => {
        res.on('data', (d) => {
          process.stdout.write(d);
        });
        res.on('end', resolve);
      }
    );

    req.on('error', (error) => reject(error));

    req.write(
      JSON.stringify({
        text: message,
      }),
      (err) => reject(err)
    );
    req.end();
  });

  return Promise.all([chatPromise]);
}

notifyTestResults();
