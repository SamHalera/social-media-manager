"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
  createSelectOptionsForYears,
  formatDataForCharts,
} from "@/lib/walletHelpelrs";

import { useState } from "react";
import FilterByMonthYear from "./FilterByMonthYear";

const chartConfigExpensesIncomes = {
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
  incomes: {
    label: "Incomes",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export const ChartExpenseIncome = ({
  walletData,
}: {
  walletData?: WalletProps | null;
}) => {
  const [dataYear, setDataYear] = useState<string>("2024");
  if (!walletData) return;

  const transactionsCharts = formatDataForCharts(walletData);
  const yearsSelectOptions = createSelectOptionsForYears(2024, 10);
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Expenses/Incomes</CardTitle>
        <CardDescription className="text-blue-500 font-semibold">
          <FilterByMonthYear
            dataValue={dataYear}
            setDataValue={setDataYear}
            selectOptions={yearsSelectOptions}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfigExpensesIncomes}
          className="min-h-[250px] w-full "
        >
          <BarChart accessibilityLayer data={transactionsCharts}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
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
                offset={10}
                className="fill-blue-700"
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
                offset={10}
                className="fill-blue-700"
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

export default ChartExpenseIncome;
