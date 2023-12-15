window.addEventListener("DOMContentLoaded", setup);



async function setup() {
	// START HERE
	// PRODUCTS CAN BE FETCHED USING: GET /products
	const res = await fetch('http://localhost:3000/products')
	const products = await res.json()


	products.forEach(ele => {
		let outerDiv = document.createElement('div')
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
		outerDiv.appendChild(title)
		outerDiv.appendChild(price)

		document.getElementById('products').appendChild(outerDiv)
	});
}


setup()
