import { toast } from "@/components/ui/toast"
import useAuthStore from "@/store/auth"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginSchema } from "@/schemas/common"
import { AppConfig } from "@/config/app-config"
import { Button } from "./ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { login } from "@/services/apis/auth"
import { useNavigate } from "react-router-dom"


export default function Login() {
  const { setUser } = useAuthStore(s=>s);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: AppConfig.default.email,
      password: AppConfig.default.password,
    },
  });

  async function onSubmit(data: LoginSchema){
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await login(data);
      if (res?.status === 200) {
        const user = res?.data?.user;
        setUser({
          ...user,
          firstName: user?.first_name,
          lastName: user?.last_name,
          fullName: user?.full_name,
        })
        setTimeout(()=>navigate(`/chat`),1000);
      }
    } catch (error) {
      console.error("Error while login", error);
      toast.add({ type: "error", priority: "high", description: error?.response?.data?.message });
    }
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col items-center justify-center space-y-12 sm:shadow-xl sm:rounded-2xl px-6 py-10 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-main">
          <div className="flex flex-col items-center mb-5">
            {/* <CommonAvatar /> */}
            <p className="text-xl text-gray-100">Look AI</p>
            {/* <FormDescription>Login into your account</FormDescription> */}
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FieldGroup>
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
            <Button
              className="w-full bg-primary"
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
            </FieldGroup>
          </form>
        </div>
      <div className="flex items-center justify-center px-2 py-6">
        &#169; Copyright {new Date().getFullYear()} {AppConfig.appName}
      </div>
    </section>
  );
}