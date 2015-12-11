var http = require('http');
var fs = require('fs');

function notworking(callback) {
   fs.readdir(
        "../images/",
        function (err, files) {
            if (err) {
                callback(err);
                return;
            }

            var only_dirs = [];
            for (var i = 0; i < files.length; i++) {
                console.log(i + "a");
                fs.stat(
                    "../images/" + files[i],
                    function(err, stats) {
                        console.log(i + "b");
                        if (stats.isDirectory()) {
                            console.log(i + "c");
                            only_dirs.push(files[i]);
                        }
                    }
                );
            }
            console.log(i + "d");
            callback(null, only_dirs);
        }
    );
}


function  load_dir_list(callback) {
    fs.readdir(
        "../images/",
        function (err, files) {
            if (err) {
                callback(err);
                return;
            }

            var only_dirs = [];
            (function iterator(index) {
                console.log(index + "a");
                if (index == files.length) {
                    console.log(index + "b");
                    callback(null, only_dirs);
                    return;
                }

                fs.stat(
                    "../images/" + files[index],
                    function (err, stats) {
                        if (err) {
                            callback(err);
                            return;
                        }
                        if (stats.isDirectory()) {
                            console.log(index + "c");
                            only_dirs.push(files[index]);
                        }
                        console.log(index + "d");
                        iterator(index + 1);
                    }
                );
            })(0);
        }
    );
}


function load_album_list(callback) {
    fs.readdir(
        "../images/",
        function (err, files) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, files);
        }
    );
}
 
function handle_incoming_request(req, res) {
    console.log("INCOMING REQUEST: " + req.method + " " + req.url);
   
    load_dir_list(function (err, albums) {
    //load_album_list(function (err, albums) {
        if (err) {
            res.writeHead(503, {"Content-Type": "application/json"});
            res.end(JSON.stringify(err) + "\n");
            return;
        }
        
        var out = { error: null,
                data: { albums: albums }};
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(out) + "\n" );        
    });
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);
