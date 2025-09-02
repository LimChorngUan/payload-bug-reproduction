'use client'

import { PublishButton, useDocumentInfo } from '@payloadcms/ui'

const CustomPublishButton = () => {
  const { hasPublishedDoc } = useDocumentInfo()

  console.log('!! hasPublishedDoc:', hasPublishedDoc)

  return <PublishButton label="Custom Publish" />
}

export default CustomPublishButton
