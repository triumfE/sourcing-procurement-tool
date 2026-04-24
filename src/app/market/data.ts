// Market Intelligence — data layer
// Production: replace mock values with live API calls from LME, MEPS, Nord Pool, Baltic Exchange, ECB

export type DataPoint = Record<string, string | number | undefined>;

// ─── LME Metals (USD/tonne) ───────────────────────────────────────────────
export const lmeData: DataPoint[] = [
  { m:"Jan'19", al:1861,  alAlloy:1450, co:38818, cu:5958,  pb:2005, ni:11512, sn:20360, zn:2538, scrap:296,  steelHRC:480, steelBil:440 },
  { m:"Jul'19", al:1780,  alAlloy:1380, co:31200, cu:5950,  pb:1950, ni:14000, sn:18500, zn:2400, scrap:270,  steelHRC:460, steelBil:420 },
  { m:"Jan'20", al:1790,  alAlloy:1390, co:32000, cu:6100,  pb:1900, ni:13500, sn:17500, zn:2400, scrap:280,  steelHRC:440, steelBil:400 },
  { m:"Apr'20", al:1480,  alAlloy:1100, co:26000, cu:5000,  pb:1700, ni:11500, sn:15000, zn:1900, scrap:220,  steelHRC:360, steelBil:320 },
  { m:"Jan'21", al:2000,  alAlloy:1750, co:37000, cu:7800,  pb:2050, ni:16000, sn:21000, zn:2700, scrap:350,  steelHRC:520, steelBil:480 },
  { m:"Jul'21", al:2500,  alAlloy:2100, co:50000, cu:9200,  pb:2100, ni:18500, sn:30000, zn:3000, scrap:430,  steelHRC:700, steelBil:650 },
  { m:"Jan'22", al:2800,  alAlloy:2350, co:68000, cu:9800,  pb:2200, ni:22000, sn:39000, zn:3500, scrap:500,  steelHRC:780, steelBil:730 },
  { m:"Mar'22", al:3400,  alAlloy:2800, co:82000, cu:10500, pb:2400, ni:48000, sn:44000, zn:4000, scrap:620,  steelHRC:850, steelBil:800 },
  { m:"Jul'22", al:2500,  alAlloy:2100, co:70000, cu:7800,  pb:2100, ni:22000, sn:31000, zn:3200, scrap:460,  steelHRC:680, steelBil:620 },
  { m:"Jan'23", al:2400,  alAlloy:2000, co:55000, cu:8900,  pb:2100, ni:28000, sn:26000, zn:3000, scrap:400,  steelHRC:600, steelBil:560 },
  { m:"Jul'23", al:2200,  alAlloy:1900, co:40000, cu:8500,  pb:2100, ni:20000, sn:27000, zn:2600, scrap:380,  steelHRC:520, steelBil:480 },
  { m:"Jan'24", al:2200,  alAlloy:1900, co:35000, cu:8300,  pb:2000, ni:16500, sn:26000, zn:2600, scrap:360,  steelHRC:500, steelBil:460 },
  { m:"Jul'24", al:2400,  alAlloy:2000, co:30000, cu:9500,  pb:2000, ni:16000, sn:32000, zn:2800, scrap:370,  steelHRC:510, steelBil:470 },
  { m:"Jan'25", al:2550,  alAlloy:2100, co:32000, cu:9200,  pb:1980, ni:15500, sn:30000, zn:2900, scrap:380,  steelHRC:520, steelBil:480 },
  { m:"Jul'25", al:2600,  alAlloy:2200, co:33000, cu:9800,  pb:2000, ni:15400, sn:36000, zn:2900, scrap:390,  steelHRC:535, steelBil:495 },
  { m:"Jan'26", al:2650,  alAlloy:2250, co:33000, cu:10200, pb:1980, ni:15400, sn:39000, zn:2950, scrap:400,  steelHRC:545, steelBil:505 },
  { m:"Apr'26", al:2680,  alAlloy:2270, co:33200, cu:10500, pb:1990, ni:15420, sn:40500, zn:2970, scrap:410,  steelHRC:550, steelBil:510 },
];

