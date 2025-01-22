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
      name: 'readOnlyContent',
      type: 'text',
      access: {
        create: () => false,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tab 1',
          name: 'tab1',
          fields: [
            {
              name: 'links1',
              label: 'links1',
              type: 'array',
              fields: [
                {
                  name: 'linkLabel',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Tab 2',
          name: 'tab2',
          fields: [
            {
              name: 'links2',
              label: 'links2',
              type: 'array',
              fields: [
                {
                  name: 'linkLabel',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
