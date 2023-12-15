window.addEventListener("DOMContentLoaded", setup);


function displayProducts(products) {

	if (document.getElementById('products')) {
		document.getElementById('products').remove()
	}

	products.sort((a,b) => {
		return a.price - b.price
	})

	let productDiv = document.createElement('div')
	productDiv.setAttribute('id', 'products')

	products.forEach(ele => {
		let outerDiv = document.createElement('div')
		outerDiv.setAttribute('class', 'productDiv')
		let textDiv = document.createElement('div')
		textDiv.setAttribute('class', 'textDiv')
		let photo = document.createElement('img')
		let title = document.createElement('h4')
		let price = document.createElement('p')

		photo.src = ele.images[0].src
		photo.setAttribute('class', 'imgs')

		title.textContent = `${ele.title}`
		title.setAttribute('class', 'title')

		price.textContent = `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(ele.price/100)}`
		price.setAttribute('class', 'price')

		outerDiv.appendChild(photo)
		textDiv.appendChild(title)
		textDiv.appendChild(price)
		outerDiv.appendChild(textDiv)

		productDiv.appendChild(outerDiv)
	});

	document.getElementById('main').appendChild(productDiv)
}


async function setup() {
	// START HERE
	// PRODUCTS CAN BE FETCHED USING: GET /products
	const res = await fetch('http://localhost:3000/products')
	const products = await res.json()
	console.log('this is products', products)

	displayProducts(products)



	const input = document.querySelector('input')
	input.addEventListener('input', searchListings)

	function searchListings(e) {

			const searchedProducts = []
			let searchText = e.target.value.toLowerCase()

			products.forEach(ele => {
				if (ele.title.toLowerCase().includes(searchText)) {
					searchedProducts.push(ele)
				}
			})

			displayProducts(searchedProducts)


	}

	const homeButton = document.getElementById('homeButton')
	homeButton.addEventListener('click', returnHome)

	function returnHome (e) {
		document.querySelector('input').value = ''
		displayProducts(products)

	}

	return true

}


setup()
