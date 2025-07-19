import { JSX } from "react";
import ErrorMessage from "@/components/utils/ErrorMessage";

export default function NotFound(): JSX.Element {
  return <ErrorMessage message="Page not found" />;
}
