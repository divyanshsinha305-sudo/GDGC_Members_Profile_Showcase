const API_BASE_URL = "http://127.0.0.1:5000";
function debounce(fn, delay = 350) {
            let t;
            return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
        }
        const splash = document.getElementById("splash");
        const app = document.getElementById("app");
        const grid = document.getElementById("grid");
        const status = document.getElementById("status");
        const searchEl = document.getElementById("search");
        const roleFilter = document.getElementById("roleFilter");
        const skillsFilter = document.getElementById("skillsFilter");
        const themeToggle = document.getElementById("themeToggle");
function applyTheme(dark) {
            document.documentElement.classList.toggle("dark", dark);
            localStorage.setItem("gdgc-theme", dark ? "dark" : "light");
        }
themeToggle.addEventListener("click", () => {
            const dark = !document.documentElement.classList.contains("dark");
            applyTheme(dark);
        });
        applyTheme(localStorage.getItem("gdgc-theme") === "dark" || window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
setTimeout(() => {
            splash.classList.add("hide");
            app.classList.remove("hidden");
            loadMembers();
        }, 1600);
        let lastMembers = [];
async function loadMembers() {
            showStatus("Loading...");
            try {
                const params = new URLSearchParams();
                const q = searchEl.value.trim();
                if (q) params.set("q", q);
                if (roleFilter.value) params.set("role", roleFilter.value);
                if (skillsFilter.value) params.set("skills", skillsFilter.value);
                const res = await fetch(API_BASE_URL + "/members?" + params.toString());
                if (!res.ok) throw new Error("Failed to load");
                const json = await res.json();
                lastMembers = json.data || json;
                renderMembers(lastMembers);
                populateRoleOptions(lastMembers);
                showStatus("");
            } catch (err) {
                showStatus("Error loading members. " + err.message, true);
            }
        }
function showStatus(text, isError = false) {
            status.textContent = text;
            status.style.color = isError ? "crimson" : "";
        }
function renderMembers(list) {
            grid.innerHTML = "";
            if (!list.length) {
                grid.innerHTML = "<p class='empty'>No members found.</p>";
                return;
            }
            for (const m of list) {
                const card = document.createElement("div");
                card.className = "card glass";
                card.innerHTML = `
        <img src="${m.avatar || 'https://i.pravatar.cc/100'}" loading="lazy" alt="${m.name}" />
        <div class="meta">
        <h3>${m.name}</h3>
        <p class="role">${m.role}</p>
        <p class="bio">${m.bio}</p>
        <div class="skills">${(m.skills || []).map(s => `<span>${s}</span>`).join("")}</div>
        </div>`;
                grid.appendChild(card);
            }
        }
function populateRoleOptions(list) {
            const roles = Array.from(new Set(list.map(m => m.role))).filter(Boolean);
            roleFilter.innerHTML = '<option value="">All roles</option>' + roles.map(r => `<option value="${r}">${r}</option>`).join("");
        }
    searchEl.addEventListener("input", debounce(loadMembers, 400));
    roleFilter.addEventListener("change", loadMembers);
    skillsFilter.addEventListener("input", debounce(loadMembers, 400));
