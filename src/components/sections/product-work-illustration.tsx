import styles from "./product-work-illustration.module.css";

export type ProductWorkScene = "planning" | "dispensing" | "production" | "testing" | "investigation" | "approval";

function Stage() {
  return <g>
    <ellipse cx="116" cy="163" rx="92" ry="15" fill="#607d9f10" stroke="none" />
    <path d="M17 124L104 89L217 130L126 169Z" fill="#f8fafc" />
    <path d="M17 124V132L126 178L217 138V130L126 169Z" fill="#e2e9f0" />
    <path d="M126 169V178M27 130L125 171L207 135" stroke="#c5d1dc" />
  </g>;
}

function Planning() {
  return <g>
    <path d="M39 37L149 12L156 16V96L46 122L39 117Z" fill="#c6cddb" />
    <path d="M46 42L156 16V96L46 122Z" fill="#f6f3fb" />
    <path d="M53 48L148 26V85L53 108Z" fill="#fff" />
    <path d="M63 56L139 38M63 68L139 50M63 80L139 62M63 92L139 74M82 43V101M104 37V96M125 32V90" stroke="#e6e1ee" />
    <g className={styles.schedule}>
      <path d="M67 55L98 48V55L67 62Z" fill="#c6b4e0" stroke="none" />
      <path d="M91 61L131 52V59L91 68Z" fill="#aa95ca" stroke="none" />
      <path d="M69 78L115 67V74L69 85Z" fill="#d7c9e9" stroke="none" />
      <path d="M112 80L137 74V81L112 87Z" fill="#bba7d7" stroke="none" />
    </g>
    <path className={styles.scheduleCursor} d="M108 36V94" stroke="#8769ae" strokeWidth="1.8" strokeDasharray="3 3" />
    <path d="M94 110V128L112 135L122 130L105 124V108" fill="#b6c1cf" />
    <path d="M84 134L104 125L132 136L111 145Z" fill="#dbe2eb" />
    <g transform="translate(181 45)">
      <circle r="20" fill="#fff" stroke="#bca8d5" />
      <circle r="15" fill="#f7f2fd" stroke="none" />
      <path d="M0 -11V-8M11 0H8M0 11V8M-11 0H-8" stroke="#b39dce" />
      <path className={styles.clockHand} d="M0 0V-9M0 0L6 3" stroke="#8b70af" strokeWidth="1.8" />
      <circle r="2" fill="#8b70af" stroke="none" />
    </g>
    {[0, 1, 2].map(index => <g key={index} transform={`translate(${133 + index * 23} ${117 + index * 9})`}>
      <path d="M0 0L13 -5L27 0L14 6Z" fill="#f5f0fc" />
      <path d="M0 0V17L14 23V6Z" fill="#e0d6ed" />
      <path d="M14 6L27 0V17L14 23Z" fill="#c9bddc" />
      <path d="M5 5L10 7V13L5 11Z" fill="#fff" stroke="none" />
      <circle className={styles.machineLight} style={{ animationDelay: `${index * -.8}s` }} cx="20" cy="9" r="2" fill="#8769ae" stroke="none" />
    </g>)}
    <path d="M27 132L47 124L75 135L55 144Z" fill="#fff" />
    <path d="M38 132L55 138M43 129L63 136" stroke="#b6a3d0" />
  </g>;
}

