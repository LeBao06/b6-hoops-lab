// 1. TÊN HIỂN THỊ
const focusNames = {
    shooting: "Shooting",
    handles: "Ball Handling",
    finishing: "Finishing",
    defense: "Defense & IQ",
    strength: "Strength",
    power: "Power",
    speed: "Speed & Agility",
    conditioning: "Conditioning",
    recovery: "Recovery"
};

// 2. DỮ LIỆU BÀI TẬP 
const exercises = [
    {
        name: "Form shooting",
        focus: "shooting", level: "beginner", equipment: "ball",
        sets: "3 x 10",
        cues: "Elbow under the ball, relaxed wrist, hold the follow-through.",
        easier: "Shoot one-handed from one meter away.",
        harder: "Step back one meter after every five makes."
    },
    {
        name: "Five-spot shooting",
        focus: "shooting", level: "intermediate", equipment: "ball",
        sets: "5 spots x 5 shots",
        cues: "Use the same routine on every shot: feet, aim, release.",
        easier: "Use only three spots close to the rim.",
        harder: "Catch off a pass and shoot within one second."
    },
    {
        name: "Stationary dribble series",
        focus: "handles", level: "beginner", equipment: "ball",
        sets: "3 x 30 s",
        cues: "Eyes up, fingertips, stay low.",
        easier: "Slow the tempo and focus on control.",
        harder: "Close your eyes for the last 10 seconds."
    },
    {
        name: "Two-ball dribbling",
        focus: "handles", level: "advanced", equipment: "ball",
        sets: "3 x 30 s",
        cues: "Keep both bounces at the same height and rhythm.",
        easier: "Alternate bounces instead of dribbling together.",
        harder: "Walk forward while dribbling."
    },
    {
        name: "Weak-hand layups",
        focus: "finishing", level: "beginner", equipment: "ball",
        sets: "3 x 8",
        cues: "Drive the opposite knee up, use the backboard.",
        easier: "Start one step from the rim.",
        harder: "Start from the wing at game speed."
    },
    {
        name: "Euro-step finishes",
        focus: "finishing", level: "intermediate", equipment: "ball",
        sets: "3 x 6 each side",
        cues: "Wide first step, quick second step, protect the ball.",
        easier: "Practice the footwork without a ball first.",
        harder: "Add a defender holding a pad."
    },
    {
        name: "Defensive slides",
        focus: "defense", level: "beginner", equipment: "none",
        sets: "4 x 15 s",
        cues: "Low hips, chest up, never cross your feet.",
        easier: "Slide over a shorter distance.",
        harder: "Change direction on a partner's signal."
    },
    {
        name: "Closeout and slide",
        focus: "defense", level: "intermediate", equipment: "none",
        sets: "4 x 6",
        cues: "Short choppy steps at the end of the closeout, hand up.",
        easier: "Do it at half speed.",
        harder: "Add a live attacker who can drive."
    },
    {
        name: "Goblet squat",
        focus: "strength", level: "beginner", equipment: "gym",
        sets: "3 x 8-10",
        cues: "Chest up, knees track over toes.",
        easier: "Squat to a box or chair.",
        harder: "Add a two-second pause at the bottom."
    },
    {
        name: "Box jump",
        focus: "power", level: "intermediate", equipment: "gym",
        sets: "3 x 5",
        cues: "Jump fast, land softly, step down instead of jumping down.",
        easier: "Use a lower box.",
        harder: "Increase the box height gradually."
    },
    {
        name: "Acceleration sprints",
        focus: "speed", level: "beginner", equipment: "none",
        sets: "6 x 10 m",
        cues: "Lean forward, push the ground back, full rest between reps.",
        easier: "Start from a standing position.",
        harder: "Start from a push-up position."
    },
    {
        name: "Baseline-to-baseline intervals",
        focus: "conditioning", level: "intermediate", equipment: "none",
        sets: "6 x 30 s",
        cues: "Run hard, rest 60 seconds, keep the same pace every rep.",
        easier: "Rest 90 seconds.",
        harder: "Dribble a ball the whole time."
    },
    {
        name: "Hip and ankle mobility flow",
        focus: "recovery", level: "beginner", equipment: "none",
        sets: "2 x 8 each side",
        cues: "Move slowly through a range you can control.",
        easier: "Hold a wall for balance.",
        harder: "Add a light resistance band."
    },
    {
        name: "Single-leg hop and stick",
        focus: "recovery", level: "intermediate", equipment: "none",
        sets: "3 x 5 each leg",
        cues: "Land softly, hold for two seconds, knee over toes.",
        easier: "Hop a shorter distance.",
        harder: "Hop sideways or diagonally."
    }
];

// 3. LƯU TIẾN ĐỘ
function loadDone() {
    try {
        return JSON.parse(localStorage.getItem("doneExercises")) || [];
    } catch (e) {
        return [];
    }
}

function saveDone(list) {
    try {
        localStorage.setItem("doneExercises", JSON.stringify(list));
    } catch (e) { }
}

function updateProgress() {
    const el = document.getElementById("progress");
    el.textContent = loadDone().length + " / " + exercises.length + " mastered";
}

// 4. LẤY CÁC PHẦN TỬ TRÊN TRANG
const grid = document.getElementById("exercise-grid");
const focusFilter = document.getElementById("focus-filter");
const levelFilter = document.getElementById("level-filter");
const equipmentFilter = document.getElementById("equipment-filter");

// 5. HIỂN THỊ
function render(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = "<p>No matching exercises.</p>";
        return;
    }

    const done = loadDone();

    list.forEach(function (ex) {
        const card = document.createElement("article");
        card.className = "exercise-card";
        card.innerHTML = `
      <h3>${ex.name}</h3>
      <span class="tag">${focusNames[ex.focus]}</span>
      <span class="tag">${ex.level}</span>
      <p class="sets">${ex.sets}</p>
      <details>
        <summary>How to do it</summary>
        <p><strong>Cues:</strong> ${ex.cues}</p>
        <p><strong>Easier:</strong> ${ex.easier}</p>
        <p><strong>Harder:</strong> ${ex.harder}</p>
      </details>
      <label class="done">
        <input type="checkbox" ${done.includes(ex.name) ? "checked" : ""}>
        Mastered
      </label>
    `;

        card.querySelector("input").addEventListener("change", function (e) {
            let current = loadDone();
            if (e.target.checked) {
                current.push(ex.name);
            } else {
                current = current.filter(function (n) { return n !== ex.name; });
            }
            saveDone(current);
            updateProgress();
        });

        grid.appendChild(card);
    });
}

// 6. LỌC
function applyFilters() {
    const focus = focusFilter.value;
    const level = levelFilter.value;
    const equipment = equipmentFilter.value;

    const result = exercises.filter(function (ex) {
        return (focus === "all" || ex.focus === focus) &&
            (level === "all" || ex.level === level) &&
            (equipment === "all" || ex.equipment === equipment);
    });

    render(result);
}

focusFilter.addEventListener("change", applyFilters);
levelFilter.addEventListener("change", applyFilters);
equipmentFilter.addEventListener("change", applyFilters);

// 7. HIỆU ỨNG HIỆN RA KHI CUỘN (cho các thẻ mục tiêu)
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".goal-card").forEach(function (el) {
    el.classList.add("reveal");
    observer.observe(el);
});

// 8. CHẠY LẦN ĐẦU
updateProgress();
render(exercises);