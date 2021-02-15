document.getElementById("ville").addEventListener("input",function(event)       //Evenement de type input sur élément "ville"
{
	requete(event.target.value);        //Envoi requête
});

function requete(ville)
{
	let request=new XMLHttpRequest();       //Création objet AJAX

	request.onreadystatechange=function(){
		if(this.readyState==XMLHttpRequest.DONE&&this.status==200)      //Requête effectuée et statut ok
		{
			let response=JSON.parse(this.responseText);     //Conversion JSON-Objet JavaScript
			//console.log(response);

			let meteo=`<p>Actuellement à ${ville.charAt(0).toUpperCase()+ville.substring(1).toLowerCase()} : ${response.current_condition.condition}`+
						`<br>La pression atmosphérique est de : ${response.current_condition.pressure} hPa`+
						`<br>Le taux d'humidité est de : ${response.current_condition.humidity}%`+
						`<br>Il fait : ${response.current_condition.tmp}°C</p>`+
						`<img src=${response.current_condition.icon_big}>`;         //Construction contenu HTML
			
			document.getElementById("Meteo").innerHTML=meteo;       //Envoi contenu HTML
		}
	};

	requeteURL="https://prevision-meteo.ch/services/json/"+ville;   //Construction requête

	request.open("GET",requeteURL);         //Type GET
	request.send();     //Envoi requête
}