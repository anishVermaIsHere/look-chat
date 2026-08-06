import { toast } from "@/components/ui/toast"
import useAuthStore from "@/store/auth";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schemas/common";
import { AppConfig } from "@/config/app-config";

export default function Login() {
  const { user, setUser } = useAuthStore(s=>s)
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "maxd",
      password: "dcrobin#2025",
    },
  });

  async function onSubmit(data) {
    try {
      // setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await login(data);
      setUser(res.data.user);
      if (res?.status === 200) {
        toast.add({ type:"success", description: "Logged in successfully" });
        // setTimeout(()=>router.push(`/u/${userId}/dashboard`),1000);
      }
    } catch (error) {
      console.error("Error while login", error);
      toast.add({ type: "error", priority: "high", description: error.response.data.message });
    } finally {
      // setTimeout(() => setLoading(false), 2000);
    }
  }

  if (form.formState.isSubmitSuccessful) {
    setTimeout(()=>router.push(`/u/${user.id}/dashboard`),3000);
    return <section className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-gray-500 font-medium text-lg">Redirecting...</p>
      {/* <Dots /> */}
    </section>
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-[#faf9fb]">
      <Form {...form}>
        <div className="flex flex-col items-center justify-center space-y-12 sm:shadow-xl sm:rounded-2xl px-6 py-10 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="flex flex-col items-center mb-5">
            <CommonAvatar />
            <p className="text-xl">Resource Sphere</p>
            <FormDescription>Login into your account</FormDescription>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="batman" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </Form>
      <div className="flex items-center justify-center px-2 py-6">
        &#169; Copyright {new Date().getFullYear()} {AppConfig.appName}
      </div>
    </section>
  );
}