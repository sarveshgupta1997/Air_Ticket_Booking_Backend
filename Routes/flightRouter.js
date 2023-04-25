const express = require("express");
const {FlightModel} = require("../Models/FlightModel");

const flightRouter = express.Router();

// Get all Flights
flightRouter.get("/", async (req,res)=>{
    try {        
        let flights = await FlightModel.find();
        res.status(200).send({msg:"All Flights",flights});
    } catch (error) {
        res.send({err:"Something went wrong"});
        console.log(error)
    }
})

// Get Flight by flight id
flightRouter.get("/:id", async (req,res)=>{
    let id=req.params.id;
    try {        
        let flight = await FlightModel.findOne({_id:id});
        res.status(200).send({msg:"Flight Details",flight});
    } catch (error) {
        res.send({err:"Something went wrong"});
        console.log(error)
    }
})

//Register
flightRouter.post("/", async (req,res)=>{
    let payload = req.body;
    try {
        let flight = new FlightModel(payload)
        await flight.save();
        res.status(201).send({msg:"Flight Registered",flight});
    } catch (error) {
        res.send({err:"Something went wrong"});
        console.log(error)
    }
})

// Update Flight
flightRouter.patch("/:id", async (req,res)=>{
    let id=req.params.id;
    let payload = req.body;
    try {
        let flight = await FlightModel.findByIdAndUpdate({_id:id},payload);
        res.status(204).send({msg:"Flight Data Updated",flight});
    } catch (error) {
        res.send({err:"Something went wrong"});
        console.log(error)
    }
})

// Delete Flight
flightRouter.delete("/:id", async (req,res)=>{
    let id=req.params.id;
    try {
        let flight = await FlightModel.findByIdAndDelete({_id:id});
        res.status(202).send({msg:"Flight Deleted",flight});
    } catch (error) {
        res.send({err:"Something went wrong"});
        console.log(error)
    }
})


module.exports={flightRouter};