export default class House {
    // NOTE with apis have to use objecdt deconstruction with constructor ({name, price, etc})
    constructor({ price, bedrooms, bathrooms, levels, year, description, imgUrl, id }) {
        // NOTE it is no longer our job to generate Id's
        this.price = price
        this.bedrooms = bedrooms
        this.bathrooms = bathrooms
        this.levels = levels
        this.year = year
        this.description = description
        this.imgUrl = imgUrl
        this.id = id

    }

    get Template() {
        return /*html*/`
    <div class="col-md-4 mb-3">
      <div class="card shadow">
          <img class="card-img-top" src="${this.imgUrl}" alt="Image Of House">
          <div class="card-body">
              <h4 class="card-title">${this.bedrooms} | ${this.bathrooms} | ${this.year} | ${this.levels}</h4>
              <p class="card-text">${this.description} - $${this.price.toFixed(2)}</p>
          </div>
          <div class="px-3 pb-3 d-flex justify-content-between">
              <button type="button" class="btn btn-danger" onclick="app.housesController.deleteHouse('${this.id}')">Delete</button>
    <!-- NOTE you can also use conditional (ternary) operator inline using -->
              <button type="button" class="btn ${this.price > 200000 ? 'btn-info' : 'btn-success'}" onclick="app.housesController.bid('${this.id}')">Bid</button>
          </div>
      </div>
    </div>
    `
    }
}