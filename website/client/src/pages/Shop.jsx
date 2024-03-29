import { Link } from "react-router-dom";
import { PRODUCTS } from "../products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Shop() {
  return (
    <>
      <Navbar />

      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-none group-hover:opacity-75">
                  <Link
                    to={`shop/${product.name}/${product.id}`}
                    key={product.id}
                  >
                    {product && product.images && (
                      <img
                        src={product.images[0]}
                        alt={`${product.name}`}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    )}
                  </Link>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-base text-black">
                      <a href={`shop/${product.name}/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    {product.color.map((color) => (
                      <p
                        key={color.name}
                        className="mt-1 text-sm text-gray-500"
                      >
                        {color.name}
                      </p>
                    ))}
                  </div>
                  <p className="text-base font-medium text-black">
                    R {product.price}.00
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Shop;
