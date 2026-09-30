const starfield = document.querySelector(".starfield");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (starfield && !reduceMotion) {
    const starCount = window.innerWidth <= 760 ? 10 : 18;

    for (let index = 0; index < starCount; index += 1) {
        const star = document.createElement("span");
        star.className = "falling-star";
        star.setAttribute("aria-hidden", "true");
        star.textContent = "✦";
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${7 + Math.random() * 9}s`;
        star.style.animationDelay = `${Math.random() * -16}s`;
        star.style.fontSize = `${8 + Math.random() * 10}px`;
        starfield.append(star);
    }

    document.addEventListener("click", (event) => {
        if (!(event.target instanceof Element) || !event.target.closest("a, button")) return;

        const burstCount = 6;
        for (let index = 0; index < burstCount; index += 1) {
            const angle = (Math.PI * 2 * index) / burstCount;
            const distance = 18 + Math.random() * 14;
            const spark = document.createElement("span");
            spark.className = "click-spark";
            spark.textContent = "✦";
            spark.setAttribute("aria-hidden", "true");
            spark.style.left = `${event.clientX}px`;
            spark.style.top = `${event.clientY}px`;
            spark.style.setProperty("--spark-x", `${Math.cos(angle) * distance}px`);
            spark.style.setProperty("--spark-y", `${Math.sin(angle) * distance}px`);
            document.body.append(spark);
            spark.addEventListener("animationend", () => spark.remove(), { once: true });
        }
    });

    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorStar = document.createElement("span");
        cursorStar.className = "cursor-star";
        cursorStar.textContent = "✦";
        cursorStar.setAttribute("aria-hidden", "true");
        document.body.append(cursorStar);

        let lastSparkTime = 0;
        document.addEventListener("pointermove", (event) => {
            cursorStar.style.left = `${event.clientX}px`;
            cursorStar.style.top = `${event.clientY}px`;
            cursorStar.classList.add("is-visible");

            const now = performance.now();
            if (now - lastSparkTime < 45) return;
            lastSparkTime = now;

            const spark = document.createElement("span");
            spark.className = "cursor-spark";
            spark.setAttribute("aria-hidden", "true");
            spark.style.left = `${event.clientX + (Math.random() - 0.5) * 14}px`;
            spark.style.top = `${event.clientY + (Math.random() - 0.5) * 14}px`;
            document.body.append(spark);
            spark.addEventListener("animationend", () => spark.remove(), { once: true });
        });

        document.addEventListener("pointerleave", () => {
            cursorStar.classList.remove("is-visible");
        });
    }
}
