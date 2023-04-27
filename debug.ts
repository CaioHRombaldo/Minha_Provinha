async function pokemon_call(){
    let content = await fetch('https://pokeapi.co/api/v2/pokemon')
    console.log(await content.json())
}

pokemon_call()