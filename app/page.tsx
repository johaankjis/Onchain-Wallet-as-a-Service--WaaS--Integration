import { DashboardHeader } from "@/components/dashboard-header"
import { StatsOverview } from "@/components/stats-overview"
import { WalletCard } from "@/components/wallet-card"
import { TransactionQueue } from "@/components/transaction-queue"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { InfrastructureMonitor } from "@/components/infrastructure-monitor"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsOverview />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <TransactionQueue />
            <PerformanceMetrics />
          </div>

          <div className="space-y-6">
            <WalletCard />
            <InfrastructureMonitor />
          </div>
        </div>
      </main>
    </div>
  )
}
