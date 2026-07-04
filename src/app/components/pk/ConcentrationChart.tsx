import React, { useMemo } from 'react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
} from 'recharts';
import type { ConcentrationComponentPoint, ConcentrationPoint } from '@/lib/pk';

export type ConcentrationMarker = {
  hour: number;
  value: number;
  color: string;
  label: string;
};

type Props = {
  series: ConcentrationPoint[];
  /** y로 그릴 필드. 절대농도(raw, ng/mL) 또는 peak 대비 percent. */
  field?: 'raw' | 'percent';
  /** IR/ER 구성 곡선(토글 시). 인덱스가 series와 정렬돼 있어야 함. */
  irSeries?: ConcentrationComponentPoint[];
  erSeries?: ConcentrationComponentPoint[];
  showComponents?: boolean;
  /** 작용 구간(절대 시각). 라벨 기반 추정 — 농도 임계 아님. */
  effectWindow?: { start: number; end: number };
  /** 최대 농도(Cmax) 지점. */
  peak?: { hour: number; value: number };
  /** 복용 시점 마커(절대 시각). */
  doseHours?: number[];
  /** 현재 시각(절대 hour). 세로 "지금" 라인 표시. 오늘이 아닐 땐 생략. */
  nowHour?: number;
  /** 저널 오버레이 점(리포트). */
  markers?: ConcentrationMarker[];
  xTicks?: number[];
  xDomain?: [number, number];
  height?: number;
};

const AREA_STROKE = 'rgb(185, 166, 255)';
const DOSE_COLOR = 'rgb(255, 142, 114)';

/**
 * 순수 표시 컴포넌트 — 계산 로직 없음. buildConcentrationSeries 결과만 받아 그린다
 * (adhd-med-graph 프로토타입 데모와 동일한 경계).
 */
export default function ConcentrationChart({
  series,
  field = 'raw',
  irSeries,
  erSeries,
  showComponents = false,
  effectWindow,
  peak,
  doseHours,
  nowHour,
  markers,
  xTicks,
  xDomain,
  height = 168,
}: Props) {
  const data = useMemo(
    () =>
      series.map((point, i) => ({
        hour: point.hour,
        value: field === 'percent' ? point.percent : point.raw,
        ir: showComponents ? (irSeries?.[i]?.raw ?? null) : null,
        er: showComponents ? (erSeries?.[i]?.raw ?? null) : null,
      })),
    [series, field, irSeries, erSeries, showComponents],
  );

  const domain: [number, number] = xDomain ?? [series[0]?.hour ?? 0, series[series.length - 1]?.hour ?? 24];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 8, right: 6, bottom: 0, left: 6 }}>
        <CartesianGrid stroke="rgb(233, 228, 220)" strokeDasharray="2 3" vertical={false} />
        <XAxis
          type="number"
          dataKey="hour"
          domain={domain}
          ticks={xTicks}
          tickFormatter={(h: number) => `${h}시`}
          tick={{ fontSize: 11, fill: 'rgb(156,163,175)' }}
          tickLine={false}
          axisLine={{ stroke: 'rgb(233, 228, 220)' }}
          allowDecimals={false}
        />
        <YAxis hide domain={[0, 'dataMax']} />

        {effectWindow && (
          <ReferenceArea
            x1={effectWindow.start}
            x2={effectWindow.end}
            fill="rgb(185, 166, 255)"
            fillOpacity={0.1}
            ifOverflow="extendDomain"
          />
        )}

        <Area
          type="monotone"
          dataKey="value"
          stroke={AREA_STROKE}
          strokeWidth={2.5}
          fill="none"
          isAnimationActive={false}
          dot={false}
        />

        {showComponents && (
          <>
            <Line type="monotone" dataKey="ir" stroke="rgb(96, 165, 250)" strokeWidth={1.5} dot={false} isAnimationActive={false} strokeDasharray="4 2" connectNulls />
            <Line type="monotone" dataKey="er" stroke="rgb(167, 139, 250)" strokeWidth={1.5} dot={false} isAnimationActive={false} strokeDasharray="4 2" connectNulls />
          </>
        )}

        {nowHour != null && nowHour >= domain[0] && nowHour <= domain[1] && (
          <ReferenceLine
            x={nowHour}
            stroke="rgb(120, 113, 130)"
            strokeWidth={1.5}
            strokeDasharray="3 3"
            ifOverflow="extendDomain"
            label={{ value: '지금', position: 'insideTopRight', fontSize: 10, fill: 'rgb(120, 113, 130)', dy: -2 }}
          />
        )}

        {peak && <ReferenceDot x={peak.hour} y={peak.value} r={4} fill={AREA_STROKE} stroke="#fff" strokeWidth={2} ifOverflow="extendDomain" />}

        {Array.from(new Set(doseHours ?? [])).map((h) => (
          <ReferenceDot key={`dose-${h}`} x={h} y={0} r={4} fill={DOSE_COLOR} stroke="#fff" strokeWidth={1.5} ifOverflow="extendDomain" />
        ))}

        {markers && markers.length > 0 && (
          <Scatter
            data={markers.map((m) => ({ hour: m.hour, value: m.value, fill: m.color }))}
            dataKey="value"
            isAnimationActive={false}
            shape={(props: { cx?: number; cy?: number; payload?: { fill?: string } }) => (
              <circle cx={props.cx} cy={props.cy} r={4.5} fill={props.payload?.fill} stroke="#fff" strokeWidth={1.5} />
            )}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
