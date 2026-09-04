import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProfileMenu } from "./profile-menu"
import useAuthStore from "@/store/auth"

const initialAuthState = useAuthStore.getState()

describe("ProfileMenu", () => {
  beforeEach(() => {
    useAuthStore.setState(initialAuthState, true)
  })

  it("renders profile menu trigger button by test id", () => {
    // Populate store state with initial user data
    useAuthStore.setState({
      user: {
        id: "1",
        firstName: "Max",
        lastName: "Doe",
        fullName: "Max Doe",
        email: "max@example.com",
        contact: { address: "", phone: "" },
      },
      isAuthenticated: true,
    })

    render(<ProfileMenu />)

    const profileMenu = screen.getByTestId("profile-menu")
    expect(profileMenu).toBeInTheDocument()
  })
})