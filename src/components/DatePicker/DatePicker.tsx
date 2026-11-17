import {Button} from "@/components/ui/button.tsx";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {de} from "date-fns/locale";


type DatePickerProps = {
    id: string;
    value: Date | undefined;
    onValueChange: (date: Date | undefined) => void;
    aria_invalid?: boolean;
    disabled?: boolean;
}
const DatePicker = ({id, value, onValueChange, disabled, aria_invalid}: DatePickerProps) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    type={"button"}
                    variant="outline"
                    data-empty={!value}
                    className="w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    disabled={disabled}
                    aria-invalid={aria_invalid}
                >
                    <CalendarIcon/>
                    {value ? format(value, "PPP", {locale: de}) : <span>Datum auswählen</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={value} onSelect={onValueChange}/>
            </PopoverContent>
        </Popover>
    )
};

export default DatePicker;