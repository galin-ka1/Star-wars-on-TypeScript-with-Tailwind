import {useContext} from 'react';
import {characters} from "../utils/characters.ts";
import {HeroContext} from "../utils/useContext.ts";

const Hero = () => {
    const {hero: heroId} = useContext(HeroContext)!;

    return (
        <section className="float-start w-25">
            <img className="w-100" src={characters[heroId].img} alt="hero"/>
        </section>
    );
};

export default Hero;