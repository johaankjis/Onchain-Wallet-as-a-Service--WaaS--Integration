"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Container, Zap, Activity } from "lucide-react"

const services = [
  {
    name: "Docker Containers",
    status: "operational",
    instances: 12,
    cpu: "45%",
    memory: "62%",
    icon: Container,
  },
  {
    name: "AWS Lambda",
    status: "operational",
    instances: 8,
    coldStarts: "25% ↓",
    invocations: "1.2M",
    icon: Zap,
  },
  {
    name: "OP Stack Node",
    status: "operational",
    blockHeight: "12,456,789",
    syncStatus: "100%",
    icon: Server,
  },
  {
    name: "Bridge Service",
    status: "operational",
    pending: 3,
    completed: "1,247",
    icon: Activity,
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "operational":
      return "bg-accent"
    case "degraded":
      return "bg-chart-3"
    case "down":
      return "bg-destructive"
    default:
      return "bg-muted"
  }
}

export function InfrastructureMonitor() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Infrastructure</h3>
          <Badge variant="outline" className="gap-1.5 border-accent text-accent">
            <span className={`h-2 w-2 rounded-full ${getStatusColor("operational")} animate-pulse`} />
            All Systems Operational
          </Badge>
        </div>

        <div className="space-y-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.name} className="rounded-lg border border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-secondary p-2">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.instances} instances</p>
                    </div>
                  </div>
                  <span className={`h-2 w-2 rounded-full ${getStatusColor(service.status)}`} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {service.cpu && (
                    <div className="rounded bg-secondary/50 px-2 py-1.5">
                      <p className="text-xs text-muted-foreground">CPU</p>
                      <p className="text-sm font-medium text-foreground">{service.cpu}</p>
                    </div>
                  )}
                  {service.memory && (
                    <div className="rounded bg-secondary/50 px-2 py-1.5">
                      <p className="text-xs text-muted-foreground">Memory</p>
                      <p className="text-sm font-medium text-foreground">{service.memory}</p>
                    </div>
                  )}
                  {service.coldStarts && (
                    <div className="rounded bg-secondary/50 px-2 py-1.5">
                      <p className="text-xs text-muted-foreground">Cold Starts</p>
                      <p className="text-sm font-medium text-accent">{service.coldStarts}</p>
                    </div>
                  )}
                  {service.invocations && (
                    <div className="rounded bg-secondary/50 px-2 py-1.5">
                      <p className="text-xs text-muted-foreground">Invocations</p>
                      <p className="text-sm font-medium text-foreground">{service.invocations}</p>
                    </div>
                  )}
                  {service.blockHeight && (
                    <div className="rounded bg-secondary/50 px-2 py-1.5">
                      <p className="text-xs text-muted-foreground">Block Height</p>
                      <p className="text-sm font-medium text-foreground">{service.blockHeight}</p>
                    </div>
                  )}
                  {service.syncStatus && (
                    <div className="rounded bg-secondary/50 px-2 py-1.5">
                      <p className="text-xs text-muted-foreground">Sync Status</p>
                      <p className="text-sm font-medium text-accent">{service.syncStatus}</p>
                    </div>
                  )}
                  {service.pending !== undefined && (
                    <div className="rounded bg-secondary/50 px-2 py-1.5">
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-sm font-medium text-foreground">{service.pending}</p>
                    </div>
                  )}
                  {service.completed && (
                    <div className="rounded bg-secondary/50 px-2 py-1.5">
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="text-sm font-medium text-foreground">{service.completed}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
