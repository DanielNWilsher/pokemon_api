import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [currentIndex, setCurrentIndex] = useState(1); // Start with the first Pokémon
    const [currentPokemon, setCurrentPokemon] = useState(null);

    useEffect(() => {
        // Fetch the current Pokémon based on the index
        fetch(`https://pokeapi.co/api/v2/pokemon/${currentIndex}`)
            .then(res => res.json())
            .then(data => setCurrentPokemon(data))
            .catch(err => console.error(err));
    }, [currentIndex]); // Re-fetch when currentIndex changes

    const handleNext = () => {
        if (currentIndex < 151) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 1) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="App">
            <div>
                <img src="/pokelogo.png" 
                alt="Pokédex Logo" 
                className='pokemon-header'/>
            </div>
            {currentPokemon ? (
                <div
                    className="pokemon-card"
                    style={{
                        backgroundImage: `url("/images/poke-dex-surround.jpeg")`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                >
                    <img
                        src={currentPokemon.sprites.front_default}
                        alt={currentPokemon.name}
                        className="pokemon-image"
                    />
                    <p>{currentPokemon.name}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="navigation-buttons">
                <button onClick={() => setCurrentIndex(1)} disabled={currentIndex === 1}>
                    Start
                </button>
                <button onClick={handlePrevious} disabled={currentIndex === 1}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={currentIndex === 151}>
                    Next
                </button>
                <button onClick={() => setCurrentIndex(151)} disabled={currentIndex === 151}>
                    End
                </button>
            </div>
        </div>
    );
}

export default App;