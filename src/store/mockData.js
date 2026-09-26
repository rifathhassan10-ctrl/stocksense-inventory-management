// StockSense Centralized Mock Dataset
// Matches Stitch Source-of-Truth Scenarios

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    sku: "SR001",
    name: "Industrial Steel Rod - 12mm",
    category: "Raw Materials",
    uom: "kg",
    description: "Structural cold-rolled high tensile rebar suitable for fabrication.",
    totalStock: 77,
    minStock: 25,
    unitPrice: 42.50,
    status: "LOW STOCK",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo3xQpZmyPb2RO1CP31L3eniH080GMlcCR9vbZUYghhb1Ozh3VFBba_jup0xS0aAlWRAGZ8800jI-iMu_3FwRhwwOyuDYuWQaVYeK8ggKgKZ185BQEF2OF8HTWmZVQX0o8eddnkqNOKWgairYKVCZn6Gz3Q3Yydb4g88q1ThStPa253zcC6Czf_VgmSkPURXuwuvADvmZNSjAh92FepkWEd5-cqRzpBzNcLlGNT8ucx9O4KCfitFWsbQ",
    allocations: {
      "Main Warehouse": 70,
      "Production Rack": 7,
      "Warehouse 2": 0
    },
    consumptionRateDaily: 4.2,
    predictedStockoutDays: 1.6
  },
  {
    id: "prod-2",
    sku: "SR-502",
    name: "Industrial Storage Rack - 5 Tier",
    category: "Furniture",
    uom: "Units",
    description: "Heavy duty blue and orange 5 tier warehouse industrial pallet racking system.",
    totalStock: 12,
    minStock: 3,
    unitPrice: 2468.70,
    status: "IN STOCK",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD63FL6ky48pPzRvUaVEsqEnaOc0FmUhLW7uYyPXikD1UyAT8XDO0Gh-diq-mGZdG4MQh_Y2Q76A97b8OhfSYHpDC1_iVBEbQhsh1YUHNI7Vcqi9l1uZFyvkYta7qk1xW1TQfXzQVNizWblaJJRE4wIGGMj_Bj8jYSD0f22HCxffhFwSH5Jzt8z_XfhK3CnMB6-bHGFLpQRCatL61Lr6Xyd54uv1oszsktSh_A5WvXRzQeJ4JMiQvfQlw",
    allocations: {
      "Main Warehouse": 12,
      "Production Rack": 0,
      "Warehouse 2": 0
    },
    consumptionRateDaily: 0.3,
    predictedStockoutDays: 40
  },
  {
    id: "prod-3",
    sku: "PBT-20",
    name: "Plastic Bulk Box Truck, 20 Bushel",
    category: "Finished Goods",
    uom: "Units",
    description: "Durable rotational molded polyethylene cart on heavy-duty casters.",
    totalStock: 30,
    minStock: 5,
    unitPrice: 385.00,
    status: "IN STOCK",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgtGtoMOELm7xUecBZ92zaXcti6e36V7DpFx1kl8obDWiY612VZcR5REgfx9Uc-zm_U4Vai9MjVcU3g1YhR9UxD7Pd97A8EEV0xGdgEfNEFHXcDPIBT9fwGTkUHUxPU2RT0TtmMVG12BZRpR8f9EXIWHrpAWzRcIxoQWFckEO7gMXOMzrNoJUTjfGw85dtouCZzIm7Pmvuaq-qEnz08g9oOcgR8W98zvE4_pUP4-BvUkxERkdDrqlrHA",
    allocations: {
      "Main Warehouse": 20,
      "Production Rack": 10,
      "Warehouse 2": 0
    },
    consumptionRateDaily: 1.1,
    predictedStockoutDays: 27
  },
  {
    id: "prod-4",
    sku: "PJ-102",
    name: "Heavy Duty Pallet Jack Set",
    category: "Finished Goods",
    uom: "Units",
    description: "5,500 lbs capacity manual hydraulic steer wheel jack with tandem nylon rollers.",
    totalStock: 0,
    minStock: 2,
    unitPrice: 840.00,
    status: "OUT OF STOCK",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQnG7MqeXlI8SK3paGuVc21FRRmuZgFIntZkuD4aybfI9GQ6IT5h1IO_0B998TBDoZGVAnENsDD0Jk-MzeNfAJnE74oRYsHiRzj7gaoW11qretqa_hVpHb-joPyQSOe4nIJFhAyXkJXxsRoX3GsZH-vl5N4pLA3XS2vm7-Aw_N3CvZBRzft5O4BztiH7-xQ43s_BDBqLpx6WK667YZJREnqoexiuz6Dxo_Wg2tXvhUCBfY676lxeUOmA",
    allocations: {
      "Main Warehouse": 0,
      "Production Rack": 0,
      "Warehouse 2": 0
    },
    consumptionRateDaily: 0.5,
    predictedStockoutDays: 0
  },
  {
    id: "prod-5",
    sku: "EC-401",
    name: "Industrial Electrical Cable 100m Drum",
    category: "Electronics",
    uom: "Drums",
    description: "4-Core 16mm Armored XLPE cable for heavy industrial motor feeds.",
    totalStock: 4,
    minStock: 10,
    unitPrice: 620.00,
    status: "LOW STOCK",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-UEN1ORphrrtE5hsl4vrLO80fsi_OJErpCZvrwmU_UeHPu-ncg0zZ4YnCa8SUAo3uCr5wy8_3o2IOSQlc_73v3pecRjDNIDjKc6S0cXWUsOteLApDlVH5NYHhuorU58Pr0zYVGSxK3lyIssutAAbApjdhV1obJQTH4v4Ey5yGVzUqRt3b23ouDzVBiNSb3Q3RBrWeNLQavdetc1qRRLA_vGuxl7cbcBRpFTKK54L-QvR0GGrNot54qg",
    allocations: {
      "Main Warehouse": 0,
      "Production Rack": 0,
      "Warehouse 2": 4
    },
    consumptionRateDaily: 0.8,
    predictedStockoutDays: 5.0
  },
  {
    id: "prod-6",
    sku: "LP-900",
    name: "High Performance Laptop 16\"",
    category: "Electronics",
    uom: "Units",
    description: "Engineering workstation laptop with dedicated GPU for CAD/CAM operators.",
    totalStock: 2,
    minStock: 5,
    unitPrice: 1899.00,
    status: "LOW STOCK",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    allocations: {
      "Main Warehouse": 2,
      "Production Rack": 0,
      "Warehouse 2": 0
    },
    consumptionRateDaily: 0.4,
    predictedStockoutDays: 4.8
  },
  {
    id: "prod-7",
    sku: "CM-50",
    name: "Portland Cement 50kg Heavy Bag",
    category: "Construction",
    uom: "Bags",
    description: "General purpose high strength structural cement mix for facility flooring.",
    totalStock: 210,
    minStock: 40,
    unitPrice: 16.50,
    status: "IN STOCK",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
    allocations: {
      "Main Warehouse": 0,
      "Production Rack": 0,
      "Warehouse 2": 210
    },
    consumptionRateDaily: 12.0,
    predictedStockoutDays: 17.5
  },
  {
    id: "prod-8",
    sku: "CH-880",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    uom: "Units",
    description: "Mesh high-back executive ergonomic task chair with multi-tilt adjustment.",
    totalStock: 40,
    minStock: 10,
    unitPrice: 340.00,
    status: "IN STOCK",
    imageUrl: "https://images.unsplash.com/photo-1580481077195-c3a8b417e06a?auto=format&fit=crop&w=600&q=80",
    allocations: {
      "Main Warehouse": 40,
      "Production Rack": 0,
      "Warehouse 2": 0
    },
    consumptionRateDaily: 2.2,
    predictedStockoutDays: 18.1
  },
  {
    id: "prod-9",
    sku: "AL094",
    name: "Aluminum Structural Ingot",
    category: "Raw Materials",
    uom: "kg",
    description: "6061-T6 Extrusion billet alloy for precision CNC machining components.",
    totalStock: 150,
    minStock: 30,
    unitPrice: 28.00,
    status: "IN STOCK",
    imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80",
    allocations: {
      "Main Warehouse": 100,
      "Production Rack": 50,
      "Warehouse 2": 0
    },
    consumptionRateDaily: 6.5,
    predictedStockoutDays: 23.0
  },
  {
    id: "prod-10",
    sku: "IV-02",
    name: "Cast Steel Industrial Butterfly Valve",
    category: "Finished Goods",
    uom: "Units",
    description: "Class 150 flanged wafer high pressure isolation valves for piping mains.",
    totalStock: 84,
    minStock: 15,
    unitPrice: 115.00,
    status: "IN STOCK",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    allocations: {
      "Main Warehouse": 84,
      "Production Rack": 0,
      "Warehouse 2": 0
    },
    consumptionRateDaily: 3.0,
    predictedStockoutDays: 28.0
  }
];

export const INITIAL_LEDGER_ENTRIES = [
  {
    id: "leg-4",
    timestamp: "Today, 12:15 PM",
    isoDate: "2026-09-26T12:15:00Z",
    productName: "Steel Rod",
    sku: "SR001",
    operationType: "ADJUSTMENT",
    quantity: -3,
    quantityFormatted: "-3 kg",
    unit: "kg",
    location: "Production Rack",
    locationFlow: "Production Rack",
    snapshot: "Main Whse: 70 kg | Prod Rack: 7 kg | Total: 77 kg",
    docRef: "#ADJ-2025-003",
    operator: "Marcus Chen",
    role: "Warehouse Staff",
    status: "DONE",
    blockHash: "TXN_88FE90231BC92",
    preStock: "Prod Rack: 10 kg",
    postStock: "Prod Rack: 7 kg",
    note: "Damaged or scrap cut off discrepancy discovered during cycle count. Approved variance."
  },
  {
    id: "leg-3",
    timestamp: "Today, 11:40 AM",
    isoDate: "2026-09-26T11:40:00Z",
    productName: "Steel Rod",
    sku: "SR001",
    operationType: "DELIVERY",
    quantity: -20,
    quantityFormatted: "-20 kg",
    unit: "kg",
    location: "Production Rack",
    locationFlow: "Production Rack",
    snapshot: "Main Whse: 70 kg | Prod Rack: 10 kg | Total: 80 kg",
    docRef: "#DEL-2025-112",
    operator: "Alex Rivera",
    role: "Inventory Manager",
    status: "DONE",
    blockHash: "TXN_77A91244E390C5",
    preStock: "Prod Rack: 30 kg",
    postStock: "Prod Rack: 10 kg",
    note: "Dispatched for Fabrication Client Order #FC-9020."
  },
  {
    id: "leg-2",
    timestamp: "Today, 11:18 AM",
    isoDate: "2026-09-26T11:18:00Z",
    productName: "Steel Rod",
    sku: "SR001",
    operationType: "INTERNAL_TRANSFER",
    quantity: 30,
    quantityFormatted: "30 kg moved",
    unit: "kg",
    location: "Production Rack",
    locationFlow: "Main Whse ➔ Production Rack",
    snapshot: "Main Whse: 70 kg | Prod Rack: 30 kg | Total: 100 kg",
    docRef: "#TRF-2025-044",
    operator: "Marcus Chen",
    role: "Warehouse Staff",
    status: "DONE",
    blockHash: "TXN_33BD8710C188F2",
    preStock: "Main Whse: 100 kg | Prod: 0 kg",
    postStock: "Main Whse: 70 kg | Prod: 30 kg",
    note: "Staged for CNC lathe cutting schedule #88B. Total inventory invariant maintained."
  },
  {
    id: "leg-1",
    timestamp: "Today, 11:05 AM",
    isoDate: "2026-09-26T11:05:00Z",
    productName: "Steel Rod",
    sku: "SR001",
    operationType: "RECEIPT",
    quantity: 100,
    quantityFormatted: "+100 kg",
    unit: "kg",
    location: "Main Warehouse",
    locationFlow: "Main Warehouse (Bay A)",
    snapshot: "Main Whse: 100 kg | Prod Rack: 0 kg | Total: 100 kg",
    docRef: "#REC-2025-089",
    operator: "Alex Rivera",
    role: "Inventory Manager",
    status: "DONE",
    blockHash: "TXN_98FA2038B744A1",
    preStock: "0 kg (Empty bin)",
    postStock: "100 kg (Main Whse)",
    note: "Received vendor shipment from Global Metals PO-882, Bin A-12."
  },
  {
    id: "leg-0",
    timestamp: "Yesterday, 11:20 AM",
    isoDate: "2026-09-25T11:20:00Z",
    productName: "Ergonomic Office Chair",
    sku: "CH-880",
    operationType: "DELIVERY",
    quantity: -10,
    quantityFormatted: "-10 units",
    unit: "Units",
    location: "Main Warehouse",
    locationFlow: "Main Warehouse",
    snapshot: "Main Whse: 35 units | Total: 35 units",
    docRef: "#DEL-2025-109",
    operator: "Elena Rostov",
    role: "Dispatch Lead",
    status: "DONE",
    blockHash: "TXN_51280BA17290A8",
    preStock: "Main Whse: 45 units",
    postStock: "Main Whse: 35 units",
    note: "Client dispatch to Acme Corp Corporate HQ."
  },
  {
    id: "leg-pre-1",
    timestamp: "Yesterday, 09:15 AM",
    isoDate: "2026-09-25T09:15:00Z",
    productName: "Portland Cement 50kg",
    sku: "CM-50",
    operationType: "RECEIPT",
    quantity: 50,
    quantityFormatted: "+50 bags",
    unit: "Bags",
    location: "Warehouse 2",
    locationFlow: "Warehouse 2 (Logistics Hub)",
    snapshot: "Whse 2: 210 bags | Total: 210 bags",
    docRef: "#REC-2025-088",
    operator: "Marcus Chen",
    role: "Warehouse Staff",
    status: "DONE",
    blockHash: "TXN_12BCC4890A98F7",
    preStock: "Whse 2: 160 bags",
    postStock: "Whse 2: 210 bags",
    note: "Bulk delivery from Holcim Ind PO-9921."
  }
];

