"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, XCircle, Loader2, ExternalLink } from "lucide-react"

const transactions = [
  {
    id: "1",
    type: "send",
    status: "completed",
    amount: "0.5 ETH",
    to: "0x1234...5678",
    timestamp: "2 mins ago",
    layer: "L2",
    gasFee: "0.0001 ETH",
    hash: "0xabc...def",
  },
  {
    id: "2",
    type: "receive",
    status: "completed",
    amount: "1.2 ETH",
    from: "0x9876...4321",
    timestamp: "15 mins ago",
    layer: "L2",
    gasFee: "0.0001 ETH",
    hash: "0x123...789",
  },
  {
    id: "3",
    type: "send",
    status: "pending",
    amount: "0.3 ETH",
    to: "0xabcd...efgh",
    timestamp: "Just now",
    layer: "L2",
    gasFee: "0.0001 ETH",
    hash: "0xdef...abc",
  },
  {
    id: "4",
    type: "send",
    status: "queued",
    amount: "0.8 ETH",
    to: "0x5555...6666",
    timestamp: "Offline",
    layer: "L2",
    gasFee: "0.0001 ETH",
    hash: null,
  },
]

const queuedTransactions = [
  {
    id: "q1",
    type: "send",
    amount: "0.8 ETH",
    to: "0x5555...6666",
    timestamp: "Queued 5m ago",
    gasFee: "0.0001 ETH",
  },
  {
    id: "q2",
    type: "send",
    amount: "0.2 ETH",
    to: "0x7777...8888",
    timestamp: "Queued 12m ago",
    gasFee: "0.0001 ETH",
  },
  {
    id: "q3",
    type: "send",
    amount: "1.5 ETH",
    to: "0x9999...0000",
    timestamp: "Queued 18m ago",
    gasFee: "0.0002 ETH",
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-accent" />
    case "pending":
      return <Loader2 className="h-4 w-4 text-chart-3 animate-spin" />
    case "failed":
      return <XCircle className="h-4 w-4 text-destructive" />
    case "queued":
      return <Clock className="h-4 w-4 text-muted-foreground" />
    default:
      return null
  }
}

function getStatusBadge(status: string) {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className: string }> =
    {
      completed: { variant: "outline", className: "border-accent text-accent" },
      pending: { variant: "outline", className: "border-chart-3 text-chart-3" },
      failed: { variant: "destructive", className: "" },
      queued: { variant: "secondary", className: "" },
    }

  return variants[status] || variants.queued
}

export function TransactionQueue() {
  return (
    <Card className="p-6">
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Transactions</h3>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="queue">
              Queue
              <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                {queuedTransactions.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-3 mt-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${tx.type === "send" ? "bg-destructive/10" : "bg-accent/10"}`}>
                  {tx.type === "send" ? (
                    <ArrowUpRight className={`h-4 w-4 ${tx.type === "send" ? "text-destructive" : "text-accent"}`} />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-accent" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{tx.type === "send" ? "Send" : "Receive"}</p>
                    <Badge {...getStatusBadge(tx.status)} className="h-5 text-xs">
                      {tx.status}
                    </Badge>
                    <Badge variant="outline" className="h-5 text-xs border-primary text-primary">
                      {tx.layer}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {tx.type === "send" ? `To: ${tx.to}` : `From: ${tx.from}`} • {tx.timestamp}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{tx.amount}</p>
                  <p className="text-xs text-muted-foreground">Fee: {tx.gasFee}</p>
                </div>
                {tx.hash && (
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="queue" className="space-y-3 mt-4">
          <div className="rounded-lg bg-secondary/50 p-3 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-chart-3" />
              <p className="text-sm text-foreground">
                <span className="font-medium">{queuedTransactions.length} transactions</span> waiting for network
                connection
              </p>
            </div>
          </div>

          {queuedTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-muted">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Send</p>
                  <p className="text-xs text-muted-foreground">
                    To: {tx.to} • {tx.timestamp}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{tx.amount}</p>
                <p className="text-xs text-muted-foreground">Fee: {tx.gasFee}</p>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Clear Queue
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
