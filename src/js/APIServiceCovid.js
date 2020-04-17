import axios from 'axios';

const API_URL = 'https://covid19.mathdro.id/api';
const NINJA_URL = 'https://corona.lmao.ninja/v2';

export class APIServiceCovid {

    constructor() {

    }
    fetchCountryList() {
        const url = `${API_URL}/countries/`;
        let data = axios.get(url).then(response => response.data);
        return data;
    }

    fetchToday(countryCode) { // For today no of cases
        let url;
        if (countryCode !== 'all') {
            url = `${NINJA_URL}/countries/`+countryCode;
        } else {
            url = `${NINJA_URL}/all`;
        }
        let data = axios.get(url).then(response => response.data);
        return data;
    }

    fetchHistory(country) { // for a detailed no of cases for a country over time
        let url = `${NINJA_URL}/historical/` +country;
        let data = axios.get(url).then(response => response.data);
        return data;
    }

    fetchTodayCumul() { // for a cumul of all no of cases for all countries
        const url = `${NINJA_URL}/all`;
        let data = axios.get(url).then(response => response.data);
        return data;
    }

}