import map from './map.js';
import render from './render.js';
import loader from './loader.js';
import error from './error.js';
import helpers from './helpers.js';
import sort from './sort.js';
import filter from './filter.js';
import gallery from './gallery.js';

const api = {

	getBuildings: function() {
		//Check if the data already exsist in the local storage
		if (localStorage.getItem("buildings") === null) {

			loader.show();

			const sparqlQuery = `

			PREFIX hg: <http://rdf.histograph.io/>
			PREFIX dct: <http://purl.org/dc/terms/>
			PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
			PREFIX geo: <http://www.opengis.net/ont/geosparql#>

			SELECT ?building ?buildingLabel ?wkt (COUNT(DISTINCT ?cho) AS ?count)  WHERE {
			    ?building a hg:Building .
			    ?building rdfs:label ?buildingLabel .
			    ?cho dct:spatial ?building .
			    ?building geo:hasGeometry/geo:asWKT ?wkt .
			}
			GROUP BY ?building ?buildingLabel ?wkt
			ORDER BY DESC (?count)
			LIMIT 50

	 		`;
			//Encode the query
			const encodedQuery = encodeURIComponent(sparqlQuery);

			//Save the data url
			const queryUrl = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/hva2018/sparql?default-graph-uri=&query=' + encodedQuery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';

			fetch(queryUrl)
				.then(response => response.json()) // transform the data into json
				.then(data => {
					loader.hide();
					const results = data.results.bindings; // get the results
					//Save data into local storage
					localStorage.setItem("buildings", JSON.stringify(results));
					//initialize the map with the data results
					map.init(results);

				})
				.catch(error => {
					// if there is any error you will catch them here
					error.show();
					loader.hide();
					console.log(error);
				});
		} else {
			map.init(JSON.parse(localStorage.getItem('buildings')));
		}
	},
	getBuildingDetail: function(name) {
		loader.show();
		const data = JSON.parse(localStorage.getItem('buildings'));

		//Get the object with the name of name of the parameter and save it in variable
		const dataDetail = data.find(d => helpers.getSegment(d.building.value, 3) == name);

		const sparqlQuery = `

		PREFIX hg: <http://rdf.histograph.io/>
		PREFIX dct: <http://purl.org/dc/terms/>
		PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		PREFIX foaf: <http://xmlns.com/foaf/0.1/>
		PREFIX void: <http://rdfs.org/ns/void#>
		PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>

		SELECT DISTINCT ?cho ?building ?img ?col ?date  WHERE {

		 ?cho dct:spatial ?b .
		 ?b a hg:Building .
		 ?b rdfs:label ?building .

		 ?cho foaf:depiction ?img .
		 ?cho void:inDataset ?col .
		 ?cho foaf:depiction ?img .
		 ?cho sem:hasBeginTimeStamp ?date .

		 FILTER REGEX(?building,"${dataDetail.buildingLabel.value}")
		}
		ORDER BY ?date
		LIMIT 200

		`;

		const sparqlQueryDetails = `
			PREFIX hg: <http://rdf.histograph.io/>
			PREFIX dct: <http://purl.org/dc/terms/>
			PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
			PREFIX geo: <http://www.opengis.net/ont/geosparql#>
			PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>

			SELECT ?building ?buildingLabel ?start (COUNT(DISTINCT ?cho) AS ?count)  WHERE {
				?building a hg:Building .
				?building rdfs:label ?buildingLabel .
				?cho dct:spatial ?building .
				?building sem:hasEarliestBeginTimeStamp ?start .
				FILTER REGEX(?buildingLabel,"${name}")
			}

		`;

		const encodedQuery = encodeURIComponent(sparqlQuery);
		const queryUrl = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/hva2018/sparql?default-graph-uri=&query=' + encodedQuery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';

		//Encode the query with the details of the building


		fetch(queryUrl)
			.then(response => response.json()) // transform the data into json
			.then(data => {

				const imgData = data.results.bindings;

				sort.getInput(imgData);
				filter.getInput(imgData);
				render.detail(dataDetail);
				render.images(imgData);
				loader.hide();

			})
			.catch(error => {
				// if there is any error you will catch them here
				console.log(error);
				error.show();
				loader.hide();
			});

	}
};

export default api;