export const lmeMetals = [
  { key:"al",       label:"Aluminium",        color:"#0070f3", unit:"USD/t" },
  { key:"alAlloy",  label:"Aluminium Alloy",  color:"#6366f1", unit:"USD/t" },
  { key:"co",       label:"Cobalt",           color:"#7c3aed", unit:"USD/t" },
  { key:"cu",       label:"Copper",           color:"#b45309", unit:"USD/t" },
  { key:"pb",       label:"Lead",             color:"#64748b", unit:"USD/t" },
  { key:"ni",       label:"Nickel",           color:"#0891b2", unit:"USD/t" },
  { key:"sn",       label:"Tin",              color:"#16a34a", unit:"USD/t" },
  { key:"zn",       label:"Zinc",             color:"#dc2626", unit:"USD/t" },
  { key:"scrap",    label:"Steel Scrap",      color:"#92400e", unit:"USD/t" },
  { key:"steelHRC", label:"Steel HRC",        color:"#0c2340", unit:"USD/t" },
  { key:"steelBil", label:"Steel Billet",     color:"#334155", unit:"USD/t" },
];

// ─── MEPS Steel (EUR/tonne) ───────────────────────────────────────────────
export const mepsData: DataPoint[] = [
  { m:"Jan'24",  hrpEU:665, hrpNord:694, crCoilEU:720, hdgEU:743, ezgEU:792, merBarEU:678, rebarEU:592, secEU:788, wirEU:598, hrCoilEU:582 },
  { m:"Apr'24",  hrpEU:674, hrpNord:705, crCoilEU:728, hdgEU:749, ezgEU:801, merBarEU:697, rebarEU:598, secEU:796, wirEU:607, hrCoilEU:590 },
  { m:"Jul'24",  hrpEU:638, hrpNord:668, crCoilEU:710, hdgEU:720, ezgEU:785, merBarEU:673, rebarEU:571, secEU:771, wirEU:584, hrCoilEU:561 },
  { m:"Oct'24",  hrpEU:634, hrpNord:668, crCoilEU:705, hdgEU:715, ezgEU:780, merBarEU:665, rebarEU:580, secEU:763, wirEU:576, hrCoilEU:574 },
  { m:"Jan'25",  hrpEU:661, hrpNord:696, crCoilEU:715, hdgEU:725, ezgEU:800, merBarEU:658, rebarEU:571, secEU:744, wirEU:562, hrCoilEU:578 },
  { m:"Apr'25",  hrpEU:682, hrpNord:708, crCoilEU:722, hdgEU:733, ezgEU:810, merBarEU:673, rebarEU:583, secEU:753, wirEU:573, hrCoilEU:588 },
  { m:"Jul'25",  hrpEU:695, hrpNord:722, crCoilEU:730, hdgEU:742, ezgEU:818, merBarEU:682, rebarEU:590, secEU:760, wirEU:580, hrCoilEU:596 },
  { m:"Oct'25",  hrpEU:705, hrpNord:735, crCoilEU:738, hdgEU:750, ezgEU:825, merBarEU:688, rebarEU:596, secEU:768, wirEU:586, hrCoilEU:602 },
  { m:"Jan'26",  hrpEU:710, hrpNord:745, crCoilEU:745, hdgEU:760, ezgEU:834, merBarEU:692, rebarEU:600, secEU:775, wirEU:592, hrCoilEU:608 },
  { m:"Mar'26",  hrpEU:724, hrpNord:763, crCoilEU:752, hdgEU:770, ezgEU:845, merBarEU:700, rebarEU:606, secEU:782, wirEU:600, hrCoilEU:615 },
];
export const mepsStainless: DataPoint[] = [
  { m:"Jan'24",  c316As:3704, c316EU:3518, c430As:1607, c430EU:1569, p304As:2636, p304EU:2517, p316As:3861, p316EU:3820, pb304EU:2501, pb316EU:4061 },
  { m:"Apr'24",  c316As:3752, c316EU:3504, c430As:1625, c430EU:1575, p304As:2749, p304EU:2505, p316As:3979, p316EU:3908, pb304EU:2501, pb316EU:4062 },
  { m:"Jul'24",  c316As:3754, c316EU:3291, c430As:1609, c430EU:1559, p304As:2695, p304EU:2006, p316As:4019, p316EU:3710, pb304EU:2401, pb316EU:3912 },
  { m:"Oct'24",  c316As:3714, c316EU:3261, c430As:1597, c430EU:1541, p304As:2650, p304EU:2301, p316As:4027, p316EU:3703, pb304EU:2351, pb316EU:3862 },
  { m:"Jan'25",  c316As:3704, c316EU:3408, c430As:1608, c430EU:1558, p304As:2602, p304EU:2397, p316As:4061, p316EU:3796, pb304EU:2350, pb316EU:3954 },
  { m:"Mar'26",  c316As:3891, c316EU:3696, c430As:1626, c430EU:1632, p304As:2694, p304EU:2552, p316As:4182, p316EU:4003, pb304EU:2591, pb316EU:4144 },
];

