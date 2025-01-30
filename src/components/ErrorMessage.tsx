import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
	message: string;
	onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
			<AlertCircle className="w-12 h-12 text-destructive" />
			<p className="text-destructive text-lg font-medium">{message}</p>
			{onRetry && (
				<button
					onClick={onRetry}
					className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
				>
					Retry
				</button>
			)}
		</div>
	);
}
