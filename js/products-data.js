/**
 * MARACHEKKU NATURALS — Editable Sample Product Catalogue
 * Categories match the mandatory Products Dropdown:
 * - groundnut (Groundnut Oil)
 * - sesame (Sesame Oil)
 * - coconut (Coconut Oil)
 * - mustard (Mustard Oil)
 * - castor (Castor Oil)
 * - other (Other Traditional Oils)
 *
 * Note: All sample descriptions, prices, and packaging sizes are illustrative
 * and structured for straightforward editing by business owners.
 */

window.MARACHEKKU_PRODUCTS = [
  {
    id: "groundnut-classic",
    name: "Marachekku Groundnut Oil",
    tamilName: "Kadalai Ennai • Traditional Wood-Pressed",
    category: "groundnut",
    categoryLabel: "Groundnut Oil",
    featured: true,
    image: "assets/images/product-groundnut.jpg",
    secondaryImage: "assets/images/product-groundnut-tin.jpg",
    processImage: "assets/images/process-3-extraction.jpg",
    shortDesc: "Cold-pressed in a seasoned vagai-wood chekku from sun-dried red-skin groundnuts. Unrefined, naturally settled, and rich in characteristic nutty aroma.",
    fullDesc: "Pressed slowly at ambient room temperature in our traditional vagai-wood mortar and pestle (marachekku), this groundnut oil retains the natural golden colour and distinct roasted-peanut aroma of sun-dried kernels. Clarified exclusively through gravity settling and unbleached cotton cloth straining without chemical refining or deodorising.",
    extractionMethod: "Traditional wooden chekku (Vagai wood mortar & pestle) slow rotational pressing at ambient temperature.",
    rawIngredients: "100% sun-dried shelled groundnuts (peanuts) sourced from regional dryland farms.",
    culinaryUses: "Everyday Indian sautéing, tempering (tadka), shallow frying, traditional gravies, and dosa preparation.",
    storageInstructions: "Store in a cool, dry cupboard away from direct sunlight. Keep the bottle or tin tightly capped after each use. Natural fine seed sediment at the bottom is a normal characteristic of unrefined chekku oil.",
    sizes: [
      { label: "500 ml Glass", price: 210, sku: "MN-GN-500G" },
      { label: "1 L Glass", price: 390, sku: "MN-GN-1LG" },
      { label: "5 L Tin Can", price: 1890, sku: "MN-GN-5LT" },
      { label: "15 L Bulk Tin", price: 5450, sku: "MN-GN-15LT" }
    ]
  },
  {
    id: "sesame-nallennai",
    name: "Traditional Sesame Oil",
    tamilName: "Ellu Ennai • Palm Jaggery Conditioned",
    category: "sesame",
    categoryLabel: "Sesame Oil",
    featured: true,
    image: "assets/images/product-sesame.jpg",
    secondaryImage: "assets/images/product-groundnut-tin.jpg",
    processImage: "assets/images/process-4-settling.jpg",
    shortDesc: "Extracted from cleaned black and brown sesame seeds conditioned with a touch of traditional palm jaggery during wooden chekku pressing.",
    fullDesc: "Our signature Nallennai is crafted from sun-cured black and brown gingelly (sesame) seeds. In keeping with regional Tamil mill practice, a small piece of natural palm jaggery (karupatti) is added to bind seed moisture during wooden pestle crushing, yielding a deep amber oil with a rounded, unmistakable sesame bouquet.",
    extractionMethod: "Slow wooden chekku extraction conditioned with natural palm jaggery, followed by 72-hour sun-warmed gravity sedimentation.",
    rawIngredients: "Sun-dried black & brown sesame seeds (Ellu) and natural palm jaggery (Karupatti).",
    culinaryUses: "Idli podi accompaniment, vatha kuzhambu, pickles, traditional South Indian curries, and Marinades.",
    storageInstructions: "Store in an airtight glass bottle or food-grade tin in a cool, dark place. Always use a dry spoon or pour spout to prevent moisture entry.",
    sizes: [
      { label: "500 ml Glass", price: 260, sku: "MN-SS-500G" },
      { label: "1 L Glass", price: 490, sku: "MN-SS-1LG" },
      { label: "5 L Tin Can", price: 2380, sku: "MN-SS-5LT" },
      { label: "15 L Bulk Tin", price: 6900, sku: "MN-SS-15LT" }
    ]
  },
  {
    id: "coconut-velichennai",
    name: "Marachekku Coconut Oil",
    tamilName: "Thengai Ennai • Sulfur-Free Sun-Dried Copra",
    category: "coconut",
    categoryLabel: "Coconut Oil",
    featured: true,
    image: "assets/images/product-coconut.jpg",
    secondaryImage: "assets/images/product-groundnut-tin.jpg",
    processImage: "assets/images/process-2-suncuring.jpg",
    shortDesc: "Pressed from split white coconut copra dried naturally under open courtyard sunlight without sulfur fumigation. Crystal-clear with a fresh sweet aroma.",
    fullDesc: "Selected mature coconuts are split and sun-cured on clean woven mats until the kernel reaches ideal pressing moisture. Crushed in a dedicated wooden chekku, the oil flows clear and pale ivory-gold with the gentle, sweet fragrance of fresh copra—suitable for both coastal culinary dishes and traditional personal care.",
    extractionMethod: "Dedicated wooden chekku pressing of sun-cured copra, naturally settled and strained through unbleached gada cotton.",
    rawIngredients: "100% sun-dried mature coconut kernels (sulfur-free copra).",
    culinaryUses: "Coastal curries, avial, appam stew, traditional sweets, and everyday household oil applications.",
    storageInstructions: "Keep in a dry, shaded cabinet at room temperature. Pure coconut oil naturally solidifies at cooler temperatures below 24°C and liquefies again in warmth.",
    sizes: [
      { label: "500 ml Glass", price: 230, sku: "MN-CC-500G" },
      { label: "1 L Glass", price: 430, sku: "MN-CC-1LG" },
      { label: "5 L Tin Can", price: 2090, sku: "MN-CC-5LT" },
      { label: "15 L Bulk Tin", price: 6100, sku: "MN-CC-15LT" }
    ]
  },
  {
    id: "mustard-kachighani",
    name: "Cold-Pressed Mustard Oil",
    tamilName: "Kadugu Ennai • Traditional Kachi Ghani",
    category: "mustard",
    categoryLabel: "Mustard Oil",
    featured: true,
    image: "assets/images/product-mustard.jpg",
    secondaryImage: "assets/images/product-groundnut-tin.jpg",
    processImage: "assets/images/process-1-seeds.jpg",
    shortDesc: "Slow-crushed from bold yellow and black mustard seeds in a wooden press to preserve its characteristic natural pungency and deep golden-amber colour.",
    fullDesc: "Prepared in the traditional kachi ghani (cold-pressed chekku) method, our mustard oil is pressed from carefully winnowed yellow and black mustard seeds without external heating. The slow wooden pestle rotation preserves the oil's natural sharpness, robust aroma, and rich golden-amber body favoured in traditional kitchens and pickling.",
    extractionMethod: "Unheated wooden pestle crushing at low RPM, followed by natural cloth filtration.",
    rawIngredients: "100% sun-cleaned yellow and black mustard seeds (Brassica juncea).",
    culinaryUses: "Traditional North & East Indian curries, vegetable stir-fries, homemade pickles (achaar), and smoky tempering.",
    storageInstructions: "Store in dark or amber glass away from direct stove heat. Keep tightly sealed to retain natural pungency.",
    sizes: [
      { label: "500 ml Glass", price: 195, sku: "MN-MS-500G" },
      { label: "1 L Glass", price: 360, sku: "MN-MS-1LG" },
      { label: "5 L Tin Can", price: 1740, sku: "MN-MS-5LT" },
      { label: "15 L Bulk Tin", price: 4980, sku: "MN-MS-15LT" }
    ]
  },
  {
    id: "castor-amanakku",
    name: "Cold-Pressed Castor Oil",
    tamilName: "Amanakku / Vilakkennai • Thick Unrefined Grade",
    category: "castor",
    categoryLabel: "Castor Oil",
    featured: false,
    image: "assets/images/product-castor.jpg",
    secondaryImage: "assets/images/product-groundnut-tin.jpg",
    processImage: "assets/images/process-4-settling.jpg",
    shortDesc: "Thick, pale-gold castor oil extracted in a dedicated wooden chekku from sun-dried mottled castor seeds for traditional household and external uses.",
    fullDesc: "Pressed in a separate wooden mortar reserved for non-culinary and specialty seeds, our cold-pressed castor oil is unrefined, solvent-free, and naturally viscous. In traditional Indian households, it is valued for conditioning food-grain storage pulses, lighting steady brass lamps, and external hair and skin care routines.",
    extractionMethod: "Dedicated wooden chekku cold extraction without steam refining or bleaching earths.",
    rawIngredients: "100% cleaned, sun-dried castor seeds (Ricinus communis).",
    culinaryUses: "Traditional pulse/grain coating for storage, external topical/hair care, and steady brass lamp lighting.",
    storageInstructions: "Store in a tightly closed glass bottle in a cool, dry place away from children and direct sunlight.",
    sizes: [
      { label: "250 ml Glass", price: 165, sku: "MN-CS-250G" },
      { label: "500 ml Glass", price: 295, sku: "MN-CS-500G" },
      { label: "1 L Glass", price: 550, sku: "MN-CS-1LG" },
      { label: "5 L Bulk Can", price: 2580, sku: "MN-CS-5LC" }
    ]
  },
  {
    id: "groundnut-heirloom",
    name: "Country Groundnut Oil",
    tamilName: "Nattu Kadalai Ennai • Small-Batch Reserve",
    category: "groundnut",
    categoryLabel: "Groundnut Oil",
    featured: false,
    image: "assets/images/product-groundnut-country.jpg",
    secondaryImage: "assets/images/product-groundnut-tin.jpg",
    processImage: "assets/images/process-1-seeds.jpg",
    shortDesc: "Small-batch cold-pressed oil from rain-fed small-pod country groundnuts with a pronounced nutty sweetness and golden clarity.",
    fullDesc: "Crafted in limited weekly batches from traditional small-kernel country peanuts grown in red loamy soils. Because smaller heirloom kernels contain dense natural oil pockets, slow pressing in our vagai-wood chekku produces a deeply aromatic cooking oil prized for traditional festive dishes and everyday family meals.",
    extractionMethod: "Small-batch wooden chekku pressing at 14 RPM, gravity-settled for 72 hours.",
    rawIngredients: "100% rain-fed small-pod heirloom groundnuts.",
    culinaryUses: "Traditional South Indian festive cooking, chutneys, murukku/savory snacks, and everyday family meals.",
    storageInstructions: "Keep sealed in a cool pantry away from sunlight. Consume within 6 months of pressing for peak fresh aroma.",
    sizes: [
      { label: "500 ml Glass", price: 235, sku: "MN-GH-500G" },
      { label: "1 L Glass", price: 440, sku: "MN-GH-1LG" },
      { label: "5 L Tin Can", price: 2120, sku: "MN-GH-5LT" }
    ]
  },
  {
    id: "sesame-white-unroasted",
    name: "White Sesame Oil",
    tamilName: "Vellai Ellu Ennai • Delicate Culinary Press",
    category: "sesame",
    categoryLabel: "Sesame Oil",
    featured: false,
    image: "assets/images/product-sesame-white.jpg",
    secondaryImage: "assets/images/product-groundnut-tin.jpg",
    processImage: "assets/images/process-3-extraction.jpg",
    shortDesc: "Lighter-bodied cold-pressed sesame oil from cleaned white sesame seeds, offering a mild, clean nutty profile without palm jaggery.",
    fullDesc: "For kitchens and culinary buyers who prefer pure sesame oil pressed without palm jaggery conditioning, this batch uses sun-cleaned white sesame seeds crushed gently at room temperature. It displays a lighter golden tone and subtle sesame taste suited for salads, light sautéing, and regional recipes.",
    extractionMethod: "Direct wooden chekku pressing of raw white sesame seeds without jaggery or heat.",
    rawIngredients: "100% cleaned white sesame seeds.",
    culinaryUses: "Light sautéing, salad dressings, cold sesame noodles, chutneys, and mild everyday cooking.",
    storageInstructions: "Store in a cool, dark cupboard with the stopper firmly closed.",
    sizes: [
      { label: "500 ml Glass", price: 275, sku: "MN-SW-500G" },
      { label: "1 L Glass", price: 520, sku: "MN-SW-1LG" },
      { label: "5 L Tin Can", price: 2490, sku: "MN-SW-5LT" }
    ]
  },
  {
    id: "coconut-virgin-suncured",
    name: "Sun-Cured Coconut Oil",
    tamilName: "Kanni Thengai Ennai • Gentle First Batch",
    category: "coconut",
    categoryLabel: "Coconut Oil",
    featured: false,
    image: "assets/images/product-coconut-virgin.jpg",
    secondaryImage: "assets/images/product-groundnut-tin.jpg",
    processImage: "assets/images/process-2-suncuring.jpg",
    shortDesc: "Light, fragrant coconut oil pressed from hand-graded white copra cups with brown paring trimmed prior to wooden chekku extraction.",
    fullDesc: "Prepared from select white coconut halves that are gently sun-dried and trimmed before entering the wooden chekku. The resulting oil is exceptionally pale, light on the palate, and carries a delicate fresh-coconut scent suited for delicate culinary preparations and traditional baby or personal massage routines.",
    extractionMethod: "First-press wooden chekku extraction from pared sun-dried white coconut kernels.",
    rawIngredients: "100% hand-graded pared sun-dried coconut kernels.",
    culinaryUses: "Delicate coastal dishes, finishing drizzle, raw confectionery, and traditional skin & hair care.",
    storageInstructions: "Keep tightly closed in a cool, dry place out of direct sunlight.",
    sizes: [
      { label: "250 ml Glass", price: 160, sku: "MN-CV-250G" },
      { label: "500 ml Glass", price: 280, sku: "MN-CV-500G" },
      { label: "1 L Glass", price: 530, sku: "MN-CV-1LG" }
    ]
  },
  {
    id: "other-sweet-almond",
    name: "Sweet Almond Oil",
    tamilName: "Badam Ennai • Artisanal Small-Batch Press",
    category: "other",
    categoryLabel: "Other Traditional Oils",
    featured: false,
    image: "assets/images/product-almond.jpg",
    secondaryImage: "assets/images/product-groundnut-tin.jpg",
    processImage: "assets/images/process-4-settling.jpg",
    shortDesc: "Pressed in small batches from whole sweet almonds in a compact wooden press and clarified purely by gravity sedimentation.",
    fullDesc: "Extracted without heat from whole sweet almond kernels, this pale-gold oil retains a soft marzipan-like nuttiness. Produced in small weekly lots and bottled in protective glass, it is suitable for traditional culinary finishing as well as daily topical nourishment.",
    extractionMethod: "Small-batch cold pressing at ambient temperature followed by fine cotton cloth filtration.",
    rawIngredients: "100% whole sweet almond kernels (Prunus dulcis).",
    culinaryUses: "Traditional sweets, warm milk infusions, salad finishing, and personal skin/hair care.",
    storageInstructions: "Store away from heat and light; keep cap tightly sealed after opening.",
    sizes: [
      { label: "250 ml Glass", price: 480, sku: "MN-AL-250G" },
      { label: "500 ml Glass", price: 920, sku: "MN-AL-500G" }
    ]
  },
  {
    id: "other-neem-iluppai",
    name: "Neem & Iluppai Oil",
    tamilName: "Veppennai & Iluppai • Heritage Utility & Lamp Press",
    category: "other",
    categoryLabel: "Other Traditional Oils",
    featured: false,
    image: "assets/images/product-other-oils.jpg",
    secondaryImage: "assets/images/product-groundnut-tin.jpg",
    processImage: "assets/images/process-6-packaging.jpg",
    shortDesc: "Unrefined non-edible traditional oils cold-pressed from dried neem seeds and wild mahua (iluppai) kernels in a dedicated utility press.",
    fullDesc: "Pressed on a dedicated non-culinary wooden chekku, our traditional Neem Seed Oil and Iluppai (Mahua) Oil serve time-honoured household, organic garden, and traditional brass lamp (kuthuvilakku) lighting needs. Supplied in both retail glass bottles and bulk 5L cans for temples and estates.",
    extractionMethod: "Dedicated utility wooden chekku pressing of sun-dried neem and mahua seeds.",
    rawIngredients: "Sun-dried neem seeds (Azadirachta indica) and wild mahua / iluppai kernels.",
    culinaryUses: "Non-edible: Traditional brass lamp lighting, household care, and plant/garden care applications.",
    storageInstructions: "For external, lamp, or utility use only. Store in a shaded area away from food items.",
    sizes: [
      { label: "500 ml Glass", price: 220, sku: "MN-NM-500G" },
      { label: "1 L Glass", price: 410, sku: "MN-NM-1LG" },
      { label: "5 L Bulk Can", price: 1920, sku: "MN-NM-5LC" }
    ]
  }
];
