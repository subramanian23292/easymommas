import { Toaster } from 'sonner-native';

export function NotificationsProvider() {
    return (
        <Toaster
            position="bottom-center"
            duration={2000}
            swipeToDismissDirection="left"
            offset={100}
            icons={{
                success: null,
                error: null,
                warning: null,
                info: null,
                loading: null,
            }}
            toastOptions={{
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: 10,
                    minWidth: 250,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0,
                },
                titleStyle: {
                    color: '#fff',
                    fontSize: 14,
                    textAlign: 'center',
                },
            }}
        />
    );
}
