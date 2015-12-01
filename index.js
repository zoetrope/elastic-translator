var searchApi = require('./server/api/search');
module.exports = function (kibana) {
  return new kibana.Plugin({

    name: 'elastic-translator',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      app: {
        title: 'Elastic Translator',
        description: 'Sample for Kibana plugin',
        main: 'plugins/elastic-translator/app',
        injectVars: function (server, options) {
          var config = server.config();
          return {
            kbnIndex: config.get('kibana.index'),
            esApiVersion: config.get('elasticsearch.apiVersion'),
            esShardTimeout: config.get('elasticsearch.shardTimeout')
          };
        }
      }
    },
    init: function (server, options) {
      searchApi(server);
    }
  });
};

