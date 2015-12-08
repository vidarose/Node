// This app is to callback practice - Asyn (Checking if a file does exist))
// second line

var fs = require('fs');

function FileObject () {
    this.filename = '';

    this.file_exists = function (callback) {
        var self = this;
        console.log("About to open: " + self.filename);
        fs.open(this.filename, 'r', function (err, handle) {
            if (err) {
                console.log("Can't open: " + self.filename);
                callback(err);
                return;
            }
            fs.close(handle, function () { });
            callback(null, true);
        });
    };
}

var fo = new FileObject();
fo.filename = "file_that_does_not_exist";

fo.file_exists(function (err, results) {
    if (err) {
        console.log("Aw, bummer: " + JSON.stringify(err));
        return;
    }
    console.log("file exists!!!");
});

/*
var fs = require('fs');

var handle = fs.openSync('info.txt', 'r');
var buf = new Buffer(100000);
var read = fs.readSync(handle, buf, 0, 10000, null);
console.log(buf.toString('utf8', 0, read));
fs.closeSync(handle);
*/