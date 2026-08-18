export const mapApiPropertyToClient = (p) => {
  // Format price helper
  const formatPrice = (priceStr) => {
    if (!priceStr) return '';
    const numericPrice = Number(priceStr);
    if (isNaN(numericPrice)) return priceStr;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numericPrice);
  };

  // Determine badges from highlights
  const badges = [];
  if (p.highlights?.newLaunch) badges.push('New Construction');
  if (p.highlights?.hotProperty) badges.push('Hot Offer');
  if (p.highlights?.premiumProperty) badges.push('Premium');
  if (p.highlights?.readyToMove) badges.push('Ready To Move');
  
  // Format price Per SqFt if available
  let displayPrice = formatPrice(p.pricing?.price);
  if (p.pricing?.pricePerSqFt) {
    displayPrice = `${displayPrice}/sqft`;
  }

  return {
    id: p._id || p.id,
    title: p.title || '',
    slug: p.slug || '',
    type: p.type || '',
    status: p.purpose === 'Sale' ? 'For Sale' : (p.purpose === 'Rent' ? 'For Rent' : p.purpose),
    price: displayPrice,
    rawPrice: p.pricing?.price || '',
    location: p.location?.area || p.location?.city || '',
    city: p.location?.city || '',
    fullAddress: p.location?.fullAddress || '',
    bhk: p.specifications?.bedrooms || null,
    bathrooms: p.specifications?.bathrooms || null,
    area: p.specifications?.totalArea || p.specifications?.builtUpArea || '',
    facing: p.specifications?.facing || '',
    parking: p.specifications?.parkingSpaces || '',
    image: p.images?.featured || "",
    video: p.images?.videoUrl || null,
    features: p.amenities || [],
    featured: p.highlights?.featuredProperty || p.highlights?.premiumProperty || p.highlights?.hotProperty || p.featured || false,
    furnishing: p.specifications?.furnishing || "",
    description: p.description?.short || p.description?.full || "",
    mapUrl: p.location?.googleMapLink || "",
    gallery: p.gallery || p.images?.gallery || [],
    badges: badges,
    specifications: p.specifications || {},
    agent: p.agent || {},
    amenities: p.amenities || []
  };
};
