import Express from "express";

import {usersRouter} from "./routes/users.js"
import {authRouter} from "./routes/auth.js"
import {contactsRouter} from "./routes/contacts.js"
import { connectDB } from "./config/db.js";

const app = Express();
//connect to mongo atlas
connectDB();

const PORT = process.env.PORT || 4000;

//routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.listen(PORT, () => console.log(`server started on port${PORT}`));