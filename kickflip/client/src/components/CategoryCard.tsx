import { ImageOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

interface CategoryCardProps {
  imageSrc: string;
  text: string;
}

const CategoryCard = ({ imageSrc, text }: CategoryCardProps) => {
  return (
    <Card className="w-1/4 transform transition-transform duration-300 hover:scale-105 cursor-pointer bg-transparent relative">
      <Link to={`/shop?category=${text.toLowerCase()}`}>
        <CardContent className="flex aspect-square items-center justify-center p-0">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={text}
              className="rounded-lg w-full h-full object-cover"
            />
          ) : (
            <ImageOff className="h-20 w-20 text-gray-400" />
          )}
          <span className="absolute text-2xl font-semibold bg-black bg-opacity-50 rounded-md px-4 py-2 text-white">
            {text}
          </span>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CategoryCard;
