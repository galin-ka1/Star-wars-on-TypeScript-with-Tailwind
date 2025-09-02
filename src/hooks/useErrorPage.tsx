import {useParams} from "react-router";
import {defaultHero} from "../utils/constants.ts";
import {useContext, useEffect} from "react";
import {HeroContext} from "../utils/useContext.ts";
import {characters} from "../utils/characters.ts";

export const useErrorPage = () => {
    const {heroId = defaultHero} = useParams();
    const {setHero} = useContext(HeroContext)!;

    useEffect(() => {
        if (!(heroId in characters)) {
            return;
        }
        setHero(heroId)
    }, [heroId]);

    return {
        isError: !(heroId in characters),
        heroId
    }
}