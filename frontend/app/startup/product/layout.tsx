import { ProductProvider } from "./components/context";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <ProductProvider>{children}</ProductProvider>;
}
