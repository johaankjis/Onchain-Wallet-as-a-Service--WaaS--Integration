"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, ExternalLink, Fingerprint, Wifi, WifiOff } from "lucide-react"

export function WalletCard() {
  const [isConnected, setIsConnected] = useState(true)
  const [isOnline, setIsOnline] = useState(true)

  const walletAddress = "0x742d...8f3a"
  const balance = "2.4567"

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Self-Custody Wallet</h3>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} className="gap-1">
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-secondary p-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Wallet Address</p>
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-foreground">{walletAddress}</code>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">Balance (ETH)</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{balance}</p>
                <p className="text-xs text-muted-foreground mt-1">≈ $4,123.45 USD</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-accent" />
                  <span className="text-sm text-foreground">Biometric Auth</span>
                </div>
                <Badge variant="outline" className="text-accent border-accent">
                  Enabled
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4 text-chart-3" />
                  <span className="text-sm text-foreground">Offline Queue</span>
                </div>
                <Badge variant="outline" className="text-chart-3 border-chart-3">
                  3 Pending
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <ExternalLink className="h-4 w-4" />
                View on Explorer
              </Button>
              <Button variant="ghost" onClick={() => setIsOnline(!isOnline)} className="gap-2">
                {isOnline ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-6 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
              <Wallet className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">No Wallet Connected</p>
              <p className="text-xs text-muted-foreground mt-1">Connect your self-custody wallet to get started</p>
            </div>
            <Button onClick={() => setIsConnected(true)} className="w-full gap-2">
              <Fingerprint className="h-4 w-4" />
              Connect with Biometric
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
