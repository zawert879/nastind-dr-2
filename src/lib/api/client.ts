export class ApiError extends Error {
	constructor(
		public readonly status: number,
		message: string
	) {
		super(message);
		this.name = 'ApiError';
	}
}

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const response = await fetch(`${BASE_URL}${path}`, {
		...init,
		headers: {
			'Content-Type': 'application/json',
			...init?.headers
		}
	});

	if (!response.ok) {
		throw new ApiError(response.status, `${response.status} ${response.statusText}`);
	}

	return response.json() as Promise<T>;
}

export const apiClient = {
	get<T>(path: string): Promise<T> {
		return request<T>(path);
	},

	post<T>(path: string, body: unknown): Promise<T> {
		return request<T>(path, {
			method: 'POST',
			body: JSON.stringify(body)
		});
	}
};
