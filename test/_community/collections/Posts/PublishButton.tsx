'use client'

import { Button, useDocumentInfo } from '@payloadcms/ui'

export const PublishButton = () => {
  const { versionCount } = useDocumentInfo()

  console.log('!! versionCount', versionCount)

  return <Button>Custom Publish</Button>
}
