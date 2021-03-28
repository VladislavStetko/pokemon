import React,{useState, useEffect} from 'react'

function PokemonTypes({types}) {
    const [typesArray, setTypesArray] = useState(types);
    

    return (
        <div>
            {typesArray.map((item)=>(
                <div>
                    {item}
                </div> 
            ))}
        </div>
    )
}

export default PokemonTypes
