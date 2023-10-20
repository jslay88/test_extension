function init() {
    updateRules()
}

function updateRules(newURL = "https://www.google.com") {
    console.log("Updating rules with url:", newURL)
    chrome.declarativeNetRequest.getDynamicRules((rules) => {
        console.debug(`Existing DNR Rules: ${rules.length}`);

        // Extract rule IDs using map
        const ruleIds = rules.map(rule => rule.id);

        // Define the new rule
        const newRule = {
            action: {
                type: "modifyHeaders",
                requestHeaders: [
                    {"header": "Origin", "operation": "remove"},
                    {"header": "Referer", "operation": "set", "value": newURL}
                ]
            },
            condition: {"urlFilter": `${newURL}/*`, "resourceTypes": ["xmlhttprequest"]},
            id: 1,
            priority: 1
        };

        // Update the rules
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [newRule],
            removeRuleIds: ruleIds
        }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error updating rules:", chrome.runtime.lastError);
            } else {
                console.debug("Successfully updated rules!");
            }
        });
    });
}

async function testRequest(url) {
    console.debug("Grabbing url:", url)
    const resp = await fetch(url, {
        method: "GET",
        mode: "no-cors"
    })
    console.debug("Response status code:", resp.status)
}


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.debug(`Received Message from ${sender}.`)
    console.debug(`Message: ${request}`)
    if (request.action === "updateRules") {
        console.debug("User requested to update rules with url", request.url)
        updateRules(request.url)
        sendResponse({detail: "OK"})
    } else if (request.action === "testRequest") {
        console.debug("User request to test request with url", request.url)
        await testRequest(request.url)
    }
})

init()
