import { toast } from 'sonner-native';

let currentId = null;

// Drop-in replacement for your old notifySingle()
export const notifySingle = (type, options) => {
    // dismiss previous toast
    if (currentId !== null) {
        toast.dismiss(currentId);
    }

    const title = options?.params?.title ?? '';
    const duration = options?.duration ?? 2000;

    currentId = toast(title, { duration });
};

// Direct access if needed elsewhere
export { toast };
