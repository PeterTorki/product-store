import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createProduct, fetchProducts, fetchCategories } from '@/store/slices/productsSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Loading from '@/components/Loading';

const productSchema = z.object({
	title: z.string().min(1, 'Title is required').min(3, 'Title must be at least 3 characters'),
	description: z.string().min(1, 'Description is required').min(10, 'Description must be at least 10 characters'),
	price: z.number().positive('Price must be a positive number'),
	category: z.string().min(1, 'Category is required'),
	image: z.string().url('Must be a valid URL'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function CreateProduct() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { categories, isLoading: categoriesLoading } = useAppSelector((state) => state.products);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: '',
			description: '',
			price: 0,
			category: '',
			image: '',
		},
	});

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const onSubmit = async (data: ProductFormData) => {
		setIsSubmitting(true);
		try {
			await dispatch(createProduct(data)).unwrap();
			toast.success('Product created successfully!');
			reset();
			dispatch(fetchProducts()); // Refresh products list
			navigate('/');
		} catch (error) {
			toast.error('Failed to create product. Please try again.');
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (categoriesLoading) {
		return <Loading />;
	}

	return (
		<div className="max-w-2xl mx-auto">
			<h1 className="text-3xl font-bold mb-8">Create New Product</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div>
					<label htmlFor="title" className="block text-sm font-medium mb-2">
						Title *
					</label>
					<input
						id="title"
						type="text"
						{...register('title')}
						className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
					/>
					{errors.title && (
						<p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
					)}
				</div>

				<div>
					<label htmlFor="description" className="block text-sm font-medium mb-2">
						Description *
					</label>
					<textarea
						id="description"
						{...register('description')}
						rows={5}
						className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
					/>
					{errors.description && (
						<p className="mt-1 text-sm text-destructive">{errors.description.message}</p>
					)}
				</div>

				<div>
					<label htmlFor="price" className="block text-sm font-medium mb-2">
						Price *
					</label>
					<input
						id="price"
						type="number"
						step="0.01"
						{...register('price', { valueAsNumber: true })}
						className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
					/>
					{errors.price && (
						<p className="mt-1 text-sm text-destructive">{errors.price.message}</p>
					)}
				</div>

				<div>
					<label htmlFor="category" className="block text-sm font-medium mb-2">
						Category *
					</label>
					<select
						id="category"
						{...register('category')}
						className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
					>
						<option value="">Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</option>
						))}
					</select>
					{errors.category && (
						<p className="mt-1 text-sm text-destructive">{errors.category.message}</p>
					)}
				</div>

				<div>
					<label htmlFor="image" className="block text-sm font-medium mb-2">
						Image URL *
					</label>
					<input
						id="image"
						type="url"
						{...register('image')}
						placeholder="https://example.com/image.jpg"
						className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
					/>
					{errors.image && (
						<p className="mt-1 text-sm text-destructive">{errors.image.message}</p>
					)}
				</div>

				<div className="flex gap-4">
					<button
						type="submit"
						disabled={isSubmitting}
						className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? 'Creating...' : 'Create Product'}
					</button>
					<button
						type="button"
						onClick={() => navigate('/')}
						className="px-6 py-3 border border-input rounded-md hover:bg-accent transition-colors"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
