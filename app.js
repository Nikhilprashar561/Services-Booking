import express from "express"
import { userRouter } from "./routes/user.routee.js"
import { adminRouter } from "./routes/admin.routee.js"
import { localProviderRouter } from "./routes/localProvider.routee.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { getApiRouter } from "./routes/getApi.routee.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors())

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/localProvider", localProviderRouter)
app.use("/getApi", getApiRouter)

export { app }
