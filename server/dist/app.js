import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("SnapStack API is running 🚀");
});
export default app;
//# sourceMappingURL=app.js.map