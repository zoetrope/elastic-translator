module.exports = function (server) {

  var client = server.plugins.elasticsearch.client;

  server.route({
    path: '/elastic-translator/api/search',
    method: 'GET',
    handler: function (req, reply) {
      if (req.query && req.query.keywords) {
        client.search({
          index: 'elastic-translator',
          q: 'default_text_en:"' + req.query.keywords + '"'
        }, function (error, response) {
          if (!error) {
            reply(response.hits.hits);
          } else {
            server.log(['error', 'elastic-translator'], error);
            reply(error);
          }
        });
      } else {
        reply([]);
      }
    }
  });
};
