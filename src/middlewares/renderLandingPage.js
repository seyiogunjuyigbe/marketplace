import User from "../models/user";
export const renderLandingPage = (req, res) => {
 return res.status(200).render("index");
};
