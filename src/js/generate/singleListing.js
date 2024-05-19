export function generateSingleListing(listing) {
  const container = document.getElementById("singleListingContainer");

  container.innerHTML = `<div class="container text-center">
  <div class="row justify-content-start">
    <a href="javascript:history. back()" class="col-3">
      <i class="bi bi-arrow-left"></i>
    </a>
    <div class="col-6">
      <h1 class="mx-auto" id="itemName">${listing.title}</h1>
    </div>
  </div>
</div>
<div class="col-10 container">
  <img
    class="img-fluid rounded"
    src="../../assets/images/item1.jpg"
    id="itemImg"
  />
  <p id="itemDescription">
    The description of the item. Hopefully there are some stuff here.
  </p>
  <p id="auctionEnds">Ends in 12 hours, 25 minutes and 10 seconds</p>
</div>
<div class="col-10 container">
  <div class="d-flex gap-2" id="tags">
    <p class="bg-primary p-2 rounded-pill text-light inter">Clothing</p>
    <p class="bg-primary p-2 rounded-pill text-light inter">Used</p>
  </div>
  <div class="d-flex gap-1" id="currentBid">
    <p>Current bid:</p>
    <i class="bi bi-coin"> 100</i>
  </div>
</div>
<div class="col-10 container hidden show-when-logged-in">
  <p>
    <button
      class="btn border-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      View bid history
      <i class="bi bi-caret-down"></i>
    </button>
  </p>
  <div class="collapse mb-3" id="collapseExample">
    <div class="card card-body gap-1">
      <i class="bi bi-coin"> 10</i>
      <i class="bi bi-coin"> 20</i>
      <i class="bi bi-coin"> 30</i>
      <i class="bi bi-coin"> 40</i>
    </div>
  </div>
</div>
<div class="hidden show-when-logged-in">
  <div class="col-10 container d-flex gap-1">
    <div class="col-6">
      <input class="form-control" />
    </div>
    <div class="col-4">
      <button class="btn btn-primary">Place Bid</button>
    </div>
  </div>
</div>
<div class="col-10 container hide-when-logged-in mt-2">
  <a href="./login.html"
    ><button class="btn btn-warning">Sign in to place bid</button></a
  >
</div>`;
  return container;
}
