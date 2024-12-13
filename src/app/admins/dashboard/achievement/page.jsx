import React from 'react'

import AchievementContent from '@/components/hooks/admin/achievement/AchievementContent'

export async function generateMetadata() {
  return {
    title: `Achievement Management`,
    description: `Manage achievement section content and settings`,
  };
}

export default function Achievement() {
  return (
    <AchievementContent />
  )
}
