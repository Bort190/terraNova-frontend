import {useEffect, useState} from "react";
import type {HorseType} from "@/axios/Types/HorseType.ts";

import {getAllHorses} from "@/axios/Endpoints/getAllHorses.ts";
import HorseCard from "../../components/Cards/HorseCard.tsx";
import {Page, PageHeader} from "@/components/Page/Page.tsx";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {CreateHorseForm} from "@/components/Forms/CreateHorseForm.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CirclePlus} from "lucide-react";
import {handleAxiosError} from "@/axios/utils.ts";


export const HorsesOverviewPage = () => {
    const [horses, setHorses] = useState<HorseType[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchHorses = async () => {
            try {
                const horses = await getAllHorses();

                setHorses(horses);

            } catch (error) {
                handleAxiosError(error);
                console.error(error);
            }
        };

        fetchHorses();
    }, []);


    return (
        <Page>
            <PageHeader title={"Übersichtsseite"} />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="icon" variant="secondary"><CirclePlus /></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Neuen Eintrag erstellen</DialogTitle>
                    <DialogDescription>
                        Erstellen Sie hier einen neuen Eintrag
                    </DialogDescription>
                    <CreateHorseForm onSuccess={() => setOpen(false)}/>
                </DialogContent>
            </Dialog>
            <div className={"grid grid-cols-5 gap-4"}>
                {horses?.map((horse) => (
                    <HorseCard key={horse.id} name={horse.name} type={horse.type} age={horse.age}/>
                ))}
            </div>
        </Page>
    )
}
