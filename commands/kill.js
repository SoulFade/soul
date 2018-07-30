exports.run = (inv, message, args) => {
 const mention = message.mentions.members.first();
   var searchPromise = modSearchGif.searchForGif("suicide");
     searchPromise.then((gif) => {
     message.channel.send(gif);
   })  
var GphApiClient = require('giphy-js-sdk-core')
const client = GphApiClient(process.env.GIPHYTOKEN)
const searchForGif = (gifName) => {
  return client.search('gifs', {"q": gifName, "limit": 1})
         .then((response) => {
           var gif = response.data[0].url;
           return gif;
         })
         .catch((err) => {
           return err;
         })
  }
}
//"giphy-js-sdk-core": "^2.0.3"
//hVTiYBKYTwFqv2ssf3GLpyV5oY1Ce4G5
