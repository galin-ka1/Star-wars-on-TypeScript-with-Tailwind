import {createContext} from "react";


export interface hero{
    hero:string,
    setHero: React.Dispatch<React.SetStateAction<string>>
}

export const HeroContext = createContext <hero|null>(null)