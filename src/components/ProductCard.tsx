import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import type { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!isAuthenticated) {
			toast.error('Please login to add items to cart');
			return;
		}
		dispatch(addToCart(product));
		toast.success('Product added to cart!');
	};

	return (
		<div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
			<Link to={`/products/${product.id}`}>
				<div className="aspect-square bg-muted overflow-hidden">
					<img
						src={product.image}
						alt={product.title}
						className="w-full h-full object-contain p-4"
					/>
				</div>
			</Link>

			<div className="p-4">
				<div className="mb-2">
					<span className="text-xs text-muted-foreground uppercase tracking-wide">
						{product.category}
					</span>
				</div>

				<Link to={`/products/${product.id}`}>
					<h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
						{product.title}
					</h3>
				</Link>

				<div className="flex items-center justify-between mt-4">
					<span className="text-2xl font-bold text-primary">
						${product.price.toFixed(2)}
					</span>

					<div className="flex gap-2">
						<Link
							to={`/products/${product.id}`}
							className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
						>
							View Details
						</Link>
						{isAuthenticated && (
							<button
								onClick={handleAddToCart}
								className="p-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
								title="Add to cart"
							>
								<ShoppingCart className="w-4 h-4" />
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
