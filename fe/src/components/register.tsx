import { isAxiosError } from "axios"
import { toast } from "@/components/ui/toast"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterSchema } from "@/schemas/common"
import { AppConfig } from "@/config/app-config"
import { Button } from "./ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { signup } from "@/services/apis/auth"
import { useSearchParams } from "react-router-dom"
import BrandLogo from "@/widgets/logo"


export default function Register() {
    const [searchParams, setSearchParams] = useSearchParams();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    async function onSubmit(data: RegisterSchema) {
        try {
            const res = await signup(data);
            if (res?.status === 201) {
                toast.add({ type: "success", priority: "high", description: "Your account created successfully" });
                form.reset();
            }
        } catch (error) {
            console.error("Error while Signup/Register", error);
            if(isAxiosError(error)){
                toast.add({ type: "error", priority: "high", description: error?.response?.data?.message });
            }
        }
    }

    const handleLoginLink = () => setSearchParams({ auth_type: "login" })

    return (
        <section className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex flex-col items-center justify-center space-y-4 sm:shadow-xl sm:rounded-2xl px-6 py-10 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-main">
                <div className="flex flex-col items-center mb-5">
                    <p className="flex items-center gap-2 text-xl text-gray-100"><BrandLogo className="size-8" /> {AppConfig.appName}</p>
                </div>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                >
                    <FieldGroup className="gap-4">
                        <div className="flex gap-4">
                        <Controller
                            name="first_name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="text-gray-100">
                                    <FieldLabel htmlFor="first_name">
                                        First Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="first_name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Bruce"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="last_name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="text-gray-100">
                                    <FieldLabel htmlFor="last_name">
                                        Last Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="last_name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Wayne"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        </div>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="text-gray-100">
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="batman@justiceleague.com"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="text-gray-100">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="*******"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="confirmPassword"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="text-gray-100">
                                    <FieldLabel htmlFor="confirmPassword">
                                       Repeat Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="confirmPassword"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="*******"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Button
                            className="w-full bg-primary"
                            type="submit"
                            disabled={!form.formState.isValid || form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? 'Creating...' : 'Register'}
                        </Button>
                    </FieldGroup>
                </form>
                <p className="text-sm">Already a Member ?</p>
                <Button className="w-full bg-primary" type="button" onClick={handleLoginLink}>Login</Button>
            </div>
            <div className="flex items-center justify-center px-2 py-6">
                &#169; Copyright {new Date().getFullYear()} {AppConfig.appName}
            </div>
        </section>
    );
}