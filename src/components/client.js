import { SanityClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

export const client = SanityClient({
    projectId: process.env.SANITY_PROJECT_TOKEN,
    dataset: 'production',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_PROJECT_ID ,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)