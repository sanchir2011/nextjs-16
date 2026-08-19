import { sileo } from "sileo";
import { ReactNode } from "react";

type SileoPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

type SileoStyles = {
  title?: string;
  description?: string;
  badge?: string;
  button?: string;
};

type ToastOptions = {
  description?: ReactNode | string;
  position?: SileoPosition;
  duration?: number | null;
  icon?: ReactNode | null;
  fill?: string;
  styles?: SileoStyles;
  roundness?: number;
  autopilot?: boolean | { expand: number; collapse: number };
};

type ActionOptions = ToastOptions & {
  button?: { title: string; onClick: () => void };
};

type SileoOptions = ToastOptions & {
  title: string;
};

type PromiseStates<T> = {
  loading: SileoOptions;
  success: SileoOptions | ((data: T) => SileoOptions);
  error: SileoOptions | ((err: unknown) => SileoOptions);
  action?: SileoOptions | ((data: T) => SileoOptions);
  position?: SileoPosition;
};

const defaultStyles: SileoStyles = {
  title: "text-background! normal-case!",
  description: "text-background/75!",
};

const withStyles = (options?: ToastOptions) => ({
  ...options,
  styles: { ...defaultStyles, ...options?.styles },
});

const toast = {
  success: (title: string, options?: ToastOptions) =>
    sileo.success({ title, ...withStyles(options) }),
  error: (title: string, options?: ToastOptions) =>
    sileo.error({ title, ...withStyles(options) }),
  info: (title: string, options?: ToastOptions) =>
    sileo.info({ title, ...withStyles(options) }),
  warning: (title: string, options?: ToastOptions) =>
    sileo.warning({ title, ...withStyles(options) }),
  action: (title: string, options?: ActionOptions) =>
    sileo.action({ title, ...withStyles(options) }),
  show: (title: string, options?: ToastOptions) =>
    sileo.show({ title, ...withStyles(options) }),
  promise: <T>(promise: Promise<T>, states: PromiseStates<T>) =>
    sileo.promise(promise, states),
  dismiss: (id: string) => sileo.dismiss(id),
  clear: (position?: SileoPosition) => sileo.clear(position),
};

export { toast };
