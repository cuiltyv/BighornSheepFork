import "./Home.css";

function Home() {

    const superheroes = [
        {
            name: "Batman",
            realName: "Bruce Wayne",
            power: "Rich",
        },
        {
            name: "Superman",
            realName: "Clark Kent",
            power: "Super strength and speed"
        },
        {
            name: "Hulk",
            realName: "Bruce Banner",
            power: "Super strength"
        }

    ]
    return (
        <div>
            <h1>Superhero Information</h1>
            <ul>
                {superheroes.map((superhero, index) => {
                    return (
                        <li key={index}>
                            <h2>{index+1}: {superhero.name}</h2>
                            <p>Real Name: {superhero.realName}</p>
                            <p>Power: {superhero.power}</p>
                        
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Home;