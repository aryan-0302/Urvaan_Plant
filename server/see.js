const mongoose = require('mongoose');
require('dotenv').config();

const plantData = [
    { name: "Money Plant Golden", price: 149, categories: ["Indoor", "Air Purifying", "Low Maintenance"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Money+Plant", description: "A popular houseplant known for bringing good luck and prosperity.", careLevel: "Easy" },
    { name: "Areca Palm", price: 249, categories: ["Indoor", "Air Purifying", "Home Decor"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Areca+Palm", description: "Elegant and leafy, perfect for filling up a bright corner.", careLevel: "Easy" },
    { name: "Snake Plant (Sansevieria)", price: 299, categories: ["Indoor", "Air Purifying", "Low Maintenance"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Snake+Plant", description: "Extremely hardy and ideal for beginners. Thrives on neglect.", careLevel: "Easy" },
    { name: "Jade Plant", price: 199, categories: ["Indoor", "Succulent", "Good Luck"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Jade+Plant", description: "A beautiful succulent with fleshy, oval-shaped leaves.", careLevel: "Easy" },
    { name: "ZZ Plant", price: 349, categories: ["Indoor", "Low Maintenance"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=ZZ+Plant", description: "A stylish plant that can tolerate low light and infrequent watering.", careLevel: "Easy" },
    { name: "Peace Lily", price: 299, categories: ["Indoor", "Air Purifying", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Peace+Lily", description: "Features beautiful white spathes and removes toxins from the air.", careLevel: "Moderate" },
    { name: "Anthurium Red", price: 499, categories: ["Indoor", "Flowering", "Home Decor"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Anthurium", description: "Known for its bright, heart-shaped flowers and glossy leaves.", careLevel: "Moderate" },
    { name: "Spider Plant", price: 129, categories: ["Indoor", "Air Purifying", "Hanging"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Spider+Plant", description: "Produces charming baby spiderettes and is very easy to propagate.", careLevel: "Easy" },
    { name: "Tulsi (Holy Basil)", price: 99, categories: ["Outdoor", "Medicinal", "Herb"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Tulsi", description: "A sacred plant in Hinduism, known for its medicinal properties.", careLevel: "Easy" },
    { name: "Rose Plant (Red)", price: 199, categories: ["Outdoor", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Rose", description: "The classic symbol of love, requires sun and regular care.", careLevel: "Advanced" },
    { name: "Hibiscus Plant", price: 179, categories: ["Outdoor", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Hibiscus", description: "Large, trumpet-shaped flowers that attract butterflies.", careLevel: "Moderate" },
    { name: "Fiddle Leaf Fig", price: 799, categories: ["Indoor", "Home Decor"], available: false, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Fiddle+Leaf", description: "A trendy plant with large, violin-shaped leaves. Can be finicky.", careLevel: "Advanced" },
    { name: "Monstera Deliciosa", price: 599, categories: ["Indoor", "Home Decor"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Monstera", description: "Famous for its natural leaf-holes, a statement piece for any room.", careLevel: "Moderate" },
    { name: "String of Pearls", price: 249, categories: ["Succulent", "Hanging"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Pearls", description: "A unique trailing succulent with pea-shaped leaves.", careLevel: "Moderate" },
    { name: "Aloe Vera", price: 149, categories: ["Succulent", "Medicinal"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Aloe+Vera", description: "The gel inside its leaves has soothing and healing properties.", careLevel: "Easy" },
    { name: "Rubber Plant", price: 399, categories: ["Indoor", "Air Purifying"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Rubber+Plant", description: "Features dark, glossy leaves and is relatively easy to care for.", careLevel: "Easy" },
    { name: "Lucky Bamboo", price: 299, categories: ["Indoor", "Good Luck", "Low Maintenance"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Lucky+Bamboo", description: "An element of Feng Shui, said to bring good fortune.", careLevel: "Easy" },
    { name: "Aglaonema (Chinese Evergreen)", price: 349, categories: ["Indoor", "Low Light", "Colorful Foliage"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Aglaonema", description: "Comes in many varieties with stunning leaf patterns.", careLevel: "Easy" },
    { name: "Croton Plant", price: 299, categories: ["Indoor", "Outdoor", "Colorful Foliage"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Croton", description: "Known for its vibrant, multi-colored foliage.", careLevel: "Moderate" },
    { name: "Curry Leaf Plant", price: 149, categories: ["Outdoor", "Herb"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Curry+Leaf", description: "An essential in South Indian cooking, highly aromatic.", careLevel: "Easy" },
    { name: "Lemon Grass", price: 99, categories: ["Outdoor", "Herb"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Lemon+Grass", description: "Used in teas and Asian cuisine for its citrus flavor.", careLevel: "Easy" },
    { name: "Marigold", price: 79, categories: ["Outdoor", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Marigold", description: "Bright, cheerful flowers that are often used in festivals.", careLevel: "Easy" },
    { name: "Jasmine (Mogra)", price: 199, categories: ["Outdoor", "Flowering", "Fragrant"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Jasmine", description: "Produces intensely fragrant white flowers, especially at night.", careLevel: "Moderate" },
    { name: "Bougainvillea", price: 249, categories: ["Outdoor", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Bougainvillea", description: "A hardy, thorny vine with colorful flower-like bracts.", careLevel: "Easy" },
    { name: "Syngonium Pink", price: 199, categories: ["Indoor", "Colorful Foliage"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Syngonium", description: "Arrowhead-shaped leaves with beautiful pink variegation.", careLevel: "Easy" },
    { name: "Echeveria Succulent", price: 249, categories: ["Succulent"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Echeveria", description: "Forms beautiful rosettes and comes in various colors.", careLevel: "Easy" },
    { name: "Haworthia (Zebra Plant)", price: 229, categories: ["Succulent"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Haworthia", description: "A small succulent with striking white stripes on its leaves.", careLevel: "Easy" },
    { name: "Adenium (Desert Rose)", price: 399, categories: ["Outdoor", "Succulent", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Adenium", description: "A sun-loving plant with a thick trunk and beautiful flowers.", careLevel: "Moderate" },
    { name: "Ixora Plant", price: 199, categories: ["Outdoor", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Ixora", description: "Clusters of small, star-shaped flowers in red, orange, or yellow.", careLevel: "Moderate" },
    { name: "Philodendron Brasil", price: 299, categories: ["Indoor", "Hanging"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Philodendron", description: "Heart-shaped leaves with yellow and lime green variegation.", careLevel: "Easy" },
    { name: "Calathea Ornata", price: 449, categories: ["Indoor", "Pet Friendly"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Calathea", description: "Known as the Pinstripe Plant for its patterned leaves.", careLevel: "Advanced" },
    { name: "Money Tree (Pachira)", price: 599, categories: ["Indoor", "Good Luck"], available: false, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Money+Tree", description: "Often has a braided trunk and is another symbol of good fortune.", careLevel: "Easy" },
    { name: "Bird of Paradise", price: 899, categories: ["Indoor", "Home Decor"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Bird+of+Paradise", description: "Large, banana-like leaves that create a tropical feel.", careLevel: "Moderate" },
    { name: "Boston Fern", price: 249, categories: ["Indoor", "Hanging", "High Humidity"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Boston+Fern", description: "A classic fern with feathery fronds that loves humidity.", careLevel: "Moderate" },
    { name: "Dracaena Mahatma", price: 399, categories: ["Indoor", "Colorful Foliage"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Dracaena", description: "A hardy plant with long, arching leaves with colorful edges.", careLevel: "Easy" },
    { name: "Schefflera (Umbrella Plant)", price: 349, categories: ["Indoor"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Schefflera", description: "Features leaflets that radiate from a central point, like an umbrella.", careLevel: "Easy" },
    { name: "Peperomia Green", price: 229, categories: ["Indoor", "Pet Friendly"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Peperomia", description: "A compact plant with waxy, round leaves. Great for small spaces.", careLevel: "Easy" },
    { name: "Portulaca (9'O Clock)", price: 99, categories: ["Outdoor", "Flowering", "Succulent"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Portulaca", description: "A low-growing groundcover that produces colorful flowers in the sun.", careLevel: "Easy" },
    { name: "Vinca (Periwinkle)", price: 89, categories: ["Outdoor", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Vinca", description: "A heat-tolerant annual with glossy leaves and star-shaped flowers.", careLevel: "Easy" },
    { name: "Lavender Plant", price: 299, categories: ["Outdoor", "Herb", "Fragrant"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Lavender", description: "Known for its calming fragrance and beautiful purple flowers.", careLevel: "Moderate" },
    { name: "Rosemary Plant", price: 249, categories: ["Outdoor", "Herb"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Rosemary", description: "A fragrant herb used in cooking, with needle-like leaves.", careLevel: "Easy" },
    { name: "Mint (Pudina)", price: 79, categories: ["Outdoor", "Herb"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Mint", description: "A fast-growing herb perfect for drinks and chutneys.", careLevel: "Easy" },
    { name: "Dieffenbachia (Dumb Cane)", price: 349, categories: ["Indoor", "Air Purifying"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Dieffenbachia", description: "Large, patterned leaves make this a popular indoor choice.", careLevel: "Easy" },
    { name: "Fittonia (Nerve Plant)", price: 199, categories: ["Indoor", "High Humidity"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Fittonia", description: "Strikingly patterned leaves with colored veins. Loves terrariums.", careLevel: "Advanced" },
    { name: "Kalanchoe Plant", price: 199, categories: ["Succulent", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Kalanchoe", description: "A popular succulent that produces clusters of tiny, colorful flowers.", careLevel: "Easy" },
    { name: "Christmas Cactus", price: 299, categories: ["Succulent", "Flowering", "Hanging"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Christmas+Cactus", description: "Blooms around the holidays with unique, segmented leaves.", careLevel: "Easy" },
    { name: "Orchid Plant", price: 799, categories: ["Indoor", "Flowering", "Home Decor"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Orchid", description: "Elegant and exotic, orchids are prized for their stunning blooms.", careLevel: "Advanced" },
    { name: "Air Plant (Tillandsia)", price: 349, categories: ["Indoor", "Low Maintenance"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Air+Plant", description: "A unique plant that doesn't need soil to grow.", careLevel: "Easy" },
    { name: "Bonsai Ficus", price: 1499, categories: ["Indoor", "Home Decor"], available: false, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Bonsai", description: "The art of growing miniature trees in containers.", careLevel: "Advanced" },
    { name: "Coleus Plant", price: 129, categories: ["Outdoor", "Colorful Foliage", "Shade Loving"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Coleus", description: "Grown for its incredibly vibrant and patterned leaves.", careLevel: "Easy" },
    { name: "Gerbera Plant", price: 149, categories: ["Outdoor", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Gerbera", description: "Large, daisy-like flowers in a rainbow of colors.", careLevel: "Moderate" },
    { name: "Petunia Plant", price: 99, categories: ["Outdoor", "Flowering"], available: true, imageUrl: "https://placehold.co/600x400/a2d2ba/2c5b4c?text=Petunia", description: "A popular choice for hanging baskets and containers.", careLevel: "Easy" }
];

const Plant = mongoose.model('Plant', new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categories: { type: [String], required: true },
    available: { type: Boolean, default: true },
    imageUrl: { type: String },
    description: { type: String },
    careLevel: { type: String }
}));

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding.');
        
        await Plant.deleteMany({});
        console.log('Existing plants deleted.');

        await Plant.insertMany(plantData);
        console.log('Database seeded with new plants!');
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedDB();