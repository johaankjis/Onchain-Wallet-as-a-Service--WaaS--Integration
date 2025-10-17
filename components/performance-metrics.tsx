"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const gasData = [
  { time: "00:00", l1: 45, l2: 12 },
  { time: "04:00", l1: 52, l2: 15 },
  { time: "08:00", l1: 48, l2: 14 },
  { time: "12:00", l1: 55, l2: 16 },
  { time: "16:00", l1: 50, l2: 13 },
  { time: "20:00", l1: 47, l2: 12 },
  { time: "24:00", l1: 49, l2: 14 },
]

const latencyData = [
  { time: "00:00", p50: 120, p95: 280, p99: 450 },
  { time: "04:00", p50: 115, p95: 270, p99: 420 },
  { time: "08:00", p50: 125, p95: 290, p99: 460 },
  { time: "12:00", p50: 118, p95: 275, p99: 440 },
  { time: "16:00", p50: 122, p95: 285, p99: 455 },
  { time: "20:00", p50: 116, p95: 272, p99: 435 },
  { time: "24:00", p50: 119, p95: 278, p99: 445 },
]

const throughputData = [
  { time: "00:00", transactions: 1200 },
  { time: "04:00", transactions: 980 },
  { time: "08:00", transactions: 1450 },
  { time: "12:00", transactions: 1680 },
  { time: "16:00", transactions: 1520 },
  { time: "20:00", transactions: 1380 },
  { time: "24:00", transactions: 1250 },
]

export function PerformanceMetrics() {
  return (
    <Card className="p-6">
      <Tabs defaultValue="gas" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Performance Metrics</h3>
          <TabsList>
            <TabsTrigger value="gas">Gas Costs</TabsTrigger>
            <TabsTrigger value="latency">Latency</TabsTrigger>
            <TabsTrigger value="throughput">Throughput</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="gas" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Avg L2 Gas Cost</p>
              <p className="text-2xl font-semibold text-foreground mt-1">0.0014 ETH</p>
              <p className="text-xs text-accent mt-1">-32% vs L1</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Total Savings (24h)</p>
              <p className="text-2xl font-semibold text-foreground mt-1">2.4 ETH</p>
              <p className="text-xs text-accent mt-1">$4,032 USD</p>
            </div>
          </div>

          <ChartContainer
            config={{
              l1: {
                label: "L1 Gas Cost",
                color: "hsl(var(--chart-5))",
              },
              l2: {
                label: "L2 Gas Cost",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="l1"
                  stackId="1"
                  stroke="hsl(var(--chart-5))"
                  fill="hsl(var(--chart-5))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="l2"
                  stackId="2"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>

        <TabsContent value="latency" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-xs text-muted-foreground">p50 Latency</p>
              <p className="text-2xl font-semibold text-foreground mt-1">119ms</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-xs text-muted-foreground">p95 Latency</p>
              <p className="text-2xl font-semibold text-foreground mt-1">278ms</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-xs text-muted-foreground">p99 Latency</p>
              <p className="text-2xl font-semibold text-foreground mt-1">445ms</p>
            </div>
          </div>

          <ChartContainer
            config={{
              p50: {
                label: "p50",
                color: "hsl(var(--accent))",
              },
              p95: {
                label: "p95",
                color: "hsl(var(--primary))",
              },
              p99: {
                label: "p99",
                color: "hsl(var(--chart-5))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="p50"
                  stroke="hsl(var(--accent))"
                  fill="hsl(var(--accent))"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="p95"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="p99"
                  stroke="hsl(var(--chart-5))"
                  fill="hsl(var(--chart-5))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>

        <TabsContent value="throughput" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Avg Throughput</p>
              <p className="text-2xl font-semibold text-foreground mt-1">1,351</p>
              <p className="text-xs text-muted-foreground mt-1">tx/hour</p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Peak Throughput</p>
              <p className="text-2xl font-semibold text-foreground mt-1">1,680</p>
              <p className="text-xs text-muted-foreground mt-1">tx/hour</p>
            </div>
          </div>

          <ChartContainer
            config={{
              transactions: {
                label: "Transactions",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="transactions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
