import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

type HorseCardProps = {
    name: string,
    type: string,
    age: number
}

const HorseCard = ({name, type, age}: HorseCardProps) => {
    return (
        <Card className="mx-auto w-full max-w-xs">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{type}</CardDescription>
                <h3>{age}</h3>
            </CardContent>
        </Card>
    );
};

export default HorseCard;