let FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN

function sendMessage(id, text) {
  const body = JSON.stringify({
    recipient: { id },
    message: { text }
  });
  const qs = "access_token=" + encodeURIComponent(FB_PAGE_TOKEN);
  return fetch("https://graph.facebook.com/me/messages?" + qs, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  })
    .then(rsp => rsp.json())
    .then(json => {
      if (json.error && json.error.message) {
        throw new Error(json.error.message);
      }
      return json;
    });
};

module.exports = sendMessage;