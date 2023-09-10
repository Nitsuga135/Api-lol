const { Console } = require("console");
const fs = require("fs");
const listaJson =  __dirname + '/../json/lolChamps.json';
const getData = ()=>{
			return new Promise ((resolve, reject)=>{


				if(listaJson === 0){
					reject (new Error ("No existen datos"));
				}
				
				setTimeout(() => {
					let data = fs.readFileSync(listaJson, {encoding: 'utf-8'})
					resolve (data);

				}, 2000);
			})
	}


const controller = {
	
	
	index: function (req, res) {
		

        getData()
			.then(data=>{
				return JSON.parse(data);
			})
			.then(data=>{
				
				res.status(200).json(data);
			})
			.catch((err)=>{

				res.status(404).send(err.message);

			})
	},
	campeon:function (req, res){
		
		let buscar = req.params.campeon;		

		getData()
			
			.then(data =>{

				return JSON.parse(data);

			}).then(dataParsed =>{

				let resultado;

				dataParsed.forEach((champ) => {
					if(buscar == champ.name){
						
						resultado = champ;

					}	
					
				});
				if(resultado == null || resultado == "undefined"){
					resultado = {"error":"Champ not found"};
				}
				res.status(200).json(resultado);

			}).catch((err)=>{

				res.status(404).json({"error":err.message});

			})

	},
	newChamp: function(req, res){
		
		
		
		const { name,habilidades,img,icono,region,year,range,sex,position,resource,species,lore,phrase }=req.body;
		
		if(name && habilidades && img && icono && region && year && range && sex && position && resource && species && lore && phrase){
		
		
			getData()
				.then(data =>{

					return JSON.parse(data);

				})
				.then(data => {

					

					if(lore.length < 50){
						res.status(404).json("Lore demaciado corto");
					}
					
						const id = data.length;
						const newChamp = { id,...req.body};
						
						data.push(newChamp);

						fs.writeFileSync(listaJson, JSON.stringify(data, null, " "))
        
						
						res.status(200).json(data);

				})
				.catch((err)=>{

					res.status(404).json({"error":err.message});
	
				});
			
		}else{
			res.send("Error")
		}
				
	},
	updateChamp: function(req,res){
		const { name,habilidades,img,icono,region,year,range,sex,position,resource,species,lore,phrase }=req.body;
		let resultado;
		getData()
		.then(data => {

			return JSON.parse(data);

		})
		.then(data =>{
			let resultado;
			let nombre = req.params.champ;
			

			if((name && habilidades && img && icono && region && year && range && sex && position && resource && species && lore && phrase) && 
				(name != "" && habilidades != "" && img != "" && icono != "" && region != "" && year != "" && range != "" && sex != "" && position
				 != "" && resource != "" && species != "" && lore != "" && phrase != "")){
				
					if(lore.length > 50){	
						
						data.forEach((champ)=>{	

							if(champ.name == nombre){
								resultado = 1,
								champ.name = name,
								champ.habilidades = habilidades,
								champ.img = img,
								champ.icono = icono,
								champ.region = region,
								champ.year = year,
								champ.range = range,
								champ.sex = sex,
								champ.position = position,
								champ.resource = resource,
								champ.species = species,
								champ.lore = lore,
								champ.phrase = phrase
							}
							
						})
						if(resultado == 1){
							
							fs.writeFileSync(listaJson, JSON.stringify(data, null, " "))
							res.status(200).json(data);
						}else{
							res.status(404).json("Campeon no encontrado");
						}
				

						

					}else{
						res.status(404).json("El lore debe tener mas de 50 caracteres");

					}
				}else{
					res.status(404).json("No se admiten campos vacios");
				}
		})


	},
	deleteChamp:function(req, res){
		
		let { id } = req.params;
		id = Number(id);
		
		getData()
			.then(data => {

				return JSON.parse(data);

			})
			.then(data =>{
				
				let newList = data.filter(champ=> champ.id !== id);
				console.log(newList[1].id)
				fs.writeFileSync(listaJson, JSON.stringify(newList, null," "));
				
				res.status(200).json(newList)

			})
	}
};



module.exports = controller;
