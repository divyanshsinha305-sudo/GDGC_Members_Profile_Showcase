import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const loadMembers = () => {
  const data = fs.readFileSync("./members.json", "utf-8");
  return JSON.parse(data);
};

app.get("/members", (req, res) => {
  const members = loadMembers();
  const q = (req.query.q || "").toLowerCase();
  const role = (req.query.role || "").toLowerCase();
  const skills = (req.query.skills || "").toLowerCase();
  const location = (req.query.location || "").toLowerCase();

  const filtered = members.filter(m => {
    const text = (m.name + " " + m.bio).toLowerCase();
    if (q && !text.includes(q)) return false;

    if (role && m.role.toLowerCase() !== role) return false;

    if (skills) {
      const want = skills.split(",").map(s => s.trim());
      const memberSkills = m.skills.map(s => s.toLowerCase());
      for (const w of want) {
        if (!memberSkills.includes(w)) return false;
      }
    }

    if (location && !m.location.toLowerCase().includes(location)) return false;

    return true;
  });

  res.json({ total: filtered.length, data: filtered });
});

app.get("/members/:id", (req, res) => {
  const members = loadMembers();
  const m = members.find(mem => mem.id == req.params.id);
  if (!m) return res.status(404).json({ error: "Member not found" });
  res.json(m);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
