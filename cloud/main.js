var util = require('util');
/* main.js
 * All calls here are publicly exposed as REST API endpoints.
 * - all parameters must be passed in a single JSON paramater.
 * - the return 'callback' method signature is 'callback (error, data)', where 'data' is a JSON object.
*/

exports.getConfig = function(params, callback) {
  console.log("In doDbTest() call");
  var ret = {first:"called"};
  $fh.db({
    "act": "create",
    "type": "fhdb_tester",
    "fields": [{
      "id": 1,
      "name": "Joe"
    }, {
      "id": 2,
      "name": "John"
    }]
  }, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Create: " + JSON.stringify(data));
      ret.doCreate = data;
      $fh.db({
        "act":'list', 
        "type": "fhdb_tester"
      }, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          
          console.log("list: " + JSON.stringify(data));
          ret.doList = data;
          $fh.db({
            "act": "deleteall",
            "type": "fhdb_tester"
          }, function(err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
              console.log("deleteall: " + JSON.stringify(data));
              ret.doDeleteAll = data;

              $fh.db({
                "act":'list', 
                "type": "fhdb_tester"
              }, function(err, data) {
                if (err) {
                  console.log("Error " + err);
                } else {
          
                  console.log("List after delete: " + JSON.stringify(data));
                  ret.doListAfterDelete = data;
                  return callback(undefined, {config: ret});

                } 
              });
          
            }
          });
          
        }
      });
    }
  });
};
  
  