export const INITIAL_OPERATIONS_QUEUE = [
  {
    id: "op-rec-1",
    type: "RECEIPT",
    ref: "#REC-2025-092",
    sku: "SR001",
    productName: "Steel Rod",
    category: "Raw Materials",
    qty: 50,
    unit: "kg",
    supplier: "FastLogix Corp",
    dock: "Gate 3",
    status: "WAITING",
    destination: "Main Warehouse",
    note: "Awaiting dock gate inspection check"
  },
  {
    id: "op-del-1",
    type: "DELIVERY",
    ref: "#DEL-2025-115",
    sku: "CH-880",
    productName: "Ergonomic Chair",
    category: "Furniture",
    qty: 15,
    unit: "Units",
    customer: "TechPark Tower",
    source: "Main Warehouse",
    status: "READY",
    note: "Picking completed, ready for truck loading"
  },
  {
    id: "op-trf-1",
    type: "INTERNAL_TRANSFER",
    ref: "#TRF-2025-047",
    sku: "IV-02",
    productName: "Butterfly Valve",
    category: "Internal Move",
    qty: 40,
    unit: "Units",
    source: "Main Warehouse (Bay A)",
    destination: "Production Rack B",
    status: "DRAFT",
    priority: "Normal",
    note: "WIP work order request #WO-499"
  }
];

