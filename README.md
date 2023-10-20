# Test Extension
A repo to test Chrome extensions

## Repro declarativeNetRequest.updateDynamicRules failure on browser start
- Clone the repo
- Install the extension via `Load unpacked` via `Developer mode`
- Open service worker and configure dev tools and browser in the following way
  - Disable cache in Networking tab
  - Enable Verbose, Info, Warnings, Errors in the logging levels in the Console tab
  - Disable browser run in background when closed in browser settings.
- Open service worker logging in the Console tab, and monitor logs
- Open test extension settings by clicking on Extensions Icon -> Test Extension
- Adjust URL if you want, doesn't really matter
- Click `Save URL to Rule`, and take note of console logs.
- Click `Test Request to URL` to make a test request, take note of Request Headers.

If you notice the log `Successfully updated rules!`, then it was
successful. This happens on extension install, and when you reload
the installed unpacked extension, and when you click `Save URL to Rule`
when it works. If you close the browser completely and reopen it, then
open the service worker log again, you should see that `Successfully 
updated rules!` is missing, and no matter how many times you click 
`Save URL to Rule`, you will never see the log, but you will also not
see the intended error message `"Error updating rules:", 
chrome.runtime.lastError`, the callback never gets called.

You can also click `Test Request to URL` to make a request to the
specified URL. Also make sure `Disable Cache` is checked in the network 
tab when looking at the service worker. Take note of the Request Headers
when making a request. When the rule set fails, you will not set it set
`Referer`. When the rule is working (when you see `Successfully updated 
rules!`), you will see `Referer` as part of the Request Headers.
