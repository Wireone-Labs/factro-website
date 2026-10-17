const CLUSTERS = [
  { name: "Ahmedabad", x: 86.29, y: 213.02, labelX: 28, labelY: 185, bendX: 65, bendY: 192 },
  { name: "Pune", x: 100.27, y: 277.1, labelX: 28, labelY: 253, bendX: 78, bendY: 260 },
  { name: "Hyderabad", x: 162.35, y: 294.74, labelX: 244, labelY: 282, bendX: 210, bendY: 289 },
  { name: "Bengaluru", x: 149.07, y: 357.32, labelX: 28, labelY: 333, bendX: 112, bendY: 340 },
  { name: "Chennai", x: 186.61, y: 356.03, labelX: 246, labelY: 341, bendX: 220, bendY: 348 },
  { name: "Coimbatore", x: 139.64, y: 385.09, labelX: 186, labelY: 425, bendX: 162, bendY: 432 },
];

export function SouthIndiaMap() {
  return (
    <svg viewBox="0 0 430 475" role="img" aria-labelledby="south-india-map-title south-india-map-description" className="w-full">
      <title id="south-india-map-title">Built in Bengaluru, close to manufacturing clusters</title>
      <desc id="south-india-map-description">
        India’s outline from Survey of India boundary data, fading towards the north.
        Bengaluru is our base; Ahmedabad, Pune, Hyderabad, Chennai and Coimbatore are highlighted manufacturing clusters.
      </desc>
      <defs>
        <radialGradient id="bengaluru-glow">
          <stop stopColor="#477aff" stopOpacity=".14" />
          <stop offset="1" stopColor="#477aff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="india-north-fade" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="white" stopOpacity=".2" />
          <stop offset=".35" stopColor="white" stopOpacity=".38" />
          <stop offset=".65" stopColor="white" stopOpacity=".85" />
          <stop offset=".85" stopColor="white" />
        </linearGradient>
        <mask id="india-north-mask">
          <rect width="430" height="475" fill="url(#india-north-fade)" />
        </mask>
      </defs>
      <circle cx="149" cy="357" r="128" fill="url(#bengaluru-glow)" />
      <image href="/india-outline.svg" width="430" height="475" mask="url(#india-north-mask)" />
      {CLUSTERS.map(cluster => {
        const isBase = cluster.name === "Bengaluru";
        return (
          <g key={cluster.name}>
            <circle cx={cluster.x} cy={cluster.y} r={isBase ? 15 : 8} fill="#477aff" fillOpacity={isBase ? .14 : .1} />
            {isBase && <circle cx={cluster.x} cy={cluster.y} r="10" fill="none" stroke="#477aff" strokeOpacity=".3" />}
            <path d={`M${cluster.x} ${cluster.y}L${cluster.bendX} ${cluster.bendY}H${cluster.labelX}`} fill="none" stroke="#7694be" strokeWidth=".8" />
            <circle cx={cluster.x} cy={cluster.y} r={isBase ? 4.5 : 3} fill={isBase ? "#044afe" : "#6893dc"} stroke="white" strokeWidth="1.5" />
            <text x={cluster.labelX} y={cluster.labelY} fill={isBase ? "#0339d6" : "#486278"} fontSize="12" fontWeight={isBase ? 600 : 500} stroke="#f8faff" strokeWidth="4" paintOrder="stroke">{cluster.name}</text>
            {isBase && <text x={cluster.labelX} y={cluster.labelY + 22} fill="#69758a" fontSize="8" letterSpacing=".12em">OUR BASE</text>}
          </g>
        );
      })}
    </svg>
  );
}
