import {RequestProviderInterface} from "./Interfaces/requestProviderInterface";
import axios from 'axios'

export class AxiosProvider implements RequestProviderInterface {
    async get(url: string) {
        const result = await axios.get(url)
        return result.data;
    }
}
