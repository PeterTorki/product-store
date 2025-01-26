import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	fetchProducts,
	fetchCategories,
	setCurrentPage,
	setSortBy,
	setSelectedCategory,
	selectPaginatedProducts,
	selectTotalPages,
} from '@/store/slices/productsSlice';
import ProductCard from '@/components/ProductCard';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductListing() {
	const dispatch = useAppDispatch();
	const { isLoading, error, currentPage, sortBy, selectedCategory, categories } = useAppSelector(
		(state) => state.products
	);
	const products = useAppSelector(selectPaginatedProducts);
	const totalPages = useAppSelector(selectTotalPages);

	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchCategories());
	}, [dispatch]);

	const handleSortChange = (value: 'price-asc' | 'price-desc' | 'category' | 'none') => {
		dispatch(setSortBy(value));
	};

	const handleCategoryChange = (category: string | null) => {
		dispatch(setSelectedCategory(category));
	};

	const handlePageChange = (page: number) => {
		dispatch(setCurrentPage(page));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <ErrorMessage message={error} onRetry={() => dispatch(fetchProducts())} />;
	}

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-6">Products</h1>

				<div className="flex flex-col sm:flex-row gap-4">
					{/* Sort Options */}
					<div className="flex-1">
						<label className="block text-sm font-medium mb-2">Sort By</label>
						<select
							value={sortBy}
							onChange={(e) => handleSortChange(e.target.value as any)}
							className="w-full px-4 py-2 border border-input rounded-md bg-background"
						>
							<option value="none">None</option>
							<option value="price-asc">Price: Low to High</option>
							<option value="price-desc">Price: High to Low</option>
							<option value="category">Category</option>
						</select>
					</div>

					{/* Category Filter */}
					<div className="flex-1">
						<label className="block text-sm font-medium mb-2">Category</label>
						<select
							value={selectedCategory || ''}
							onChange={(e) => handleCategoryChange(e.target.value || null)}
							className="w-full px-4 py-2 border border-input rounded-md bg-background"
						>
							<option value="">All Categories</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{products.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-muted-foreground text-lg">No products found</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex items-center justify-center gap-2">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className="p-2 border border-input rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
							>
								<ChevronLeft className="w-5 h-5" />
							</button>

							<div className="flex gap-1">
								{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
									<button
										key={page}
										onClick={() => handlePageChange(page)}
										className={`px-4 py-2 border border-input rounded-md ${currentPage === page
												? 'bg-primary text-primary-foreground'
												: 'hover:bg-accent'
											} transition-colors`}
									>
										{page}
									</button>
								))}
							</div>

							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								className="p-2 border border-input rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
							>
								<ChevronRight className="w-5 h-5" />
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
