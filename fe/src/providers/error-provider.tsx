import type { ErrorInfo, ReactNode } from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";

import { Icons } from "@/widgets/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@base-ui/react";

export function ErrorSection() {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="h-screen p-5">
      <Alert variant="destructive" className="max-w-md">
        <Icons.alertCircle />

        <AlertTitle>
          ☹️ <br />
          Oops!
        </AlertTitle>

        <AlertDescription>
          Something went wrong!
        </AlertDescription>

        <Button onClick={resetBoundary}>Try again</Button>
      </Alert>
    </div>
  );
}

function handleError(error: unknown, info: ErrorInfo) {
  console.error("Error info:", info.componentStack);
  console.error("Error:", error);
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