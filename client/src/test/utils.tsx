import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AuthProvider from "../store/auth-context";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter useTransitions={false}>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  );
};

export const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });
