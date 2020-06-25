import {RequestProviderInterface} from "./Interfaces/requestProviderInterface";
import axios from 'axios'
import {StringIndexedByString} from "../../Types/type";

export class AxiosProvider implements RequestProviderInterface {
    async get(url: string, queryString: StringIndexedByString = {}) {
        const result = await axios.get(url + `?${this.serializeToQueryString(queryString)}`)
        return result.data;
    }

    serializeToQueryString(queryString: StringIndexedByString) {
        const result: string[] = []

        for (const key of Object.keys(queryString)) {
            result.push(`${encodeURIComponent(key)}=${encodeURIComponent(queryString[key])}`)
        }

        return result.join('&')
    }
}
