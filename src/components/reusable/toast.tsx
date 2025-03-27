import { toast } from "sonner";

interface Props {
  message: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  variant?: "success" | "destructive" | "default";
}

export const ToastComponent = ({ message, description, actionLabel, onActionClick, variant = "default" }: Props) => {
  const toastFn = { success: toast.success,
                    destructive: toast.error,
                    default: toast  }[variant];

    toastFn(message, { description, action: actionLabel ? {
                label: actionLabel,
                onClick: onActionClick || (() => console.log("Action clicked")),
                }
            : undefined,
        })
};

