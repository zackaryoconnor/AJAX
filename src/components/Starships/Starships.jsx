import { useState } from "react"
// import starshipsData from "../../model/starshipsData.js"
import styles from './Starships.module.css'

const Starships = () => {


    const [starships, setStarships] = useState([])
    const [searchedStarship, setSearchedStarship] = useState('')


    const fetchData = async () => {
        const url = 'https://swapi.dev/api/starships/'

        const response = await fetch(url)
        const data = await response.json()

        const starshipData = data.results.map(starship => ({
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            starshipClass: starship.starship_class
        }))

        setStarships(starshipData)
    }
    fetchData()


    const filteredStarships = starships.filter(starship => starship.name.toLowerCase().includes(searchedStarship.toLowerCase()))




    return (
        <>
            <h1>Starships</h1>
            <input
                type="text"
                placeholder="Search Starships..."
                value={searchedStarship}
                onChange={(event) => setSearchedStarship(event.target.value)}
                className={styles.searchInput}
            />

            <p id="searchResults"><strong>{filteredStarships.length}</strong> starship{filteredStarships.length !== 1 ? 's' : ''} displayed</p>

            <div className={styles.cardContainer}>
                {filteredStarships.length > 0 ? (
                    filteredStarships.map((starship, index) => (
                        <div key={index} className={styles.card}>
                            <h2>{starship.name}</h2>
                            <p>Starship Class: {starship.starshipClass}</p>
                            <p>Starship Manufacturer: {starship.manufacturer}</p>
                            <p>Starship Model: {starship.model}</p>
                        </div>

                    ))
                ) : (
                    <p>No starships found.</p>
                )}
            </div>
        </>
    )
}

export default Starships