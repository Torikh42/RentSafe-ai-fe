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
    <div className="min-h-screen p-6 md:p-12">
      <PropertyInspectionForm propertyId={id} />
    </div>
  );
}