// ─── Material Index (EUR/tonne, FEAF/CAEF) ────────────────────────────────
export const bronzeData: DataPoint[] = [
  { m:"Jan'21", niAlBronze:5800, cuNi30:7200, tinBronze:8100, cuAl:6200 },
  { m:"Jul'21", niAlBronze:6400, cuNi30:7900, tinBronze:8900, cuAl:6900 },
  { m:"Jan'22", niAlBronze:7200, cuNi30:8800, tinBronze:9800, cuAl:7800 },
  { m:"Jun'22", niAlBronze:8600, cuNi30:9400, tinBronze:10600,cuAl:8900 },
  { m:"Jan'23", niAlBronze:7000, cuNi30:8400, tinBronze:9200, cuAl:7200 },
  { m:"Jul'23", niAlBronze:6500, cuNi30:7800, tinBronze:8600, cuAl:6700 },
  { m:"Jan'24", niAlBronze:6200, cuNi30:7500, tinBronze:8300, cuAl:6400 },
  { m:"Jul'24", niAlBronze:6400, cuNi30:7700, tinBronze:8500, cuAl:6600 },
  { m:"Jan'25", niAlBronze:6600, cuNi30:7900, tinBronze:8700, cuAl:6800 },
  { m:"Mar'26", niAlBronze:6800, cuNi30:8100, tinBronze:8900, cuAl:7000 },
];
export const ironIndexData: DataPoint[] = [
  { m:"Jan'21", castEU:501, pigEU:590, scrapEU:454, castCN:430, pigCN:508 },
  { m:"Jul'21", castEU:630, pigEU:710, scrapEU:570, castCN:530, pigCN:610 },
  { m:"Jan'22", castEU:700, pigEU:800, scrapEU:640, castCN:580, pigCN:660 },
  { m:"Jun'22", castEU:1050,pigEU:1100,scrapEU:780, castCN:700, pigCN:780 },
  { m:"Jan'23", castEU:700, pigEU:750, scrapEU:580, castCN:510, pigCN:590 },
  { m:"Jul'23", castEU:620, pigEU:660, scrapEU:490, castCN:470, pigCN:540 },
  { m:"Jan'24", castEU:590, pigEU:620, scrapEU:460, castCN:445, pigCN:510 },
  { m:"Jan'25", castEU:560, pigEU:590, scrapEU:440, castCN:430, pigCN:495 },
  { m:"Mar'26", castEU:570, pigEU:600, scrapEU:450, castCN:440, pigCN:500 },
];

// ─── Energy (EUR/MWh) ─────────────────────────────────────────────────────
export const energyData: DataPoint[] = [
  { m:"Jan'21", omie:60,  ttf:20  },
  { m:"Apr'21", omie:65,  ttf:25  },
  { m:"Jul'21", omie:92,  ttf:36  },
  { m:"Oct'21", omie:200, ttf:87  },
  { m:"Jan'22", omie:200, ttf:200 },
  { m:"May'22", omie:220, ttf:115 },
  { m:"Aug'22", omie:300, ttf:230 },
  { m:"Nov'22", omie:230, ttf:140 },
  { m:"Jan'23", omie:130, ttf:68  },
  { m:"Jul'23", omie:100, ttf:35  },
  { m:"Jan'24", omie:95,  ttf:28  },
  { m:"Jul'24", omie:90,  ttf:32  },
  { m:"Jan'25", omie:85,  ttf:38  },
  { m:"Jul'25", omie:95,  ttf:40  },
  { m:"Jan'26", omie:100, ttf:42  },
  { m:"Mar'26", omie:98,  ttf:42  },
];
export const elCountryData: DataPoint[] = [
  { m:"Jan'21", no:44,  se:48,  fi:51,  de:50,  fr:53,  uk:58,  us:42, jp:95,  kr:88,  cn:65,  au:72  },
  { m:"Jul'21", m2:"Jul'21", no:46, se:66, fi:78, de:75, fr:79, uk:80, us:44, jp:98,  kr:90,  cn:68,  au:75  },
  { m:"Jan'22", no:120, se:130, fi:145, de:155, fr:160, uk:180, us:48, jp:102, kr:95,  cn:70,  au:80  },
  { m:"Jul'22", no:200, se:250, fi:300, de:280, fr:350, uk:400, us:55, jp:110, kr:100, cn:72,  au:85  },
  { m:"Jan'23", no:130, se:140, fi:160, de:180, fr:170, uk:200, us:50, jp:108, kr:98,  cn:71,  au:82  },
  { m:"Jul'23", no:60,  se:80,  fi:90,  de:110, fr:100, uk:120, us:46, jp:105, kr:96,  cn:69,  au:78  },
  { m:"Jan'24", no:55,  se:65,  fi:75,  de:90,  fr:80,  uk:100, us:45, jp:104, kr:95,  cn:68,  au:77  },
  { m:"Jul'24", no:50,  se:75,  fi:80,  de:95,  fr:85,  uk:110, us:47, jp:106, kr:97,  cn:70,  au:79  },
  { m:"Jan'25", no:55,  se:80,  fi:90,  de:100, fr:90,  uk:115, us:48, jp:108, kr:98,  cn:71,  au:80  },
  { m:"Mar'26", no:58,  se:85,  fi:95,  de:105, fr:92,  uk:118, us:49, jp:110, kr:100, cn:72,  au:82  },
];

