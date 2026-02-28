import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import Button from "@/components/Button.tsx";
import {createAppointment} from "@/axios/Endpoints/createAppointment.ts";


export const CreateAppointmentPage = () => {
    const testSchema = z.object({
        name: z.string().min(1),
        description: z.string().transform(v => v || undefined)
    })

    const form = useForm({
        defaultValues: {
            name: "",
            description: ""
        },
        resolver: zodResolver(testSchema)
    })

    const onSubmit = (values: z.infer<typeof testSchema>) => {
        createAppointment(values);
    }

    return (
        <div className={"container px-4 mx-auto my-6"}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        control={form.control}
                        name="name"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                <input {...field} id={field.name} className={"border p-2"}
                                       aria-invalid={fieldState.invalid}/>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}/>
                    <Controller
                        control={form.control}
                        name="description"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldContent>
                                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                    <FieldDescription>Be as specific as possible</FieldDescription>
                                </FieldContent>
                                <textarea {...field} id={field.name} className={"border p-2"}
                                          aria-invalid={fieldState.invalid}/>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}/>
                    <Button>Create</Button>
                </FieldGroup>
            </form>
        </div>
    );
};

