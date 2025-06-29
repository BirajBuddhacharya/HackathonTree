"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BadgeDollarSign, LayoutDashboard, ShoppingBasket, BarChart3, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReactNode, useEffect, useState } from "react";
import Link from 'next/link'
// Dynamically import recharts to fix hydration/chart issues in Next.js
import dynamic from "next/dynamic";
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);
const Line = dynamic(
  () => import("recharts").then((mod) => mod.Line),
  { ssr: false }
);
const XAxis = dynamic(
  () => import("recharts").then((mod) => mod.XAxis),
  { ssr: false }
);
const YAxis = dynamic(
  () => import("recharts").then((mod) => mod.YAxis),
  { ssr: false }
);
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("recharts").then((mod) => mod.Tooltip),
  { ssr: false }
);
const Legend = dynamic(
  () => import("recharts").then((mod) => mod.Legend),
  { ssr: false }
);
const BarChart = dynamic(
  () => import("recharts").then((mod) => mod.BarChart),
  { ssr: false }
);
const Bar = dynamic(
  () => import("recharts").then((mod) => mod.Bar),
  { ssr: false }
);

// Types
type CardWithIconProps = {
  title: string;
  value: string;
  icon: ReactNode;
};

type CardProps = {
  title: string;
  value: string;
};

type RecentOrderUser = {
  name: string;
  email: string;
  imageUrl: string;
};

type RecentOrder = {
  id: number;
  user: RecentOrderUser;
};

type RecentOrderCardProps = {
  title: string;
  value: number | string;
};

function TotalSalesCard({ title, value, icon }: CardWithIconProps) {
  return (
    <Card className="bg-yellow-50 rounded-xl w-56 border-none">
      <CardContent className="flex items-center gap-4 py-6">
        <span className="text-yellow-500">{icon}</span>
        <div>
          <div className="text-gray-500 text-sm">{title}</div>
          <div className="text-xl font-bold text-gray-900">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function DailySalesCard({ title, value, icon }: CardWithIconProps) {
  return (
    <Card className="bg-yellow-50 rounded-xl w-full max-w-xs border-none">
      <CardContent className="flex items-center gap-4 py-6">
        <span className="text-yellow-500">{icon}</span>
        <div>
          <div className="text-gray-500 text-sm">{title}</div>
          <div className="text-xl font-bold text-gray-900">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Top Selling Products Bar Chart Card
const topProductsData = [
  { name: "Product A", sales: 1200 },
  { name: "Product B", sales: 950 },
  { name: "Product C", sales: 800 },
  { name: "Product D", sales: 700 },
  { name: "Product E", sales: 600 },
];

function TopSellingProductsCard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Card className="bg-blue-50 rounded-xl w-full border-none">
      <CardContent className="py-6 px-2 h-[250px] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="text-blue-500" size={25} />
          <span className="text-lg font-semibold">Top Selling Products</span>
        </div>
        {mounted ? (
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              data={topProductsData}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }} // fixed padding
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
              <Tooltip />
              <Bar dataKey="sales" fill="#3b82f6" barSize={24} name="Sales" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Loading chart...
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Monthly Sales Chart Card
const monthlySalesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4780 },
  { month: "May", sales: 5890 },
  { month: "Jun", sales: 4390 },
  { month: "Jul", sales: 4490 },
  { month: "Aug", sales: 5200 },
  { month: "Sep", sales: 6100 },
  { month: "Oct", sales: 7000 },
  { month: "Nov", sales: 8000 },
  { month: "Dec", sales: 9000 },
];

function MonthlySalesChartCard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Card className="bg-red-50 rounded-xl w-full border-none">
      <CardContent className="py-6 px-2 h-[250px] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <CalendarClock className="text-red-500" size={25} />
          <span className="text-lg font-semibold">Monthly Sales</span>
        </div>
        {mounted ? (
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              data={monthlySalesData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }} // fixed padding
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sales" fill="#ef4444" barSize={24} name="Sales" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Loading chart...
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecentOrderCard({ title, value }: RecentOrderCardProps) {
  // Example recent orders
  const recentOrder: RecentOrder[] = [
    {
      id: 1,
      user: {
        name: "Alice Johnson",
        email: "alice@example.com",
        imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    },
    {
      id: 2,
      user: {
        name: "Bob Smith",
        email: "bob@example.com",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    },
  ];

  return (
    <Card className="bg-purple-50 rounded-xl flex-1 flex flex-col h-full flex-1 border-none">
      <CardContent className="flex flex-col gap-4 py-6 h-full">
        <div className="flex items-center gap-3">
          <ShoppingBasket className="text-purple-500" size={25} />
          <span className="text-lg font-semibold">{title}</span>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          {recentOrder.length === 0 ? (
            <span className="text-gray-400 text-sm">No recent orders</span>
          ) : (
            recentOrder.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={order.user.imageUrl} alt={order.user.name} />
                    <AvatarFallback>
                      {order.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{order.user.name}</span>
                    <span className="text-xs text-gray-500">{order.user.email}</span>
                  </div>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/startup/order/${order.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            ))
          )}
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2">
          View More
        </Button>
      </CardContent>
    </Card>
  );
}

// Dummy data for the graph
const salesData = [
  { name: "Jan", sales: 4000, orders: 240, profit: 1200 },
  { name: "Feb", sales: 3000, orders: 221, profit: 1100 },
  { name: "Mar", sales: 5000, orders: 229, profit: 1500 },
  { name: "Apr", sales: 4780, orders: 200, profit: 1400 },
  { name: "May", sales: 5890, orders: 278, profit: 1700 },
  { name: "Jun", sales: 4390, orders: 189, profit: 1300 },
  { name: "Jul", sales: 4490, orders: 239, profit: 1350 },
  { name: "Aug", sales: 5200, orders: 260, profit: 1800 },
  { name: "Sep", sales: 6100, orders: 300, profit: 2000 },
  { name: "Oct", sales: 7000, orders: 320, profit: 2200 },
  { name: "Nov", sales: 8000, orders: 350, profit: 2500 },
  { name: "Dec", sales: 9000, orders: 400, profit: 3000 },
];

function SalesGraphCard() {
  // Only render chart on client (after mount) to avoid hydration issues
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="bg-white rounded-xl w-full border-none shadow">
      <CardContent className="py-6 px-2 h-[350px]">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="text-blue-500" size={25} />
          <span className="text-lg font-semibold">Sales Overview</span>
        </div>
        {mounted ? (
          <ResponsiveContainer width="100%" height="85%">
            <LineChart
              data={salesData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }} // fixed padding
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#f59e42" strokeWidth={2} dot={{ r: 3 }} name="Sales" />
              <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} name="Orders" />
              <Line type="monotone" dataKey="profit" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Loading chart...
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  // Example values
  const totalSales: string = "Rs. 10,000";
  const dailySales: string = "Rs. 1,000";
  const recentOrders: number = 15;

  return (
    <div className="min-h-screen p-0 md:p-10 flex flex-col gap-8 w-full">
      <div className="flex items-center gap-3">
        <LayoutDashboard size={30} className="text-primary" />
        <h1 className="text-2xl font-bold m-0">Dashboard</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <TotalSalesCard title="Total Sales" value={totalSales} icon={<BadgeDollarSign size={32} />} />
          <DailySalesCard title="Daily Sales" value={dailySales} icon={<BadgeDollarSign size={32} />} />
        </div>
        <TopSellingProductsCard />
      </div>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <MonthlySalesChartCard />
        <RecentOrderCard title="Recent Orders" value={recentOrders} />
      </div>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <SalesGraphCard />
      </div>
    </div>
  );
}