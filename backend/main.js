const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const removeAccents = require('remove-accents'); 
// const PDFParser = require("pdf2json");
const pdf = require('pdf-parse');
const bodyParser = require('body-parser')
const client = require('@draftable/compare-api').client("VjsyYq-test", "cbd0477e2b159799b250663fb422a1b7");
const comparisons = client.comparisons;
 
var busboy = require('connect-busboy');
// let pdfParser = new PDFParser(this,1);
 app.use(busboy()); 

// use it before all route definitions
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', "Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});  
app.use(bodyParser.json())
 


mongoose.connect('mongodb://admin:admin@ds235328.mlab.com:35328/cheat', function (err, db) {
 
   if (err) throw err;
 
    console.log('Successfully connected'); 
    // const filesavesSchema = new mongoose.Schema({ title: 'string', content: 'string' });
    const filesavesSchema = new mongoose.Schema({ title: 'string'});
	const filesaves = db.model('filesaves', filesavesSchema);   


	app.get('/compareApi', function (req, res) {
	   	comparisons.create({
	        left: {
	            source: 'https://api.draftable.com/static/test-documents/code-of-conduct/left.rtf',
	            fileType: 'rtf',
	        },
	        right: {
	            source: 'https://api.draftable.com/static/test-documents/code-of-conduct/right.pdf',
	            fileType: 'pdf',
	        },
	    }).then(function(comparison) {
	       console.log("Comparison created:", comparison);
	       // # This generates a signed viewer URL that can be used to access the private comparison.
	       // # By default, the URL will expire in 30 minutes. See the documentation for `signedViewerURL(...)`.
	       console.log("Viewer URL (expires in 30 min):", comparisons.signedViewerURL(comparison.identifier));
	       res.send( {
	       		URL: comparisons.signedViewerURL(comparison.identifier),
	       		comparison: comparison
	       })
	    });
	});

	app.post('/compareTwoFilesApi', function (req, res) {
		 
		var fstream; 
		var paths = [];
	    req.pipe(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename) { 
	    	
	        fstream = fs.createWriteStream(__dirname + '/files/' + removeAccents(filename));
	        paths.push(__dirname + '/files/' + removeAccents(filename));
	        file.pipe(fstream); 
	         
	    });

	    req.busboy.on('finish', function() {  
	    		 
			console.log( fs.existsSync(paths[0]),fs.existsSync(paths[1]) )
			if(fs.existsSync(paths[0]) && fs.existsSync(paths[1])){
				comparisons.create({
			        left: {
			            source: fs.readFileSync(paths[0]), 
			            fileType: 'pdf',
			        },
			        right: {
			            source: fs.readFileSync(paths[1]),
			            fileType: 'pdf',
			        },
			    }).then(function(comparison) {
			       console.log("Comparison created:", comparison);
			       // # This generates a signed viewer URL that can be used to access the private comparison.
			       // # By default, the URL will expire in 30 minutes. See the documentation for `signedViewerURL(...)`.
			       console.log("Viewer URL (expires in 30 min):", comparisons.signedViewerURL(comparison.identifier));
			       res.send( {
			       		URL: comparisons.signedViewerURL(comparison.identifier),
			       		comparison: comparison
			       })
			    });
			}
	    				 
    	    
		  });
 	})

 	app.post('/compareLocalFiles', function (req, res) {
		 console.log(req.body); 
		 console.log(__dirname + '/files/' + removeAccents(req.body.one))
 		console.log(__dirname + '/files/' + removeAccents(req.body.two))
 
		if(req.body.one && req.body.two){
			comparisons.create({
		        left: {
		            source: fs.readFileSync(__dirname + '/files/' + removeAccents(req.body.one)) , 
		            fileType: 'pdf',
		        },
		        right: {
		            source: fs.readFileSync(__dirname + '/files/' + removeAccents(req.body.two)) ,
		            fileType: 'pdf',
		        },
		    }).then(function(comparison) {
		       console.log("Comparison created:", comparison);
		       // # This generates a signed viewer URL that can be used to access the private comparison.
		       // # By default, the URL will expire in 30 minutes. See the documentation for `signedViewerURL(...)`.
		       console.log("Viewer URL (expires in 30 min):", comparisons.signedViewerURL(comparison.identifier));
		       res.send( {
		       		URL: comparisons.signedViewerURL(comparison.identifier),
		       		comparison: comparison
		       })
		    });
		}
	    				 
    	     
 	})

	app.get('/getAllDocuments', function (req, res) {
	  filesaves.find({}, function(err, text) {
	  	res.send(text)
	  })
	});

 	app.post('/readPDF', function(req, res) {
	    var fstream; 
	    req.pipe(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename) { 
	        fstream = fs.createWriteStream(__dirname + '/files/' + removeAccents(filename));
	        file.pipe(fstream); 
	        fstream.on('close', function () { 
			    // pdfParser.on("pdfParser_dataError", errData => console.log(errData.parserError) );
			    // pdfParser.on("pdfParser_dataReady", pdfData => { 
			    // 	let text = removeAccents(pdfParser.getRawTextContent());
				   //  res.send(text)                               	       
			    // }); 

			    // pdfParser.loadPDF(fstream.path);

			    let dataBuffer = fs.readFileSync(fstream.path);
				pdf(dataBuffer).then(function(data) {
					console.log(data);	
					let context =  removeAccents(data.text); 
				  	res.send(context)  
				});
	        });
	    });
	});

	app.post('/uploadPDF', function (req, res) {
	 	var fstream; 
	    req.pipe(req.busboy);
	    req.busboy.on('file', function (fieldname, file, filename) { 

	        fstream = fs.createWriteStream(__dirname + '/files/' + removeAccents(filename));
	        file.pipe(fstream); 
	        fstream.on('close', function () { 
    			let dataBuffer = fs.readFileSync(fstream.path);
				pdf(dataBuffer).then(function(data) {
				  	//let context =  removeAccents(data.text); 
				    // let doc = new filesaves({ title: filename, content: context });
			        let doc = new filesaves({ title: filename });
			        doc.save(err => {  
					    if (err) return res.status(500).send(err); 
					    return res.status(200).send(doc);
					});   
				});
	 
	        });
	    });
	});

 
});
 
app.listen(3000);
 