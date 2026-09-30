import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { LatestInvoice, Revenue } from "@/app/lib/definitions";
import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";

const placeholderRevenue: Revenue[] = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2100 },
  { month: "Apr", revenue: 2600 },
  { month: "May", revenue: 2400 },
  { month: "Jun", revenue: 3000 },
  { month: "Jul", revenue: 3400 },
  { month: "Aug", revenue: 3600 },
  { month: "Sep", revenue: 2800 },
  { month: "Oct", revenue: 3200 },
  { month: "Nov", revenue: 3300 },
  { month: "Dec", revenue: 4200 },
];

const placeholderLatestInvoices: LatestInvoice[] = [
  {
    id: "inv_1",
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
    amount: "$2,250.00",
  },
  {
    id: "inv_2",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    image_url: "/customers/delba-de-oliveira.png",
    amount: "$1,860.00",
  },
  {
    id: "inv_3",
    name: "Lee Robinson",
    email: "lee@robinson.com",
    image_url: "/customers/lee-robinson.png",
    amount: "$985.00",
  },
  {
    id: "inv_4",
    name: "Amy Burns",
    email: "amy@burns.com",
    image_url: "/customers/amy-burns.png",
    amount: "$1,320.00",
  },
  {
    id: "inv_5",
    name: "Michael Novotny",
    email: "michael@novotny.com",
    image_url: "/customers/michael-novotny.png",
    amount: "$760.00",
  },
];

const placeholderCardData = {
  numberOfInvoices: 12,
  totalPendingInvoices: "$4,200.00",
  totalPaidInvoices: "$12,860.00",
  numberOfCustomers: 6,
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const revenue = placeholderRevenue;
  const latestInvoices = placeholderLatestInvoices;
  const {
    numberOfInvoices,
    totalPendingInvoices,
    totalPaidInvoices,
    numberOfCustomers,
  } = placeholderCardData;

  return (
    <main>
      <div className={`${lusitana.className} flex flex-row justify-between`}>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <p>Logged in as: {session?.user.name ?? "Not authenticated"}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
