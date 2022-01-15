import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import MainLayout from './src/components/layouts/MainLayout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            retry: false,
        },
    },
});

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <MainLayout {...props}>
                {element}
            </MainLayout>
        </QueryClientProvider>
    );
}