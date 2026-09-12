const app = require("./app");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const PORT = 3000;
const prisma = new PrismaClient();

//================= AUTH =================//

// Registro de usuario
app.post("/register", async (req: any, res: any) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

// Login con JWT
app.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const passwordIsValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "secret_key",
    {
      expiresIn: "1h",
    }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Ruta protegida con JWT
app.get("/profile", (req: any, res: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret_key");

    res.json({
      message: "Protected profile data",
      user: decoded,
    });
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
});

//================= TASKS =================//

// Obtener todas las tareas
app.get("/tasks", async (_req: any, res: any) => {
  const tasksFromDatabase = await prisma.task.findMany();

  res.json(tasksFromDatabase);
});

// Crear nueva tarea
app.post("/tasks", async (req: any, res: any) => {
  const { text } = req.body || {};

  if (!text || text.trim() === "") {
    return res.status(400).json({
      message: "Task text is required",
    });
  }

  const newTask = await prisma.task.create({
    data: {
      text,
      completed: false,
    },
  });

  res.status(201).json(newTask);
});

// Actualizar tarea
app.put("/tasks/:id", async (req: any, res: any) => {
  const id = Number(req.params.id);

  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        completed: !task.completed,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);

    res.status(500).json({
      message: "Error updating task",
    });
  }
});

// Eliminar tarea
app.delete("/tasks/:id", async (req: any, res: any) => {
  const id = Number(req.params.id);

  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await prisma.task.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);

    res.status(500).json({
      message: "Error deleting task",
    });
  }
});

//================= SERVER =================//

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});