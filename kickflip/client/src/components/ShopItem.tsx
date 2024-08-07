import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { IProducts } from "../utils/models";
import { Card, CardContent, CardFooter } from "./ui/card";

const ShopItem = ({ products }: { products: IProducts }) => {
  return (
    <Card className="w-4/5 transform transition-transform duration-300 hover:scale-105 cursor-pointer bg-transparent">
      <CardContent className="flex aspect-square items-center justify-center p-6 rounded-lg">
        <Link to={`/shop/${products.id}`}>
          <img
            src={products.images[0].src}
            alt={products.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-lg"
          />
        </Link>
      </CardContent>
      <CardFooter className="mt-4 flex justify-between text-white">
        <div>
          <h3 className="text-base text-wrap">
            <Link to={`/shop/${products.id}`}>
              <span aria-hidden="true" className="inset-0" />
              {products.name}
            </Link>
          </h3>

          <div className="flex gap-3 py-2">
            <h5>{products.color.name}</h5>
            <span
              aria-hidden="true"
              key={products.color.name}
              className={cn(
                products.color.class,
                "h-6 w-6 rounded-full border border-black"
              )}
            />
          </div>
        </div>
        <p className="text-base font-medium">R {products.price}.00</p>
      </CardFooter>
    </Card>
  );
};

export default ShopItem;
