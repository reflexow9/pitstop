document.addEventListener("DOMContentLoaded", () => {
	const header = document.getElementById("header");
	function updateHeader() {
		if (window.scrollY > 10) {
			header.classList.add("header--scrolled");
		} else {
			header.classList.remove("header--scrolled");
		}
	}
	updateHeader();
	window.addEventListener("scroll", updateHeader);

	const menuBtn = document.getElementById("menu-btn");
	const mobileMenu = document.getElementById("mobile-menu");
	const iconBurger = document.getElementById("icon-burger");
	const iconClose = document.getElementById("icon-close");

	function closeMobileMenu() {
		mobileMenu.classList.remove("open");
		iconBurger.classList.remove("hidden");
		iconClose.classList.add("hidden");
	}

	menuBtn.addEventListener("click", () => {
		const willOpen = !mobileMenu.classList.contains("open");
		mobileMenu.classList.toggle("open", willOpen);
		iconBurger.classList.toggle("hidden", willOpen);
		iconClose.classList.toggle("hidden", !willOpen);
	});

	document.querySelectorAll(".mobile-link").forEach((link) => {
		link.addEventListener("click", closeMobileMenu);
	});

	document.querySelectorAll("[data-scroll-to-form]").forEach((el) => {
		el.addEventListener("click", () => {
			document
				.getElementById("lead-form")
				.scrollIntoView({ behavior: "smooth", block: "center" });
			closeMobileMenu();
		});
	});

	const revealEls = document.querySelectorAll(".reveal");
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("in");
					io.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12 },
	);
	revealEls.forEach((el) => io.observe(el));

	const basePrices = {
		13: 800,
		14: 850,
		15: 900,
		16: 1000,
		17: 1100,
		18: 1250,
		19: 1400,
		20: 1600,
		21: 1800,
		22: 2000,
	};

	const radiusGroup = document.getElementById("radius-group");
	let selectedRadius = 13;

	Object.keys(basePrices).forEach((r, idx) => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.dataset.radius = r;
		btn.className = "radius-btn" + (idx === 0 ? " active" : "");
		btn.textContent = "R" + r;
		btn.addEventListener("click", () => {
			document
				.querySelectorAll(".radius-btn")
				.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");
			selectedRadius = parseInt(r, 10);
			updatePrice();
		});
		radiusGroup.appendChild(btn);
	});

	const priceOutput = document.getElementById("price-output");
	const carTypeInputs = document.querySelectorAll('input[name="car-type"]');

	function updatePrice() {
		const checked = document.querySelector('input[name="car-type"]:checked');
		const multiplier = parseFloat(checked.value);
		const price =
			Math.round((basePrices[selectedRadius] * multiplier) / 10) * 10;
		priceOutput.textContent = price.toLocaleString("uk-UA");
	}

	carTypeInputs.forEach((input) =>
		input.addEventListener("change", updatePrice),
	);
	updatePrice();

	document.querySelectorAll(".faq-toggle").forEach((btn) => {
		btn.addEventListener("click", () => {
			const body = btn.nextElementSibling;
			const icon = btn.querySelector(".faq-icon");
			const isOpen = body.style.maxHeight && body.style.maxHeight !== "0px";

			document.querySelectorAll(".faq-body").forEach((b) => {
				b.style.maxHeight = "0px";
			});
			document
				.querySelectorAll(".faq-icon")
				.forEach((i) => i.classList.remove("rotate"));

			if (!isOpen) {
				body.style.maxHeight = body.scrollHeight + "px";
				icon.classList.add("rotate");
			}
		});
	});

	const bookingForm = document.getElementById("booking-form");
	const submitBtn = document.getElementById("submit-btn");
	const formSuccess = document.getElementById("form-success");

	bookingForm.addEventListener("submit", (e) => {
		e.preventDefault();
		submitBtn.textContent = "Надсилаємо...";
		submitBtn.disabled = true;

		setTimeout(() => {
			formSuccess.classList.remove("hidden");
			submitBtn.textContent = "Заявку надіслано";
			bookingForm.querySelectorAll("input").forEach((i) => {
				i.value = "";
			});
		}, 600);
	});

	document.getElementById("year").textContent = new Date().getFullYear();
});
