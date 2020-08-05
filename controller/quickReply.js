function handleQuickReply(payload) {
  if(payload == 'GET_TIME_AT_PLACE') {
    return Promise.resolve(
      {
        text: "You can ask me about time like 'what time is it in New York'"
      });
  }
  else if(payload == 'GET_DISTANCE_BETWEEN') {
    return Promise.resolve(
      {
        text: "You can ask me about distance between locations like 'what's the distance between New York and Seattle'"
      });
  }
}