// ─── Freight ──────────────────────────────────────────────────────────────
export const freightTruck: DataPoint[] = [
  { m:"Jan'21", ftlEU:100, ltlEU:100, nordics:100 },
  { m:"Jul'21", ftlEU:118, ltlEU:115, nordics:112 },
  { m:"Jan'22", ftlEU:130, ltlEU:128, nordics:122 },
  { m:"Jul'22", ftlEU:140, ltlEU:138, nordics:130 },
  { m:"Jan'23", ftlEU:120, ltlEU:118, nordics:116 },
  { m:"Jul'23", ftlEU:112, ltlEU:110, nordics:110 },
  { m:"Jan'24", ftlEU:108, ltlEU:106, nordics:107 },
  { m:"Jul'24", ftlEU:110, ltlEU:108, nordics:108 },
  { m:"Jan'25", ftlEU:108, ltlEU:106, nordics:107 },
  { m:"Mar'26", ftlEU:112, ltlEU:109, nordics:109 },
];
export const freightContainer: DataPoint[] = [
  { m:"Jan'21", c20:1500,  c40:2200,  c40hc:2400  },
  { m:"Jul'21", c20:5500,  c40:8000,  c40hc:8500  },
  { m:"Jan'22", c20:6500,  c40:9500,  c40hc:10000 },
  { m:"Jul'22", c20:4000,  c40:6000,  c40hc:6500  },
  { m:"Jan'23", c20:1400,  c40:2000,  c40hc:2200  },
  { m:"Jul'23", c20:1000,  c40:1500,  c40hc:1650  },
  { m:"Jan'24", c20:1500,  c40:2200,  c40hc:2400  },
  { m:"Jul'24", c20:2000,  c40:2800,  c40hc:3100  },
  { m:"Jan'25", c20:1800,  c40:2500,  c40hc:2750  },
  { m:"Mar'26", c20:1900,  c40:2600,  c40hc:2850  },
];
export const freightSea: DataPoint[] = [
  { m:"Jan'21", bdi:1500, bci:2000, bsi:1200, roro:100 },
  { m:"Jul'21", bdi:3200, bci:4500, bsi:2800, roro:118 },
  { m:"Jan'22", bdi:2400, bci:3200, bsi:2200, roro:130 },
  { m:"Jul'22", bdi:1900, bci:2600, bsi:1800, roro:138 },
  { m:"Jan'23", bdi:800,  bci:1100, bsi:750,  roro:112 },
  { m:"Jul'23", bdi:1100, bci:1400, bsi:950,  roro:108 },
  { m:"Jan'24", bdi:1600, bci:2000, bsi:1300, roro:110 },
  { m:"Jul'24", bdi:1800, bci:2300, bsi:1500, roro:115 },
  { m:"Jan'25", bdi:1400, bci:1800, bsi:1200, roro:112 },
  { m:"Mar'26", bdi:1500, bci:1900, bsi:1250, roro:114 },
];
export const freightAir: DataPoint[] = [
  { m:"Jan'21", bal:3.2,  tatl:3.8, tpac:4.1 },
  { m:"Jul'21", bal:4.8,  tatl:5.2, tpac:5.6 },
  { m:"Jan'22", bal:5.5,  tatl:6.0, tpac:6.4 },
  { m:"Jul'22", bal:4.8,  tatl:5.4, tpac:5.8 },
  { m:"Jan'23", bal:3.2,  tatl:3.6, tpac:4.0 },
  { m:"Jul'23", bal:2.8,  tatl:3.2, tpac:3.6 },
  { m:"Jan'24", bal:2.6,  tatl:3.0, tpac:3.4 },
  { m:"Jul'24", bal:2.9,  tatl:3.3, tpac:3.7 },
  { m:"Jan'25", bal:3.0,  tatl:3.4, tpac:3.8 },
  { m:"Mar'26", bal:3.1,  tatl:3.5, tpac:3.9 },
];

