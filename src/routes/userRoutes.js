
import {renderLandingPage }from "../middlewares/renderLandingPage"

export const initRoutes = app =>{
    app.get("/", renderLandingPage);
}
