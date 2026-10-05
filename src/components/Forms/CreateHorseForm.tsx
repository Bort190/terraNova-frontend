import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {DialogClose} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {createHorse} from "@/axios/Endpoints/createHorse.ts";

type CreateHorsePageProps = {
    onSuccess: () => void
}
export const CreateHorseForm = ({onSuccess}:CreateHorsePageProps) => {
    const createHorseSchema = z.object({
        name: z.string().min(1),
        type: z.string().min(1),
        date_of_birth: z.date().nullable()
    })

    const form = useForm({
        defaultValues: {
            name: "",
            type: "",
            date_of_birth: null
        },
        resolver: zodResolver(createHorseSchema)
    })
    const onSubmit = async (values: z.infer<typeof createHorseSchema>) => {
        try {
            await createHorse(values)
            onSuccess()
        }
        catch (e) {
            console.error(e)
        }
    }


    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    control={form.control}
                    name="name"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                            <Input {...field} id={field.name} aria-invalid={fieldState.invalid}/>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}/>
                <Controller
                    control={form.control}
                    name="type"
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Horse Type</FieldLabel>
                                <FieldDescription>Be as specific as possible</FieldDescription>
                            </FieldContent>
                            <Input {...field} id={field.name} aria-invalid={fieldState.invalid}/>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}/>
                <Controller
                    control={form.control}
                    name={"date_of_birth"}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldContent>
                                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                <FieldDescription>Be as specific as possible</FieldDescription>
                            </FieldContent>
                            <Input
                                type="date"
                                id={field.name}
                                value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                onChange={(e) =>
                                    field.onChange(
                                        e.target.value
                                            ? new Date(e.target.value)
                                            : null
                                    )
                                }
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                    )}
                />
                <div className="flex justify-between items-center">
                    <DialogClose asChild>
                        <Button>Abbrechen</Button>
                    </DialogClose>
                    <Button>Eintrag abschließen</Button>
                </div>
            </FieldGroup>
        </form>
    );
};
