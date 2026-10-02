// set to 0.25 if you want to offer a discount of 25%
// this doesn't impact minPrice which is the minimum!
// e.g. calculated price is minPrice + 1EUR -> 1EUR will be discounted
// NOTE when setting this value you may want to adjust the UI! (the discount label)
// only for yearly subscriptions
const discount = 0;

// discount when paid yearly is 10%
const discountYearly = 0.1;

const priceUv = 2;
const priceZeit = 2;
const minQuantity = 5;

const currencyFormatter = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR",
});

document.addEventListener("DOMContentLoaded", function () {
	const checkbox = document.querySelector("[name=on-premise]");
	const priceCloudButton = document.querySelector("#price-button-cloud");
	const pricePremiseButton = document.querySelector("#price-button-on-premise");
	const subscriptionMonth = document.querySelector("#subscription-month");
	const zeiterfassung = document.querySelector("#service-zeiterfassung");
	const quantityInput = document.querySelector("#subscription-quantity");
	const increase = document.querySelector("#subscription-quantity-increase");
	const decrease = document.querySelector("#subscription-quantity-decrease");

	const priceElement = document.querySelector("#subscription-price");

	// disable focusable -> buttons are used
	checkbox.setAttribute("tabindex", "-1");

	priceCloudButton.addEventListener("click", function () {
		document.querySelector("[name=on-premise]").checked = false;
	});

	pricePremiseButton.addEventListener("click", function () {
		document.querySelector("[name=on-premise]").checked = true;
	});

	increase.addEventListener("click", function () {
		setQuantity(Number(quantityInput.value) + 1);
		updatePrice();
	});

	decrease.addEventListener("click", function () {
		setQuantity(Math.max(5, Number(quantityInput.value) - 1));
		updatePrice();
	});

	quantityInput.addEventListener("input", function () {
		updatePrice();
	});

	document.addEventListener("change", updatePrice);

	function setQuantity(value) {
		const normalized = Math.max(minQuantity, Number(value) || minQuantity);

		quantityInput.value = normalized;

		quantityInput.dispatchEvent(new Event("input", { bubbles: true }));
	}

	function updatePrice() {
		const quantity = Math.max(0, Number(quantityInput.value));

		const uvPrice = quantity * priceUv;
		const zeitPrice = zeiterfassung.checked ? quantity * priceZeit : 0;

		const grossPrice = uvPrice + zeitPrice;

		let discountFactor = 0;
		if (!subscriptionMonth.checked) {
			discountFactor = discount > 0 ? discount : discountYearly;
		}

		const minPrice =
			minQuantity * priceUv +
			(zeiterfassung.checked ? minQuantity * priceZeit : 0);
		const discountPrice = grossPrice * (1 - discountFactor);
		const finalPrice = Math.max(minPrice, discountPrice);
		priceElement.innerText = currencyFormatter.format(finalPrice);
	}
});
