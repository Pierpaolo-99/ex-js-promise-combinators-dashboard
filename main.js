/* In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:

 - Nome completo della città e paese da  /destinations?search=[query]
   (result.name, result.country, nelle nuove proprietà city e country).
 - Il meteo attuale da /weathers?search={query}
   (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
 - Il nome dell’aeroporto principale da /airports?search={query}
   (result.name nella nuova proprietà airport).

Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati. 

Scrivi la funzione getDashboardData(query), che deve:

 - Essere asincrona (async).
 - Utilizzare Promise.all() per eseguire più richieste in parallelo.
 - Restituire una Promise che risolve un oggetto contenente i dati aggregati.
 - Stampare i dati in console in un messaggio ben formattato.
 - Testa la funzione con la query "london" */

const API_URL = "http://localhost:3333";

async function getDashboardData(query) {
    try {
        const [destRes, weatherRes, airportRes] = await Promise.all([
            fetch(`${API_URL}/destinations?search=${query}`),
            fetch(`${API_URL}/weathers?search=${query}`),
            fetch(`${API_URL}/airports?search=${query}`)
        ]);

        if (!destRes.ok || !weatherRes.ok || !airportRes.ok) {
            throw new Error("Errore nel recupero dei dati dalle API");
        }

        const [destData, weatherData, airportData] = await Promise.all([
            destRes.json(),
            weatherRes.json(),
            airportRes.json()
        ]);

        const city = destData[0].name;
        const country = destData[0].country;
        const temperature = weatherData[0].temperature;
        const weather = weatherData[0].weather_description;
        const airport = airportData[0].name;

        const result = { city, country, temperature, weather, airport };

        return result;

    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
        throw error;
    }
}

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));