import {useEffect, useState} from "react";
import type {HorseType} from "../../axios/Types/HorseType.ts";

import {getAllHorses} from "../../axios/Endpoints/getAllHorses.ts";
import HorseCard from "../../components/Cards/HorseCard.tsx";


export const OverviewPage = () => {
    const [horses, setHorses] = useState<HorseType[]>([]);

    useEffect(() => {
        getAllHorses().then((res) => {
                if (res.success) {
                    setHorses(res.data)
                } else {
                    console.log(res.error)
                }
            }
        )
    }, []);


    return (
        <div className={'flex gap-6 flex-wrap'}>
            {horses?.map((horse) => (
                <HorseCard key={horse.id} name={horse.name} type={horse.type} age={horse.age}/>
            ))}
        </div>
    )
}
