import { Card } from '@/app/ui/dashboard/cards'
import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { lusitana } from '@/app/ui/fonts'
import { 
  fetchRevenue, 
  fetchLatestInvoices, 
  fetchTotalInvoices,
  fetchTotalCustomers, 
  fetchPaidInvoicesAmount,
  fetchPendingInvoicesAmount 
} from '@/app/lib/data'
import { Suspense } from 'react'
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from '../ui/skeletons'
 
export default async function Page() {
  const numberOfInvoices = await fetchTotalInvoices();
  const numberOfCustomers = await fetchTotalCustomers();
  const totalPaidInvoices = await fetchPaidInvoicesAmount();
  const totalPendingInvoices = await fetchPendingInvoicesAmount();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Panel de Administración
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Recolectado" value={totalPaidInvoices} type="collected" />
        <Card title="Pendiente" value={totalPendingInvoices} type="pending" />
        <Card title="Facturas Totales" value={numberOfInvoices} type="invoices" />
        <Card
          title="Clientes Totales"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />} >
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />} >
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}