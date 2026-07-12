import { products } from './products'
import { ProductCard } from './ProductCard'


export function ProductsSection() {
  return (
    <section id="products" className="py-24 px-6 lg:px-10 max-w-[1200px] mx-auto bg-background">
      <div className="text-center mb-16">
        <h2 className="text-[clamp(28px,4vw,48px)] font-extrabold tracking-tight mb-4 text-foreground">
          Featured Gear
        </h2>
        <p className="text-lg text-muted-foreground max-w-[500px] mx-auto">
          Handpicked essentials for every position on the pitch
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
