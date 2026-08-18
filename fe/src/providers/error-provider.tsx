import type { ReactNode } from "react"
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { Icons } from "@/widgets/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@base-ui/react";

export function ErrorSection() {
  const { resetBoundary } = useErrorBoundary();
  return (
    // <Box sx={{ minHeight: "100vh", p: 5 }}>
    //   <Paper elevation={0} sx={{ display: "flex", justifyContent:"center", flexDirection: "column", alignItems: "center", p: 5 }}>
    //     <Typography component="h1" variant="h1" mb={4}>☹️ <br/>Oops!</Typography>
    //     <Typography variant="h6" component="p" mb={4} color="error" sx={{ fontSize: "1.5rem" }}>Something went wrong!</Typography>
    //     <Button onClick={resetBoundary} color="default" variant="contained">Try again</Button>
    //   </Paper>
    // </Box>
    <div className="h-screen p-5">
     <Alert variant="destructive" className="max-w-md">
      <Icons.alertCircle />
      <AlertTitle>☹️ <br/>Oops!</AlertTitle>
      <AlertDescription>
        Something went wrong!
      </AlertDescription>

      <Button onClick={resetBoundary}>Try again</Button>
    </Alert>
    </div>
  );
}

function handleError(error, info){
  console.error(`Error info: ${info.componentStack}`);
  console.error(`Error: ${error}`)
}


const AppErrorProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary
      fallback={<ErrorSection />}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorProvider;