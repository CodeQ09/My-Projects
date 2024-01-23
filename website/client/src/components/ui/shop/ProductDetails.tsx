import { useState, FC } from "react";
import { Link } from "react-router-dom";
import { RadioGroup } from "@headlessui/react";
import { classNames } from "../../../utils/helpers";

interface ColorOption {
  name: string;
  class: string;
}

interface SizeOption {
  name: string;
  inStock: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  color: ColorOption[];
  sizes: SizeOption[];
}

interface ProductDetailsProps {
  product: Product;
  addToCart: (item: Product & { selectedSize: SizeOption }) => void;
  setCartItems: (item: (prevItems: Product[]) => Product[]) => void;
  setIsSizeDialogOpen: (isOpen: boolean) => void;
  cartItems: (Product & { selectedSize: SizeOption })[];
}

const ProductDetails: FC<ProductDetailsProps> = ({
  product,
  addToCart,
  setCartItems,
  setIsSizeDialogOpen,
  cartItems,
}) => {
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(
    product.sizes[0] || null
  );

  const handleBuyNow = () => {
    if (!selectedSize) {
      setIsSizeDialogOpen(true);
      return;
    }

    const updatedCartItem = { ...product, selectedSize };
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? updatedCartItem : item
        )
      );
    } else {
      addToCart(updatedCartItem);
    }
  };

  return (
    <div className="lg:ml-[30px] md:mt-[10px] max-w-[980px] max-[1024px]:ml-0 max-[450px]:mt-8">
      <h3 className="text-3xl font-semibold">{product.name}</h3>
      <h4 className="text-2xl mt-2">R {product.price}.00</h4>
      {product.color.map((colorOption) => (
        <div key={colorOption.name} className="flex items-center">
          <h5 className="my-2">{colorOption.name}</h5>
          <RadioGroup className="mx-2">
            <div>
              <RadioGroup.Label
                key={colorOption.name}
                className="relative -m-0.5 flex items-center justify-center rounded-full p-0.5"
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    colorOption.class,
                    "h-6 w-6 rounded-full border border-black border-opacity-10"
                  )}
                />
              </RadioGroup.Label>
            </div>
          </RadioGroup>
        </div>
      ))}

      <RadioGroup
        value={selectedSize}
        onChange={setSelectedSize}
        className="my-4"
      >
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4 w-1/2 max-[450px]:w-full max-[1024px]:w-8/12">
          {product.sizes &&
            product.sizes.map((sizeOption) => (
              <RadioGroup.Option
                key={sizeOption.name}
                value={sizeOption}
                disabled={!sizeOption.inStock}
                className={({ active }) =>
                  classNames(
                    sizeOption.inStock
                      ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                      : "cursor-not-allowed bg-gray-50 text-gray-200",
                    active ? "ring-2 ring-black" : "",
                    "group relative flex items-center justify-center rounded-md border py-6 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none flex-1"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <RadioGroup.Label as="span">
                      {sizeOption.name}
                    </RadioGroup.Label>
                    {sizeOption.inStock ? (
                      <span
                        className={classNames(
                          active ? "border" : "border-2",
                          checked ? "border-black" : "border-transparent",
                          "pointer-events-none absolute -inset-px rounded-md"
                        )}
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                      >
                        <svg
                          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          stroke="currentColor"
                        >
                          <line
                            x1={0}
                            y1={100}
                            x2={100}
                            y2={0}
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </RadioGroup.Option>
            ))}
        </div>
      </RadioGroup>

      <div className="sproduct-info">
        <h4 className="font-bold">Product Details</h4>

        <p>{product.description}</p>
      </div>

      <Link to="/cart">
        <div
          className="mt-5 flex w-2/12 items-center justify-center rounded-md border border-transparent bg-[#282828] px-8 py-3 text-base font-bold text-white hover:bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2 max-[450px]:w-1/3 max-[1024px]:w-3/12"
          onClick={handleBuyNow}
        >
          Buy
        </div>
      </Link>
    </div>
  );
};

export default ProductDetails;