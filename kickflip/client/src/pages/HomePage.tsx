import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import CategoryCard from "../components/CategoryCard";
import ProductImages from "../components/ProductImages";
import useProducts from "../hooks/useProducts";

const HomePage = () => {
  const { data: products } = useProducts({ category: "all" });

  const getCategoryImage = (category: string) => {
    const product = products?.find((p) => p.category === category);
    return product ? product.images[0].src : "";
  };

  return (
    <section>
      <section className="bg-[#292929] items-center flex w-full justify-between border-b-2 border-b-black border-solid min-h-screen px-[50px] max-[450px]:flex-wrap max-[450px]:min-h-[80vh] max-[1024px]:min-h-[60vh]">
        <div className="max-[450px]:mt-5 text-white">
          <h2 className="text-8xl font-bold max-[450px]:text-5xl">
            Our New KickFlip Hoodies
          </h2>
          <p className="pt-4 text-2xl max-[450px]:text-lg max-[450px]:pt-2">
            Delivered with comfort and style, <br />
            you're guaranteed taking the streets by a storm.
            <br />
            Embrace the streets with confidence as you envelop yourself
            <br />
            in the cozy allure of our premium hoodies
          </p>
        </div>

        <ProductImages
          includeButtons={false}
          product={products?.find((p) => p.id === 1)}
        />
      </section>

      <section className="bg-[#D6D6D6] text-center py-10">
        <h2 className="font-bold pb-5 text-5xl">Shop All</h2>
        <div className="flex items-center justify-center gap-10 py-2">
          <CategoryCard text="Hoodies" imageSrc={getCategoryImage("Hoodies")} />
          <CategoryCard
            text="T-Shirts"
            imageSrc={getCategoryImage("T-Shirts")}
          />
          <CategoryCard
            text="Sweatshirts"
            imageSrc={getCategoryImage("Sweatshirts")}
          />
        </div>
      </section>

      <section className="border-t-2 border-t-black border-solid bg-[#D6D6D6] text-center py-5">
        <h2 className="font-bold text-5xl py-2">Stay Tuned</h2>
        <div className="p-6 items-center flex flex-col text-black max-[450px]:p-0 max-[1024px]:p-2">
          <form className="flex flex-col p-5 bg-transparent border-2 border-solid border-black rounded-[10px] max-w-[550px] max-[450px]:max-w-[300px]">
            <span className="text-[2rem] font-bold tracking-tight leading-8">
              Subscribe to our newsletter
            </span>
            <p className="text-base mt-4 text-[15px] mb-2">
              Get email updates to our latest content and sales
            </p>
            <div
              id="email-section"
              className="flex max-w-md mt-4 gap-x-2 max-[450px]:flex-col"
            >
              <Input
                placeholder="Email"
                type="email"
                name="email"
                id="email-address"
                autoComplete="email"
                className="bg-[#292929] border border-solid border-[#808080] rounded-md text-white flex-auto text-sm outline-none py-2 px-[0.875rem] placeholder:text-white"
              />
              <Button
                type="submit"
                className="bg-[#292929] hover:bg-[#7F1310] transition duration-300 rounded-md border-none text-white cursor-pointer font-semibold text-sm outline-none py-[0.625rem] px-[0.875rem] max-[450px]:m-3 hover:scale-110"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default HomePage;