// ─── Forecast ─────────────────────────────────────────────────────────────
export const forecastData: DataPoint[] = [
  { m:"Jan'25", hrpAsia:616, hrpEU:612, type:"actual"   },
  { m:"Apr'25", hrpAsia:630, hrpEU:625, type:"actual"   },
  { m:"Jul'25", hrpAsia:645, hrpEU:638, type:"actual"   },
  { m:"Oct'25", hrpAsia:665, hrpEU:655, type:"actual"   },
  { m:"Jan'26", hrpAsia:692, hrpEU:682, type:"actual"   },
  { m:"Mar'26", hrpAsia:710, hrpEU:700, type:"actual"   },
  { m:"Jun'26", hrpAsia:722, hrpEU:710, type:"forecast" },
  { m:"Sep'26", hrpAsia:732, hrpEU:716, type:"forecast" },
  { m:"Dec'26", hrpAsia:740, hrpEU:720, type:"forecast" },
  { m:"Mar'27", hrpAsia:744, hrpEU:722, type:"forecast" },
];

// ─── Currency & Carbon ────────────────────────────────────────────────────
export const fxData: DataPoint[] = [
  { m:"Jan'21", eurusd:1.22, eurnok:10.4, eurcny:7.85, eurkrw:1345, eurjpy:126, usdcny:6.48 },
  { m:"Jul'21", eurusd:1.18, eurnok:10.3, eurcny:7.64, eurkrw:1358, eurjpy:130, usdcny:6.47 },
  { m:"Jan'22", eurusd:1.14, eurnok:10.0, eurcny:7.25, eurkrw:1360, eurjpy:130, usdcny:6.36 },
  { m:"Jul'22", eurusd:1.02, eurnok:10.3, eurcny:6.90, eurkrw:1366, eurjpy:140, usdcny:6.74 },
  { m:"Jan'23", eurusd:1.07, eurnok:10.8, eurcny:7.40, eurkrw:1372, eurjpy:138, usdcny:6.89 },
  { m:"Jul'23", eurusd:1.09, eurnok:11.6, eurcny:7.90, eurkrw:1440, eurjpy:155, usdcny:7.24 },
  { m:"Jan'24", eurusd:1.09, eurnok:11.4, eurcny:7.85, eurkrw:1440, eurjpy:162, usdcny:7.22 },
  { m:"Jul'24", eurusd:1.08, eurnok:11.8, eurcny:7.92, eurkrw:1500, eurjpy:170, usdcny:7.28 },
  { m:"Jan'25", eurusd:1.04, eurnok:11.9, eurcny:7.72, eurkrw:1510, eurjpy:162, usdcny:7.32 },
  { m:"Mar'26", eurusd:1.08, eurnok:11.5, eurcny:7.88, eurkrw:1490, eurjpy:158, usdcny:7.30 },
];
export const carbonData: DataPoint[] = [
  { m:"Jan'21", ets:33,  ukEts:0,  ccer:8  },
  { m:"Jul'21", ets:52,  ukEts:48, ccer:9  },
  { m:"Jan'22", ets:80,  ukEts:75, ccer:10 },
  { m:"Jul'22", ets:82,  ukEts:78, ccer:11 },
  { m:"Jan'23", ets:90,  ukEts:80, ccer:12 },
  { m:"Jul'23", ets:90,  ukEts:75, ccer:11 },
  { m:"Jan'24", ets:60,  ukEts:55, ccer:12 },
  { m:"Jul'24", ets:68,  ukEts:58, ccer:13 },
  { m:"Jan'25", ets:72,  ukEts:62, ccer:14 },
  { m:"Mar'26", ets:75,  ukEts:65, ccer:15 },
];
