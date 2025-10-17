import { Card } from "@/components/ui/card"
import { TrendingDown, Zap, Clock, Activity } from "lucide-react"

const stats = [
  {
    label: "Gas Savings",
    value: "32%",
    change: "+5% vs L1",
    icon: TrendingDown,
    color: "text-accent",
  },
  {
    label: "App Start Time",
    value: "1.1s",
    change: "Target: <1.2s",
    icon: Zap,
    color: "text-chart-3",
  },
  {
    label: "Cold Start Latency",
    value: "25%",
    change: "Reduction",
    icon: Clock,
    color: "text-primary",
  },
  {
    label: "Active Transactions",
    value: "1,247",
    change: "+12% today",
    icon: Activity,
    color: "text-chart-4",
  },
]

export function StatsOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
              <div className={`rounded-lg bg-secondary p-2 ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
