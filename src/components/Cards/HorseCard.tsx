type HorseCardProps = {
    name: string,
    type: string,
    age: number
}

const HorseCard = ({name, type, age}: HorseCardProps) => {
    return (
        <div className={'h-75 w-60 p-8 bg-white border rounded-2xl shadow-2xl hover:cursor-pointer'}>
            <h1>{name}</h1>
            <h2>{type}</h2>
            <h3>{age}</h3>
        </div>
    );
};

export default HorseCard;