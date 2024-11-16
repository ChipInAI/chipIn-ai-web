import { Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function RestaurantCard({
  name,
  reviewCount,
  rating,
  imageUrl,
  features,
}: {
  name: string;
  reviewCount: number;
  rating: number;
  imageUrl: string;
  features: string[];
}) {
  return (
    <Card className="w-[300px] lg:w-[400px] overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-500 to-transparent p-4">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <div className="flex items-center mt-1">
              <Star className="w-5 h-5 text-zinc-200 fill-current" />
              <span className="ml-1 text-white">{rating.toFixed(1)}/5</span>
              <span className="ml-2 text-sm text-gray-300">
                ({reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
