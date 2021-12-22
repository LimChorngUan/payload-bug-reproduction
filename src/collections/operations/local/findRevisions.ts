import { Document, Where } from '../../../types';
import { PaginatedDocs } from '../../../mongoose/types';
import { TypeWithRevision } from '../../../revisions/types';

export type Options = {
  collection: string
  depth?: number
  page?: number
  limit?: number
  locale?: string
  fallbackLocale?: string
  user?: Document
  overrideAccess?: boolean
  showHiddenFields?: boolean
  sort?: string
  where?: Where
}

export default async function findRevisions<T extends TypeWithRevision<T> = any>(options: Options): Promise<PaginatedDocs<T>> {
  const {
    collection: collectionSlug,
    depth,
    page,
    limit,
    where,
    locale = this?.config?.localization?.defaultLocale,
    fallbackLocale = null,
    user,
    overrideAccess = true,
    showHiddenFields,
    sort,
  } = options;

  const collection = this.collections[collectionSlug];

  return this.operations.collections.findRevisions({
    where,
    page,
    limit,
    depth,
    collection,
    sort,
    overrideAccess,
    showHiddenFields,
    req: {
      user,
      payloadAPI: 'local',
      locale,
      fallbackLocale,
      payload: this,
    },
  });
}
