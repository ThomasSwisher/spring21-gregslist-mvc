import { ProxyState } from "../AppState.js";
import { carsService } from "../Services/CarsService.js";


//Private
function _draw() {
  let cars = ProxyState.cars
  let template = ''
  cars.forEach(car => {
    template += car.Template
  })
  document.getElementById('cars').innerHTML = template
}

//Public
export default class CarsController {
  constructor() {
    ProxyState.on('cars', _draw);

    // REVIEW
    // GET CARS ON LOAD
    this.getCars()
  }

  async getCars() {
    try {
      await carsService.getCars()
    } catch (error) {
      console.error(error)
    }
  }

  async createCar() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let newCar = {
        // @ts-ignore
        make: form.make.value,
        // @ts-ignore
        model: form.model.value,
        // @ts-ignore
        year: form.year.value,
        // @ts-ignore  this converts the string to a number
        price: Number(form.price.value),
        // @ts-ignore
        description: form.description.value,
        // @ts-ignore
        imgUrl: form.imgUrl.value
      }
      await carsService.createCar(newCar)

      // @ts-ignore
      form.reset()

      $('#new-car-form').modal('hide')
    } catch (error) {
      console.error(error)
    }
  }

  deleteCar(id) {
    try {
      carsService.deleteCar(id)
    } catch (error) {
      console.error(error)
    }
  }

  bid(id) {
    carsService.bid(id)
  }

}
