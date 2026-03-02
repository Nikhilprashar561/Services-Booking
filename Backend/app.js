import express from "express"
import { userRouter } from "./routes/user.routee.js"
import { adminRouter } from "./routes/admin.routee.js"
import { localProviderRouter } from "./routes/localProvider.routee.js"

const app = express()

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/localProvider", localProviderRouter)

export { app }
