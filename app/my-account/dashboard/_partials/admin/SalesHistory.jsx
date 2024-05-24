import React from "react"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { manrope } from "@/app/fonts"
import SalesHistoryTable from "./partials/SalesHistoryTable"

const SalesHistory = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <SalesHistoryTable></SalesHistoryTable>
      </CardContent>
    </Card>
  )
}

export default SalesHistory
