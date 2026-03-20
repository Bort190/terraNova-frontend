import {useAuth} from "@/Providers/AuthProvider.tsx";
import {z} from "zod";
import {useNavigate} from "@tanstack/react-router";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})
export const LoginPage = () => {
    const {handleLogin, currentUser} = useAuth();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        await handleLogin(values);
    };

    useEffect(() => {
        if (currentUser) {
            navigate({to: '/'});
        }
    }, [currentUser, navigate]);

    return (
        <Card className="w-full max-w-md">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle>
                        Login
                    </CardTitle>
                    <CardDescription>Bitte hier einloggen</CardDescription>
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name={"email"}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>E-Mail</FieldLabel>
                                    <Input {...field}
                                           id={field.name}
                                           aria-invalid={fieldState.invalid}/>

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}/>
                        <Controller
                            control={form.control}
                            name={"password"}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                    <Input {...field}
                                           id={field.name}
                                           aria-invalid={fieldState.invalid}/>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}/>
                        <Button type={"submit"}>Login</Button>
                    </FieldGroup>
                </CardContent>
            </form>
        </Card>
    );
};