function Dispensing() {
  return <g>
    <path d="M45 48L108 25L171 48V121L108 148L45 121Z" fill="#f6f8fb" />
    <path d="M108 25V98L171 121V48Z" fill="#e9e5f0" />
    <path d="M45 48L108 25L171 48L108 72Z" fill="#f1edf7" />
    <path d="M45 48V62L108 86L171 62V48L108 72Z" fill="#d9d0e5" />
    {[0, 1, 2, 3].map(index => <path key={index} d={`M${58 + index * 12} ${51 + index * 4.5}l44 -16`} stroke="#b9aacd" strokeWidth="2" />)}
    <path d="M45 62V128M171 62V129" stroke="#bbc4d1" strokeWidth="4" />
    <path className={styles.airflow} d="M64 75V105M83 82V112M137 77V108M155 71V101" stroke="#c5b7d8" strokeDasharray="3 7" />
    <path d="M79 122L119 107L153 120L111 137Z" fill="#e5eaf2" />
    <path d="M79 122V133L111 147L153 130V120L111 137Z" fill="#b7c4d4" />
    <path d="M89 131L106 138V143L89 136Z" fill="#536879" stroke="none" />
    <path className={styles.scaleReading} d="M92 135L103 139" stroke="#d9f3ed" strokeWidth="1.5" />
    <g className={styles.weighPan}>
      <path d="M91 116L119 105L144 115L115 127Z" fill="#fff" />
      <path d="M104 111V87Q119 76 134 88V112Q119 123 104 111Z" fill="#dfd5ec" />
      <ellipse cx="119" cy="88" rx="15" ry="6" fill="#fdfaff" />
      <path d="M108 101Q120 108 130 102" stroke="#b7a5cb" />
    </g>
    <g className={styles.scoop}>
      <path d="M111 69L121 73L134 64L142 66L127 80Q118 83 108 76Z" fill="#ece7f5" />
      <path d="M135 65L153 49" stroke="#a795bb" strokeWidth="4" />
    </g>
    <g className={styles.powder} fill="#b5a0ce" stroke="none"><circle cx="115" cy="79" r="1.8" /><circle cx="121" cy="82" r="1.5" /><circle cx="118" cy="86" r="1.5" /></g>
    <g transform="translate(187 105)">
      <path d="M-12 -17L5 -23L17 -18L1 -12Z" fill="#fff" />
      <path d="M-12 -17V7L1 13V-12Z" fill="#d4ccdf" />
      <path d="M1 -12L17 -18V7L1 13Z" fill="#b7aacb" />
      <path d="M-8 -10L-2 -7M-8 -6L-2 -3M-8 -2L-2 1" stroke="#fff" strokeWidth="2" />
    </g>
    <g transform="translate(185 65)"><g className={styles.verified}>
      <circle r="13" fill="#f9f5ff" stroke="#a38bbb" />
      <path d="M-6 0L-2 4L6 -5" stroke="#8d70af" strokeWidth="2" fill="none" />
    </g></g>
  </g>;
}

function Production() {
  return <g>
    <path d="M50 114V137M103 114V150" stroke="#9faebf" strokeWidth="4" />
    <path d="M39 61V110Q76 142 112 112V61" fill="#e4e8ef" />
    <ellipse cx="76" cy="61" rx="37" ry="16" fill="#f9fafc" />
    <ellipse cx="76" cy="61" rx="27" ry="10" fill="#ded4ee" />
    <path d="M39 90Q76 119 112 91" fill="none" stroke="#bcc7d5" />
    <path d="M76 31V82" stroke="#9d8ab5" strokeWidth="4" />
    <path d="M63 28L76 23L90 28V41L76 47L63 41Z" fill="#baa9cf" />
    <path d="M63 28L76 34L90 28M76 34V47" fill="none" stroke="#a38dbc" />
    <g transform="translate(76 74)"><path className={styles.impeller} d="M-20 -8L20 8M-20 8L20 -8" stroke="#9176b4" strokeWidth="3" /></g>
    <path d="M113 83L137 91V110" fill="none" stroke="#b3a8c5" strokeWidth="8" />
    <path d="M115 82L138 91V108" fill="none" stroke="#f4f0fa" strokeWidth="3" />
    <path d="M127 78L159 66L192 78L160 91Z" fill="#eee7f7" />
    <path d="M127 78V125L160 140V91Z" fill="#d9cee8" />
    <path d="M160 91L192 78V125L160 140Z" fill="#bcb0cf" />
    <path d="M134 87L152 95V114L134 106Z" fill="#fff" />
    <path d="M137 96L141 99L145 97L150 102" fill="none" stroke="#a58abc" strokeWidth="1.5" />
    <path d="M166 101L186 93V111L166 119Z" fill="#687488" />
    <path d="M158 133L220 154L236 147V155L220 163L158 141Z" fill="#ced7e2" />
    <path className={styles.conveyor} d="M161 134L220 154L233 149" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 5" />
    {[0, 1, 2].map(index => <g key={index} transform="translate(168 119)"><g className={styles.packs} style={{ animationDelay: `${index * -1.2}s` }}>
      <path d="M0 0L7 -3L15 0L8 3Z" fill="#f8f4fc" />
      <path d="M0 0V14L8 18V3Z" fill="#ddd0eb" />
      <path d="M8 3L15 0V14L8 18Z" fill="#bba6d5" />
      <path d="M2 5L6 7M2 8L6 10" stroke="#fff" />
    </g></g>)}
    <circle className={styles.machineLight} cx="176" cy="83" r="3" fill="#977bb8" stroke="none" />
  </g>;
}

