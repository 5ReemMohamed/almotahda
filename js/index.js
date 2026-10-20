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
});
