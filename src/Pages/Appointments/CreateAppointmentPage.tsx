import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {createAppointment} from "@/axios/Endpoints/createAppointment.ts";
import {Button} from "@/components/ui/button.tsx";


export const CreateAppointmentPage = () => {
    const appointmentSchema = z.object({
        name: z.string().min(1, "Name ist erforderlich"),
        type: z.string().optional(),
        description: z.string().optional(),
        starts_at: z.date().optional(),
        ends_at: z.date().optional()
    })

    const form = useForm<z.infer<typeof appointmentSchema>>({
        defaultValues: {
            name: "",
            type: "",
            description: "",
            starts_at: undefined,
            ends_at: undefined
        },
        resolver: zodResolver(appointmentSchema)
    })

    const onSubmit = (values: z.infer<typeof appointmentSchema>) => {
        createAppointment(values);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Neuer Termin</h1>
                        <p className="text-gray-600">Erstellen Sie einen neuen Termin</p>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FieldGroup>
                            {/* Name Field */}
                            <Controller
                                control={form.control}
                                name="name"
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                                            Name*
                                        </FieldLabel>
                                        <input
                                            {...field}
                                            id={field.name}
                                            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none data-[invalid]:border-red-500 data-[invalid]:ring-red-500"
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

                            {/* Type Field */}
                            <Controller
                                control={form.control}
                                name="type"
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                                            Typ
                                        </FieldLabel>
                                        <input
                                            {...field}
                                            id={field.name}
                                            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none data-[invalid]:border-red-500 data-[invalid]:ring-red-500"
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

                            {/* Description Field */}
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
                                        <textarea
                                            {...field}
                                            id={field.name}
                                            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none data-[invalid]:border-red-500 data-[invalid]:ring-red-500"
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

                            {/* Date Fields Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Start Date Field */}
                                <Controller
                                    control={form.control}
                                    name="starts_at"
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                                                Startdatum
                                            </FieldLabel>
                                            <input
                                                {...field}
                                                value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                                                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                                                id={field.name}
                                                type="datetime-local"
                                                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none data-[invalid]:border-red-500 data-[invalid]:ring-red-500"
                                                aria-invalid={fieldState.invalid}
                                                data-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1"/>
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* End Date Field */}
                                <Controller
                                    control={form.control}
                                    name="ends_at"
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                                                Enddatum
                                            </FieldLabel>
                                            <input
                                                {...field}
                                                value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                                                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                                                id={field.name}
                                                type="datetime-local"
                                                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none data-[invalid]:border-red-500 data-[invalid]:ring-red-500"
                                                aria-invalid={fieldState.invalid}
                                                data-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} className="text-red-500 text-sm mt-1"/>
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                                >
                                    Termin erstellen
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </div>
            </div>
        </div>
    );
};