function Testing() {
  return <g>
    <path d="M35 103L102 78L194 110L126 138Z" fill="#f6fbf9" />
    <path d="M35 103V112L126 149L194 121V110L126 138Z" fill="#ccddd8" />
    <path d="M43 115V139M121 149V167M185 125V147" stroke="#a7bfbb" strokeWidth="5" />
    <path d="M58 94L82 85L105 94L80 104Z" fill="#bfd6ce" />
    <path d="M75 91Q107 80 87 50" fill="none" stroke="#a0c3b7" strokeWidth="10" />
    <path d="M77 90Q101 79 84 52" fill="none" stroke="#f0f8f4" strokeWidth="4" />
    <path d="M70 56L91 39L98 47L78 65Z" fill="#d2e5dd" />
    <path d="M89 40L94 35L103 43L98 48Z" fill="#627e77" />
    <path d="M67 74L81 68L94 73L79 80Z" fill="#eaf5f0" />
    <path d="M77 77V85" stroke="#769c8c" strokeWidth="3" />
    <circle className={styles.sampleGlow} cx="80" cy="74" r="3" fill="#69ac91" stroke="none" />
    <path d="M117 46L177 65V105L117 85Z" fill="#b8cec8" />
    <path d="M122 53L171 69V95L122 79Z" fill="#f8fffc" />
    <path d="M127 74L135 77L139 68L143 79L148 77L153 84L165 88" fill="none" stroke="#5b9b83" strokeWidth="1.6" />
    <path className={styles.trace} d="M127 74L135 77L139 68L143 79L148 77L153 84L165 88" fill="none" stroke="#276e55" strokeWidth="2.2" strokeDasharray="9 60" />
    <path d="M143 94V106L156 111M132 111L146 106L167 113L152 119Z" fill="#d9e6e1" />
    <path d="M62 118L81 110L115 122L97 131Z" fill="#c4dcd2" />
    {[0, 1, 2].map(index => <g key={index} transform={`translate(${77 + index * 12} ${114 + index * 4.5})`}>
      <path d="M-4 -20H4V2Q0 7 -4 2Z" fill="#f8fdfb" />
      <path d="M-3 -5H3V2Q0 6 -3 2Z" fill="#b0d7c7" stroke="none" />
      <path d="M-5 -21H5" stroke="#8eb9a7" strokeWidth="3" />
      <circle className={styles.bubble} style={{ animationDelay: `${index * -.7}s` }} cy="0" r="1.2" fill="#fff" stroke="none" />
    </g>)}
    <g transform="translate(197 61)"><g className={styles.testReport}>
      <path d="M-9 -15H5L11 -9V15H-9Z" fill="#fff" stroke="#92b9a9" />
      <path d="M5 -15V-9H11M-5 -3H6M-5 1H6M-5 5H2" stroke="#b0c4bc" />
      <path d="M1 10L4 13L10 6" stroke="#629e84" strokeWidth="1.6" />
    </g></g>
  </g>;
}

function Investigation() {
  return <g>
    <path d="M46 81L116 55L184 83L111 114Z" fill="#dce8e3" />
    <path d="M46 81V109L111 140L184 109V83L111 114Z" fill="#cedcd7" />
    <path d="M56 77L116 55L172 78L110 104Z" fill="#fff" />
    <path d="M62 74L117 54L166 73L109 98Z" fill="#fbfdfc" />
    <path d="M76 72L114 58M83 77L130 60M92 82L140 65M99 88L147 71" stroke="#c5d8cf" />
    <path d="M99 37L130 24L164 37M130 24V11M164 37L190 58M99 37L74 52" fill="none" stroke="#bdd0c6" strokeWidth="1.5" />
    <path className={styles.investigationLink} d="M74 52L99 37L130 24L164 37L190 58" fill="none" stroke="#649a85" strokeWidth="2" strokeDasharray="5 7" />
    <circle cx="130" cy="12" r="12" fill="#f4f9f6" stroke="#9dbfaf" />
    <path d="M130 5V13M130 17V18" stroke="#6e9c87" strokeWidth="2" />
    {[{ x: 74, y: 52 }, { x: 99, y: 37 }, { x: 164, y: 37 }, { x: 190, y: 58 }].map((point, index) => <g key={point.x} transform={`translate(${point.x} ${point.y})`}>
      <circle className={styles.evidenceNode} style={{ animationDelay: `${index * -.6}s` }} r="8" fill="#f8fcfa" stroke="#a1c0b1" />
      <path d="M-3 -2H3M-3 1H3M-3 4H0" stroke="#8eae9f" />
    </g>)}
    <g className={styles.magnifier}>
      <ellipse cx="115" cy="74" rx="25" ry="18" fill="#e4f1eb99" stroke="#7e9e91" strokeWidth="4" />
      <path d="M95 87L75 106" stroke="#819e92" strokeWidth="9" />
      <path d="M95 86L77 103" stroke="#bcd3c6" strokeWidth="3" />
      <path d="M106 72L112 78L124 66" stroke="#78a18c" strokeWidth="2" fill="none" />
    </g>
    <g transform="translate(170 123)">
      <path d="M-14 -9L8 -18L28 -10L5 0Z" fill="#f7faf8" />
      <path d="M-14 -9V11L5 20V0Z" fill="#d9e7df" />
      <path d="M5 0L28 -10V10L5 20Z" fill="#bcd4c6" />
      <path d="M-9 -2L-1 1M-9 3L-1 6" stroke="#99b5a5" />
      <circle cx="23" cy="7" r="10" fill="#fff" stroke="#a7c5b5" />
      <path d="M18 7L22 10L28 3" fill="none" stroke="#719b83" strokeWidth="1.8" />
    </g>
  </g>;
}

