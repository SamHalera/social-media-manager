"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  formatDataForCharts,
  formatTransactionsByMethodForCharts,
} from "@/lib/walletHelpelrs";

const chartTransactiosConfig = {
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
  incomes: {
    label: "Incomes",
    color: "hsl(var(--chart-2))",
  },
  method: {},
};
export const ChartTransactionsByMethod = ({
  walletData,
}: {
  walletData?: WalletProps | null;
}) => {
  if (!walletData) return;

  const chartData = formatDataForCharts(walletData);

  const data = formatTransactionsByMethodForCharts(walletData.transaction);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>My payment methods</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartTransactiosConfig}
          className="min-h-[300px] w-full"
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="method"
              tickLine={true}
              tickMargin={15}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />

            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey={"incomes"}
              type="natural"
              fill="var(--color-incomes)"
              radius={4}
            >
              <LabelList
                position="top"
                offset={-15}
                className="fill-white"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey={"expenses"}
              type="natural"
              fill="var(--color-expenses)"
              radius={4}
            >
              <LabelList
                position="top"
                offset={-15}
                className="fill-white"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
};

export default ChartTransactionsByMethod;
