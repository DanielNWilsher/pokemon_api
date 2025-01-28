import Pokedex from 'pokedex-promise-v2';
import express from 'express';
import cors from 'cors';

const app = express();
const P = new Pokedex();
app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello from the backend!');
});

async function fetchPokemonData(req, res) {
    try {
        const golduckSpecies = await P.getPokemonSpeciesByName("golduck");
        const raichu = await P.getPokemonByName("raichu");
        const raichuName = raichu.name
        const englishName = golduckSpecies.names.filter(pokeAPIName => pokeAPIName.language.name === 'en')[0].name;
        const frenchName = golduckSpecies.names.filter(pokeAPIName => pokeAPIName.language.name === 'fr')[0].name;
        res.send(frenchName + ' = ' + englishName + ' & ' + raichuName);
    } catch (error) {
        console.error(error);
    }

    P.getPokemonByName(['eevee', 'ditto']) // with Promise
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
          console.error(error);
      });
}

app.get('/', (req, res) => {
    fetchPokemonData(req, res);
});

const port = 3100;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});