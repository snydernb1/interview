window.addEventListener("DOMContentLoaded", setup());

// Function to handle displaying products
function displayProducts(products) {

	// Conditional to check if products are already displayed, if so, removes existing products
	if (document.getElementById('products')) {
		document.getElementById('products').remove()
	}

	// Sort function to sort arr by price
	products.sort((a,b) => {
		return a.price - b.price
	})

	// Creates outer products div
	let productDiv = document.createElement('div')
	productDiv.setAttribute('id', 'products')

	// Iterates over products and creates elements to generate product tile
	products.forEach(ele => {
		// Creating elements for product tile
		let outerDiv = document.createElement('div')
		outerDiv.setAttribute('class', 'productDiv')
		let textDiv = document.createElement('div')
		textDiv.setAttribute('class', 'textDiv')
		let photo = document.createElement('img')
		let title = document.createElement('h4')
		let price = document.createElement('p')

		// Keying into the product obj to grab the image, then setting attributes
		photo.src = ele.images[0].src
		photo.setAttribute('class', 'imgs')

		// Keying into the product obj to grab the title, then setting attributes
		title.textContent = `${ele.title}`
		title.setAttribute('class', 'title')

		// Keying into the product obj to grab the price, then setting attributes
		price.textContent = `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(ele.price/100)}`
		price.setAttribute('class', 'price')

		// Building the product tile
		outerDiv.appendChild(photo)
		textDiv.appendChild(title)
		textDiv.appendChild(price)
		outerDiv.appendChild(textDiv)

		productDiv.appendChild(outerDiv)
	});

	// Grabbing the main element from the document and appending the products
	document.getElementById('main').appendChild(productDiv)
}

// Function to handle fetching products and listening for events
async function setup() {
	// START HERE
	// PRODUCTS CAN BE FETCHED USING: GET /products

	// Products are fetched and converted from JSON
	const res = await fetch('http://localhost:3000/products')
	const products = await res.json()

	// Function call to handle rendering products
	displayProducts(products)

	// Event listener to handle search bar functionality
	const input = document.querySelector('input')
	input.addEventListener('input', searchListings)

	// Function to handle search products capability
	function searchListings(e) {

			const searchedProducts = []
			let searchText = e.target.value.toLowerCase()

			products.forEach(ele => {
				if (ele.title.toLowerCase().includes(searchText)) {
					searchedProducts.push(ele)
				}
			})

			displayProducts(searchedProducts)
			return null

	}

	// Event listener to add return home button after search
	const homeButton = document.getElementById('homeButton')
	homeButton.addEventListener('click', returnHome)

	// Function to handle returning home and displaying all products
	function returnHome (e) {
		input.value = ''
		displayProducts(products)
		return null
	}

	return null

}
