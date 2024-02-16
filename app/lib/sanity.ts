import { createClient } from "next-sanity";

export const client = createClient({
    apiVersion:'2024-02-15',
    dataset: 'production',
    projectId: '0bxk0xf6',
    useCdn: true,
})