import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

function useNetinfo() {
    const [netinfo, setNetinfo] = useState(null);

    useEffect(() => {
        const updateConnection = (state) => {
            const isOnline = state.isConnected && state.isInternetReachable;

            // Prevent setting state if value is unchanged
            setNetinfo(prev => {
                if (prev !== isOnline) {
                    return isOnline;
                }
                return prev;
            });
        };

        // Initial check
        NetInfo.fetch().then(updateConnection);

        // Subscribe to updates
        const unsubscribe = NetInfo.addEventListener(updateConnection);

        return () => unsubscribe();
    }, []);

    return netinfo;
}

export default useNetinfo;
