import Court from "../models/courtModel.js";
import Facility from "../models/facilityModel.js"

//name, city, state, country, price  

const limit = 10;
const searchFacilities = async (req,res) => {
    try{
        const {name,city,state,country} = req.body;
        let filter = {};
        if(name) filter.name = name;
        if(city) filter.city = city;
        if(state) filter.state = state;
        if(country) filter.country = country;
        const page = req.query.page;
        const skip = (page - 1) * limit;
        const facilities = await Facility.find(filter).skip(skip).limit(limit);
        res.status(200).json(facilities);
        fac
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

const searchCourts = async (req,res) => {
    try{
        const {sport,rating,city,state,country} = req.body;
        if(sport) filter.sport = sport;
        if(rating) filter.rating = Number(rating);
        if(city) filter.city = city;
        if(state) filter.state = state;
        if(country) filter.country = country;
        const page = req.query.page;
        const skip = (courtPage - 1) * limit;
        const courts = await Court.find().skip(skip).limit(limit);
        res.status(200).json(courts);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

export {searchFacilities,searchCourts};