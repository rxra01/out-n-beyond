/* ==========================================================================
   OUT N BEYOND CAFE & BISTRO — DATA REPOSITORY
   Conforming to Technical PRD Data Models
   ========================================================================== */

const BusinessData = {
  businessInfo: {
    name: "Out n Beyond Cafe & Bistro",
    tagline: "Not Just Coffee, It's A Whole Vibe ✨",
    category: "Cafe & European Bistro",
    address: "14/2B Hindustan Park (Near Triangular Park), Gariahat, Kolkata, West Bengal 700029",
    phone: "+91 98300 12345",
    landline: "033 2465 8900",
    email: "hello@outnbeyondcafe.in",
    instagram: "@outnbeyond.kolkata",
    rating: 4.5,
    reviewCount: 9482,
    priceRange: { min: 200, max: 600, currency: "₹" },
    hours: [
      { day: "Monday", open: "11:00 AM", close: "11:00 PM", status: "open" },
      { day: "Tuesday", open: "11:00 AM", close: "11:00 PM", status: "open" },
      { day: "Wednesday", open: "11:00 AM", close: "11:00 PM", status: "open" },
      { day: "Thursday", open: "11:00 AM", close: "11:00 PM", status: "open" },
      { day: "Friday", open: "11:00 AM", close: "11:30 PM", status: "open" },
      { day: "Saturday", open: "09:30 AM", close: "11:30 PM", status: "open" },
      { day: "Sunday", open: "09:30 AM", close: "11:30 PM", status: "open" }
    ],
    avgVisitDuration: { minMinutes: 60, maxMinutes: 120 },
    features: [
      "Gigabit Fiber WiFi (500 Mbps)",
      "Power Sockets at Every Booth",
      "100% Pet-Friendly Verandah & AC Floor",
      "In-House 36-Hr Sourdough Bakery",
      "Specialty Single-Origin Chikmagalur Roastery",
      "Board Games & Indie Art Zines Library"
    ]
  },

  menuItems: [
    {
      id: "item-1",
      name: "Smoked Chicken & Pesto Panini",
      category: "sourdough",
      categoryLabel: "Bistro Sourdough & Bowls",
      price: 360,
      description: "Slow-smoked chicken breast slivers, house walnut basil pesto, buffalo mozzarella, and sun-dried tomatoes pressed in buttered sourdough.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCibPRHCpljP3Mp_vR_VvXhfvl2AV5kvPzO6w3kLSc-9LNfbVN1MJzx5pkMr0dm2PfAmTreYpMx4_whIcfNBjSyHJT7UdfaoxRTDZfLgcLcnblDviEc3aZQHflhpPwdt95xyKbqtRxbYd9X2bRXYyHaFEotQX_sjN9N8HhsFSaYnpRox1D3J8QQDI2cFqOMMk6evZyO9xVEnJ58zbGBzEi0rsD9ujhyeqCrlnDOiggrPaNE87uJpcUj",
      dietaryTag: "non-veg",
      isPopular: true,
      isFeatured: true,
      prepTime: "12-14 mins",
      prepMinutes: 12,
      calories: "520 kcal",
      badgeText: "🔥 Bestseller"
    },
    {
      id: "item-2",
      name: "Avocado & Burrata Tartine",
      category: "sourdough",
      categoryLabel: "Bistro Sourdough & Bowls",
      price: 380,
      description: "Hass avocado mash, fresh Pugliese burrata bulb, chili-infused organic honey drizzle, and toasted pumpkin seeds on crusty sourdough.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9oFy3EEIVKBsl7W8I0EGv7SEpnCjhFMFy2QwXfzFFKyhGqhcUo3TssuFYp48bL-s39HIZ1_ujU6g-PzOLTQ0-DPFy5tb9yGNIXpfj4cwERHUX0JE4kPtEpLDkUQGnh33Jxvc5voqJ4VzH0rzceKERiF3-zlKF6MOA09SsPckdcykTKCGxkaJbLpcgE5qBJOAEt7KwAoWQ9BLvORY3NGLekB7NnWf6LVAostmzuJn6vye4l6riYHHQ",
      dietaryTag: "veg",
      isPopular: true,
      isFeatured: true,
      prepTime: "10-12 mins",
      prepMinutes: 10,
      calories: "410 kcal",
      badgeText: "✨ Viral Hit"
    },
    {
      id: "item-3",
      name: "Nashville Hot Chicken Sliders (2pcs)",
      category: "mains",
      categoryLabel: "Artisanal Mains",
      price: 340,
      description: "Double-fried cayenne buttermilk chicken thighs, house dill pickles, spicy secret comeback mayo inside glazed Japanese milk buns.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyx3IlYgOxYdXH3d9OLF54LGDuyOplVV3T7hZpyvygwpypWqMzZL45rP1m43AxV0jtQ1hnlWsm3wMuf4PY7Ll_USnmk72-20bdvdylnl7zwaQ2zB5vLyMNe-QVMn8SLKtmKZlBHIq386nZIX2Ln38rj8lSBC-kVNVCyt5Vuja-TjAW3GMucVSpEWFdd5RzW5h8Rd69J6NHokOoHU9S5MDFcyKrYWvOI1TK58M-WB5oDejtQQK20pdi",
      dietaryTag: "non-veg",
      isPopular: true,
      isFeatured: false,
      isSpicy: true,
      prepTime: "14-16 mins",
      prepMinutes: 15,
      calories: "580 kcal",
      badgeText: "🌶️ High Spice"
    },
    {
      id: "item-4",
      name: "Signature Iced Spanish Latte",
      category: "brews",
      categoryLabel: "Specialty Brews",
      price: 230,
      description: "Double-shot specialty Chikmagalur Arabica over sweet condensed milk cream and cold textured whole milk.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhETx1km6vAx51S1C-OzlRfxychRb5op60a6MvaVmj8--5Nyp5TIMyBFNlqahG2GCQORiyl67LTlMZVJy2_wgP_47AXLmL2xqlcpq0C9rkTO9mz8owTVmg2bEeIZqCzgz1BGIM-POriN36UTp6ISb4Q-PX-B6h2Dxt_APYIpoI2XTbZ_9r49nfKEPYV920rhSD05iQLqK3PWjrt4ni7m37EFIrta-yr52fQMwNMPI3I_1dkFM4gOr6",
      dietaryTag: "veg",
      isPopular: true,
      isFeatured: true,
      prepTime: "4-6 mins",
      prepMinutes: 5,
      calories: "210 kcal",
      badgeText: "☕ House Signature"
    },
    {
      id: "item-5",
      name: "Nutella French Toast Brioche Stack",
      category: "breakfast",
      categoryLabel: "All-Day Breakfast",
      price: 310,
      description: "Thick-cut house brioche soaked in cinnamon custard, stuffed with hazelnut Nutella spread and caramelized banana.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZKCIO0BfOOQVo8wlU3h94m34LYIR9vF77F62jsMXkVh8Pw4pPTkZKC9m2kFNyQ4vNWb59W-eIzZo6bbCV1EN-ZSyRUXsZmF98EV6_kXHFGGw_58wJ5iZfE4pK4l1yW95H6G6Oa-zR2gB2wuQGPWYTrGlmLgtZN1pAwFNarrDUXss1ToH5cBIhO3dOQQG50aIfrM6na_I88CCf1D1hX1EJdQjBwO79cwDDQk9cYmPOzJDE0YqAUToQ",
      dietaryTag: "veg",
      isPopular: false,
      isFeatured: false,
      prepTime: "15 mins",
      prepMinutes: 15,
      calories: "620 kcal",
      badgeText: "🥞 Brunch Classic"
    },
    {
      id: "item-6",
      name: "Baked Basque Burnt Cheesecake",
      category: "desserts",
      categoryLabel: "Sweet Tooth & Desserts",
      price: 290,
      description: "San Sebastián style creamy Philadelphia cream cheese cake with caramelised bitter-sweet top and raspberry coulis.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBydS_3Ue8lbmTgElwkBIfeRXBP2rPyiFr0xxcrwva85wlfGxogboSEqATLNLxCgvgjdk2kDHSBm1lDnBwpQIaMSmcEBOc-zqknUdDIYFB6hDHOglTGcuqJ9jB5SIZ2TuAmwQlzIUrE69ck4sShzrNN8wshsmZB5q7thDeozaE8WgmvwzIiLL6Zw4HnLBFs1zkLHlRGAUWQ_3Hw-_gXDLctrhCKsDKTacZ2JSl0f5OURn0AxTQOyZbQ",
      dietaryTag: "veg",
      isPopular: true,
      isFeatured: true,
      prepTime: "Instant",
      prepMinutes: 2,
      calories: "440 kcal",
      badgeText: "⭐ 4.9 Rated"
    },
    {
      id: "item-7",
      name: "Truffle Wild Mushroom Tagliatelle",
      category: "mains",
      categoryLabel: "Artisanal Mains",
      price: 420,
      description: "Handmade ribbon tagliatelle, porcini and button mushroom reduction, black truffle oil, and 24-month grana padano.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt63yKxNYhuuuL7TV0XQplLmfbzxKWwk-WKY60HHPH6HsZGHiUN88LsmRKC6QI9FQSFDAbSUx10P08E2Z7FykkvMHPTCM_zlOcpd2uZ0mKaW5gF9DUeSY22mjlel3jsEe37s720LXxdxd1d98LmqlEh3GrU7BlNNoW7EiqbDMtXRIauz9TMfUgW8sSgMpIccj8kREeMbWfksqQymbo9Wbr9hrIzv7g33ZkRFNNiU3gY2-gfy_5HUqd",
      dietaryTag: "veg",
      isPopular: false,
      isFeatured: false,
      prepTime: "18 mins",
      prepMinutes: 18,
      calories: "530 kcal",
      badgeText: "🍝 Chef Special"
    },
    {
      id: "item-8",
      name: "Iced Ceremonial Uji Matcha Latte",
      category: "coolers",
      categoryLabel: "Matcha & Coolers",
      price: 260,
      description: "Authentic ceremonial grade Uji matcha whisked fresh, paired with sweetened vanilla bean oat milk over crystal ice cubes.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9WaitPJ1M3cRpNgEvN-h48Yy5f2fcIchP78LK0AsX7jzUyPkrqeVcCVMhPVi4FFJIaxSPnirirCHKduTaHxDpl875sOHBb-94UyFZfnIVc-apFbTNUe6oPPBFCrSq0BNtjGZoS7YNby2Xq6npceUncdvT6hI6PcDIqYpY_eVMcWmw0KOYTaIdYPMsaUOlLvVRX2pKPIz9Oi5r30kJXDEsF7_J-VRhj5OqvjRwDKReKBZDO6ImIZNg",
      dietaryTag: "veg",
      isPopular: true,
      isFeatured: true,
      prepTime: "5 mins",
      prepMinutes: 5,
      calories: "160 kcal",
      badgeText: "🍵 Uji Japanese"
    },
    {
      id: "item-9",
      name: "Turkish Cilbir Poached Eggs",
      category: "breakfast",
      categoryLabel: "All-Day Breakfast",
      price: 290,
      description: "Two golden organic poached eggs on garlic-infused Greek labneh yogurt, paprika chili brown butter and dill, warm sourdough.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyWhKI2bxRDZnGr4Fn07wtX-rbW4m1VXraz1iQBeVA6HgTw34mVEhj--MIhepY1l89bjrM0OngOn-ZhlITbkU-1HtPGFg-2248l_sJjpx8JMMWfyCSHeU_ReREvPsctIZPh8G7LbD5dhDQPKDrU8An274H6h488s7_pNavypW6uRJAFRgBw9RxKkgk-_1jGAE7EQGd3B6ZQNj_UX7leml6bLiUpV-SBRuIVR7B6LgLYmwR06kdACQu",
      dietaryTag: "egg",
      isPopular: false,
      isFeatured: false,
      isSpicy: true,
      prepTime: "12 mins",
      prepMinutes: 12,
      calories: "390 kcal",
      badgeText: "🍳 High Protein"
    },
    {
      id: "item-10",
      name: "Specialty Cortado (1:1 Ratio)",
      category: "brews",
      categoryLabel: "Specialty Brews",
      price: 180,
      description: "Equal parts intense double ristretto espresso and silky steamed micro-foamed milk for specialty coffee purists.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgxklajOiy3lBPEMrPMYVcekcqPmBDx2OW9ykXqNzKy_QLSfG6xcn7-rWeCd6U7iCG5hOGRVWn1iXxjoLw_S_RH7WkmYx56xaV8QZQAREOpjzD9TNpXiNLQYTc-Kk3DaVR0jWUFcbBvSuDF9JqiTH5lCbNRAjexURyFyRThNEim_mETD3cV9wPXiSeVuMbIgkHTIhlglKmOIZRq6O2hmMVnV2Fx_wJQDu4BI6mwHdmIRGh-0RQYolF",
      dietaryTag: "veg",
      isPopular: false,
      isFeatured: false,
      prepTime: "4 mins",
      prepMinutes: 4,
      calories: "90 kcal",
      badgeText: "☕ Double Ristretto"
    },
    {
      id: "item-11",
      name: "Grilled Peach & Burrata Salad Bowl",
      category: "sourdough",
      categoryLabel: "Bistro Sourdough & Bowls",
      price: 350,
      description: "Caramelized grill-marked peaches, organic wild rocket arugula, torn Italian burrata, candied walnuts, fig vinaigrette.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuOmSih5-iXAyvrNGn94HTIWR9fnX5LpfCQmZE5mWLTSebRimCzuAJ778-NzxzQ1uc-qHe_u3VHzgDQKTeGjmHHxi8PilDx6aIDETxUInUNtj1DTKBEBsRj0P7kqpmAdMed1ONY5H0WeX--Ic6s2FBv0wDFJYGvgktEpGmWtptbQllV7PYc-gIEukuBqUzMVjUTLnl6_WpWotQBdy8pwLgPpw3RbPvcDceQxtdc_jgmRygjoHuJEKo",
      dietaryTag: "veg",
      isPopular: false,
      isFeatured: false,
      prepTime: "10 mins",
      prepMinutes: 10,
      calories: "340 kcal",
      badgeText: "🥗 Farm Fresh"
    },
    {
      id: "item-12",
      name: "Sparkling Yuzu Citrus Cold Brew",
      category: "coolers",
      categoryLabel: "Matcha & Coolers",
      price: 240,
      description: "18-hour cold steeped single origin coffee, Japanese Yuzu reduction, sparkling soda tonic, torched rosemary sprig.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQFdwNGPh9TGNSToVDExd5SL0WVmGBvPKE00SG4PLyBAAI0x9cIRJHR6UQ4q7gdEV7O0FjJ04w2E_s3_Y4Qy0fZgSO1svJ0CuV15W6bxDjSQbOsTnto-LOaPfsY3Kfd8kYKWE912vLXV4FtH5vB8KJWfKhW0-9HDCHmU-4ieYg0ML4ycmk99h52GAKM2omx2cFCw9E3ngUgiqsz6FUnOVb7lgWqeFPIOIDkPH5D1gTG0FW_zoPahXW",
      dietaryTag: "veg",
      isPopular: true,
      isFeatured: false,
      prepTime: "3 mins",
      prepMinutes: 3,
      calories: "60 kcal",
      badgeText: "⚡ Refreshing Kick"
    }
  ],

  reels: [
    {
      id: "reel-1",
      title: "Morning Pour: Pistachio Matcha Magic 🍵",
      tag: "BEVERAGE CRAFT",
      durationSeconds: 38,
      durationDisplay: "0:38",
      views: "48.2k",
      likes: "3.4k",
      shares: "812",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXgM6N9l7u-gIydN3_PvUPzgzknvzehT9vK_fQ4vmi19MoVAH7GqP9ydj5Ihp4aheT5yCv4iTGYZzDdr7ZPInLzo2JtEsh0iXu8cCywF8grXE6gAmDBulwDBvGYy8UFiL2w0qjXoOSi41jOaZqlpBRUcwlFi0JfrMVnIurLPwaCeDk332Qhh3pXUU4s6-rpWva2iu0P-4hXcivQvxENhJ3aEa7lYqGquxZi6zgvFhWP3qmBPmyNsSv",
      description: "Watch our barista whisk Uji ceremonial matcha and layer it over cold pistachio cream."
    },
    {
      id: "reel-2",
      title: "Baking our Viral Sourdough Brioche 🍞",
      tag: "DAILY OVEN FRESH",
      durationSeconds: 19,
      durationDisplay: "0:19",
      views: "92.1k",
      likes: "8.9k",
      shares: "2.4k",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnJXcVEklhZKDLxhRP1DTTqbDrXbkZsOnCXfzKQd9TAPFHbOBYfRYWxQ-H8t58mrapR8ITsNL3m9Qk4qW324-9xfOtD8oGY4tdNoSlnfyVY1qqLipInWlyGDzGLqXrrWH8q68Q3VE3IdnyV1OAIK9vkT-muZxY6thbN5xiWT5hpPcUtgoUw5SGT0iI0umX1vS1XufBi6zUuT6OythiHQ0bx736NtIXmRxJ-OPDmjrafKvlDoVZztNu",
      description: "36 hours of fermentation leading to that dreamy golden steam pull."
    },
    {
      id: "reel-3",
      title: "Night Vibes & Lofi Jams under fairy lights ✨",
      tag: "EVENING SESSIONS",
      durationSeconds: 56,
      durationDisplay: "0:56",
      views: "61.4k",
      likes: "5.1k",
      shares: "1.1k",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByj9MHIpm6Lt_LfQqRshBXqBnmqmnXvl2iAgV0dnBv7PJa6RoNVId_Rl39Wzd5b_0WrNzLQo2DaB878Fel5AbbPbMHF1u3zaPq8iKJUn-ky17V3OkKBwQclkYgcaXfpegZYXmq738Oz8PqQIEmPWmqA1gMmUyqdci8tcCvml5bzKVvZEbrCvrAP3_weQXX4geY07Hhnqd_P2fhtwB2tE4cWVHqu8hd_CtQMxiZJEVhls6O6i-zkQr6",
      description: "Amber bistro lamps, acoustic vinyl, and warm midnight hot chocolates in Hindustan Park."
    }
  ],

  galleryMedia: [
    {
      id: "snap-1",
      title: '"Stay Beyond The Ordinary" Neon Corner',
      category: "interior golden",
      categoryLabel: "Interiors • Neon Wall",
      saves: "1.4k saves",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9_NXdXw3_bCR6LBVoBY_2Whn-f5oCmHDClBsoc1T6yIswA6GFmSTywdj_2SlABg4l2l72RP7_-pCO9zkhM_0xIsVbmnkFAfU6t8LyP8pwz0-qj21L3hRL7NpidBNfw3Eu8qw9G_9FpnFGeidSIigF7O8wuxpu3FgHiKfxSzXmj-SUFCG_WvFFh6K2JYQxiwmxqmTPj71oO0uqZf14q5VdxXZbpW0xPmQb_z8OG56BIElRecIR9X3R",
      reviewer: {
        title: "The aesthetic here is unmatched.",
        quote: "We spent 3 hours reading by the window corner. The pistachio matcha is totally worth the hype and they treated our pup with so much love!",
        author: "Rhea Sen • South Kolkata",
        badge: "Verified Dine-in"
      }
    },
    {
      id: "snap-2",
      title: "Fluffy Soufflé Berry Stack",
      category: "food",
      categoryLabel: "Sweet Crush",
      saves: "2.3k saves",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmhJkwLcRcjcwCjx3dY0FgzCZrSjQAUvE5eeCOlkPEi4g5YbJMZ2ATnmwG-6MASCHwR36H74irCiWCgq0KnAVPouhKC0crzv-YE3aZW3QcklSJG-y5-KFEdohIOZz5TaHA0QNtSNNCulB1Xu8VDrXGtMzJaw88FUIuEhhXjTd2C6IHL_evlHdMKqk-umeawKoW4-pAWgsJV1F1ZQvpccsfFPcXjHbLn8Ir8738xjoAh4tLIULVWpTi",
      reviewer: {
        title: "Pancake clouds on a Sunday!",
        quote: "So airy it dissolves on your tongue. The maple syrup and fresh strawberries make it an absolute showstopper for weekend brunch.",
        author: "Titas C. • Salt Lake",
        badge: "Food Reviewer"
      }
    },
    {
      id: "snap-3",
      title: "Single-Origin V60 Barista Pour",
      category: "food interior",
      categoryLabel: "Roastery Lab",
      saves: "980 saves",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBumKebcR1ga9XjlEmHJ3Egcx85tB-ICQ7kYKoUIC0PzAmx4771-vnOVqTYGb6AHiDFDAJegRUl1BjBJwb0aNuA6uFa3he-w8j0AXsEoZ8LjbZO3hnRgVs-4hctzqBTN6R0KgEoXjtKD4SBAGNcP75XKJ4Y3uIpQaY5_IUXtl2WPJIIJC9I8043id1C26C8xthQ1MruLCOww_5dhTqnRQ5DcNwtg4CQJm6a14zI5HkjaSC6AbcJPEuP",
      reviewer: {
        title: "Real specialty coffee in South Kolkata",
        quote: "Baristas know their extraction math. Tasting notes of blackcurrant and caramel came through distinctly in the pour over.",
        author: "Arjun Ganguly • Alipore",
        badge: "Coffee Connoisseur"
      }
    },
    {
      id: "snap-4",
      title: "Meet Bruno @ the Shaded Patio",
      category: "pets golden",
      categoryLabel: "Pet Friendly Patio",
      saves: "3.1k saves",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnXHwEcZcxXDmd5Q0BX0kyJ7yiAYU12LBLwi4fTWKHP4VsNGqucaC6TTobjs8aVPf-ai_fjmug6x9D9VLqv49FC_SkAyjVQMLpJOQIPJykRIO2apzKlyADZsYpbpYOS9nM3a1DNkJSAKmhhp7H7t8xNOAcKk7tK1Fr11ISZmTcrZfXfy0jaEwZ1jamv8k9gVnzcVmxkVlNU4U5Z3mfzUC4ha_NtkPB1YUWJ5kMRE14Ms8h9DJ718NI",
      reviewer: {
        title: "Dog friendly paradise!",
        quote: "Bruno was greeted with a fresh bowl of water and a pet biscuit before our drinks even arrived. The staff is wonderful.",
        author: "Debolina Mukherjee • Jodhpur Park",
        badge: "Pup Parent"
      }
    },
    {
      id: "snap-5",
      title: "Arched Window Reading Seat",
      category: "interior golden",
      categoryLabel: "4:30 PM Sunlight",
      saves: "1.8k saves",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT76wU369EnaGXNFPcuezyPqzJt0D_QqG8iFM425oq2IrR9iB_I1-4m_EDobSj-Cs5RBxFMPRfRswUn4imdFKAVlxF2ljH1nXhrlBonF8kBQpOxPdfpVlcsWkFUf37gUQrZSSuWrADeYF8kcyA3VEFmRDFJlQGuizwikPi6jyKeluZCm-imCf7WvpMf-gj9h3exn4C4j4rtl3iNUBXUBUXLbVArSm-wMQ8rGaOkiV5oR48nZPLK8GY",
      reviewer: {
        title: "Best remote work nook in the city",
        quote: "Rock-solid WiFi, sockets right by the booth, and golden hour lighting that makes writing pitch decks almost enjoyable.",
        author: "Aniket M. • Product Designer",
        badge: "Remote Worker"
      }
    },
    {
      id: "snap-6",
      title: "Hand-Cut Truffle & Herb Fries",
      category: "food",
      categoryLabel: "Savory Obsession",
      saves: "2.7k saves",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACJmpjZO1J0U0kBctrkVNF7SMC-dBr8YJ8WMySbgF-jxJ6sHteMVjA2S2dh3hl5UC2A6l4P5Wr1stNNc7yRUQUJVqbl3QpIQXJjG_Pr9e9-ZFqdTTwk3H8k2AtZWXDH1PwBh3SkwWv04cNTbKcEDE9PQXwOLGyORLpLcD5sQBp-xaiitBJ66R1jUvHWVHvrnJbCb5aJ6N7Y6rMvMbSe3vweXKhcu9W4qiEq6mbK-S07Iqm-s80jvYw",
      reviewer: {
        title: "The crunch is unbelievable",
        quote: "Crisp outside, fluffy inside, with just the right amount of truffle aromatics and freshly grated pecorino. Order two platters!",
        author: "Shreya Roy • Ballygunge",
        badge: "Verified Diner"
      }
    }
  ],

  reviews: [
    {
      id: "rev-1",
      reviewerName: "Rhea Sengupta",
      role: "Hindustan Park Regular • Local Guide",
      rating: 5,
      date: "2 days ago",
      category: "coffee",
      quote: "Hands down the coziest cafe in South Kolkata. The Hazelnut Cortado was perfection and that Truffle Croissant lives rent-free in my mind. Plus, our golden retriever was treated like absolute royalty!",
      source: "Google Reviews",
      isFeatured: true
    },
    {
      id: "rev-2",
      reviewerName: "Aniket Mukherjee",
      role: "Product Designer & Remote Worker",
      rating: 5,
      date: "1 week ago",
      category: "work",
      quote: "I sat with my laptop here for 4 hours working on client pitch decks. Rock-solid 500Mbps WiFi, plenty of plug points, and the staff is super attentive without hovering. Kolkata needed this spot badly.",
      source: "Google Reviews",
      isFeatured: true
    },
    {
      id: "rev-3",
      reviewerName: "Tanvi Roy",
      role: "Food Blogger @kolkatacafehops",
      rating: 5,
      date: "3 days ago",
      category: "food",
      quote: "Came for Sunday brunch and stayed for the acoustic jazz. The Korean Gochujang Crisp Chicken is addictive, and the Lotus Biscoff Tiramisu melted like a cloud. 10/10 recommend booking in advance!",
      source: "Google Reviews",
      isFeatured: true
    },
    {
      id: "rev-4",
      reviewerName: "Dr. Sourav Banerjee",
      role: "Gariahat Resident",
      rating: 5,
      date: "2 weeks ago",
      category: "vibe",
      quote: "Tucked away in quiet Hindustan Park, this place avoids the noisy traffic of Gariahat while delivering world-class espresso. The architectural decor and plants make you want to stay all evening.",
      source: "Google Reviews",
      isFeatured: false
    },
    {
      id: "rev-5",
      reviewerName: "Meghna & Joy",
      role: "Weekend Brunchers",
      rating: 4.5,
      date: "5 days ago",
      category: "pets",
      quote: "Brought our beagle Leo for Sunday morning breakfast. The puppuccino was on the house and the avocado burrata tartine was so fresh. Tables fill quickly on weekends, so definitely reserve online!",
      source: "Google Reviews",
      isFeatured: false
    }
  ],

  seatingZones: [
    {
      id: "window",
      svgId: "mapZoneWindow",
      name: "Sunlit Window Booth",
      icon: "🌿",
      description: "Great natural morning light, Hindustan Park leafy road view, perfect for photos and brunch dates.",
      capacity: "2-4 Guests"
    },
    {
      id: "library",
      svgId: "mapZoneLibrary",
      name: "Cozy Books & Plants Corner",
      icon: "📚",
      description: "Velvet armchairs, curated indie reads, quiet low-volume zone for reading and deep focus.",
      capacity: "1-2 Guests"
    },
    {
      id: "patio",
      svgId: "mapZonePatio",
      name: "Outdoor Patio / Balcony",
      icon: "🌇",
      description: "Breezy Kolkata evenings, bistro rattan tables, 100% pet-friendly setup with garden greenery.",
      capacity: "2-8 Guests"
    },
    {
      id: "bar",
      svgId: "mapZoneBar",
      name: "High Table Bar (Laptop)",
      icon: "💻",
      description: "Every seat has dedicated power sockets, espresso extraction bar view, ultra-fast 500Mbps WiFi.",
      capacity: "1-4 Guests"
    }
  ]
};
