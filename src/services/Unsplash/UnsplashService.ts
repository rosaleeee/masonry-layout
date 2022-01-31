import axios, { AxiosInstance } from 'axios';
import { ResponseGetImage } from './models';

class UnsplashService {
  private instance: AxiosInstance;
  private baseUrl = 'https://api.unsplash.com/';
  private UNSPLASH_ACESS_KEY = 'Rgugspn1tJksSX5QH7haUaq0VjZwQMIZgfh70rlvtsc';

  constructor() {
    this.instance = axios.create({
      baseURL: this.baseUrl,
      params: {
        client_id: this.UNSPLASH_ACESS_KEY,
      },
    });
  }

  public async getImages(page: number = 0): Promise<ResponseGetImage[]> {
    try {
      const { data } = await this.instance.get('/photos', {
        params: {
          page,
        },
      });

      const response: ResponseGetImage[] = data.map((v: any) => {
        return {
          id: v.id,
          description: v.description,
          imageUrl: v.urls.small,
        };
      });

      return response;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}

export default UnsplashService;
