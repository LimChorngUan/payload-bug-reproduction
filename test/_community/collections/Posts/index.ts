import type { CollectionConfig } from 'payload'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  slug: postsSlug,
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'text',
      admin: {
        components: {
          Label: './collections/Posts/CustomLabel#CustomLabel',
        },
      },
    },
  ],
  versions: {
    drafts: true,
  },
}
