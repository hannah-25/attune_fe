import React from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import type { EffectAccrualPoint } from '@/lib/pk';

type Props = {
  series: EffectAccrualPoint[];
  onsetWeeks?: number;
  stabilizeWeeks?: number;
  currentWeek?: number;
  currentLabel?: string;
  height?: number;
};

const STROKE = 'rgb(167, 139, 250)';
const FILL = 'rgba(167, 139, 250, 0.22)';

/**
 * 누적형 약물(아토목세틴)의 주 단위 효과 누적(%) 곡선. 순수 표시.
 * 당일 혈중 곡선과 다른 차원(효과가 주 단위로 쌓임)임을 보여준다.
 */
export default function EffectAccrualChart({
  series,
  onsetWeeks,
  stabilizeWeeks,
  currentWeek,
  currentLabel = '현재',
  height = 168,
}: Props) {
  const pointAt = (week?: number) =>
    week == null ? undefined : series.find((s) => Math.abs(s.week - week) < 1e-6);
  const nearestPoint = (week?: number) => {
    if (week == null || series.length === 0) return undefined;
    return series.reduce((nearest, point) =>
      Math.abs(point.week - week) < Math.abs(nearest.week - week) ? point : nearest,
    );
  };
  const onset = pointAt(onsetWeeks);
  const stabilize = pointAt(stabilizeWeeks);
  const current = nearestPoint(currentWeek);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={series} margin={{ top: 8, right: 6, bottom: 0, left: 6 }}>
        <CartesianGrid stroke="rgb(233, 228, 220)" strokeDasharray="2 3" vertical={false} />
        <XAxis
          type="number"
          dataKey="week"
          domain={[0, series[series.length - 1]?.week ?? 24]}
          tickFormatter={(w: number) => `${w}주`}
          tick={{ fontSize: 11, fill: 'rgb(156,163,175)' }}
          tickLine={false}
          axisLine={{ stroke: 'rgb(233, 228, 220)' }}
          allowDecimals={false}
        />
        <YAxis hide domain={[0, 100]} />
        <Area type="monotone" dataKey="percent" stroke={STROKE} strokeWidth={2.5} fill={FILL} dot={false} isAnimationActive={false} />
        {onset && <ReferenceDot x={onset.week} y={onset.percent} r={4} fill={STROKE} stroke="#fff" strokeWidth={2} />}
        {stabilize && <ReferenceDot x={stabilize.week} y={stabilize.percent} r={4} fill={STROKE} stroke="#fff" strokeWidth={2} />}
        {current && (
          <>
            <ReferenceLine
              x={current.week}
              stroke="rgb(255, 142, 114)"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              label={{ value: currentLabel, position: 'insideTopRight', fontSize: 10, fill: 'rgb(255, 142, 114)', dy: -2 }}
            />
            <ReferenceDot x={current.week} y={current.percent} r={5} fill="rgb(255, 142, 114)" stroke="#fff" strokeWidth={2} />
          </>
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
