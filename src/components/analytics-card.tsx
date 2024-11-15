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
  { date: '2024-04', desktop: 7123, mobile: 2890 }, // Randomized data for April
  { date: '2024-05', desktop: 8456, mobile: 3678 }, // Randomized data for May
  { date: '2024-06', desktop: 6345, mobile: 4123 }, // Randomized data for June
  { date: '2024-07', desktop: 9780, mobile: 5234 }, // Randomized data for July
  { date: '2024-08', desktop: 7890, mobile: 4567 }, // Randomized data for August
  { date: '2024-09', desktop: 9100, mobile: 4876 }, // Randomized data for September
  { date: '2024-10', desktop: 10234, mobile: 5321 }, // Randomized data for October
  { date: '2024-11', desktop: 11500, mobile: 5980 }, // Randomized data for November
  { date: '2024-12', desktop: 12345, mobile: 6100 }, // Randomized data for December
  { date: '2025-01', desktop: 13456, mobile: 6789 }, // Randomized data for January
  { date: '2025-02', desktop: 14567, mobile: 7000 }, // Randomized data for February
  { date: '2025-03', desktop: 15678, mobile: 7200 }, // Randomized data for March
  { date: '2025-04', desktop: 16789, mobile: 7400 }, // Randomized data for April
  { date: '2025-05', desktop: 17890, mobile: 7600 }, // Randomized data for May
  { date: '2025-06', desktop: 18901, mobile: 7800 }, // Randomized data for June
  { date: '2025-07', desktop: 19012, mobile: 8000 }, // Randomized data for July
  { date: '2025-08', desktop: 20123, mobile: 8200 }, // Randomized data for August
  { date: '2025-09', desktop: 21234, mobile: 8400 }, // Randomized data for September
  { date: '2025-10', desktop: 22345, mobile: 8600 }, // Randomized data for October
  { date: '2025-11', desktop: 23456, mobile: 8800 }, // Randomized data for November
  { date: '2025-12', desktop: 24567, mobile: 9000 }, // Randomized data for December
];

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-2))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function AnalyticsCard() {
  const activeChart = 'desktop';

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
              tickMargin={8}
              minTickGap={32}
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
                  nameKey="views"
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
