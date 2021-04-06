import { ProxyState } from "../AppState.js";
import House from "../Models/House.js";
import { api } from "./AxiosService.js";

// NOTE Create!!
class HousesService {
    async getHouses() {
        let res = await api.get('Houses')

        // NOTE =====  console.log(res.data) ==================

        ProxyState.houses = res.data.map(c => new House(c))
    }
    // NOTE Post========
    async createHouse(newHouse) {
        // NOTE post creates data in the server, the first argument to extend the url the second is the data to send
        let res = await api.post('houses', newHouse)
        console.log(res.data)


        // the lazy way
        // this.getHouses()

        // the longhand way
        res.data.id = res.data._id
        // NOTE This is grabbing the new house data then declaring the ProxyState.houses = to the 
        //new "house" then replacing the old ProxyState with combination of old houses and the new one.
        let house = new House(res.data)
        ProxyState.houses = [...ProxyState.houses, house]
    }
    async bid(id) {
        // step 1: find the house
        let house = ProxyState.houses.find(house => house.id === id)
        // step 2: modify it
        house.price += 1000

        // step 3: send update to server (2 options to push whole properties or just one)
        await api.put('houses/' + id, { price: house.price })
        // await api.put('houses/' + id, house)


        // step 4: trigger the proxystate that a change was made
        ProxyState.houses = ProxyState.houses
    }
    async deleteHouse(id) {
        // restful convention for a delete route is '/collectionName/:id' (the ':' indicates a variable value does not need to be added)
        await api.delete('houses/' + id)
        ProxyState.houses = ProxyState.houses.filter(house => house.id != id)
    }

}

export const housesService = new HousesService();

