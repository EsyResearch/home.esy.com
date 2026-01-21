# Technical Data: How a Chip Is Manufactured

> Generated: December 15, 2025

This document contains verified technical specifications, tolerances, and numerical data for use in the visual essay. All claims should reference this document.

---

## Material Specifications

### Silicon Purity

| Grade | Purity | Impurities | Use |
|-------|--------|------------|-----|
| Metallurgical | ~98% | ~2% | Solar, industrial |
| Solar grade | 99.9999% (6N) | 1 ppm | Solar cells |
| Electronic grade | 99.9999999% (9N) | 1 ppb | Semiconductors |
| Ultra-high purity | 99.999999999% (11N) | 10 ppt | Advanced research |

**Key fact**: Electronic-grade silicon has fewer than 1 foreign atom per billion silicon atoms.

### Wafer Specifications

| Parameter | 200mm Wafer | 300mm Wafer | 450mm Wafer |
|-----------|-------------|-------------|-------------|
| Diameter | 200mm (8") | 300mm (12") | 450mm (18") |
| Thickness | ~725 μm | ~775 μm | ~925 μm |
| Surface flatness | < 10nm TTV | < 10nm TTV | < 10nm TTV |
| Production status | Legacy | Current standard | R&D only |

**TTV** = Total Thickness Variation

---

## Process Parameters

### Photolithography Generations

| Technology | Wavelength | Resolution | Era |
|------------|------------|------------|-----|
| G-line | 436nm | ~500nm | 1980s |
| I-line | 365nm | ~350nm | 1990s |
| KrF (DUV) | 248nm | ~180nm | Late 1990s |
| ArF (DUV) | 193nm | ~65nm | 2000s |
| ArF Immersion | 193nm | ~38nm | 2010s |
| EUV | 13.5nm | ~7nm+ | 2020s |

**Key fact**: EUV wavelength (13.5nm) is ~14× shorter than ArF (193nm), enabling proportionally smaller features.

### Deposition Temperatures

| Method | Temperature Range | Use Case |
|--------|-------------------|----------|
| PECVD | 200-400°C | Low-temp dielectrics |
| LPCVD | 400-800°C | High-quality films |
| Thermal oxidation | 800-1200°C | Gate oxide |
| ALD | 100-400°C | Conformal thin films |
| PVD/Sputtering | Room temp - 400°C | Metals, barriers |

### Etching Selectivity

| Process | Material Removed | Selectivity |
|---------|-----------------|-------------|
| Silicon etch vs. oxide | Silicon | > 100:1 |
| Oxide etch vs. silicon | Oxide | > 50:1 |
| Nitride etch vs. oxide | Nitride | > 10:1 |

---

## Transistor Specifications

### Node Naming vs. Reality

| Marketing Node | Actual Gate Length | Gate Pitch | Year |
|----------------|-------------------|------------|------|
| 7nm | ~20nm | ~48nm | 2018 |
| 5nm | ~17nm | ~48nm | 2020 |
| 3nm | ~12nm | ~45nm | 2022 |
| 2nm | ~10nm | ~40nm | 2025 |

**Key fact**: "3nm node" does not mean 3nm transistors. Node names are marketing, not measurements.

### Transistor Counts

| Chip | Year | Transistors | Node |
|------|------|-------------|------|
| Intel 4004 | 1971 | 2,300 | 10μm |
| Intel Pentium | 1993 | 3.1 million | 800nm |
| AMD Ryzen 9 7950X | 2022 | 13.1 billion | 5nm |
| Apple M3 Max | 2023 | 92 billion | 3nm |
| NVIDIA H100 | 2022 | 80 billion | 4nm |

### FinFET vs. GAA

| Architecture | Gate Contact | Era |
|--------------|--------------|-----|
| Planar | Top only | Pre-2011 |
| FinFET | 3 sides | 2011-2024 |
| GAA (Nanosheet) | All 4 sides | 2024+ |

---

## Interconnect Specifications

### Metal Layer Stack (Typical Advanced Node)

| Layer | Material | Thickness | Purpose |
|-------|----------|-----------|---------|
| M1-M4 | Copper | 30-50nm | Local interconnect |
| M5-M8 | Copper | 50-100nm | Intermediate routing |
| M9-M12 | Copper | 100-300nm | Global routing |
| M13+ | Copper/Aluminum | 300-1000nm | Power distribution |

### RC Delay Problem

| Node | Wire Width | Resistance | Capacitance |
|------|------------|------------|-------------|
| 28nm | ~50nm | Moderate | Moderate |
| 7nm | ~20nm | High | High |
| 3nm | ~12nm | Very high | Very high |

**Key fact**: At advanced nodes, signal delay in wires can exceed delay in transistors.

---

## Manufacturing Economics

### Fab Construction Costs

| Fab Type | Cost Range | Examples |
|----------|------------|----------|
| Legacy (28nm+) | $1-5 billion | Many |
| Advanced (7-14nm) | $10-15 billion | Multiple |
| Leading edge (3-5nm) | $20-30 billion | TSMC Fab 18, Intel Fab 52 |

### Equipment Costs

| Equipment | Cost | Notes |
|-----------|------|-------|
| ASML EUV (NXE:3400C) | ~$150-200 million | Per machine |
| ASML High-NA EUV | ~$350 million | Latest generation |
| Etch tool | $5-10 million | Per chamber |
| CVD tool | $3-8 million | Per chamber |
| Ion implanter | $5-15 million | Depends on energy |

### Yield Economics

| Scenario | Yield | Good Dies | Impact |
|----------|-------|-----------|--------|
| Mature process | 95% | 950/1000 | Profitable |
| New node (early) | 50% | 500/1000 | Marginal |
| New node (improved) | 80% | 800/1000 | Profitable |
| Catastrophic | 20% | 200/1000 | Loss-making |

**Key fact**: A 10% yield improvement at leading edge can mean hundreds of millions in additional revenue.

---

## Process Complexity

### Process Steps Over Time

| Era | Node | Approximate Steps | Masks |
|-----|------|-------------------|-------|
| 1990s | 350nm | ~200 | 20-25 |
| 2005 | 90nm | ~400 | 30-35 |
| 2015 | 14nm | ~800 | 60-70 |
| 2024 | 3nm | ~1000+ | 80-100 |

### Cycle Time

| Parameter | Value |
|-----------|-------|
| Wafer start to finish | 2-3 months |
| Individual process step | Minutes to hours |
| Full fab capacity | 50,000-100,000 wafers/month |

---

## Cleanroom Requirements

### Cleanroom Classifications

| Class | Particles (≥0.5μm) per m³ | Use |
|-------|---------------------------|-----|
| ISO 1 | 10 | Most critical |
| ISO 2 | 100 | EUV lithography |
| ISO 3 | 1,000 | Photolithography |
| ISO 5 | 100,000 | General fab |
| ISO 7 | 352,000 | Packaging |

**Comparison**: Outdoor air has millions of particles per cubic meter.

---

## Geopolitical Data

### Global Semiconductor Manufacturing Share (2024)

| Region | Share of Advanced Logic (<10nm) |
|--------|---------------------------------|
| Taiwan (TSMC) | ~90% |
| South Korea (Samsung) | ~8% |
| United States | ~0% (ramping) |
| China | ~0% (sanctions limited) |

### Policy Investments

| Policy | Amount | Year |
|--------|--------|------|
| US CHIPS Act | $52 billion | 2022 |
| EU Chips Act | €43 billion | 2023 |
| China National IC Fund | $50+ billion | 2014-present |
| Japan semiconductor subsidies | $13 billion | 2021-present |

---

## Scaling Limits

### Physical Limits

| Challenge | Threshold | Impact |
|-----------|-----------|--------|
| Quantum tunneling | < 5nm channel | Leakage current |
| Atomic layer limits | 1-2 atoms (~0.3nm) | Cannot shrink further |
| Heat density | ~100 W/cm² | Thermal management |
| EUV wavelength | 13.5nm | Pattern resolution |

### Moore's Law Status

| Period | Transistor Doubling | Status |
|--------|---------------------|--------|
| 1970-2000 | ~18 months | On track |
| 2000-2015 | ~24 months | Slowing |
| 2015-2024 | ~30+ months | Significantly slowed |

**Key fact**: Moore's Law is not dead, but the doubling interval has extended significantly.















