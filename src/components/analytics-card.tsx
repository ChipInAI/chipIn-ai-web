'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
  { date: '2024-04', money_spent: 7123 },
  { date: '2024-05', money_spent: 8456 },
  { date: '2024-06', money_spent: 6345 },
  { date: '2024-08', money_spent: 7890 },
  { date: '2024-09', money_spent: 9100 },
  { date: '2025-06', money_spent: 18901 },
  { date: '2025-07', money_spent: 19012 },
  { date: '2025-09', money_spent: 21234 },
  { date: '2025-10', money_spent: 22345 },
  { date: '2025-11', money_spent: 23456 },
  { date: '2025-12', money_spent: 24567 },
];

const chartConfig = {
  views: {
    label: 'Money Spent',
  },
  money_spent: {
    label: 'Total bills (£)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function AnalyticsCard() {
  const activeChart = 'money_spent';

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bills Analytics</CardTitle>
          <CardDescription>
            Showing total money spending per month based on your bills
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={62}
              tickFormatter={value => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="money_spent"
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
