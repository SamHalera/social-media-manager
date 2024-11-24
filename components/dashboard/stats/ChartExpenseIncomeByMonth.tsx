"use client";

import { LabelList, Pie, PieChart } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDataForCharts } from "@/lib/walletHelpelrs";

import { useState } from "react";
import dayjs from "dayjs";

import { monthSelectOptions } from "@/assets/selectOptions";
import FilterByMonthYear from "./FilterByMonthYear";

const chartConfigExpensesIncomes = {
  total_amount: {
    label: "Total amount",
  },

  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
  incomes: {
    label: "Incomes",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const ChartExpenseIncomeByMonth = ({
  walletData,
}: {
  walletData?: WalletProps | null;
}) => {
  const [dataByMonth, setDataByMonth] = useState<string>(
    dayjs(new Date()).format("MMM")
  );

  if (!walletData) return;

  const data = formatDataForCharts(walletData);

  const chartDataByMonth = data.find((elt) => elt.month === dataByMonth);

  const chartData = [
    {
      type: "incomes",
      total_amount: chartDataByMonth?.incomes,
      fill: "var(--color-incomes)",
    },
    {
      type: "expenses",
      total_amount: chartDataByMonth?.expenses,
      fill: "var(--color-expenses)",
    },
  ];

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-1 text-xl">
            <span>Expenses/Incomes </span>
            <span>per month</span>
          </CardTitle>
          <CardDescription className="text-blue-500 font-semibold">
            <FilterByMonthYear
              dataValue={dataByMonth}
              setDataValue={setDataByMonth}
              selectOptions={monthSelectOptions}
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfigExpensesIncomes}
            className="mx-auto h-[250px] w-full [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent nameKey="type" hideLabel={true} />
                }
              />
              <Pie
                data={chartData}
                dataKey="total_amount"
                labelLine={true}
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      className=" fill-blue-700"
                    >
                      {payload.type} {payload.total_amount}
                    </text>
                  );
                }}
              >
                <LabelList
                  dataKey="type"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  // formatter={(value: keyof typeof chartConfigExpensesIncomes) =>
                  //   chartConfigExpensesIncomes[value]?.label
                  // }
                />
              </Pie>
              {/* <Pie data={chartData} dataKey="expenses" /> */}
              {/* <ChartLegend
                content={<ChartLegendContent nameKey="type" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              /> */}
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
      </Card>
    </div>
  );
};

export default ChartExpenseIncomeByMonth;
