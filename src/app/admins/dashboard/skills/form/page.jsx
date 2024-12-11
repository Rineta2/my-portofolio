import SkillFormClient from '@/components/hooks/admin/skills/form/SkillFormClient';

export async function generateMetadata({ searchParams }) {
  const id = searchParams?.id;
  return {
    title: id ? 'Edit Skill' : 'Add New Skill',
    description: id ? 'Edit existing skill' : 'Create a new skill',
  };
}

export default function SkillsForm() {
  return <SkillFormClient />;
}