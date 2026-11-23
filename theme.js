(function() {
    const STORAGE_KEY = "laos_theme";

    function isLight() {
        return document.body.classList.contains("light-mode");
    }

    function updateToggleButton() {
        const btn = document.getElementById("themeToggleBtn");
        if (!btn) return;
        btn.textContent = isLight() ? "Tema scuro" : "Tema chiaro";
    }

    function applyTheme(mode) {
        document.body.classList.toggle("light-mode", mode === "light");
        updateToggleButton();
    }

    window.getCanvasTheme = function() {
        if (isLight()) {
            return {
                gridMinor: "rgba(2, 132, 199, 0.10)",
                gridMajor: "rgba(2, 132, 199, 0.22)",
                axis: "rgba(3, 105, 161, 0.35)",
                wireframe: "rgba(2, 132, 199, 0.14)",
                infill: "rgba(2, 132, 199, 0.22)",
                layerBase: (t) => `rgba(2, 132, 199, ${0.42 + t * 0.45})`,
                activeStroke: "#0369a1",
                wallStroke: "#0f172a",
                thinStroke: "rgba(3, 105, 161, 0.65)",
                dimColor: "#0369a1",
                nozzleLine: "rgba(3, 105, 161, 0.55)",
                nozzleDot: "#0284c7",
                cursor: "#0f172a"
            };
        }

        return {
            gridMinor: "rgba(56, 189, 248, 0.05)",
            gridMajor: "rgba(56, 189, 248, 0.12)",
            axis: "rgba(56, 189, 248, 0.25)",
            wireframe: "rgba(56, 189, 248, 0.08)",
            infill: "rgba(14, 165, 233, 0.16)",
            layerBase: (t) => `rgba(14, 165, 233, ${0.28 + t * 0.45})`,
            activeStroke: "#7dd3fc",
            wallStroke: "#7dd3fc",
            thinStroke: "rgba(56, 189, 248, 0.55)",
            dimColor: "#7dd3fc",
            nozzleLine: "rgba(125, 211, 252, 0.45)",
            nozzleDot: "#ffffff",
            cursor: "#ffffff"
        };
    };

    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    applyTheme(saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

    function attachListeners() {
        updateToggleButton();
        const btn = document.getElementById("themeToggleBtn");
        if (btn && !btn.dataset.themeBound) {
            btn.dataset.themeBound = "1";
            btn.addEventListener("click", () => {
                const next = isLight() ? "dark" : "light";
                try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
                applyTheme(next);
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", attachListeners);
    } else {
        attachListeners();
    }
})();
