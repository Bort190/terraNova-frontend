import {useEffect, useState} from "react";
import type {HorseType} from "@/axios/Types/HorseType.ts";

import {getAllHorses} from "@/axios/Endpoints/getAllHorses.ts";
import HorseCard from "../../components/Cards/HorseCard.tsx";
import {Page, PageHeader} from "@/components/Page/Page.tsx";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {CreateHorseForm} from "@/Pages/Horses/create.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CirclePlus} from "lucide-react";


export const OverviewPage = () => {
    const [horses, setHorses] = useState<HorseType[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getAllHorses().then((res) => {
                if (res.status) {
                    setHorses(res.data)
                } else {
                    console.log("irgendwas ist schiefgelaufen")
                }
            }
        )
    }, []);


    return (
        <Page>
            <PageHeader title={"Übersichtsseite"} />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="icon" variant="destructive"><CirclePlus /></Button>
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
