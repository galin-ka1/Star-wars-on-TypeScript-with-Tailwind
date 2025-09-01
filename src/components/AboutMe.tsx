import {useEffect, useState} from 'react';
import {period} from "../utils/constants.ts";
import {characters} from "../utils/characters.ts";
import {useParams} from "react-router";

interface HeroInfo {
    name: string,
    height: string,
    birth_year: string,
    gender: string,
    mass: string,
    skin_color: string,
    eye_color: string,
}

const AboutMe = () => {
    const [hero, setHero] = useState<HeroInfo>({
        name: "",
        height: "",
        birth_year: "",
        gender: "",
        mass: "",
        skin_color: "",
        eye_color: "",
    });
    const {heroId} = useParams();

    useEffect(() => {
        if (heroId != null) {
            const heroStorage = JSON.parse(localStorage.getItem(heroId)!);
            if (heroStorage && (Date.now() - heroStorage.time) < period) {
                setHero(heroStorage.payload)
            } else {
                fetch(characters[heroId].url)
                    .then(response => response.json())
                    .then(data => {
                        setHero(data);
                        const info = {
                            payload: data,
                            time: Date.now()
                        };
                        localStorage.setItem(heroId, JSON.stringify(info));
                    })
            }
        }
    }, [heroId])

    const heroLabels = [
        ["Name", hero.name],
        ["Height", hero.height],
        ["Birth Year", hero.birth_year],
        ["Gender", hero.gender],
        ["Mass", hero.mass],
        ["Skin color", hero.skin_color],
        ["Eye color", hero.eye_color],
    ];
    return (
        <div className="flex items-center justify-center ">
            <div className="text-center text-2xl w-1/2 border ">
                {heroLabels.map(([label, value]) => (
                    <p key={label} >
                        {label}: {value}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default AboutMe;