import { PropertyInspectionForm } from '@/components/features/inspections/PropertyInspectionForm';

interface InspectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyInspectPage({
  params,
}: InspectPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 dark:bg-[#0A0F1C] md:p-12">
      <PropertyInspectionForm propertyId={id} />
    </div>
  );
}
