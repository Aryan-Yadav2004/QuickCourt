import Court from "../models/courtModel.js";
import Facility from "../models/facilityModel.js";
import Slot from "../models/timeSlotModel.js";
let createCourt = async (req,res) => {
    try {
        let { facilityId } = req.params;
        const facility = await Facility.findOne({_id: facilityId});
        const courtData = req.body;
        console.log(req.body);
        const court = new Court({
            about: courtData.about,
            amenities: courtData.amenities,
            photoLink: courtData.photoLink,
            sport: courtData.sport,
            facility_id: facility._id, 
        });
        const courtObj = await court.save();
        let timeSlots = [];
        for(let time of courtData.times) {
            let slot = new Slot({
                time: new Date(time.date),
                totalSeats: time.totalSeats,
                price: time.price,
                court_id: courtObj._id,
                rating: 0,
            })
            let result = await slot.save();
            timeSlots.push(result._id);
        };
        facility.courts.push(courtObj._id);
        await facility.save();
        courtObj.timeSlotBookingInfo = timeSlots;
        await courtObj.save();
        res.status(200).json({message: "court created"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCourt = async(req, res) => {
    try {
        const { courtId } = req.params;
        const court = await Court.findOne({_id: courtId});

        const newCourtData = req.body;
        court.sport = newCourtData.sport;
        court.amenities = newCourtData.amenities;
        court.photoLink = newCourtData.photoLink;
        court.about = newCourtData.about;

        await court.save();
        res.status(200).json({message: "updated court"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteCourt = async (req,res) => {
    try {
        const { courtId } = req.params;
        const court = await Court.findOne({_id: courtId});
        for(let slots of court.timeSlotBookingInfo){
            await Slot.deleteMany({_id: {$in: slots}});
        }
        const facility = await Facility.findOne({_id: court.facility_id});
        facility.courts = facility.courts.filter(id => !id.equals(court._id));
        await facility.save();
        await Court.deleteMany({_id: courtId});
        res.status(200).json({message: "deletedCourt sucessfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const readCourt = async (req,res) => {
    try {
        const { courtId } = req.params;
        const court = await Court.findOne({_id: courtId}).populate("reviews");
        res.status(200).json(court);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export  { createCourt, updateCourt, deleteCourt, readCourt};