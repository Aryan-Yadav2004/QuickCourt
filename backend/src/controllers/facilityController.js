import jwt from "jsonwebtoken";
import Facility from "../models/facilityModel.js";

const handleFacility = async (req,res) => {
    try {
        const token = req.cookies?.token;
        const data = jwt.decode(token);
        req.body.owner = data._id;
        const facility = new Facility(req.body)
        const result = await facility.save();
        console.log(result);
        res.status(200).json({message: "facility created"});
    } catch (error) {
        res.status(500).json({message: "failed"});
    }
}
export default handleFacility;