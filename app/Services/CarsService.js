import { ProxyState } from "../AppState.js";
import Car from "../Models/Car.js";
import { api } from "./AxiosService.js";


class CarsService {
  async getCars() {
    let res = await api.get('cars')
    console.log(res.data)
    ProxyState.cars = res.data.map(c => new Car(c))
  }

  async createCar(newCar) {
    // NOTE post creates data in the server, the first argument to extend the url the second is the data to send
    let res = await api.post('cars', newCar)
    console.log(res.data)


    // the lazy way
    // this.getCars()

    // the longhand way
    res.data.id = res.data._id
    let car = new Car(res.data)
    ProxyState.cars = [...ProxyState.cars, car]
  }
  async bid(id) {
    // step 1: find the car
    let car = ProxyState.cars.find(car => car.id === id)
    // step 2: modify it
    car.price += 100

    // step 3: send update to server
    await api.put('cars/' + id, { price: car.price })
    // await api.put('cars/' + id, car)


    // step 4: trigger the proxystate that a change was made
    ProxyState.cars = ProxyState.cars
  }
  async deleteCar(id) {
    // restful convention for a delete route is '/collectionName/:id' (the ':' indicates a variable value does not need to be added)
    await api.delete('cars/' + id)
    ProxyState.cars = ProxyState.cars.filter(car => car.id != id)
  }

}

export const carsService = new CarsService();

