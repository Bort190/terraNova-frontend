import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Button} from "@/components/ui/button.tsx";
import {createAppointment} from "@/axios/Endpoints/createAppointment.ts";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {DialogClose} from "@/components/ui/dialog.tsx";
import DateTimePicker from "@/components/DateTimePicker/DateTimePicker.tsx";
import {useState} from "react";

type CreateAppointmentFormProps = {
    onSuccess: () => void
}
export const CreateAppointmentForm = ({onSuccess}: CreateAppointmentFormProps) => {
    const [customDuration, setCustomDuration] = useState<boolean>(false)
    const appointmentSchema = z.object({
        name: z.string().min(1, "Name ist erforderlich"),
        type: z.string().optional(),
        description: z.string().optional(),
        start_date: z.date().optional(),
        duration: z.number().optional(),
    })

    const form = useForm<z.infer<typeof appointmentSchema>>({
        defaultValues: {
            name: "",
            type: "",
            description: "",
            start_date: undefined,
            duration: undefined,
        },
        resolver: zodResolver(appointmentSchema)
    })
    const onSubmit = async (values: z.infer<typeof appointmentSchema>) => {
        try {
            await createAppointment(values)
            onSuccess()
        } catch (e) {
            console.error(e)
        }
    }

    const durations = [
        { label: "30 Minuten", value: 30 },
        { label: "1 Stunde", value: 60 },
        { label: "1,5 Stunden", value: 90 },
        { label: "2 Stunden", value: 120 },
    ];


    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
                <Controller
                    control={form.control}
                    name="name"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                                Name
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="z.B. Kundentermin"
                                aria-invalid={fieldState.invalid}
                                data-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1"/>
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="type"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                                Typ
                            </FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                placeholder="z.B. Meeting, Beratung, Workshop"
                                aria-invalid={fieldState.invalid}
                                data-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1"/>
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="description"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                                    Beschreibung
                                </FieldLabel>
                                <FieldDescription className="text-gray-500 text-sm">
                                    So spezifisch wie möglich
                                </FieldDescription>
                            </FieldContent>
                            <Textarea
                                {...field}
                                id={field.name}
                                placeholder="Detaillierte Beschreibung des Termins..."
                                aria-invalid={fieldState.invalid}
                                data-invalid={fieldState.invalid}
                                rows={4}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1"/>
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="start_date"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                                Startdatum
                            </FieldLabel>
                            <DateTimePicker
                                id={field.name}
                                value={field.value ?? undefined}
                                onValueChange={field.onChange}
                                aria_invalid={fieldState.invalid}
                                disabled={field.disabled}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1"/>
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name="duration"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                                Dauer
                            </FieldLabel>
                            <div className="grid grid-cols-2 gap-2">
                                {durations.map((duration) => (
                                    <Button
                                        key={duration.value}
                                        type="button"
                                        variant={
                                            field.value === duration.value
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() => field.onChange(duration.value)}
                                        disabled={customDuration}
                                    >
                                        {duration.label}
                                    </Button>
                                ))}
                            </div>
                        </Field>
                    )}
                />

                <Button type="button" onClick={() => setCustomDuration(!customDuration)}>Individuelle Dauer angeben</Button>
                {customDuration && (
                    <Controller
                        control={form.control}
                        name="duration"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                                    Individuelle Dauer
                                </FieldLabel>
                                <Input
                                    {...field}
                                    type={"number"}
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(
                                        e.target.value === "" ? undefined : e.target.valueAsNumber
                                    )}
                                    id={field.name}
                                    placeholder="Individuelle Dauer (min)"
                                    aria-invalid={fieldState.invalid}
                                    data-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1"/>
                                )}
                            </Field>
                        )}
                    />
                )}


                <div className="flex justify-between items-center p-2">
                    <DialogClose asChild>
                        <Button variant="outline" className="mr-2">Abbrechen</Button>
                    </DialogClose>
                    <Button variant="default" type="submit"> Termin erstellen </Button>
                </div>
            </FieldGroup>
        </form>
    );
};