function Approval() {
  return <g>
    <path d="M33 95L92 72L116 80L145 58L199 80V124L142 149L114 140L88 148L33 125Z" fill="#d1e0d9" />
    <path d="M33 92L88 72L114 80L143 59L199 78V116L142 140L114 132L87 141L33 118Z" fill="#fdfefd" />
    <path d="M114 80V132M142 66V130" stroke="#c9d8d0" />
    <path d="M43 97L79 83M43 104L79 90M43 111L79 97M84 112L103 105M84 119L103 112" stroke="#c4d8cc" />
    {[0, 1, 2].map(index => <g key={index} className={styles.checkLine} style={{ animationDelay: `${index * .55}s` }}>
      <path d={`M151 ${82 + index * 10}l3 2l5 -6`} fill="none" stroke="#60977c" strokeWidth="1.8" />
      <path d={`M165 ${77 + index * 10}l24 -10`} stroke="#b0cebd" strokeWidth="1.5" />
    </g>)}
    <g className={styles.stamp}>
      <path d="M65 65L86 57L108 66L86 75Z" fill="#e1eee7" />
      <path d="M65 65V71L86 81L108 72V66L86 75Z" fill="#a7c4b3" />
      <path d="M78 64V46Q70 43 75 35Q84 28 94 36Q98 44 90 47V66" fill="#b9d2c4" stroke="#8faf9a" />
      <path d="M80 34Q85 38 92 35" fill="none" stroke="#dfece4" />
    </g>
    <g className={styles.releaseSeal} transform="translate(81 101)">
      <ellipse rx="15" ry="10" fill="#edf7f0" stroke="#7fac90" />
      <path d="M-7 0L-2 4L8 -5" fill="none" stroke="#719e82" strokeWidth="2" />
    </g>
    <g transform="translate(201 47)"><g className={styles.approvedRecord}>
      <path d="M-12 -20H7L15 -12V22H-12Z" fill="#fff" stroke="#95b69f" />
      <path d="M7 -20V-12H15M-7 -5H8M-7 0H8M-7 5H3" stroke="#b7cebf" />
      <circle cx="7" cy="18" r="10" fill="#eaf5ed" stroke="#83aa8f" />
      <path d="M2 18L6 21L12 13" fill="none" stroke="#618b6e" strokeWidth="1.8" />
    </g></g>
    <path d="M162 134L181 126L204 134L184 144Z" fill="#d7e6dc" />
    <path d="M162 134V144L184 154L204 145V134L184 144Z" fill="#bdcfbf" />
    <path d="M169 136L178 140M188 140L197 137" stroke="#f9fcf9" strokeWidth="3" />
  </g>;
}

const SCENES = { planning: Planning, dispensing: Dispensing, production: Production, testing: Testing, investigation: Investigation, approval: Approval };

export function ProductWorkIllustration({ scene }: { scene: ProductWorkScene }) {
  const Illustration = SCENES[scene];
  return <svg className={styles.illustration} data-scene={scene} viewBox="-16 -32 286 226" fill="none" stroke="#a7b5c2" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false">
    <Stage />
    <Illustration />
  </svg>;
}
