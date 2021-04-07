import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/housesService.js";

//REVIEW ===========================================
//Private _inderscoreMakesItSo
function _draw() {
    let houses = ProxyState.houses
    let template = ''
    houses.forEach(house => {
        template += house.Template
    })
    document.getElementById('houses').innerHTML = template
}
// =====================================================

//Public
export default class HousesController {
    constructor() {
        ProxyState.on('houses', _draw);

        // REVIEW this all needs to be spun up to console.log() api info ====================
        // NOTE this loads (houses, cars, pokemon, whatever at) on start.
        this.getHouses()
    }

    async getHouses() {
        // NOTE ============= ALWAYS WRAP async/await calls with try/catch/error trackers.
        try {
            await housesService.getHouses()
        } catch (error) {
            console.error(error)
        }
    }
    // NOTE the try/catch/error setup ==========================
    async createHouse() {
        try {
            // NOTE prevent window from opening on form submission.
            window.event.preventDefault()
            const form = window.event.target
            let newHouse = {
                // @ts-ignore  "Number" this converts the string to a number
                price: Number(form.price.value),
                // @ts-ignore
                bedrooms: form.bedrooms.value,
                // @ts-ignore
                bathrooms: form.bathrooms.value,
                // @ts-ignore
                levels: form.levels.value,
                // @ts-ignore
                year: form.year.value,
                // @ts-ignore
                description: form.description.value,
                // @ts-ignore
                imgUrl: form.imgUrl.value,
                // @ts-ignore
                id: form.id.value
            }
            await housesService.createHouse(newHouse)

            // @ts-ignore resets form
            form.reset()
            // REVIEW ====================== need to setup the model =============
            $('#new-house-form').modal('hide')
        } catch (error) {
            console.error(error)
        }
    }
    // NOTE try/catch/error ======================
    deleteHouse(id) {
        try {
            housesService.deleteHouse(id)
        } catch (error) {
            console.error(error)
        }
    }

    bid(id) {
        housesService.bid(id)
    }

}
