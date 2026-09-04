import type { ReactElement } from "react"
import { describe, it, expect, beforeEach, beforeAll, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import AuthLayout from "./auth-layout"
import useAuthStore from "@/store/auth"
import { AppConfig } from "@/config/app-config"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import ROUTES from "@/routes"
import AppLayout from "./app-layout"
import { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from '@tanstack/react-query'
import HomePage from "@/pages/home"



Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

const initialAuthState = useAuthStore.getState()

const testQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // Turn off retries for predictable unit tests
            },
        },
    })

const renderWithQueryProvider = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
    const queryClient = testQueryClient();

    function Wrapper({ children }: { children: React.ReactNode }) {
        return (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )
    }

    return {
        queryClient: testQueryClient,
        ...render(ui, { wrapper: Wrapper, ...options }),
    }
}

describe("AuthLayout", function () {
    beforeEach(() => {
        // Reset auth state before every test to prevent test leakage
        useAuthStore.setState(initialAuthState, true)
    })

    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: (query: string) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: () => { },
                removeListener: () => { },
                addEventListener: () => { },
                removeEventListener: () => { },
                dispatchEvent: () => true,
            }),
        })
    })

    // CASE: 1
    it("renders Spinner when isLoading is true", () => {
        useAuthStore.setState({
            isLoading: true,
            isAuthenticated: false
        })

        const router = createMemoryRouter([
            {
                element: <AuthLayout />,
                children: [{ path: ROUTES.HOME, element: <div>Home Page</div> }],
            },
        ],
            { initialEntries: [ROUTES.HOME] }
        )

        renderWithQueryProvider(<RouterProvider router={router} />)
        expect(screen.getByRole("status")).toBeInTheDocument() // Assuming Spinner uses role="status" or adjust query
    })

    // CASE: 2
    it("renders AppLayout when user is authenticated successfully", function () {
        useAuthStore.setState({
            user: {
                id: "29437242fjfyiyr29",
                firstName: "Max",
                lastName: "Doe",
                fullName: "Max Doe",
                email: AppConfig.defaultUser.email,
                contact: {
                    address: "",
                    phone: ""
                }
            },
            isAuthenticated: true,
            isLoading: false
        });

        const router = createMemoryRouter([
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: ROUTES.CHAT,
                        element: <AppLayout />
                    }
                ]
            }
        ],
            {
                initialEntries: [ROUTES.CHAT],
            }
        );

        renderWithQueryProvider(<RouterProvider router={router} />)
        expect(screen.getByTestId("chat-context-wrapper")).toBeInTheDocument()
    })

    // CASE: 3
    it("redirects to Home or Login Page due to unauthorised or not loggedin", function () {
        useAuthStore.setState({
            isAuthenticated: false,
            isLoading: false,
            user: null
        });

        const router = createMemoryRouter([
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: ROUTES.CHAT,
                        element: <AppLayout />,
                    },
                    {
                        path: ROUTES.HOME,
                        element: <HomePage /> 
                    },
                ]
            }
        ],
            {
                initialEntries: [ROUTES.CHAT],
            }
        )

        renderWithQueryProvider(<RouterProvider router={router} />)
        expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument()
    })

})