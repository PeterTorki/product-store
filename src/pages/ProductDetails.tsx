import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { productsAPI } from '@/services/api';
import type { Product } from '@/types';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetails() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	const [product, setProduct] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProduct = async () => {
			if (!id) return;

			setIsLoading(true);
			setError(null);

			try {
				const data = await productsAPI.getById(Number(id));
				setProduct(data);
			} catch (err) {
				setError('Failed to load product details');
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	const handleAddToCart = () => {
		if (!isAuthenticated) {
			toast.error('Please login to add items to cart');
			navigate('/login');
			return;
		}
		if (product) {
			dispatch(addToCart(product));
			toast.success('Product added to cart!');
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error || !product) {
		return (
			<ErrorMessage
				message={error || 'Product not found'}
				onRetry={() => navigate('/')}
			/>
		);
	}

	return (
		<div className="max-w-4xl mx-auto">
			<Link
				to="/"
				className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
			>
				<ArrowLeft className="w-4 h-4" />
				Back to Products
			</Link>

			<div className="bg-card border border-border rounded-lg overflow-hidden">
				<div className="grid md:grid-cols-2 gap-8 p-6">
					<div className="bg-muted rounded-lg p-8 flex items-center justify-center">
						<img
							src={product.image}
							alt={product.title}
							className="max-w-full max-h-[500px] object-contain"
						/>
					</div>

					<div className="flex flex-col">
						<div className="mb-4">
							<span className="text-sm text-muted-foreground uppercase tracking-wide">
								{product.category}
							</span>
						</div>

						<h1 className="text-3xl font-bold mb-4">{product.title}</h1>

						<div className="mb-6">
							<span className="text-4xl font-bold text-primary">
								${product.price.toFixed(2)}
							</span>
						</div>

						<p className="text-muted-foreground mb-8 leading-relaxed">
							{product.description}
						</p>

						{isAuthenticated && (
							<button
								onClick={handleAddToCart}
								className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
							>
								<ShoppingCart className="w-5 h-5" />
								Add to Cart
							</button>
						)}

						{!isAuthenticated && (
							<Link
								to="/login"
								className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
							>
								Login to Add to Cart
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
