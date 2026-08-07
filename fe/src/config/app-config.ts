

export const AppConfig = {
    appName: "Look AI",
    baseUrl: import.meta.env.VITE_BASE_URL,
    default: {
        email: import.meta.env.VITE_LOGIN_EMAIL,
        password: import.meta.env.VITE_LOGIN_PASSWORD
    }
}