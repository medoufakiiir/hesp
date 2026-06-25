# HESP — Image Sourcing Checklist

Use this to find/buy/shoot a real photo for every **category** and **product**.
Tick the box once you've placed the file.

## Where each image goes

| Type | Drop the file at | Then |
|---|---|---|
| **Category** | `public/images/categories/<slug>.jpg` | point `categorySubjects`/a new map in [src/data/catalog-assets.ts](src/data/catalog-assets.ts) at it (or tell me the slug→file and I'll wire it) |
| **Product** | upload via Admin → Parts (saved as `PartImage.url`) | shows automatically — `getProductImage` prefers the uploaded URL |

Recommended: landscape JPG/WebP, ≥ 800×600, dark or neutral background to match the industrial theme.

---

## CATEGORIES (39)

Parent categories are **bold**; children are indented.

### Engine
- [ ] **engine-parts** — Engine Parts / محركات
  - [ ] pistons — Pistons & Liners
  - [ ] gaskets — Gaskets & Seals
  - [ ] turbochargers — Turbochargers
  - [ ] injectors — Fuel Injectors

### Hydraulics
- [ ] **hydraulics** — Hydraulics / نظام هيدروليك
  - [ ] hydraulic-pumps — Hydraulic Pumps
  - [ ] hydraulic-cylinders — Hydraulic Cylinders
  - [ ] hydraulic-valves — Hydraulic Valves
  - [ ] hydraulic-hoses — Hoses & Fittings
  - [ ] seal-kits — Seal Kits

### Undercarriage
- [ ] **undercarriage** — Undercarriage / الهيكل السفلي
  - [ ] track-chains — Track Chains
  - [ ] rollers — Rollers
  - [ ] idlers — Idlers & Sprockets
  - [ ] track-shoes — Track Shoes & Pads

### Transmission & Drivetrain
- [ ] **transmission-drivetrain** — Transmission & Drivetrain / ناقل الحركة
  - [ ] final-drives — Final Drives
  - [ ] gears-clutches — Gears & Clutches

### Electrical
- [ ] **electrical** — Electrical / كهرباء
  - [ ] alternators-starters — Alternators & Starters
  - [ ] sensors — Sensors
  - [ ] wiring-harnesses — Wiring Harnesses

### Filters
- [ ] **filters** — Filters / فلاتر
  - [ ] oil-filters — Oil Filters
  - [ ] fuel-filters — Fuel Filters
  - [ ] air-filters — Air Filters
  - [ ] hydraulic-filters — Hydraulic Filters

### Cooling System
- [ ] **cooling-system** — Cooling System / نظام التبريد
  - [ ] radiators — Radiators
  - [ ] water-pumps — Water Pumps
  - [ ] cooling-fans — Cooling Fans

### Ground Engaging Tools (GET)
- [ ] **ground-engaging-tools** — Ground Engaging Tools / أدوات الحفر
  - [ ] bucket-teeth — Bucket Teeth
  - [ ] cutting-edges — Cutting Edges
  - [ ] adapters — Adapters

### Standalone
- [ ] **seals-fasteners** — Seals & Fasteners / حشوات ومثبتات
- [ ] **cabin-body** — Cabin & Body / الكابينة والهيكل

---

## PRODUCTS (63)

`SKU` — Name (brand) · category

### Engine Parts
- [ ] SAMPLE-CAT-PISTON-KIT-C7 — Piston Kit C7 Engine (Caterpillar) · pistons
- [ ] SAMPLE-KOM-PC200-PISTON — Piston Assembly SAA6D107 (Komatsu) · pistons
- [ ] SAMPLE-CUM-LINER-6BT — Cylinder Liner 6BT (Cummins) · pistons
- [ ] SAMPLE-CAT-GASKET-HEAD-C9 — Head Gasket Set C9 (Caterpillar) · gaskets
- [ ] SAMPLE-KOM-GASKET-KIT-6D — Full Gasket Kit 6D102 (Komatsu) · gaskets
- [ ] SAMPLE-PERK-GASKET-1104 — Full Gasket Set 1104D (Perkins) · gaskets
- [ ] SAMPLE-CAT-TURBO-320D — Turbocharger GT2556S (Caterpillar) · turbochargers
- [ ] SAMPLE-KOM-TURBO-PC300 — Turbocharger HX40W (Komatsu) · turbochargers
- [ ] SAMPLE-DOOSAN-TURBO-DX225 — Turbocharger DX225LC (Doosan) · turbochargers
- [ ] SAMPLE-CUM-TURBO-HX35W — Turbocharger HX35W 6BT (Cummins) · turbochargers
- [ ] SAMPLE-BOSCH-INJ-320D — Common Rail Injector CR (Bosch) · injectors
- [ ] SAMPLE-PERK-INJ-1104 — Fuel Injector 1104D (Perkins) · injectors

### Hydraulics
- [ ] SAMPLE-CAT-HYD-PUMP-320D — Main Hydraulic Pump AP2D36 (Caterpillar) · hydraulic-pumps
- [ ] SAMPLE-KOM-HYD-PUMP-PC200 — Hydraulic Main Pump HPV95 (Komatsu) · hydraulic-pumps
- [ ] SAMPLE-VOLVO-HYD-PUMP-EC210 — Hydraulic Pump K3V112DT (Volvo CE) · hydraulic-pumps
- [ ] SAMPLE-JCB-HYD-PUMP-3CX — Hydraulic Pump 3CX Backhoe (JCB) · hydraulic-pumps
- [ ] SAMPLE-BOBCAT-HYD-PUMP-E85 — Hydraulic Pump E85 (Bobcat) · hydraulic-pumps
- [ ] SAMPLE-CAT-BOOM-CYL-320 — Boom Cylinder Assembly (Caterpillar) · hydraulic-cylinders
- [ ] SAMPLE-KOM-ARM-CYL-PC200 — Arm Cylinder (Komatsu) · hydraulic-cylinders
- [ ] SAMPLE-HIT-BUCKET-CYL-ZX200 — Bucket Cylinder (Hitachi) · hydraulic-cylinders
- [ ] SAMPLE-KOBELCO-HYD-CYL-SK200 — Boom Cylinder SK200 (Kobelco) · hydraulic-cylinders
- [ ] SAMPLE-CAT-CTRL-VALVE-320 — Main Control Valve (Caterpillar) · hydraulic-valves
- [ ] SAMPLE-GENERIC-HYD-HOSE-1 — High Pressure Hydraulic Hose 1/2" (Caterpillar) · hydraulic-hoses
- [ ] SAMPLE-CAT-SEAL-KIT-320 — Boom Cylinder Seal Kit (Caterpillar) · seal-kits
- [ ] SAMPLE-KOM-SEAL-KIT-PC200 — Arm Cylinder Seal Kit (Komatsu) · seal-kits

### Undercarriage
- [ ] SAMPLE-ITR-CHAIN-320D — Track Chain Assembly 49L (ITR/Berco) · track-chains
- [ ] SAMPLE-ITR-CHAIN-PC200 — Track Chain Assembly PC200 (ITR/Berco) · track-chains
- [ ] SAMPLE-CASE-TRACK-CX210 — Track Chain CX210D (Case) · track-chains
- [ ] SAMPLE-CAT-ROLLER-TOP-320 — Top Roller / Carrier Roller (Caterpillar) · rollers
- [ ] SAMPLE-KOM-ROLLER-BTM-PC200 — Bottom Roller / Track Roller (Komatsu) · rollers
- [ ] SAMPLE-CAT-IDLER-320D — Front Idler Assembly (Caterpillar) · idlers
- [ ] SAMPLE-ITR-SPROCKET-320 — Drive Sprocket (ITR/Berco) · idlers
- [ ] SAMPLE-CAT-TRACK-SHOE-320 — Track Shoe 600mm (Caterpillar) · track-shoes
- [ ] SAMPLE-KOM-TRACK-SHOE-PC200 — Track Shoe 500mm (Komatsu) · track-shoes

### Transmission & Drivetrain
- [ ] SAMPLE-CAT-FINAL-DRIVE-320 — Final Drive Motor Assembly (Caterpillar) · final-drives
- [ ] SAMPLE-KOM-FINAL-DRIVE-PC200 — Travel Motor Assembly (Komatsu) · final-drives
- [ ] SAMPLE-LIEBHERR-SWING-R920 — Swing Motor R920 (Liebherr) · final-drives
- [ ] SAMPLE-CAT-SWING-GEAR-320 — Swing Gear Ring (Caterpillar) · gears-clutches
- [ ] SAMPLE-VOLVO-CLUTCH-L120 — Transmission Clutch Pack (Volvo CE) · gears-clutches

### Electrical
- [ ] SAMPLE-CAT-ALTERNATOR-320 — Alternator 24V 50A (Caterpillar) · alternators-starters
- [ ] SAMPLE-BOSCH-STARTER-24V — Starter Motor 24V 5.5kW (Bosch) · alternators-starters
- [ ] SAMPLE-KOM-PRESS-SENSOR — Hydraulic Pressure Sensor (Komatsu) · sensors
- [ ] SAMPLE-CAT-TEMP-SENSOR — Coolant Temperature Sensor (Caterpillar) · sensors
- [ ] SAMPLE-HIT-WIRING-ZX200 — Engine Wiring Harness (Hitachi) · wiring-harnesses
- [ ] SAMPLE-CAT-WIRING-320D — Main Wiring Harness (Caterpillar) · wiring-harnesses

### Filters
- [ ] SAMPLE-DON-OIL-FILTER-P55 — Oil Filter P551807 (Donaldson) · oil-filters
- [ ] SAMPLE-FLT-OIL-FILTER-LF9009 — Oil Filter LF9009 (Fleetguard) · oil-filters
- [ ] SAMPLE-BALD-OIL-FILTER-B7600 — Oil Filter B7600 (Baldwin) · oil-filters
- [ ] SAMPLE-SANY-OIL-FILTER-215 — Engine Oil Filter SY215C (SANY) · oil-filters
- [ ] SAMPLE-CAT-TRANS-FILTER — Transmission Oil Filter (Caterpillar) · oil-filters
- [ ] SAMPLE-DON-FUEL-FILTER-P55 — Fuel Filter P551001 (Donaldson) · fuel-filters
- [ ] SAMPLE-FLT-FUEL-SEP-FS19732 — Fuel/Water Separator FS19732 (Fleetguard) · fuel-filters
- [ ] SAMPLE-XCMG-FUEL-FILTER-215 — Fuel Filter XE215DA (XCMG) · fuel-filters
- [ ] SAMPLE-VOLVO-FUEL-FILTER-EC — Fuel Filter EC210D (Volvo CE) · fuel-filters
- [ ] SAMPLE-DON-AIR-P82-PRIMARY — Primary Air Filter P828889 (Donaldson) · air-filters
- [ ] SAMPLE-DON-AIR-P82-SAFETY — Safety Air Filter P829333 (Donaldson) · air-filters
- [ ] SAMPLE-FLT-AIR-AF25708 — Air Filter AF25708 (Fleetguard) · air-filters
- [ ] SAMPLE-CAT-320D-AIR-FILTER — Heavy Duty Air Filter (Caterpillar) · air-filters
- [ ] SAMPLE-HYUNDAI-AIR-FILTER — Air Filter Element HX220S (Hyundai) · air-filters
- [ ] SAMPLE-JD-AIR-FILTER-210G — Air Filter 210G Excavator (John Deere) · air-filters
- [ ] SAMPLE-DON-HYD-FILTER-P17 — Hydraulic Return Filter P173207 (Donaldson) · hydraulic-filters
- [ ] SAMPLE-KOM-HYD-FILTER-SUCT — Hydraulic Suction Strainer (Komatsu) · hydraulic-filters
- [ ] SAMPLE-HIT-HYD-FILTER-ZX — Hydraulic Filter ZX200 (Hitachi) · hydraulic-filters

### Cooling System
- [ ] SAMPLE-CAT-RADIATOR-320D — Radiator Assembly (Caterpillar) · radiators
- [ ] SAMPLE-KOM-RADIATOR-PC200 — Radiator Core Assembly (Komatsu) · radiators
- [ ] SAMPLE-VOLVO-RADIATOR-EC210 — Radiator EC210D (Volvo CE) · radiators
- [ ] SAMPLE-CAT-WATER-PUMP-C7 — Water Pump C7 Engine (Caterpillar) · water-pumps
- [ ] SAMPLE-KOM-WATER-PUMP-6D102 — Water Pump 6D102 (Komatsu) · water-pumps
- [ ] SAMPLE-HIT-WATER-PUMP-ZX200 — Water Pump ZX200 (Hitachi) · water-pumps
- [ ] SAMPLE-CAT-FAN-CLUTCH-320 — Fan Clutch Assembly (Caterpillar) · cooling-fans

### Ground Engaging Tools
- [ ] SAMPLE-CAT-TOOTH-J350 — Bucket Tooth J350 Standard (Caterpillar) · bucket-teeth
- [ ] SAMPLE-KOM-TOOTH-PC200 — Bucket Tooth ESCO Style (Komatsu) · bucket-teeth
- [ ] SAMPLE-VOLVO-TOOTH-EC210 — Bucket Tooth EC210 (Volvo CE) · bucket-teeth
- [ ] SAMPLE-CAT-EDGE-320 — Cutting Edge Bolt-On 1524mm (Caterpillar) · cutting-edges
- [ ] SAMPLE-KOM-EDGE-PC200 — Cutting Edge PC200 1320mm (Komatsu) · cutting-edges
- [ ] SAMPLE-CAT-ADAPTER-J350 — Tooth Adapter J350 (Caterpillar) · adapters

### Seals & Fasteners
- [ ] SAMPLE-CAT-ORING-KIT — O-Ring Kit (Engine) (Caterpillar) · seals-fasteners
- [ ] SAMPLE-KOM-BOLT-TRACK — Track Bolt & Nut Set (Komatsu) · seals-fasteners

### Cabin & Body
- [ ] SAMPLE-CAT-CABIN-GLASS-320 — Front Window Glass (Caterpillar) · cabin-body
- [ ] SAMPLE-KOM-SEAT-PC200 — Operator Seat with Suspension (Komatsu) · cabin-body
- [ ] SAMPLE-CAT-MIRROR-320 — Side Mirror Assembly (Caterpillar) · cabin-body
