import type { InspectionResponse } from '@/types/inspection';

interface InspectionHistoryTableProps {
  inspections: InspectionResponse[];
}

export function InspectionHistoryTable({
  inspections,
}: InspectionHistoryTableProps) {
  return (
    <section className="mt-24 border-t border-secondary-300 pt-16">
      <h2 className="mb-8 font-display text-3xl font-semibold text-primary-900">
        Log Inspeksi AI
      </h2>
      <div className="w-full overflow-x-auto bg-white border border-secondary-200 p-4">
        {inspections.length > 0 ? (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-secondary-300">
                <th className="px-4 py-4 font-mono text-[11px] font-semibold uppercase text-secondary-500">
                  TANGGAL
                </th>
                <th className="px-4 py-4 font-mono text-[11px] font-semibold uppercase text-secondary-500">
                  ID INSPEKSI
                </th>
                <th className="px-4 py-4 text-right font-mono text-[11px] font-semibold uppercase text-secondary-500">
                  TIPE
                </th>
                <th className="px-4 py-4 text-right font-mono text-[11px] font-semibold uppercase text-secondary-500">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="font-mono text-[13px] text-primary-900">
              {inspections.map((insp: InspectionResponse) => (
                <tr
                  key={insp.id}
                  className="border-b border-secondary-200 transition-colors hover:bg-secondary-50"
                >
                  <td className="px-4 py-4 text-secondary-500">
                    {new Date(insp.createdAt).toISOString().split('T')[0]}{' '}
                    {new Date(insp.createdAt)
                      .toTimeString()
                      .split(' ')[0]
                      .slice(0, 5)}
                  </td>
                  <td className="px-4 py-4">
                    {insp.id.split('-')[0].toUpperCase()}
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-primary-900">
                    {insp.type.toUpperCase()}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span
                      className={`px-2 py-1 ${insp.status === 'completed' ? 'bg-success-50 text-success-700' : 'bg-secondary-100 text-secondary-600'}`}
                    >
                      {insp.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center text-secondary-500">
            <p>Belum ada riwayat inspeksi untuk properti ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}
