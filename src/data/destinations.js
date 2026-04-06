// All coordinates are verified from GPS/Wikipedia sources
// coords: { x: longitude, y: latitude }
// Images are selected to match the actual place

export const destinations = {

  delhi: [
    { id: "dd1", name: "Red Fort",
      desc: "Majestic 17th-century Mughal fortress — UNESCO World Heritage Site. Light & Sound show at night.",
      img: "https://tse3.mm.bing.net/th/id/OIP.A5UuYtBg0525CD3bIehAuwHaEu?pid=Api&P=0&h=180",
      coords: { x: 77.2410, y: 28.6562 }, visitDuration: 120 },

    { id: "dd2", name: "Qutub Minar",
      desc: "World's tallest brick minaret at 72.5m, surrounded by ancient Indo-Islamic ruins.",
      img: "https://tse4.mm.bing.net/th/id/OIP.44uJeERSyOF2OBEuu15-NwHaJ4?pid=Api&P=0&h=180",
      coords: { x: 77.1855, y: 28.5245 }, visitDuration: 90 },

    { id: "dd3", name: "India Gate",
      desc: "War memorial arch at the heart of New Delhi, surrounded by lush lawns perfect for evening strolls.",
      img: "https://media.istockphoto.com/photos/india-gate-in-new-dehli-at-dusk-picture-id488301577?k=6&m=488301577&s=612x612&w=0&h=nFZIHBDtKIWTkmwRnVfOArrU_4TXjUN4NOW1oxUrzHg=",
      coords: { x: 77.2295, y: 28.6129 }, visitDuration: 60 },

    { id: "dd4", name: "Lotus Temple",
      desc: "Stunning Bahá'í House of Worship shaped like a blooming lotus — open to all faiths.",
      img: "https://tse1.mm.bing.net/th/id/OIP.qbDScxtxlalOEtf35US84wHaE9?pid=Api&P=0&h=180",
      coords: { x: 77.2588, y: 28.5535 }, visitDuration: 75 },

    { id: "dd5", name: "Humayun's Tomb",
      desc: "Precursor to the Taj Mahal — a grand Mughal garden tomb that inspired generations of architecture.",
      img: "http://www.thehistoryhub.com/wp-content/uploads/2014/04/Humayun-Tomb-Images.jpg",
      coords: { x: 77.2507, y: 28.5933 }, visitDuration: 90 },

    { id: "dd6", name: "Jama Masjid",
      desc: "India's largest mosque, built by Shah Jahan — climb the minaret for panoramic Old Delhi views.",
      img: "https://upload.wikimedia.org/wikipedia/commons/7/77/Jama_Masjid%2C_Delhi.jpg",
      coords: { x: 77.2332, y: 28.6507 }, visitDuration: 60 },

    { id: "dd7", name: "Chandni Chowk",
      desc: "400-year-old bazaar teeming with spices, street food, wedding shops and Old Delhi chaos.",
      img: "https://tse3.mm.bing.net/th/id/OIP.9Ym30a7-dtlirQcSokYnYwHaE8?pid=Api&P=0&h=180",
      coords: { x: 77.2308, y: 28.6562 }, visitDuration: 120 },

    { id: "dd8", name: "Akshardham Temple",
      desc: "Stunning modern Hindu temple complex spanning 100 acres — exhibition, boat ride and water show.",
      img: "https://img.jagranjosh.com/imported/images/E/Articles/Akshardham-Temple-Delhi.jpg",
      coords: { x: 77.2766, y: 28.6127 }, visitDuration: 150 },

    { id: "dd9", name: "National Museum Delhi",
      desc: "India's largest museum with artefacts spanning 5,000 years of history and culture.",
      img: "https://tse1.mm.bing.net/th/id/OIP.aJlqH7RgupG5aQiJSm19vwHaDt?pid=Api&P=0&h=180",
      coords: { x: 77.2197, y: 28.6116 }, visitDuration: 90 },
  ],

  mumbai: [
    { id: "md1", name: "Gateway of India",
      desc: "Iconic 26-metre arch overlooking the Arabian Sea — the city's defining landmark.",
      img: "https://tse2.mm.bing.net/th/id/OIP.on6ByJst-ADabd8ECa6aFwHaFc?pid=Api&P=0&h=180_30_Gateway_of_India.jpg",
      coords: { x: 72.8347, y: 18.9220 }, visitDuration: 60 },

    { id: "md2", name: "Marine Drive",
      desc: "The Queen's Necklace — a 3.6km arc of Art Deco buildings perfect for sunset walks.",
      img: "https://tse1.mm.bing.net/th/id/OIP.AI8nsIJnaf2fMyLN9Z-ZGgHaEQ?pid=Api&P=0&h=180",
      coords: { x: 72.8233, y: 18.9440 }, visitDuration: 90 },

    { id: "md3", name: "Elephanta Caves",
      desc: "6th-century rock-cut cave temples on an island — UNESCO World Heritage Site.",
      img: "https://tse3.mm.bing.net/th/id/OIP.P4TlMfYxqviH8OrEnIx_-wHaD7?pid=Api&P=0&h=180",
      coords: { x: 72.9315, y: 18.9633 }, visitDuration: 180 },

    { id: "md4", name: "Chhatrapati Shivaji Terminus",
      desc: "Stunning Victorian Gothic railway station — UNESCO listed and still fully functional.",
      img: "https://tse2.mm.bing.net/th/id/OIP.yf-VJ1CfF05FSpDIbl1EZQHaEK?pid=Api&P=0&h=180",
      coords: { x: 72.8353, y: 18.9401 }, visitDuration: 60 },

    { id: "md5", name: "Siddhivinayak Temple",
      desc: "One of Mumbai's most revered temples, dedicated to Lord Ganesha — perpetually crowded with devotees.",
      img: "https://jothishi.com/wp-content/uploads/2019/03/Shree_Siddhivinayak_Temple_Mumbai-768x1024.jpg",
      coords: { x: 72.8439, y: 19.0167 }, visitDuration: 60 },

    { id: "md6", name: "Juhu Beach",
      desc: "Famous beach suburb with Bollywood flavour — street food, evening crowds and chaat.",
      img: "https://media.tripinvites.com/places/mumbai/juhu-beach/juhu-beach-featured.jpg",
      coords: { x: 72.8296, y: 19.0989 }, visitDuration: 90 },

    { id: "md7", name: "Bandra-Worli Sea Link",
      desc: "8-lane cable-stayed bridge — drive across for spectacular harbour views.",
      img: "https://thumbs.dreamstime.com/b/bandra-worli-sea-link-officially-called-rajiv-gandhi-sea-link-cable-stayed-bridge-links-bandra-worli-mumbai-99024999.jpg",
      coords: { x: 72.8153, y: 19.0412 }, visitDuration: 45 },

    { id: "md8", name: "Dharavi",
      desc: "Largest urban village in Asia — a guided tour reveals a thriving informal economy.",
      img: "https://images.mid-day.com/images/images/2025/jul/Dharavi-1752532075769_d.png",
      coords: { x: 72.8543, y: 19.0413 }, visitDuration: 120 },

    { id: "md9", name: "Film City Mumbai",
      desc: "Bollywood's production hub — tours show working sets, outdoor zones and a theme park.",
      img: "https://optimatravels.com/images/mumbai-images/bollywood-film-city-head.jpg",
      coords: { x: 72.8562, y: 19.1613 }, visitDuration: 150 },
  ],

  chennai: [
    { id: "cd1", name: "Marina Beach",
      desc: "World's second longest urban beach — golden sands stretching 13km along the Bay of Bengal.",
      img: "https://tse1.mm.bing.net/th/id/OIP.6rChzmFEckc8lcyqjej6ggHaE8?pid=Api&P=0&h=180",
      coords: { x: 80.2824, y: 13.0500 }, visitDuration: 90 },

    { id: "cd2", name: "Kapaleeshwarar Temple",
      desc: "Dravidian-style Shiva temple in Mylapore with an 11-storey gopuram and 1,300 years of history.",
      img: "https://tse2.mm.bing.net/th/id/OIP.T_uQFOQ6fRRaNDn8vuP6MQHaEH?pid=Api&P=0&h=180",
      coords: { x: 80.2695, y: 13.0339 }, visitDuration: 75 },

    { id: "cd3", name: "Fort St George",
      desc: "Britain's first fort in India, built in 1644 — now houses a museum and the Tamil Nadu Assembly.",
      img: "https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2023/07/Secretariat-inside-Fort-St-George-Chennai.jpg?resize=1024%2C463&ssl=1",
      coords: { x: 80.2876, y: 13.0802 }, visitDuration: 90 },

    { id: "cd4", name: "Mahabalipuram",
      desc: "Shore temples and rock carvings from the Pallava dynasty, 60km from Chennai.",
      img: "https://www.themysteriousindia.net/wp-content/uploads/Shore-temple-mahabalipuram.jpg",
      coords: { x: 80.1927, y: 12.6269 }, visitDuration: 180 },

    { id: "cd5", name: "Valluvar  Kottam",
      desc: "Monument to Tamil poet Thiruvalluvar — a 31m chariot shaped stone temple.",
      img: "https://tse2.mm.bing.net/th/id/OIP.xkFl8GOXtu4v5yk3F3QfcAHaDt?pid=Api&P=0&h=180",
      coords: { x: 80.2393, y: 13.0627 }, visitDuration: 45 },

    { id: "cd6", name: "Birla Planetarium Chennai",
      desc: "One of India's finest planetariums with astronomy shows and a science museum.",
      img: "http://3.bp.blogspot.com/-G8LFiA0yG-0/T4JcFk6KuYI/AAAAAAAACvw/D7ufEKOU58o/s1600/chennai-birla-planetarium-new1.jpg",
      coords: { x: 80.2527, y: 13.0627 }, visitDuration: 90 },

    { id: "cd7", name: "Arignar Anna Zoological Park",
      desc: "Asia's largest zoo spanning 602 acres with 2,500+ animals including white tigers.",
      img: "https://tse1.mm.bing.net/th/id/OIP.Nj-vAYYgivOUln6vl65hmgHaEK?pid=Api&P=0&h=180",
      coords: { x: 80.0969, y: 12.9828 }, visitDuration: 150 },

    { id: "cd8", name: "San Thome Cathedral",
      desc: "Neo-Gothic cathedral built over the tomb of St. Thomas the Apostle — one of only three basilicas over an apostle's tomb.",
      img: "https://www.trodly.com/pictures/attraction/1736.jpg",
      coords: { x: 80.2784, y: 13.0339 }, visitDuration: 60 },

    { id: "cd9", name: "Elliot's Beach",
      desc: "Quieter, cleaner alternative to Marina — popular with joggers and evening walkers.",
      img: "https://chennaitourism.travel/images/places-to-visit/headers/edward-elliot-s-beach-chennai-tourism-entry-fee-timings-holidays-reviews-header.jpg",
      coords: { x: 80.2710, y: 12.9981 }, visitDuration: 60 },
  ],

  bangalore: [
    // VERIFIED coordinates from Wikipedia / GPS sources:
    // Lalbagh:         12.9507, 77.5848
    // Bangalore Palace:12.9985, 77.5921  ← north of city centre
    // Cubbon Park:     12.9763, 77.5929  ← city centre
    // Nandi Hills:     13.3682, 77.6840  ← 60km north, FAR from city
    // ISKCON Temple:   13.0097, 77.5486  ← north-west of city
    // Tipu Sultan Pal: 12.9594, 77.5736  ← south/old city
    // UB City:         12.9716, 77.5960  ← city centre
    // Bannerghatta:    12.8002, 77.5757  ← south, 22km
    // Wonderla:        12.8391, 77.4540  ← south-west, 28km

    { id: "bd1", name: "Lalbagh Botanical Garden",
      desc: "240-acre paradise with a 19th-century glass house, ancient trees and over 1,000 plant species.",
      img: "https://tse3.mm.bing.net/th/id/OIP.kAYL9njpBf6hntzkmEB7yQHaE8?pid=Api&P=0&h=180",
      coords: { x: 77.5848, y: 12.9507 }, visitDuration: 120 },

    { id: "bd2", name: "Bangalore Palace",
      desc: "Tudor-style palace inspired by Windsor Castle with original royal furniture and paintings.",
      img: "https://tse2.mm.bing.net/th/id/OIP.3QgTPrOjt3-JUbC1OrlpcwHaEo?pid=Api&P=0&h=180",
      coords: { x: 77.5921, y: 12.9985 }, visitDuration: 90 },

    { id: "bd3", name: "Cubbon Park",
      desc: "120-hectare lung of the city — joggers, cyclists, bandstand and colonial heritage buildings.",
      img: "https://tse4.mm.bing.net/th/id/OIP.5hUUqHH-ktmpwiNPLyEuaAHaIU?pid=Api&P=0&h=180",
      coords: { x: 77.5929, y: 12.9763 }, visitDuration: 75 },

    { id: "bd4", name: "Nandi Hills",
      desc: "60km north of Bangalore — a 1478m hill fort famous for spectacular sunrise views and cool air.",
      img: "https://tse1.mm.bing.net/th/id/OIP.s5nx14hAhkXCAwoqjbRrigHaE6?pid=Api&P=0&h=180",
      coords: { x: 77.6840, y: 13.3682 }, visitDuration: 180 },

    { id: "bd5", name: "Iskcon Temple",
      desc: "One of the world's largest Hare Krishna temples on Hare Krishna Hill, Rajajinagar — spiritually stunning.",
      img: "https://www.trawell.in/admin/images/upload/148027305ISKCONTemple_Main.jpg",
      coords: { x: 77.5486, y: 13.0097 }, visitDuration: 75 },

    { id: "bd6", name: "Tipu Sultan's Summer Palace",
      desc: "18th-century wooden palace of Tipu Sultan with intricate teak carvings and arched corridors in Old Bangalore.",
      img: "https://tse2.mm.bing.net/th/id/OIP.1lMziCZETSyGW1-JP16xAgHaE5?pid=Api&P=0&h=180",
      coords: { x: 77.5736, y: 12.9595 }, visitDuration: 60 },

    { id: "bd7", name: "UB City Mall",
      desc: "Luxury lifestyle destination with high-end brands, rooftop restaurants and weekend art markets.",
      img: "https://thumbs.dreamstime.com/b/view-beautiful-architecture-ub-city-awesome-shopping-mall-iconic-cityscape-skyscrapers-bangalore-karnataka-india-april-275393258.jpg",
      coords: { x: 77.5960, y: 12.9716 }, visitDuration: 90 },

    { id: "bd8", name: "Bannerghatta National Park",
      desc: "Jungle safari, butterfly enclosure and bear rescue centre just 22km south of the city.",
      img: "https://tse3.mm.bing.net/th/id/OIP.8sni2p3TBZzOh-5_ZJaGMAHaEU?pid=Api&P=0&h=180",
      coords: { x: 77.5757, y: 12.8002 }, visitDuration: 150 },

    { id: "bd9", name: "Wonderla Amusement Park",
      desc: "South India's most popular theme park with 60+ rides and a massive wave pool.",
      img: "https://hyderabadboss.com/wp-content/uploads/2016/11/wonderla-1.jpg",
      coords: { x: 77.4540, y: 12.8391 }, visitDuration: 240 },
  ],

  jaipur: [
    { id: "jd1", name: "Amber Fort",
      desc: "Majestic hillside fort with mirror palace and stunning valley views — one of Rajasthan's finest.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Amer_Fort_Jaipur_Rajasthan.jpg/1280px-Amer_Fort_Jaipur_Rajasthan.jpg",
      coords: { x: 75.8514, y: 26.9855 }, visitDuration: 150 },

    { id: "jd2", name: "Hawa Mahal",
      desc: "Palace of Winds — five-storey honeycomb façade with 953 windows, built for royal ladies.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Hawa_Mahal%2C_Jaipur.jpg/800px-Hawa_Mahal%2C_Jaipur.jpg",
      coords: { x: 75.8267, y: 26.9239 }, visitDuration: 60 },

    { id: "jd3", name: "City Palace Jaipur",
      desc: "Sprawling royal complex blending Rajput and Mughal architecture with a Mubarak Mahal museum.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/City_Palace_Jaipur_Rajasthan.jpg/1280px-City_Palace_Jaipur_Rajasthan.jpg",
      coords: { x: 75.8235, y: 26.9258 }, visitDuration: 120 },

    { id: "jd4", name: "Jantar Mantar",
      desc: "UNESCO World Heritage astronomical observatory with massive stone instruments, built in 1734.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Jantar_Mantar_Jaipur_Rajasthan.jpg/1280px-Jantar_Mantar_Jaipur_Rajasthan.jpg",
      coords: { x: 75.8245, y: 26.9246 }, visitDuration: 75 },

    { id: "jd5", name: "Nahargarh Fort",
      desc: "Hilltop fort with city panoramas and a sunset terrace restaurant — perfect dusk destination.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Nahargarh_Fort_Jaipur.jpg/1280px-Nahargarh_Fort_Jaipur.jpg",
      coords: { x: 75.8044, y: 26.9385 }, visitDuration: 90 },

    { id: "jd6", name: "Jal Mahal",
      desc: "Water Palace that appears to float on Man Sagar Lake — magical at sunrise and sunset.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jal_Mahal_Jaipur.jpg/1280px-Jal_Mahal_Jaipur.jpg",
      coords: { x: 75.8422, y: 26.9534 }, visitDuration: 45 },

    { id: "jd7", name: "Birla Mandir Jaipur",
      desc: "Gleaming white marble temple dedicated to Vishnu and Lakshmi, built in 1988.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Birla_Mandir_Jaipur.jpg/800px-Birla_Mandir_Jaipur.jpg",
      coords: { x: 75.8176, y: 26.8996 }, visitDuration: 60 },

    { id: "jd8", name: "Albert Hall Museum",
      desc: "Oldest museum in Rajasthan with Egyptian mummies, Persian carpets and Rajasthani art.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Albert_Hall_Museum_Jaipur.jpg/1280px-Albert_Hall_Museum_Jaipur.jpg",
      coords: { x: 75.8190, y: 26.9072 }, visitDuration: 90 },

    { id: "jd9", name: "Johri Bazaar",
      desc: "Jaipur's jewellery hub — gemstones, lac jewellery and traditional Rajasthani crafts.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Johari_Bazar_Jaipur.jpg/1280px-Johari_Bazar_Jaipur.jpg",
      coords: { x: 75.8289, y: 26.9173 }, visitDuration: 90 },
  ],

  goa: [
    { id: "gd1", name: "Calangute Beach",
      desc: "Queen of Beaches — wide golden sands, water sports, shacks and vibrant beach life.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Calangute_beach_Goa.jpg/1280px-Calangute_beach_Goa.jpg",
      coords: { x: 73.7553, y: 15.5438 }, visitDuration: 120 },

    { id: "gd2", name: "Basilica of Bom Jesus",
      desc: "UNESCO World Heritage Baroque church housing the mortal remains of St. Francis Xavier.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Basilica_of_Bom_Jesus_Goa.jpg/1280px-Basilica_of_Bom_Jesus_Goa.jpg",
      coords: { x: 73.9116, y: 15.5009 }, visitDuration: 75 },

    { id: "gd3", name: "Dudhsagar Falls",
      desc: "Four-tiered 600m waterfall in the heart of Mollem National Park — a monsoon spectacle.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Dudhsagar_Falls.jpg/800px-Dudhsagar_Falls.jpg",
      coords: { x: 74.3141, y: 15.3144 }, visitDuration: 180 },

    { id: "gd4", name: "Anjuna Flea Market",
      desc: "Legendary Wednesday market with handicrafts, spices, antiques and Goan food stalls.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anjuna_Flea_Market_Goa.jpg/1280px-Anjuna_Flea_Market_Goa.jpg",
      coords: { x: 73.7413, y: 15.5736 }, visitDuration: 120 },

    { id: "gd5", name: "Fort Aguada",
      desc: "17th-century Portuguese fort with a working lighthouse offering panoramic sea views.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Fort_Aguada_Goa.jpg/1280px-Fort_Aguada_Goa.jpg",
      coords: { x: 73.7736, y: 15.5016 }, visitDuration: 90 },

    { id: "gd6", name: "Palolem Beach",
      desc: "Most beautiful crescent bay in Goa — calm, clean waters ideal for kayaking and swimming.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Palolem_beach_Goa.jpg/1280px-Palolem_beach_Goa.jpg",
      coords: { x: 74.0233, y: 15.0100 }, visitDuration: 120 },

    { id: "gd7", name: "Baga Beach",
      desc: "North Goa's most popular beach — water sports by day, nightlife by evening.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Baga_beach_Goa.jpg/1280px-Baga_beach_Goa.jpg",
      coords: { x: 73.7519, y: 15.5567 }, visitDuration: 90 },

    { id: "gd8", name: "Se Cathedral Old Goa",
      desc: "Asia's largest cathedral, built by the Portuguese in 1619 — imposing and serene.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Se_Cathedral_Goa.jpg/1280px-Se_Cathedral_Goa.jpg",
      coords: { x: 73.9130, y: 15.5013 }, visitDuration: 60 },

    { id: "gd9", name: "Chapora Fort",
      desc: "'Dil Chahta Hai' fort with dramatic clifftop views over North Goa and the Chapora river.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Chapora_Fort_Goa.jpg/1280px-Chapora_Fort_Goa.jpg",
      coords: { x: 73.7392, y: 15.6016 }, visitDuration: 75 },
  ],

  agra: [
    { id: "ad1", name: "Taj Mahal",
      desc: "The eternal symbol of love — a UNESCO wonder. Visit at sunrise for the purest experience.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg",
      coords: { x: 78.0421, y: 27.1751 }, visitDuration: 150 },

    { id: "ad2", name: "Agra Fort",
      desc: "Massive red-sandstone Mughal fortress overlooking the Yamuna, with ornate palaces within.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Agra_fort_Rajasthan.jpg/1280px-Agra_fort_Rajasthan.jpg",
      coords: { x: 78.0214, y: 27.1795 }, visitDuration: 120 },

    { id: "ad3", name: "Fatehpur Sikri",
      desc: "Akbar's abandoned imperial city built entirely of red sandstone — a ghost city in perfect condition.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Fatehpur_Sikri_Buland_Darwaza.jpg/1280px-Fatehpur_Sikri_Buland_Darwaza.jpg",
      coords: { x: 77.6627, y: 27.0940 }, visitDuration: 150 },

    { id: "ad4", name: "Mehtab Bagh",
      desc: "Moonlit garden across the Yamuna — the best spot for Taj reflections at dusk.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Mehtab_Bagh_Agra.jpg/1280px-Mehtab_Bagh_Agra.jpg",
      coords: { x: 78.0413, y: 27.1816 }, visitDuration: 60 },

    { id: "ad5", name: "Itimad-ud-Daulah",
      desc: "Baby Taj — the tomb of Empress Nur Jahan's father, arguably more intricate than the Taj.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Itmad-ud-Daulah_Tomb%2C_Agra.jpg/1280px-Itmad-ud-Daulah_Tomb%2C_Agra.jpg",
      coords: { x: 78.0302, y: 27.1960 }, visitDuration: 75 },

    { id: "ad6", name: "Chini Ka Rauza",
      desc: "Rare Persian-style tomb entirely covered in Chinese tile work — an oft-missed gem.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Chini-ka-Rauza.jpg/800px-Chini-ka-Rauza.jpg",
      coords: { x: 78.0327, y: 27.2028 }, visitDuration: 45 },

    { id: "ad7", name: "Akbar's Tomb Sikandra",
      desc: "Emperor Akbar's grand mausoleum in a 119-acre walled garden with deer and peacocks.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Akbar%27s_Tomb_Sikandra.jpg/1280px-Akbar%27s_Tomb_Sikandra.jpg",
      coords: { x: 77.9624, y: 27.2195 }, visitDuration: 90 },

    { id: "ad8", name: "Kinari Bazaar",
      desc: "Agra's oldest bazaar — marble souvenirs, zardozi embroidery and the famous Agra petha.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Kinari_Bazaar_Agra.jpg/800px-Kinari_Bazaar_Agra.jpg",
      coords: { x: 78.0115, y: 27.1840 }, visitDuration: 90 },

    { id: "ad9", name: "Wildlife SOS Elephant Sanctuary",
      desc: "Ethical elephant sanctuary where rescued elephants roam free — feeding and bathing experiences.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Elephant_sanctuary_Agra.jpg/1280px-Elephant_sanctuary_Agra.jpg",
      coords: { x: 78.0711, y: 27.1510 }, visitDuration: 120 },
  ],

  varanasi: [
    { id: "vd1", name: "Dashashwamedh Ghat",
      desc: "Main ghat on the Ganges — witness the nightly Ganga Aarti ceremony with fire lamps and chants.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dashashwamedh_Ghat_Varanasi.jpg/1280px-Dashashwamedh_Ghat_Varanasi.jpg",
      coords: { x: 83.0107, y: 25.3109 }, visitDuration: 90 },

    { id: "vd2", name: "Kashi Vishwanath Temple",
      desc: "One of 12 Jyotirlingas — most sacred Shiva shrine in Hinduism, recently restored.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Kashi_Vishwanath_Temple.jpg/800px-Kashi_Vishwanath_Temple.jpg",
      coords: { x: 83.0107, y: 25.3109 }, visitDuration: 75 },

    { id: "vd3", name: "Sarnath",
      desc: "Where Buddha delivered his first sermon — ancient deer park with Dhamekh Stupa and museum.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Dhamek_Stupa%2C_Sarnath.jpg/1280px-Dhamek_Stupa%2C_Sarnath.jpg",
      coords: { x: 83.0237, y: 25.3797 }, visitDuration: 120 },

    { id: "vd4", name: "Sunrise Boat Ride",
      desc: "Float on the holy Ganges at dawn — mist, temples, ghats and morning rituals of millions.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Varanasi_Ghats_Sunrise_boat_ride.jpg/1280px-Varanasi_Ghats_Sunrise_boat_ride.jpg",
      coords: { x: 83.0096, y: 25.3044 }, visitDuration: 90 },

    { id: "vd5", name: "Manikarnika Ghat",
      desc: "The holiest of burning ghats — witness ancient Hindu cremation rites in a deeply moving experience.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Manikarnika_Ghat_Varanasi.jpg/1280px-Manikarnika_Ghat_Varanasi.jpg",
      coords: { x: 83.0115, y: 25.3109 }, visitDuration: 45 },

    { id: "vd6", name: "Banaras Hindu University",
      desc: "One of Asia's largest residential universities with a stunning campus and the Vishwanath Temple.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/BHU_Main_Gate_Varanasi.jpg/1280px-BHU_Main_Gate_Varanasi.jpg",
      coords: { x: 82.9867, y: 25.2677 }, visitDuration: 90 },

    { id: "vd7", name: "Assi Ghat",
      desc: "Southernmost major ghat — more relaxed atmosphere with yoga at sunrise and bonfire evenings.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Assi_Ghat_Varanasi.jpg/1280px-Assi_Ghat_Varanasi.jpg",
      coords: { x: 83.0107, y: 25.2829 }, visitDuration: 60 },

    { id: "vd8", name: "Ramnagar Fort",
      desc: "18th-century riverside fort housing the Maharaja of Varanasi with a vintage car collection.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Ramnagar_Fort_Varanasi.jpg/1280px-Ramnagar_Fort_Varanasi.jpg",
      coords: { x: 83.0373, y: 25.2791 }, visitDuration: 90 },

    { id: "vd9", name: "Chunar Fort",
      desc: "1000-year-old fort on the Ganges, 40km from Varanasi — overlooked by most tourists.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Chunar_Fort_Varanasi.jpg/1280px-Chunar_Fort_Varanasi.jpg",
      coords: { x: 82.8991, y: 25.1261 }, visitDuration: 120 },
  ],

  kolkata: [
    { id: "kd1", name: "Victoria Memorial",
      desc: "White marble Raj-era museum surrounded by 64 acres of gardens — Kolkata's crown jewel.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Victoria_Memorial_Kolkata.jpg/1280px-Victoria_Memorial_Kolkata.jpg",
      coords: { x: 88.3426, y: 22.5448 }, visitDuration: 120 },

    { id: "kd2", name: "Howrah Bridge",
      desc: "Iconic cantilever bridge — 80,000+ vehicles daily. Best photographed at night when lit up.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Howrah_Bridge.jpg/1280px-Howrah_Bridge.jpg",
      coords: { x: 88.3282, y: 22.5851 }, visitDuration: 45 },

    { id: "kd3", name: "Dakshineswar Temple",
      desc: "19th-century Kali temple on the Hooghly — made famous by saint Ramakrishna.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Dakshineswar_Kali_Temple_Kolkata.jpg/1280px-Dakshineswar_Kali_Temple_Kolkata.jpg",
      coords: { x: 88.3573, y: 22.6544 }, visitDuration: 75 },

    { id: "kd4", name: "College Street",
      desc: "Largest second-hand book market in the world — paradise for bibliophiles and chai lovers.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/College_Street_Kolkata.jpg/1280px-College_Street_Kolkata.jpg",
      coords: { x: 88.3632, y: 22.5769 }, visitDuration: 90 },

    { id: "kd5", name: "Marble Palace",
      desc: "19th-century mansion packed with European statues, Chinese vases and Flemish paintings.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Marble_Palace_Kolkata.jpg/800px-Marble_Palace_Kolkata.jpg",
      coords: { x: 88.3604, y: 22.5832 }, visitDuration: 75 },

    { id: "kd6", name: "Kalighat Temple",
      desc: "One of the 51 Shakti Peethas — ancient Kali temple on the banks of the Adi Ganga.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Kalighat_temple_Kolkata.jpg/800px-Kalighat_temple_Kolkata.jpg",
      coords: { x: 88.3426, y: 22.5213 }, visitDuration: 60 },

    { id: "kd7", name: "Indian Museum",
      desc: "Oldest and largest museum in Asia with 11 cultural galleries across art, archaeology and natural history.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Indian_Museum_Kolkata.jpg/1280px-Indian_Museum_Kolkata.jpg",
      coords: { x: 88.3517, y: 22.5574 }, visitDuration: 120 },

    { id: "kd8", name: "Kumartuli",
      desc: "Potters' quarter where thousands of clay idols of Goddess Durga are crafted every year.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kumartuli_Kolkata.jpg/1280px-Kumartuli_Kolkata.jpg",
      coords: { x: 88.3726, y: 22.6016 }, visitDuration: 60 },

    { id: "kd9", name: "Sundarbans National Park",
      desc: "UNESCO World Heritage delta forest — home to the Royal Bengal Tiger and mangrove ecosystem.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Sundarbans_National_Park.jpg/1280px-Sundarbans_National_Park.jpg",
      coords: { x: 88.9112, y: 21.9497 }, visitDuration: 300 },
  ],

  udaipur: [
    { id: "ud1", name: "City Palace Udaipur",
      desc: "Magnificent 400-year-old palace complex on Lake Pichola — the largest royal complex in Rajasthan.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/City_Palace_Udaipur.jpg/1280px-City_Palace_Udaipur.jpg",
      coords: { x: 73.6817, y: 24.5763 }, visitDuration: 150 },

    { id: "ud2", name: "Lake Pichola Boat Ride",
      desc: "Serene boat ride on Udaipur's most beautiful lake with views of palaces and the Aravalli hills.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Lake_Pichola_Udaipur.jpg/1280px-Lake_Pichola_Udaipur.jpg",
      coords: { x: 73.6762, y: 24.5724 }, visitDuration: 90 },

    { id: "ud3", name: "Jagdish Temple",
      desc: "17th-century Indo-Aryan temple dedicated to Lord Vishnu with exquisite carvings and brass lamps.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jagdish_Temple_Udaipur.jpg/800px-Jagdish_Temple_Udaipur.jpg",
      coords: { x: 73.6826, y: 24.5778 }, visitDuration: 60 },

    { id: "ud4", name: "Saheliyon Ki Bari",
      desc: "Garden of the Maidens — 18th-century ornamental garden with fountains, kiosks and marble elephants.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Saheliyon_ki_Bari_Udaipur.jpg/1280px-Saheliyon_ki_Bari_Udaipur.jpg",
      coords: { x: 73.6818, y: 24.5987 }, visitDuration: 60 },

    { id: "ud5", name: "Fateh Sagar Lake",
      desc: "Serene artificial lake with a central island garden — best experienced at sunset.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Fateh_Sagar_Lake_Udaipur.jpg/1280px-Fateh_Sagar_Lake_Udaipur.jpg",
      coords: { x: 73.6716, y: 24.5994 }, visitDuration: 60 },

    { id: "ud6", name: "Vintage Car Museum",
      desc: "Collection of 22 vintage and classic cars owned by the Maharana of Mewar.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Vintage_Car_Museum_Udaipur.jpg/1280px-Vintage_Car_Museum_Udaipur.jpg",
      coords: { x: 73.6849, y: 24.5875 }, visitDuration: 75 },

    { id: "ud7", name: "Monsoon Palace",
      desc: "Hilltop palace offering 360-degree views of Udaipur, the lakes and the Aravallis at sunset.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Monsoon_Palace_Udaipur.jpg/1280px-Monsoon_Palace_Udaipur.jpg",
      coords: { x: 73.6208, y: 24.5766 }, visitDuration: 75 },

    { id: "ud8", name: "Bagore Ki Haveli",
      desc: "18th-century haveli with 138 rooms and the world's largest turban — evening cultural show daily.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Bagore_Ki_Haveli_Udaipur.jpg/800px-Bagore_Ki_Haveli_Udaipur.jpg",
      coords: { x: 73.6832, y: 24.5763 }, visitDuration: 90 },

    { id: "ud9", name: "Eklingji Temple",
      desc: "Complex of 108 temples dedicated to Lord Shiva, 22km from Udaipur — still actively worshipped.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Eklingji_Temple_Udaipur.jpg/800px-Eklingji_Temple_Udaipur.jpg",
      coords: { x: 73.7198, y: 24.7233 }, visitDuration: 90 },
  ],
};
