/**++++++++++++++++++
*  Routes
* +++++++++++++++++++
*
*
The MIT License (MIT)

Copyright (c) 2014 Equan Pr.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/

var rest = require('restler'),
    crypto = require('crypto'),
    ts = 1,
    app = require('../../package.json'),
    image_type = 'portrait_incredible',

    /**
     *  CHANGE TO YOUR MARVEL API KEYS
     *  +++++++++++++++++++++++++++++++
     *
     *  visit this link to get yours  http://developer.marvel.com/
     *
     */

    PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY,
    PUBLIC_KEY = 'd67e002039ba7b5111f45af9ea3e77f5',
	shasum = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY),
    hash = shasum.digest('hex');

exports.home = function(req, res) {
  	res.json({
  		app: app.name,
  		description: app.description,
  		version: app.version
  	});
};

exports.superhero = function(req, res){

	var superhero_name = req.params.name;
	console.log('superhero_name: '+superhero_name);


    //consume Marvel API
    rest.get('http://gateway.marvel.com:80/v1/public/characters?name='+superhero_name+'&ts=' + ts + '&apikey=d67e002039ba7b5111f45af9ea3e77f5&hash=' + hash).on('complete', function(data) {
        res.json(data);
    });
};

exports.appStatus = function(err) {
    console.log('Server running on port 3003');
}
