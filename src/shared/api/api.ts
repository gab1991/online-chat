import axios_base, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type TApiClient = AxiosInstance;
type TExecReqConfig<D> = AxiosRequestConfig<D>;

export type TApiResponse<T> = Promise<{ data: T | null; error?: string }>;
export type TApiBaseResponse<T> = Promise<AxiosResponse<T>>;

const backendUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export abstract class Api {
	private readonly client: TApiClient;

	constructor() {
		this.client = axios_base.create({
			baseURL: backendUrl,
			timeout: 4000,
			withCredentials: true,
		});
	}

	protected async executeReq<T = any, D = any>(config: TExecReqConfig<D> = {}): TApiBaseResponse<T> {
		try {
			return await this.client(config);
		} catch (err) {
			console.error('ERROR', err);
			throw err;
		}
	}
}
