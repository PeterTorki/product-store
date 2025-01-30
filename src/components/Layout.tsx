import { Outlet, Link } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { ShoppingCart, User, LogOut } from 'lucide-react';

export default function Layout() {
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const { items } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div className="min-h-screen bg-background">
			<header className="border-b border-border bg-card">
				<div className="container mx-auto px-4 py-4">
					<nav className="flex items-center justify-between">
						<Link to="/" className="text-2xl font-bold text-primary">
							Bosta Store
						</Link>

						<div className="flex items-center gap-6">
							<Link
								to="/"
								className="text-foreground hover:text-primary transition-colors"
							>
								Products
							</Link>

							{isAuthenticated && (
								<>
									<Link
										to="/create-product"
										className="text-foreground hover:text-primary transition-colors"
									>
										Create Product
									</Link>
									<Link
										to="/cart"
										className="relative text-foreground hover:text-primary transition-colors"
									>
										<ShoppingCart className="w-5 h-5" />
										{cartItemCount > 0 && (
											<span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
												{cartItemCount}
											</span>
										)}
									</Link>
								</>
							)}

							{isAuthenticated ? (
								<div className="flex items-center gap-3">
									<div className="flex items-center gap-2">
										<User className="w-4 h-4" />
										<span className="text-sm">{user?.name?.firstname || user?.username}</span>
									</div>
									<button
										onClick={handleLogout}
										className="flex items-center gap-2 px-3 py-1.5 text-sm bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
									>
										<LogOut className="w-4 h-4" />
										Logout
									</button>
								</div>
							) : (
								<Link
									to="/login"
									className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
								>
									Login
								</Link>
							)}
						</div>
					</nav>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<Outlet />
			</main>
		</div>
	);
}
