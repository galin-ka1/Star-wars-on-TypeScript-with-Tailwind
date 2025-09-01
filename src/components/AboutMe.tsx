import { useEffect, useState } from "react";
import { period } from "../utils/constants.ts";
import { characters } from "../utils/characters.ts";
import { useParams } from "react-router";

interface HeroInfo {
    name: string;
    height: string;
    birth_year: string;
    gender: string;
    mass: string;
    skin_color: string;
    eye_color: string;
}

const heroKeys: (keyof HeroInfo)[] = [
    "name",
    "height",
    "birth_year",
    "gender",
    "mass",
    "skin_color",
    "eye_color",
];

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

    const { heroId } = useParams();

    useEffect(() => {
        if (heroId != null) {
            const heroStorage = JSON.parse(localStorage.getItem(heroId) ?? "null");
            if (heroStorage && Date.now() - heroStorage.time < period) {
                setHero(heroStorage.payload);
            } else {
                fetch(characters[heroId].url)
                    .then((res) => res.json())
                    .then((data) => {
                        setHero(data);
                        const info = { payload: data, time: Date.now() };
                        localStorage.setItem(heroId, JSON.stringify(info));
                    });
            }
        }
    }, [heroId]);

    return (
        <div className="flex items-center justify-center m-1">
            <div className="text-center text-2xl w-1/2 border border-white ">
                {heroKeys.map((key) => (
                    <p key={key} >
                        {key.replace(/_/g, " ")}: {hero[key]}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default AboutMe;