export const INITIAL_WAREHOUSE_CONFIG = {
  warehouses: [
    {
      id: "wh-main",
      name: "Main Warehouse (Bay A)",
      code: "MAIN-BAY-A",
      type: "Central Distribution Hub",
      totalCapacityM3: 5000,
      usedCapacityM3: 3920,
      utilizationPct: 78.4,
      totalSlots: 184,
      activeSlots: 166,
      ambientTemp: "21°C Ambient",
      zones: [
        {
          id: "zone-a",
          name: "Zone A - Heavy Metals & Raw Materials",
          racks: [
            {
              id: "rack-01",
              name: "Aisle 01 • Rack A (Heavy Duty Cantilever Bay)",
              maxLoadKg: 2500,
              bins: [
                {
                  id: "BIN-A-01-A",
                  sku: "SR001",
                  productName: "Industrial Steel Rod - 12mm",
                  weightCurrent: 70,
                  weightMax: 100,
                  capacityPct: 70,
                  status: "In Stock",
                  statusClass: "bg-status-success",
                  shelf: "Shelf 1 • Cantilever",
                  specs: {
                    dimensions: "2.4m × 1.2m × 1.5m",
                    maxWeight: "500 kg (Load: 70 kg)",
                    climate: "Ambient (18°C - 24°C)",
                    rfid: "RFID-8839-A1"
                  },
                  safetyBuffer: "25 kg (Min Level)",
                  lastMove: "#TRF-2025-044",
                  locked: false
                },
                {
                  id: "BIN-A-01-B",
                  sku: "PJ-102",
                  productName: "Heavy Duty Pallet Jack (PJ-102)",
                  weightCurrent: 94,
                  weightMax: 100,
                  capacityPct: 94,
                  status: "Near Max",
                  statusClass: "bg-status-warning",
                  shelf: "Shelf 2 • Pallet Bay",
                  specs: {
                    dimensions: "2.4m × 1.6m × 1.8m",
                    maxWeight: "600 kg",
                    climate: "Ambient",
                    rfid: "RFID-8839-B2"
                  },
                  safetyBuffer: "2 Units (Reorder point)",
                  lastMove: "#DEL-2025-101",
                  locked: false
                },
                {
                  id: "BIN-A-01-C",
                  sku: null,
                  productName: "Unassigned (Empty)",
                  weightCurrent: 0,
                  weightMax: 100,
                  capacityPct: 0,
                  status: "Available",
                  statusClass: "bg-status-info",
                  shelf: "Shelf 3 • Heavy Duty",
                  specs: {
                    dimensions: "2.4m × 1.2m × 1.5m",
                    maxWeight: "500 kg",
                    climate: "Ambient",
                    rfid: "RFID-8839-C3"
                  },
                  safetyBuffer: "N/A",
                  lastMove: "None",
                  locked: false
                },
                {
                  id: "BIN-A-01-D",
                  sku: "CM-50",
                  productName: "Portland Cement (CM-50)",
                  weightCurrent: 0,
                  weightMax: 80,
                  capacityPct: 0,
                  status: "Depleted",
                  statusClass: "bg-outline",
                  shelf: "Shelf 4 • Pallet Bay",
                  specs: {
                    dimensions: "2.0m × 1.2m × 1.2m",
                    maxWeight: "400 kg",
                    climate: "Dry Protected (<40% RH)",
                    rfid: "RFID-8839-D4"
                  },
                  safetyBuffer: "40 Bags",
                  lastMove: "#REC-2025-088",
                  locked: false
                }
              ]
            }
          ]
        },
        {
          id: "zone-b",
          name: "Zone B - Pallet Staging & Bulk",
          racks: [
            {
              id: "rack-02",
              name: "Aisle 02 • Rack B (Pallet Staging & Fast Picking)",
              maxLoadKg: 3200,
              bins: [
                {
                  id: "BIN-B-02-A",
                  sku: "BX-88",
                  productName: "Packaging Corrugated (BX-88)",
                  weightCurrent: 62,
                  weightMax: 100,
                  capacityPct: 62,
                  status: "In Stock",
                  statusClass: "bg-status-success",
                  shelf: "Tier 1 • Floor Pad",
                  specs: {
                    dimensions: "2.4m × 1.4m × 1.6m",
                    maxWeight: "350 kg",
                    climate: "Ambient",
                    rfid: "RFID-9102-X1"
                  },
                  safetyBuffer: "15 Units",
                  lastMove: "#TRF-2025-039",
                  locked: false
                },
                {
                  id: "BIN-B-02-B",
                  sku: "SW-200",
                  productName: "Shrink Wrap Rolls (SW-200)",
                  weightCurrent: 12,
                  weightMax: 100,
                  capacityPct: 12,
                  status: "Low Utilization",
                  statusClass: "bg-status-warning",
                  shelf: "Tier 2 • Pallet Bay",
                  specs: {
                    dimensions: "2.0m × 1.2m × 1.5m",
                    maxWeight: "250 kg",
                    climate: "Ambient",
                    rfid: "RFID-9102-X2"
                  },
                  safetyBuffer: "10 Rolls",
                  lastMove: "#REC-2025-072",
                  locked: false
                },
                {
                  id: "BIN-B-02-C",
                  sku: "SB-15",
                  productName: "Strapping Bands (SB-15)",
                  weightCurrent: 78,
                  weightMax: 100,
                  capacityPct: 78,
                  status: "In Stock",
                  statusClass: "bg-status-success",
                  shelf: "Tier 3 • Top Deck",
                  specs: {
                    dimensions: "2.2m × 1.2m × 1.4m",
                    maxWeight: "400 kg",
                    climate: "Ambient",
                    rfid: "RFID-9102-X3"
                  },
                  safetyBuffer: "20 Spools",
                  lastMove: "#TRF-2025-042",
                  locked: false
                },
                {
                  id: "BIN-B-02-D",
                  sku: "WP-EU",
                  productName: "Wooden Pallets EU (WP-EU)",
                  weightCurrent: 92,
                  weightMax: 100,
                  capacityPct: 92,
                  status: "Near Full",
                  statusClass: "bg-status-warning",
                  shelf: "Floor Staging Zone",
                  specs: {
                    dimensions: "2.4m × 1.6m × 2.0m",
                    maxWeight: "800 kg",
                    climate: "Ambient",
                    rfid: "RFID-9102-X4"
                  },
                  safetyBuffer: "25 Pallets",
                  lastMove: "#TRF-2025-040",
                  locked: false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "wh-prod",
      name: "Production Facility (Plant A)",
      code: "PROD-PLANT-A",
      type: "Manufacturing Staging Floor",
      totalCapacityM3: 1200,
      usedCapacityM3: 1092,
      utilizationPct: 91.0,
      totalSlots: 64,
      activeSlots: 60,
      ambientTemp: "24°C Climate Regulated",
      zones: []
    },
    {
      id: "wh-wh2",
      name: "Warehouse 2 (Logistics Hub)",
      code: "WH2-HUB",
      type: "Regional Fulfillment Depot",
      totalCapacityM3: 8000,
      usedCapacityM3: 4160,
      utilizationPct: 52.0,
      totalSlots: 320,
      activeSlots: 290,
      ambientTemp: "19°C Ambient",
      zones: []
    }
  ]
};
