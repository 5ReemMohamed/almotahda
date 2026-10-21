document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".site-header");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");
    const contactForm = document.getElementById("contactForm");
    const navLinks = document.querySelectorAll("#mainNav .nav-link");
    const navCollapse = document.getElementById("mainNav");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    function handleScroll() {
        const scrollPosition = window.scrollY;

        if (header) {
            header.classList.toggle("scrolled", scrollPosition > 30);
        }

        if (backToTop) {
            backToTop.classList.toggle("show", scrollPosition > 400);
        }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");

            if (navCollapse && navCollapse.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
            }
        });
    });

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        }, {
            rootMargin: "-25% 0px -60% 0px"
        });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const customerName = document.getElementById("customerName").value.trim();
            const customerPhone = document.getElementById("customerPhone").value.trim();
            const serviceType = document.getElementById("serviceType").value;
            const district = document.getElementById("district").value;
            const details = document.getElementById("details").value.trim();

            const message = [
                "السلام عليكم، أريد طلب خدمة من شركة المتحدة لنقل العفش والمكيفات بالرياض.",
                "",
                "الاسم: " + customerName,
                "رقم الجوال: " + customerPhone,
                "الخدمة المطلوبة: " + serviceType,
                "المنطقة: " + district,
                "تفاصيل إضافية: " + (details || "لا توجد"),
                "",
                "أرجو التواصل معي لتنسيق الخدمة."
            ].join("\n");

            const whatsappURL = "https://wa.me/966575103571?text=" + encodeURIComponent(message);

window.open(whatsappURL, "_blank", "noopener,noreferrer");
contactForm.reset();        });
    }

    const videos = document.querySelectorAll(".work-video video");

    videos.forEach(function (video) {
        video.addEventListener("play", function () {
            videos.forEach(function (otherVideo) {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                }
            });
        });
    });
        const slider = document.querySelector(".reviews-slider");
    const track = document.getElementById("reviewsTrack");
    const dotsContainer = document.getElementById("reviewsDots");
    const prevButton = document.getElementById("reviewsPrev");
    const nextButton = document.getElementById("reviewsNext");

    if (!slider || !track || !dotsContainer || !prevButton || !nextButton) {
        return;
    }

    const slides = Array.from(track.querySelectorAll(".review-slide"));

    if (!slides.length) {
        return;
    }

    let currentIndex = 0;
    let visibleSlides = 3;
    let maxIndex = 0;
    let autoplayInterval;
    let touchStartX = 0;
    let touchStartY = 0;

    function getVisibleSlides() {
        if (window.innerWidth <= 575.98) {
            return 1;
        }

        if (window.innerWidth <= 991.98) {
            return 2;
        }

        return 3;
    }

    function updateDimensions() {
        visibleSlides = getVisibleSlides();
        maxIndex = Math.max(0, slides.length - visibleSlides);
        currentIndex = Math.min(currentIndex, maxIndex);

        slides.forEach(function (slide) {
            slide.setAttribute("aria-hidden", "false");
        });

        renderDots();
        updateSlider();
    }

    function renderDots() {
        dotsContainer.innerHTML = "";

        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "reviews-dot";
            dot.setAttribute("aria-label", "عرض مجموعة التقييمات " + (i + 1));

            dot.addEventListener("click", function () {
                goToSlide(i);
                restartAutoplay();
            });

            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const slideWidth = 100 / visibleSlides;
        const offset = currentIndex * slideWidth;

        track.style.transform = "translate3d(" + offset + "%, 0, 0)";

        Array.from(dotsContainer.children).forEach(function (dot, index) {
            dot.classList.toggle("active", index === currentIndex);
            dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
        });

        prevButton.disabled = maxIndex === 0;
        nextButton.disabled = maxIndex === 0;

        prevButton.style.opacity = maxIndex === 0 ? ".5" : "1";
        nextButton.style.opacity = maxIndex === 0 ? ".5" : "1";
    }

    function goToSlide(index) {
        if (index > maxIndex) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = maxIndex;
        } else {
            currentIndex = index;
        }

        updateSlider();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function startAutoplay() {
        stopAutoplay();

        if (maxIndex > 0 && !document.hidden) {
            autoplayInterval = setInterval(nextSlide, 5000);
        }
    }

    function restartAutoplay() {
        startAutoplay();
    }

    nextButton.addEventListener("click", function () {
        nextSlide();
        restartAutoplay();
    });

    prevButton.addEventListener("click", function () {
        prevSlide();
        restartAutoplay();
    });

    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);

    slider.addEventListener("focusin", stopAutoplay);
    slider.addEventListener("focusout", function (event) {
        if (!slider.contains(event.relatedTarget)) {
            startAutoplay();
        }
    });

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    slider.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
        stopAutoplay();
    }, { passive: true });

    slider.addEventListener("touchend", function (event) {
        const touchEndX = event.changedTouches[0].screenX;
        const touchEndY = event.changedTouches[0].screenY;
        const differenceX = touchEndX - touchStartX;
        const differenceY = touchEndY - touchStartY;

        if (Math.abs(differenceX) > 45 && Math.abs(differenceX) > Math.abs(differenceY)) {
            if (differenceX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        startAutoplay();
    }, { passive: true });

    let resizeTimeout;

    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateDimensions, 120);
    });

    updateDimensions();
    startAutoplay();
});
