'use client'
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode, useMemo, useState } from "react";
import { Table, TableCell, TableHead, TableHeader, TableBody, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

// Stat Card Types and Components
type OrderStatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  cardClassName?: string;
  iconClassName?: string;
};

function OrderStatCard({
  title,
  value,
  icon,
  cardClassName = "",
  iconClassName = "",
}: OrderStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex-1"
    >
      <Card className={`${cardClassName} rounded-xl border-none flex-1`}>
        <CardContent className="flex items-center gap-4 py-3">
          <span className={iconClassName}>{icon}</span>
          <div>
            <div className="text-gray-500 text-sm">{title}</div>
            <div className="text-xl font-bold text-gray-900">{value}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PendingOrdersIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TotalOrdersIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 3v4a1 1 0 0 0 1 1h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OrdersTodayIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 8v4l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

// Orders Table Data and Component
const initialOrders = [
  {
    id: "#1001",
    customer: "Alice Johnson",
    date: "2024-06-01",
    status: "Pending",
    statusColor: "yellow",
    amount: "Rs. 1,200",
  },
  {
    id: "#1002",
    customer: "Bob Smith",
    date: "2024-06-02",
    status: "Completed",
    statusColor: "green",
    amount: "Rs. 2,500",
  },
  {
    id: "#1003",
    customer: "Charlie Lee",
    date: "2024-06-03",
    status: "Processing",
    statusColor: "blue",
    amount: "Rs. 900",
  },
  {
    id: "#1004",
    customer: "Diana Prince",
    date: "2024-06-04",
    status: "Cancelled",
    statusColor: "red",
    amount: "Rs. 3,100",
  },
];

// Helper to parse "Rs. 1,200" to 1200 (number)
function parseAmount(amount: string) {
  return Number(amount.replace(/[^\d]/g, ""));
}

type OrdersTableProps = {
  orders: typeof initialOrders;
};

function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {orders.map((order, idx) => (
              <motion.tr
                key={order.id}
                className="align-middle [&>*]:align-middle !h-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded bg-${order.statusColor}-100 text-${order.statusColor}-700`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">{order.amount}</TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}

export default function Order() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  // Filtering and sorting logic
  const filteredOrders = useMemo(() => {
    let filtered = initialOrders;

    // Filter by search (customer name or order id)
    if (search.trim() !== "") {
      const lower = search.trim().toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.customer.toLowerCase().includes(lower) ||
          order.id.toLowerCase().includes(lower)
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === statusFilter
      );
    }

    // Sort
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === "date") {
          // Newest first
          return b.date.localeCompare(a.date);
        }
        if (sortBy === "amount") {
          // Highest amount first
          return parseAmount(b.amount) - parseAmount(a.amount);
        }
        if (sortBy === "customer") {
          return a.customer.localeCompare(b.customer);
        }
        return 0;
      });
    }

    return filtered;
  }, [search, sortBy, statusFilter]);

  return (
    <motion.div
      className="w-full min-h-[100vh] relative flex flex-col p-5 px-12"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Order Page
      </motion.h1>
      <motion.p
        className="text-gray-400"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Manage Your Orders
      </motion.p>
      <motion.div
        className="flex flex-col md:flex-row gap-6 mt-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.13,
            },
          },
        }}
      >
        <OrderStatCard
          title="Pending Orders"
          value={8}
          icon={<PendingOrdersIcon />}
          cardClassName="bg-yellow-50"
          iconClassName="text-yellow-500"
        />
        <OrderStatCard
          title="Total Orders"
          value="1,250"
          icon={<TotalOrdersIcon />}
          cardClassName="bg-purple-50"
          iconClassName="text-purple-500"
        />
        <OrderStatCard
          title="Orders Today"
          value={32}
          icon={<OrdersTodayIcon />}
          cardClassName="bg-pink-50"
          iconClassName="text-pink-500"
        />
      </motion.div>
      {/* Top bar: Search and Filters */}
      <motion.div
        className="flex flex-col gap-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <motion.input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            />
          </div>
          {/* Filters */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {/* Filter Dropdown (shadcn Select) */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
            {/* Status Filter Dropdown (shadcn Select) */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>
        {/* Orders Table */}
        <OrdersTable orders={filteredOrders} />
      </motion.div>
    </motion.div>
  );
}