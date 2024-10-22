import { Input } from 'src/components/UI';

const Newsletter = () => {
  return (
    <section className="py-6 lg:py-12">
      <div className="container">
        <div className="bg-slate-100 p-6 sm:p-12 xl:p-16">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Узнавайте первыми про распродажи и новинки!
          </h2>
          <div className="flex justify-center pt-8 sm:pt-8">
            <form className="w-[480px]">
              <Input
                label="Електронная почта"
                name="email"
                type="email"
                rightAddons={
                  <button
                    type="submit"
                    className="text-xs font-medium uppercase sm:text-sm"
                  >
                    Подписаться
                  </button>
                }
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Newsletter };
