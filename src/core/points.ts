export function convertEVsToPoints(ev: number): number {
  return (ev + 4) / 8
}

export function convertPointsToEVs(points: number): number {
  return (points * 8) - 4
}