//wat als je eigenlijk een axios baseURL wilt maken, maar in verschillende delen van de app verschillende urls gebruikt?
//dan kun je een soort baseURL-light maken
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
}); 
// dussss... instance is een soort kopie van axios.defaults...
// je kunt er ook een nieuwe common header op zetten die de header uit index.js overridet
instance.defaults.headers.common['Authorization'] = 'TOKEN VAN INSTANCE';

export default instance;
