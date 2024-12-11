import type { CollectionConfig } from 'payload'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  slug: postsSlug,
  admin: {
    useAsTitle: 'title',
    components: {
      edit: {
        PublishButton: './collections/Posts/PublishButton.tsx#PublishButton',
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 0,
  },
}
