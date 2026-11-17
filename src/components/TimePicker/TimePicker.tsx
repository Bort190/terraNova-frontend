"use client";

import {type KeyboardEvent, useEffect, useRef} from "react";
import {CalendarIcon, ChevronDownIcon, ChevronUpIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {format} from "date-fns";
import {de} from "date-fns/locale";

const MINUTE_STEP = 5;

const pad = (value: number) => String(value).padStart(2, "0");

type TimePickerProps = {
    id: string;
    value: Date | undefined;
    onValueChange: (date: Date | undefined) => void;
    aria_invalid?: boolean;
    disabled?: boolean;
}

type SegmentProps = {
    label: string;
    value: number;
    min: number;
    max: number;
    onStep: (direction: 1 | -1) => void;
};

const Segment = ({label, value, min, max, onStep}: SegmentProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            onStep(1);
        }
        if (event.key === "ArrowDown") {
            event.preventDefault();
            onStep(-1);
        }
    };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault(); // verhindert Scrollen der Seite
            onStep(event.deltaY < 0 ? 1 : -1);
        };

        el.addEventListener("wheel", handleWheel, {passive: false});
        return () => el.removeEventListener("wheel", handleWheel);
    }, [onStep]);

    return (
        <div className="flex flex-col items-center gap-1">
            <Button
                variant="ghost"
                type="button"
                size="icon-sm"
                aria-label={`Increase ${label}`}
                className="cursor-pointer text-muted-foreground"
                onClick={() => onStep(1)}
            >
                <ChevronUpIcon/>
            </Button>
            <div
                ref={ref}
                role="spinbutton"
                tabIndex={0}
                aria-label={label}
                aria-valuenow={value}
                aria-valuemin={min}
                aria-valuemax={max}
                onKeyDown={handleKeyDown}
                className="flex h-12 w-16 items-center justify-center rounded-lg border border-border bg-muted/40 text-3xl font-semibold tabular-nums text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
                {pad(value)}
            </div>
            <Button
                variant="ghost"
                type="button"
                size="icon-sm"
                aria-label={`Decrease ${label}`}
                className="cursor-pointer text-muted-foreground"
                onClick={() => onStep(-1)}
            >
                <ChevronDownIcon/>
            </Button>
        </div>
    );
};

export default function TimePicker({id, value, onValueChange, disabled, aria_invalid}: TimePickerProps) {
    const hour = value?.getHours() ?? 7;
    const minute = value?.getMinutes() ?? 30;

    const updateTime = (nextHour: number, nextMinute: number) => {
        const nextDate = value ? new Date(value) : new Date();

        nextDate.setHours(nextHour, nextMinute, 0, 0);
        onValueChange(nextDate);
    };

    const stepHour = (direction: 1 | -1) => {
        updateTime((hour + direction + 24) % 24, minute);
    };

    const stepMinute = (direction: 1 | -1) => {
        updateTime(hour, (minute + direction * MINUTE_STEP + 60) % 60);
    };
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
                    {value ? format(value, "HH:mm", {locale: de}) : <span>{pad(hour)}:{pad(minute)}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-xl border border-border p-5">
                    <div className="flex items-center gap-2">
                        <Segment label="Hour" value={hour} min={0} max={23} onStep={stepHour}/>
                        <span aria-hidden="true" className="text-3xl font-semibold text-muted-foreground">:</span>
                        <Segment label="Minute" value={minute} min={0} max={55} onStep={stepMinute}/>
                    </div>
                </div>
            </PopoverContent>
        </Popover>


    );
}
